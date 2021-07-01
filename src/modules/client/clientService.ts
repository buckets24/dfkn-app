import { GraphQLAPI as API, GraphQLAPIClass, GraphQLResult } from '@aws-amplify/api-graphql';
import { CognitoUser } from 'amazon-cognito-identity-js';
import Amplify, { APIClass } from 'aws-amplify';
import { log, LogLevel } from 'jexity-app/utils/logger';
import config from 'src/AmplifyConfig';
import {
  AccountStatus,
  CognitoUserStatusType,
  ContractorType,
  CreateClientActivityModelInput,
  CreateClientActivityModelMutation,
  CreateClientActivityModelMutationVariables,
  CreateClientModelInput,
  CreateClientModelMutation,
  CreateClientModelMutationVariables,
  DeleteClientModelMutation,
  DeleteClientModelMutationVariables,
  GetClientBySubQuery,
  GetClientBySubQueryVariables,
  GetClientModelQuery,
  GetClientModelQueryVariables,
  GetClientsByOwnerQuery,
  GetClientsByOwnerQueryVariables,
  UpdateClientModelInput,
  UpdateClientModelMutation,
  UpdateClientModelMutationVariables,
} from 'src/API';
import {
  createClientActivityModel,
  createClientModel,
  deleteClientModel,
  updateClientModel,
} from 'src/graphql/mutations';
import { getClientBySub, getClientModel, getClientsByOwner } from 'src/graphql/queries';
import { PromiseValue, SetRequired } from 'type-fest';
import { ClientPersonalData } from './api/ClientModel';

/**
 * READ FUNCTIONS
 */
export const requestClientBySub = async (
  sub: ReturnType<CognitoUser['getUsername']>,
  alternateAPI: GraphQLAPIClass | APIClass
): Promise<NonNullable<NonNullable<GetClientBySubQuery['getClientBySub']>['items']>[number] | undefined> => {
  const variables: GetClientBySubQueryVariables = {
    sub,
  };
  const res = (await alternateAPI.graphql({
    query: getClientBySub,
    variables,
  })) as GraphQLResult<GetClientBySubQuery>;
  if (res.data?.getClientBySub?.items && res.data.getClientBySub.items.length > 0) {
    return res.data.getClientBySub.items[0];
  } else {
    return undefined;
  }
};

export const requestClientById = async (id: string): Promise<GetClientModelQuery['getClientModel'] | undefined> => {
  const variables: GetClientModelQueryVariables = {
    id,
  };
  const res = (await API.graphql({
    query: getClientModel,
    variables,
  })) as GraphQLResult<GetClientModelQuery>;
  return res.data?.getClientModel;
};

export const requestClientsByOwner = async (
  variables: SetRequired<GetClientsByOwnerQueryVariables, 'owner'>,
  alternateAPI: GraphQLAPIClass | APIClass
): Promise<GetClientsByOwnerQuery['getClientsByOwner']> => {
  const res = (await alternateAPI.graphql({
    query: getClientsByOwner,
    variables,
  })) as GraphQLResult<GetClientsByOwnerQuery>;
  return res.data?.getClientsByOwner;
};

/**
 * CREATE FUNCTIONS
 */

export const createClient = async (
  input: CreateClientModelInput,
  alternateAPI: GraphQLAPIClass | APIClass = API
): Promise<CreateClientModelMutation['createClientModel'] | undefined> => {
  const variables: CreateClientModelMutationVariables = {
    input,
  };
  const response = (await alternateAPI.graphql({
    query: createClientModel,
    variables,
  })) as GraphQLResult<CreateClientModelMutation>;
  return response.data?.createClientModel;
};

export const createClientActivity = async (
  input: CreateClientActivityModelInput,
  alternateAPI: GraphQLAPIClass | APIClass = API
): Promise<CreateClientActivityModelMutation['createClientActivityModel'] | undefined> => {
  const variables: CreateClientActivityModelMutationVariables = {
    input,
  };
  const response = (await alternateAPI.graphql({
    query: createClientActivityModel,
    variables,
  })) as GraphQLResult<CreateClientActivityModelMutation>;
  return response.data?.createClientActivityModel;
};

/**
 * UPDATE FUNCTIONS
 */
export const updateClient = async (
  input: Omit<UpdateClientModelInput, 'sub' | 'owner' | 'editors'>,
  alternateAPI: GraphQLAPIClass | APIClass = API
): Promise<UpdateClientModelMutation['updateClientModel'] | undefined> => {
  const variables: UpdateClientModelMutationVariables = {
    input,
  };
  const response = (await alternateAPI.graphql({
    query: updateClientModel,
    variables,
  })) as GraphQLResult<UpdateClientModelMutation>;
  return response.data?.updateClientModel;
};

export const updateClientStatus = async (
  id: string,
  status: AccountStatus,
  alternateAPI: GraphQLAPIClass | APIClass = API
): Promise<UpdateClientModelMutation['updateClientModel'] | undefined> => {
  const variables: UpdateClientModelMutationVariables = {
    input: { id, status },
  };
  const response = (await alternateAPI.graphql({
    query: updateClientModel,
    variables,
  })) as GraphQLResult<UpdateClientModelMutation>;

  return response.data?.updateClientModel;
};

export const updateClientCognitoStatus = async (
  id: string,
  cognitoStatus: CognitoUserStatusType,
  alternatAPI: GraphQLAPIClass | APIClass
): Promise<UpdateClientModelMutation['updateClientModel'] | undefined> => {
  const variables: UpdateClientModelMutationVariables = {
    input: { id, cognitoStatus },
  };
  const response = (await alternatAPI.graphql({
    query: updateClientModel,
    variables,
  })) as GraphQLResult<UpdateClientModelMutation>;

  return response.data?.updateClientModel;
};

/**
 * DELETE FUNCTIONS
 */
export const deleteClient = async (
  id: string,
  alternateAPI: GraphQLAPIClass | APIClass
): Promise<DeleteClientModelMutation['deleteClientModel']> => {
  try {
    const deleteClientModelVariables: DeleteClientModelMutationVariables = {
      input: { id },
    };
    const res = (await alternateAPI.graphql({
      query: deleteClientModel,
      variables: deleteClientModelVariables,
    })) as GraphQLResult<DeleteClientModelMutation>;

    const deletedClient = res.data?.deleteClientModel;

    if (deletedClient) {
      const { onlineDocuments, meetings, agentDocuments, sub, ...clientProps } = deletedClient;
      if (sub) {
        return { ...clientProps, sub };
      }
    } else {
      throw new Error(`Client with id: ${id} was not deleted or does not exist at all.`);
    }
  } catch (e) {
    log(LogLevel.error, e.message, e);
  }
};

export const publicRequestClientBySub = async (
  sub: ReturnType<CognitoUser['getUsername']>
): Promise<NonNullable<NonNullable<GetClientBySubQuery['getClientBySub']>['items']>[number] | undefined> => {
  Amplify.configure({
    ...config,
    aws_appsync_authenticationType: 'API_KEY',
  });

  const variables: GetClientBySubQueryVariables = {
    sub,
  };

  const res = (await API.graphql({
    query: getClientBySub,
    variables,
  })) as GraphQLResult<GetClientBySubQuery>;

  Amplify.configure({
    ...config,
  });

  if (res.data?.getClientBySub?.items && res.data.getClientBySub.items.length > 0) {
    return res.data.getClientBySub.items[0];
  } else {
    return undefined;
  }
};

export const extractClientInfo = (
  client: NonNullable<PromiseValue<ReturnType<typeof requestClientById>>>,
  contractorType: ContractorType = ContractorType.PRIMARY
): ClientPersonalData & { postCodeTown?: string } => {
  /**
   * Manually pick the info to be returned
   * so that in the future even if we added a props to the client
   * it will not be extracted here.
   */
  const {
    title,
    salutation,
    firstName,
    lastName,
    email,
    maritalStatus,
    birthPlace,
    birthday,
    taxId,
    telephone,
    fax,
    mobile,
    postCode,
    place,
    streetHouseNumber,
    country,
    addressValidDate,
    nationality,
    contractor,
  } = client;

  /**
   * Data for investment kompass
   */
  const contractorData = {
    contractorTitle: contractor?.title,
    contractorFirstName: contractor?.firstName,
    contractorLastName: contractor?.lastName,
    contractorBirthDate: contractor?.birthday,
    contractorBirthPlace: contractor?.birthPlace,
    contractorMaritalStatus: contractor?.maritalStatus,
    contractorNationality: contractor?.nationality,
    contractorTaxID: contractor?.taxId,
  };

  if (contractorType === ContractorType.SECONDARY && contractor) {
    return {
      title: contractor.title,
      salutation: contractor.salutation,
      firstName: contractor.firstName ? contractor.firstName : '',
      lastName: contractor.lastName ? contractor.lastName : '',
      email: contractor.email ? contractor.email : '',
      maritalStatus: contractor.maritalStatus,
      birthPlace: contractor.birthPlace,
      birthday: contractor.birthday,
      taxId: contractor.taxId,
      telephone: contractor.telephone,
      fax: contractor.fax,
      mobile: contractor.mobile,
      postCode: contractor.postCode,
      place: contractor.place,
      streetHouseNumber: contractor.streetHouseNumber,
      country: contractor.country,
      addressValidDate: contractor.addressValidDate,
      nationality: contractor.nationality,
      postCodeTown: `${contractor.postCode ?? ''} / ${contractor.place ?? ''}`,
    };
  } else {
    return {
      title: title,
      salutation: salutation,
      firstName: firstName,
      lastName: lastName,
      email: email,
      maritalStatus: maritalStatus,
      birthPlace: birthPlace,
      birthday: birthday,
      taxId: taxId,
      telephone: telephone,
      fax: fax,
      mobile: mobile,
      postCode: postCode,
      place: place,
      streetHouseNumber: streetHouseNumber,
      country: country,
      addressValidDate: addressValidDate,
      nationality: nationality,
      postCodeTown: `${postCode ?? ''} / ${place ?? ''}`,
      ...(client.contractor && contractorData),
    };
  }
};
