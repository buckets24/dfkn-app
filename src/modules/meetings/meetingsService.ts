import { GraphQLAPIClass, GraphQLResult } from '@aws-amplify/api-graphql';
import { API, APIClass } from 'aws-amplify';
import { log, LogLevel } from 'jexity-app/utils/logger';
import removeEmptyArrayItems from 'jexity-app/utils/removeEmptyArrayItems';
import { UseInfiniteQueryResult } from 'react-query';
import {
  CreateMeetingModelInput,
  CreateMeetingModelMutation,
  CreateMeetingModelMutationVariables,
  DeleteMeetingModelMutation,
  DeleteMeetingModelMutationVariables,
  GetMeetingModelQuery,
  GetMeetingModelQueryVariables,
  GetMeetingsByClientIdWithClientNameQuery,
  GetMeetingsByClientIdWithClientNameQueryVariables,
  GetMeetingsByOwnerWithClientNamesQuery,
  GetMeetingsByOwnerWithClientNamesQueryVariables,
  UpdateMeetingModelMutation,
  UpdateMeetingModelMutationVariables,
} from 'src/API';
import { getMeetingsByClientIdWithClientName, getMeetingsByOwnerWithClientNames } from 'src/graphql/customQueries';
import { createMeetingModel, deleteMeetingModel, updateMeetingModel } from 'src/graphql/mutations';
import { getMeetingModel } from 'src/graphql/queries';
import { PromiseValue } from 'type-fest';
import MeetingModel from './api/MeetingModel';
import { UseMeetingsByOwnerInfiniteQueryValue } from './query-hooks/useMeetingsByOwnerInfiniteQuery';

/**
 * READ FUNCTIONS
 */
export const requestMeetingById = async (
  id: MeetingModel['id'],
  API: GraphQLAPIClass | APIClass
): Promise<GetMeetingModelQuery['getMeetingModel'] | undefined> => {
  const variables: GetMeetingModelQueryVariables = { id };
  const res = (await API.graphql({
    query: getMeetingModel,
    variables,
  })) as GraphQLResult<GetMeetingModelQuery>;
  return res.data?.getMeetingModel;
};

export const requestMeetingsByClientId = async (
  clientId: string,
  alternatAPI: GraphQLAPIClass | APIClass = API
): Promise<NonNullable<GetMeetingsByClientIdWithClientNameQuery['getMeetingsByClientId']>['items'] | undefined> => {
  const variables: GetMeetingsByClientIdWithClientNameQueryVariables = {
    clientId,
  };
  const res = (await alternatAPI.graphql({
    query: getMeetingsByClientIdWithClientName,
    variables,
  })) as GraphQLResult<GetMeetingsByClientIdWithClientNameQuery>;
  const meetingModels: NonNullable<GetMeetingsByClientIdWithClientNameQuery['getMeetingsByClientId']>['items'] = [];
  const resItems = res.data?.getMeetingsByClientId?.items;
  if (resItems) {
    resItems.forEach((item) => {
      if (item) {
        meetingModels.push(item);
      }
    });
  }
  return meetingModels;
};

export const requestMeetingsByOwner = async (
  variables: GetMeetingsByOwnerWithClientNamesQueryVariables,
  API: GraphQLAPIClass | APIClass
): Promise<GetMeetingsByOwnerWithClientNamesQuery['getMeetingsByOwner']> => {
  const res = (await API.graphql({
    query: getMeetingsByOwnerWithClientNames,
    variables,
  })) as GraphQLResult<GetMeetingsByOwnerWithClientNamesQuery>;
  return res.data?.getMeetingsByOwner;
};

type UpcomingMeeting = Pick<
  NonNullable<NonNullable<NonNullable<PromiseValue<ReturnType<typeof requestMeetingsByOwner>>>['items']>[number]>,
  'id' | 'owner' | 'meetingDateTime' | 'moderatorId' | 'clientId' | 'client' | 'createdAt' | 'updatedAt'
>;

export const requestUpcomingMeetings = (
  meetingList: UseInfiniteQueryResult<UseMeetingsByOwnerInfiniteQueryValue>
): UpcomingMeeting[] | undefined => {
  const meetings = meetingList.data?.pages
    .map((page) => page?.items)
    .flat()
    .filter(removeEmptyArrayItems)
    .map(({ id, owner, meetingDateTime, moderatorId, clientId, client, createdAt, updatedAt }) => ({
      id,
      owner,
      meetingDateTime,
      moderatorId,
      clientId,
      client,
      createdAt,
      updatedAt,
    }));

  const sortedMeetings = meetings?.sort(
    (prev, next) => new Date(prev.meetingDateTime).getTime() - new Date(next.meetingDateTime).getTime()
  );
  const upcomingMeetings = sortedMeetings?.filter(
    (meeting) => new Date(meeting.meetingDateTime).getTime() >= new Date().getTime()
  );

  return upcomingMeetings;
};

/**
 * CREATE FUNCTIONS
 */
export const createMeeting = async (
  input: CreateMeetingModelInput,
  API: GraphQLAPIClass | APIClass
): Promise<CreateMeetingModelMutation['createMeetingModel']> => {
  const variables: CreateMeetingModelMutationVariables = { input };

  const res = (await API.graphql({
    query: createMeetingModel,
    variables,
  })) as GraphQLResult<CreateMeetingModelMutation>;

  return res.data?.createMeetingModel;
};

/**
 * UPDATE FUNCTIONS
 */
export const updateScrollPositionPercent = async (
  id: MeetingModel['id'],
  scrollPosPercent: number,
  API: GraphQLAPIClass | APIClass
): Promise<MeetingModel | undefined> => {
  const variables: UpdateMeetingModelMutationVariables = { input: { id, scrollPosPercent } };
  const res = (await API.graphql({
    query: updateMeetingModel,
    variables,
  })) as GraphQLResult<UpdateMeetingModelMutation>;
  const resMeeting = res.data?.updateMeetingModel;
  if (resMeeting) {
    const { __typename, ...meeting } = resMeeting;
    return meeting;
  }
};

export const putActiveDocumentId = async (
  activeMeetingId: MeetingModel['id'],
  activeDocumentId: string | null,
  API: GraphQLAPIClass | APIClass
): Promise<MeetingModel | undefined> => {
  /**
   * TODO Update error handling, it should not be here.
   */
  try {
    const variables: UpdateMeetingModelMutationVariables = {
      input: {
        id: activeMeetingId,
        activeDocumentId,
      },
    };
    const res = (await API.graphql({
      query: updateMeetingModel,
      variables,
    })) as GraphQLResult<UpdateMeetingModelMutation>;
    const resMeeting = res.data?.updateMeetingModel;
    if (resMeeting) {
      const { __typename, ...meeting } = resMeeting;
      return meeting;
    }
  } catch (e) {
    log(LogLevel.error, e.message, e);
  }
};

/**
 * DELETE FUNCTIONS
 */
export const deleteMeeting = async (
  id: MeetingModel['id'],
  API: GraphQLAPIClass | APIClass
): Promise<DeleteMeetingModelMutation['deleteMeetingModel'] | undefined> => {
  const deleteMeetingModelVariables: DeleteMeetingModelMutationVariables = {
    input: { id },
  };
  const res = (await API.graphql({
    query: deleteMeetingModel,
    variables: deleteMeetingModelVariables,
  })) as GraphQLResult<DeleteMeetingModelMutation>;

  const deletedMeeting = res.data?.deleteMeetingModel;

  if (deletedMeeting) {
    return { ...deletedMeeting };
  } else {
    throw new Error(`Meeting with id: ${id} was not deleted or does not exist at all.`);
  }
};
