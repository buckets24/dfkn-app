import { APIClass, withSSRContext } from 'aws-amplify';
import { responseErrorWithLogger } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import handler from 'next-connect';
import { OnlineDocumentStatus, UpdateOnlineDocumentModelMutation } from 'src/API';
import { updateDocument } from 'src/modules/documents/documentService';
import { SimpleError } from 'src/utils/type-utils/SimpleError';
import { PromiseValue } from 'type-fest';

type LockHandlerResponse = NonNullable<UpdateOnlineDocumentModelMutation['updateOnlineDocumentModel']> | SimpleError;

const lockHandler = handler<NextApiRequest, NextApiResponse<LockHandlerResponse>>().post(async (req, res) => {
  const SSRContext = withSSRContext({ req });
  const API = SSRContext.API as APIClass;

  const documentId = req.query.documentId;
  const status = req.query.status;

  if (typeof documentId !== 'string') {
    responseErrorWithLogger(res, {
      status: 400,
      label: 'lockHandler',
      type: 'MALFORMED_DOCUMENT_ID',
      message: 'The documentId query passed to lockHandler is invalid',
    });
    return;
  }

  if (status !== OnlineDocumentStatus.LOCK && status !== OnlineDocumentStatus.INCOMPLETE) {
    responseErrorWithLogger(res, {
      status: 400,
      label: 'lockHandler',
      type: 'MALFORMED_STATUS',
      message: `The status query passed to lockHandler is not '${OnlineDocumentStatus.LOCK}' or '${OnlineDocumentStatus.INCOMPLETE}'`,
    });
    return;
  }

  let updateOriginalResponse: PromiseValue<ReturnType<typeof updateDocument>> | undefined = undefined;

  /**
   * Update the original document
   */
  try {
    updateOriginalResponse = await updateDocument(
      {
        id: documentId,
        status,
      },
      API
    );
    if (!updateOriginalResponse) {
      throw new Error('UpdateOnlineDocumentModelMutation returned an empty response');
    }
  } catch (e) {
    responseErrorWithLogger(res, {
      status: 500,
      label: 'lockHandler',
      type: 'FAILED_TO_CREATE_ARCHIVE_DOCUMENT',
      message: e?.message ?? 'Lock handler threw an unknown error',
      ...e,
    });
    return;
  }

  res.status(200).json(updateOriginalResponse);
});

export default lockHandler;
