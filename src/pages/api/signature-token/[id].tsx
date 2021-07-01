import { GraphQLResult } from '@aws-amplify/api-graphql';
import { Amplify, API } from 'aws-amplify';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { diff, patch } from 'jsondiffpatch';
import { NextApiRequest, NextApiResponse } from 'next';
import handler from 'next-connect';
import { GetSignatureTokenModelQuery, GetSignatureTokenModelQueryVariables } from 'src/API';
import { getSignatureTokenModel } from 'src/graphql/queries';
import { yupString } from 'src/modules/common/yupSchemaFields';
import { DocumentPatchModel } from 'src/modules/documents/api/DocumentModel';
import { createPatch, requestDocumentWithPatchesById } from 'src/modules/documents/documentService';
import patcher from 'src/modules/documents/utils/patcher';
import { deleteSignatureTokenById } from 'src/modules/signature/signatureService';
import { v4 } from 'uuid';
import { object, SchemaOf } from 'yup';

type SignatureFieldInput = {
  signatureTokenId: string | null;
  signature: string | null;
  pinInput: string | null;
};

export const signatureTokenYupSchema: SchemaOf<SignatureFieldInput> = object().shape({
  signatureTokenId: yupString(true).defined(),
  signature: yupString(true).defined(),
  pinInput: yupString(true).defined(),
});

export default handler<NextApiRequest, NextApiResponse>().put(
  async (req, res): Promise<void> => {
    /**
     * TODO: Should be outside
     */
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const config = require('../../../aws-exports').default;
      Amplify.configure({ ...config, aws_appsync_authenticationType: 'API_KEY', ssr: true });
    } else {
      Amplify.configure({
        aws_project_region: process.env.NEXT_PUBLIC_aws_project_region,
        aws_appsync_graphqlEndpoint: process.env.NEXT_PUBLIC_aws_appsync_graphqlEndpoint,
        aws_appsync_region: process.env.NEXT_PUBLIC_aws_appsync_region,
        aws_appsync_apiKey: process.env.aws_appsync_apiKey,
        aws_cognito_region: process.env.NEXT_PUBLIC_aws_cognito_region,
        aws_user_pools_id: process.env.NEXT_PUBLIC_aws_user_pools_id,
        aws_user_pools_web_client_id: process.env.NEXT_PUBLIC_aws_user_pools_web_client_id,
        aws_appsync_authenticationType: 'API_KEY',
        oauth: {},
        ssr: true,
      });
    }

    const { body } = req;

    const { signatureTokenId, signature, pinInput } = body as SignatureFieldInput;

    try {
      await signatureTokenYupSchema.validate(body);
    } catch (e) {
      res.status(400).json({
        type: 'MALFORMED_REQUEST',
        message: `One of the fields is incorrect`,
      });
      return;
    }

    if (typeof signatureTokenId !== 'string') {
      res.status(404);
      return;
    }

    try {
      const signatureTokenVariables: GetSignatureTokenModelQueryVariables = { id: signatureTokenId };
      const resSignatureToken = (await API.graphql({
        query: getSignatureTokenModel,
        variables: signatureTokenVariables,
      })) as GraphQLResult<GetSignatureTokenModelQuery>;
      const signaturePin = resSignatureToken.data?.getSignatureTokenModel?.pin;
      const documentId = resSignatureToken.data?.getSignatureTokenModel?.documentId;
      const signatureFieldName = resSignatureToken.data?.getSignatureTokenModel?.fieldName;
      const authorId = resSignatureToken.data?.getSignatureTokenModel?.authorId;

      if (documentId && signatureFieldName && authorId) {
        const document = await requestDocumentWithPatchesById(documentId, API);

        if (pinInput !== signaturePin) {
          res.status(401).json({
            type: 'WRONG_PIN_INPUT',
            message: 'The inputted pin does not match the one on our server',
          });
          return;
        }

        if (!document) {
          res.status(404).json({
            type: 'DOCUMENT_NOT_FOUND',
            message: `Document ${documentId} was not found in the database`,
          });
          return;
        }

        /**
         * STEPS
         * 1. Compare patches with the new signature field
         *
         */
        const patches = (document.patches?.items ?? []).filter((p) => !!p);

        const patchesAsArray: DocumentPatchModel[] = [];
        patches.forEach((p) => {
          if (p) {
            patchesAsArray.push(p);
          }
        });

        let patchedValue = patcher(
          document.values,
          patchesAsArray.sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return dateA > dateB ? 1 : -1;
          })
        );

        const forwarded = req.headers['x-forwarded-for'];
        const ip = forwarded && typeof forwarded === 'string' ? forwarded.split(/, /)[0] : req.connection.remoteAddress;
        const deltaValuesVsPatch = diff(patchedValue, {
          ...patchedValue,
          [signatureFieldName]: signature,
          [`${signatureFieldName}IPAddress`]: ip,
        });

        if (deltaValuesVsPatch) {
          patchedValue = patch(patchedValue, deltaValuesVsPatch);

          await createPatch(documentId, deltaValuesVsPatch, authorId, v4(), API);
          await deleteSignatureTokenById(signatureTokenId, API);

          res.status(200).json({
            type: 'CREATED_NEW_SIGN_PATCH',
            message: `Patch created for document ${documentId} from ${authorId}`,
          });

          /**
           * TODO:
           * On Success delete the used token
           */
        } else {
          res.status(304).json({
            type: 'NO_SIGNATURE_CHANGES',
            message: 'Nothing was changed in the document patches',
          });
        }
      }
    } catch (e) {
      const errorCode = log(LogLevel.error, e.message, e);
      res.status(500).json({
        type: 'UNKNOWN_ERROR',
        message: 'Error updating the signature',
        errorCode,
      });
    }
  }
);
