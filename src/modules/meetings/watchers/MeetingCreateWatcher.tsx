import API from '@aws-amplify/api-graphql';
import produce from 'immer';
import { FC, useEffect } from 'react';
import 'src/AmplifyConfig';
import { OnCreateMeetingModelByOwnerSubscription, OnCreateMeetingModelByOwnerSubscriptionVariables } from 'src/API';
import { onCreateMeetingModelByOwner } from 'src/graphql/subscriptions';
import { getMe, useAuthStore } from 'src/modules/auth/authStore';
import queryClient from 'src/queryClient';
import { PayloadType } from 'src/utils/type-utils/ResultType';
import Observable from 'zen-observable-ts';
import { MEETINGS_QUERY_KEY } from '../query-hooks/meetingQueryKeys';
import { PaginatedMeetings } from '../query-hooks/useMeetingsByOwnerInfiniteQuery';

const MeetingCreateWatcher: FC = () => {
  const me = useAuthStore(getMe);

  useEffect(() => {
    let unsubscribe;
    if (me?.sub) {
      const variables: OnCreateMeetingModelByOwnerSubscriptionVariables = {
        owner: me.sub,
      };
      const observable = API.graphql({
        query: onCreateMeetingModelByOwner,
        variables,
      });

      if (observable instanceof Observable) {
        const subscription = (observable as Observable<PayloadType<OnCreateMeetingModelByOwnerSubscription>>).subscribe(
          {
            next: (payload) => {
              const result = payload.value.data?.onCreateMeetingModelByOwner;

              if (result) {
                /**
                 * Push a new cache item data
                 */
                queryClient.setQueryData([MEETINGS_QUERY_KEY, result.id], result);

                /**
                 * Push the new item to the first page
                 */
                queryClient.setQueryData<PaginatedMeetings | undefined>([MEETINGS_QUERY_KEY], (meetingsListResults) => {
                  const updated = produce(meetingsListResults, (draftList) => {
                    draftList?.pages[0]?.items?.unshift(result);
                    return draftList;
                  });
                  return updated;
                });
              }
            },
          }
        );
        unsubscribe = () => subscription.unsubscribe();
      }
    }
    return unsubscribe;
  }, [me?.sub]);

  return null;
};

export default MeetingCreateWatcher;
