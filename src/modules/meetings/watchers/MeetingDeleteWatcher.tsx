import API from '@aws-amplify/api-graphql';
import produce from 'immer';
import { FC, useEffect } from 'react';
import { OnDeleteMeetingModelByOwnerSubscription, OnDeleteMeetingModelByOwnerSubscriptionVariables } from 'src/API';
import { onDeleteMeetingModelByOwner } from 'src/graphql/subscriptions';
import { getMe, useAuthStore } from 'src/modules/auth/authStore';
import queryClient from 'src/queryClient';
import { PayloadType } from 'src/utils/type-utils/ResultType';
import Observable from 'zen-observable-ts';
import { MeetingsListCacheType } from '../api/MeetingModel';
import { MEETINGS_QUERY_KEY } from '../query-hooks/meetingQueryKeys';

const MeetingDeleteWatcher: FC = () => {
  const me = useAuthStore(getMe);

  useEffect(() => {
    let unsubscribe;

    if (me?.sub) {
      const variables: OnDeleteMeetingModelByOwnerSubscriptionVariables = {
        owner: me.sub,
      };
      const observable = API.graphql({
        query: onDeleteMeetingModelByOwner,
        variables,
      });

      if (observable instanceof Observable) {
        const subscription = (observable as Observable<PayloadType<OnDeleteMeetingModelByOwnerSubscription>>).subscribe(
          {
            next: (payload) => {
              const result = payload.value.data?.onDeleteMeetingModelByOwner;
              if (result) {
                /**
                 * Remove the specific item
                 */
                queryClient.removeQueries([MEETINGS_QUERY_KEY, result.id], { exact: true });

                /**
                 * Search and remove the specific item in the list
                 */
                queryClient.setQueryData<MeetingsListCacheType | undefined>(
                  [MEETINGS_QUERY_KEY],
                  (meetingsListResults) => {
                    const updated = produce(meetingsListResults, (draftList) => {
                      draftList?.pages?.forEach((page) => {
                        page?.items?.forEach((item, index) => {
                          if (item?.id === result.id && page.items?.[index]) {
                            page.items.splice(index, 1);
                          }
                        });
                      });

                      return draftList;
                    });
                    return updated;
                  }
                );
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

export default MeetingDeleteWatcher;
