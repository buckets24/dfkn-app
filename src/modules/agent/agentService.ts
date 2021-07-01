import { GraphQLAPIClass, GraphQLResult } from '@aws-amplify/api-graphql';
import { AdminGetUserCommandOutput } from '@aws-sdk/client-cognito-identity-provider';
import { CognitoUser } from 'amazon-cognito-identity-js';
import Amplify, { API, APIClass } from 'aws-amplify';
import {
  AccountStatus,
  CognitoUserStatusType,
  CreateAgentModelInput,
  CreateAgentModelMutation,
  CreateAgentModelMutationVariables,
  DeleteAgentModelMutation,
  DeleteAgentModelMutationVariables,
  GetAgentByEmailQuery,
  GetAgentByEmailQueryVariables,
  GetAgentBySubQuery,
  GetAgentBySubQueryVariables,
  GetAgentModelQuery,
  GetAgentModelQueryVariables,
  ListAgentModelsQuery,
  ListAgentModelsQueryVariables,
  UpdateAgentModelInput,
  UpdateAgentModelMutation,
  UpdateAgentModelMutationVariables,
} from 'src/API';
import { createAgentModel, deleteAgentModel, updateAgentModel } from 'src/graphql/mutations';
import { getAgentByEmail, getAgentBySub, getAgentModel, listAgentModels } from 'src/graphql/queries';
import { PromiseValue } from 'type-fest';
import config from 'src/AmplifyConfig';

/**
 * READ FUNCTIONS
 */

export const requestAgentBySub = async (
  sub: ReturnType<CognitoUser['getUsername']> | NonNullable<AdminGetUserCommandOutput['Username']>,
  alternateAPI: GraphQLAPIClass | APIClass | undefined = API
): Promise<NonNullable<NonNullable<GetAgentBySubQuery['getAgentBySub']>['items']>[number] | undefined> => {
  const variables: GetAgentBySubQueryVariables = {
    sub,
  };
  const res = (await alternateAPI.graphql({
    query: getAgentBySub,
    variables,
  })) as GraphQLResult<GetAgentBySubQuery>;
  if (res.data?.getAgentBySub?.items && res.data.getAgentBySub.items.length > 0) {
    return res.data.getAgentBySub.items[0];
  } else {
    return undefined;
  }
};

export const requestAgentById = async (
  id: string,
  alternateAPI: GraphQLAPIClass | APIClass
): Promise<GetAgentModelQuery['getAgentModel'] | undefined> => {
  const variables: GetAgentModelQueryVariables = {
    id,
  };

  const res = (await alternateAPI.graphql({
    query: getAgentModel,
    variables,
  })) as GraphQLResult<GetAgentModelQuery>;

  return res.data?.getAgentModel;
};

export const requestAgents = async (
  variables: ListAgentModelsQueryVariables,
  alternateAPI: GraphQLAPIClass | APIClass
): Promise<ListAgentModelsQuery['listAgentModels']> => {
  const res = (await alternateAPI.graphql({
    query: listAgentModels,
    variables,
  })) as GraphQLResult<ListAgentModelsQuery>;
  return res.data?.listAgentModels;
};

export const requestAllAgents = async (): Promise<PromiseValue<ReturnType<typeof requestAgents>>> => {
  let result: PromiseValue<ReturnType<typeof requestAgents>>;
  let nextToken: string | undefined = undefined;
  Amplify.configure({
    ...config,
    aws_appsync_authenticationType: 'API_KEY',
  });

  do {
    const response: PromiseValue<ReturnType<typeof requestAgents>> = await requestAgents(
      {
        limit: 100,
        nextToken: nextToken,
      },
      API
    );
    nextToken = response?.nextToken ? response.nextToken : undefined;
    if (!result) {
      result = response;
    } else {
      result.items?.push(...(response?.items ?? []));
    }
  } while (nextToken);

  Amplify.configure({
    ...config,
  });

  return result;
};

/**
 * CREATE FUNCTIONS
 */
export const createAgent = async (
  body: Omit<CreateAgentModelInput, 'sub'>,
  API: GraphQLAPIClass
): Promise<CreateAgentModelMutation['createAgentModel'] | undefined> => {
  const variables: CreateAgentModelMutationVariables = {
    input: body,
  };

  const response = (await API.graphql({
    query: createAgentModel,
    variables,
  })) as GraphQLResult<CreateAgentModelMutation>;

  return response.data?.createAgentModel;
};

/**
 * UPDATE FUNCTIONS
 */
export const updateAgent = async (
  input: UpdateAgentModelInput,
  alternateAPI: GraphQLAPIClass | APIClass = API
): Promise<UpdateAgentModelMutation['updateAgentModel'] | undefined> => {
  const variables: UpdateAgentModelMutationVariables = {
    input,
  };
  const response = (await alternateAPI.graphql({
    query: updateAgentModel,
    variables,
  })) as GraphQLResult<UpdateAgentModelMutation>;
  return response.data?.updateAgentModel;
};
export const updateAgentCognitoStatus = async (
  id: string,
  cognitoStatus: CognitoUserStatusType,
  alternatAPI: GraphQLAPIClass | APIClass
): Promise<UpdateAgentModelMutation['updateAgentModel'] | undefined> => {
  const variables: UpdateAgentModelMutationVariables = {
    input: { id, cognitoStatus },
  };
  const response = (await alternatAPI.graphql({
    query: updateAgentModel,
    variables,
  })) as GraphQLResult<UpdateAgentModelMutation>;

  return response.data?.updateAgentModel;
};

export const updateAgentStatus = async (
  id: string,
  status: AccountStatus,
  alternateAPI: GraphQLAPIClass | APIClass
): Promise<UpdateAgentModelMutation['updateAgentModel'] | undefined> => {
  const variables: UpdateAgentModelMutationVariables = {
    input: { id, status },
  };
  const response = (await alternateAPI.graphql({
    query: updateAgentModel,
    variables,
  })) as GraphQLResult<UpdateAgentModelMutation>;

  return response.data?.updateAgentModel;
};

/**
 * DELETE FUNCTION
 */

export const deleteAgent = async (
  id: NonNullable<DeleteAgentModelMutation['deleteAgentModel']>['id'],
  alternateAPI: GraphQLAPIClass | APIClass
): Promise<NonNullable<DeleteAgentModelMutation['deleteAgentModel']> | undefined> => {
  const deleteAgentModelVariables: DeleteAgentModelMutationVariables = {
    input: { id },
  };
  const res = (await alternateAPI.graphql({
    query: deleteAgentModel,
    variables: deleteAgentModelVariables,
  })) as GraphQLResult<DeleteAgentModelMutation>;

  const deletedAgent = res.data?.deleteAgentModel;

  if (deletedAgent) {
    return deletedAgent;
  } else {
    return undefined;
  }
};

export const publicRequestAgentByEmail = async (
  email: string
): Promise<NonNullable<GetAgentByEmailQuery['getAgentByEmail']>['items'] | undefined> => {
  Amplify.configure({
    ...config,
    aws_appsync_authenticationType: 'API_KEY',
  });

  const variables: GetAgentByEmailQueryVariables = {
    email: email,
  };

  const agentResponse = (await API.graphql({
    query: getAgentByEmail,
    variables,
  })) as GraphQLResult<GetAgentByEmailQuery>;

  const agentList = agentResponse.data?.getAgentByEmail;

  Amplify.configure({
    ...config,
  });

  if (agentList) {
    return agentList.items;
  } else {
    return undefined;
  }
};
