import API from '@aws-amplify/api-graphql';
import produce from 'immer';
import { FC, useEffect } from 'react';
import { OnUpdateMeetingModelByOwnerSubscription, OnUpdateMeetingModelByOwnerSubscriptionVariables } from 'src/API';
import { onUpdateMeetingModelByOwner } from 'src/graphql/subscriptions';
import { getMe, useAuthStore } from 'src/modules/auth/authStore';
import queryClient from 'src/queryClient';
import { PayloadType } from 'src/utils/type-utils/ResultType';
import Observable from 'zen-observable-ts';
import { MEETINGS_QUERY_KEY } from '../query-hooks/meetingQueryKeys';
import useMeetingByIdQuery from '../query-hooks/useMeetingByIdQuery';
import { PaginatedMeetings } from '../query-hooks/useMeetingsByOwnerInfiniteQuery';

const MeetingUpdateWatcher: FC = () => {
  const me = useAuthStore(getMe);

  useEffect(() => {
    let unsubscribe;

    if (me?.sub) {
      const variables: OnUpdateMeetingModelByOwnerSubscriptionVariables = {
        owner: me.sub,
      };
      const observable = API.graphql({
        query: onUpdateMeetingModelByOwner,
        variables,
      });

      if (observable instanceof Observable) {
        const subscription = (observable as Observable<PayloadType<OnUpdateMeetingModelByOwnerSubscription>>).subscribe(
          {
            next: (payload) => {
              const result = payload.value.data?.onUpdateMeetingModelByOwner;
              if (result) {
                /**
                 * Push a new cache item data
                 */
                queryClient.setQueryData<ReturnType<typeof useMeetingByIdQuery>['data']>(
                  [MEETINGS_QUERY_KEY, result.id],
                  result
                );

                /**
                 * Push the new item to the first page
                 */
                queryClient.setQueryData<PaginatedMeetings | undefined>([MEETINGS_QUERY_KEY], (meetingsListResults) => {
                  const updated = produce(meetingsListResults, (draftList) => {
                    draftList?.pages.forEach((page) => {
                      page?.items?.forEach((item, index) => {
                        if (item?.id === result.id && page.items?.[index]) {
                          page.items[index] = result;
                        }
                      });
                    });
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

export default MeetingUpdateWatcher;
