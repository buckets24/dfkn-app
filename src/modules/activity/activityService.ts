import { APIClass } from '@aws-amplify/api';
import { GraphQLAPIClass, GraphQLResult } from '@aws-amplify/api-graphql';
import { API } from 'aws-amplify';
import removeEmptyArrayItems from 'jexity-app/utils/removeEmptyArrayItems';
import {
  DeleteClientActivityModelMutation,
  DeleteClientActivityModelMutationVariables,
  GetActivitiesByClientIdSortedByCreatedAtQuery,
  GetActivitiesByClientIdSortedByCreatedAtQueryVariables,
  GetActivitiesByOwnerSortedByCreatedAtQuery,
  GetActivitiesByOwnerSortedByCreatedAtQueryVariables,
  ListClientActivityModelsQuery,
  ModelSortDirection,
  UpdateClientActivityModelInput,
  UpdateClientActivityModelMutation,
  UpdateClientActivityModelMutationVariables,
} from 'src/API';
import { deleteClientActivityModel, updateClientActivityModel } from 'src/graphql/mutations';
import { getActivitiesByClientIdSortedByCreatedAt, getActivitiesByOwnerSortedByCreatedAt } from 'src/graphql/queries';
import { ResultType } from 'src/utils/type-utils/ResultType';
import { SetRequired } from 'type-fest';

export const requestClientActivitiesByOwner = async (
  variables: SetRequired<GetActivitiesByOwnerSortedByCreatedAtQueryVariables, 'owner'>,
  alternateAPI: GraphQLAPIClass | APIClass
): Promise<GetActivitiesByOwnerSortedByCreatedAtQuery['getActivitiesByOwnerSortedByCreatedAt']> => {
  const res = (await alternateAPI.graphql({
    query: getActivitiesByOwnerSortedByCreatedAt,
    variables,
  })) as GraphQLResult<GetActivitiesByOwnerSortedByCreatedAtQuery>;
  return res.data?.getActivitiesByOwnerSortedByCreatedAt;
};

export const requestClientActivitiesByClientId = async (
  clientId: string,
  alternateAPI: GraphQLAPIClass | APIClass = API
): Promise<
  | NonNullable<GetActivitiesByClientIdSortedByCreatedAtQuery['getActivitiesByClientIdSortedByCreatedAt']>['items']
  | undefined
> => {
  const variables: GetActivitiesByClientIdSortedByCreatedAtQueryVariables = {
    clientId,
    sortDirection: ModelSortDirection.DESC,
  };
  const res = (await alternateAPI.graphql({
    query: getActivitiesByClientIdSortedByCreatedAt,
    variables,
  })) as GraphQLResult<GetActivitiesByClientIdSortedByCreatedAtQuery>;
  let activityModels: NonNullable<
    GetActivitiesByClientIdSortedByCreatedAtQuery['getActivitiesByClientIdSortedByCreatedAt']
  >['items'] = [];
  const resItems = res.data?.getActivitiesByClientIdSortedByCreatedAt?.items;
  if (resItems) {
    activityModels = resItems.filter(removeEmptyArrayItems);
  }
  return activityModels;
};

/**
 * UPDATE FUNCTIONS
 */
export const updateClientActivity = async (
  input: Omit<UpdateClientActivityModelInput, 'sub' | 'owner'>,
  API: GraphQLAPIClass | APIClass
): Promise<UpdateClientActivityModelMutation['updateClientActivityModel'] | undefined> => {
  const variables: UpdateClientActivityModelMutationVariables = {
    input,
  };
  const response = (await API.graphql({
    query: updateClientActivityModel,
    variables,
  })) as GraphQLResult<UpdateClientActivityModelMutation>;
  return response.data?.updateClientActivityModel;
};

/**
 * DELETE FUNCTIONS
 */
export const deleteClientActivity = async (
  id: Omit<
    NonNullable<NonNullable<ResultType<ListClientActivityModelsQuery, 'listClientActivityModels'>['items']>[number]>,
    '__typename'
  >['id'],
  API: GraphQLAPIClass | APIClass
): Promise<DeleteClientActivityModelMutation['deleteClientActivityModel'] | undefined> => {
  const deleteClientActivityModelVariables: DeleteClientActivityModelMutationVariables = {
    input: { id },
  };
  const res = (await API.graphql({
    query: deleteClientActivityModel,
    variables: deleteClientActivityModelVariables,
  })) as GraphQLResult<DeleteClientActivityModelMutation>;

  const deletedActivity = res.data?.deleteClientActivityModel;

  if (deletedActivity) {
    return { ...deletedActivity };
  } else {
    throw new Error(`Activity with id: ${id} was not deleted or does not exist at all.`);
  }
};
