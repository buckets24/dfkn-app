import { GraphQLAPIClass, GraphQLResult } from '@aws-amplify/api-graphql';
import { API, APIClass } from 'aws-amplify';
import {
  CreateSignatureTokenModelMutation,
  CreateSignatureTokenModelMutationVariables,
  DeleteSignatureTokenModelMutation,
  DeleteSignatureTokenModelMutationVariables,
} from 'src/API';
import { createSignatureTokenModel, deleteSignatureTokenModel } from 'src/graphql/mutations';

export const createSignatureToken = async (
  pin: string,
  documentId: string,
  fieldName: string,
  authorId: string,
  alternatAPI: GraphQLAPIClass | APIClass = API
): Promise<NonNullable<CreateSignatureTokenModelMutation['createSignatureTokenModel']> | undefined> => {
  const variables: CreateSignatureTokenModelMutationVariables = {
    input: {
      pin,
      documentId,
      fieldName,
      authorId,
    },
  };
  const response = (await alternatAPI.graphql({
    query: createSignatureTokenModel,
    variables,
  })) as GraphQLResult<CreateSignatureTokenModelMutation>;

  if (response.data?.createSignatureTokenModel) {
    return response.data.createSignatureTokenModel;
  } else {
    return undefined;
  }
};

export const deleteSignatureTokenById = async (
  id: string,
  alternatAPI: GraphQLAPIClass | APIClass = API
): Promise<NonNullable<DeleteSignatureTokenModelMutation['deleteSignatureTokenModel']> | undefined> => {
  const variables: DeleteSignatureTokenModelMutationVariables = {
    input: {
      id: id,
    },
  };
  const response = (await alternatAPI.graphql({
    query: deleteSignatureTokenModel,
    variables,
  })) as GraphQLResult<DeleteSignatureTokenModelMutation>;

  if (response.data?.deleteSignatureTokenModel) {
    return response.data.deleteSignatureTokenModel;
  } else {
    return undefined;
  }
};
