import { InfiniteData } from 'react-query';
import {
  CreateMeetingModelInput,
  GetMeetingModelQuery,
  GetMeetingsByOwnerWithClientNamesQuery,
  ListMeetingModelsWithClientNamesQuery,
} from 'src/API';
import { ResultType } from 'src/utils/type-utils/ResultType';

export type MeetingStatus = 'APPROVED' | 'PENDING' | 'CALLED_OFF';

export type MeetingEditFormValues = Omit<
  CreateMeetingModelInput,
  'id' | 'sub' | 'owner' | 'editors' | 'activeDocumentId' | 'scrollPos' | 'scrollPosPercent'
>;

type MeetingItems = NonNullable<ResultType<ListMeetingModelsWithClientNamesQuery, 'listMeetingModels'>['items']>;
export type MeetingModel = Omit<NonNullable<MeetingItems[number]>, '__typename'>;

export type MeetingModelComplete = Omit<ResultType<GetMeetingModelQuery, 'getMeetingModel'>, '__typename'>;

/**
 * Type returned by react-query useInfiniteQuery,
 * it is used in multiple places
 */
export type MeetingsListCacheType = Partial<InfiniteData<GetMeetingsByOwnerWithClientNamesQuery['getMeetingsByOwner']>>;

export default MeetingModel;
