import API from '@aws-amplify/api-graphql';
import { FC, useEffect } from 'react';
import 'src/AmplifyConfig';
import { OnUpdateMeetingModelByEditorsSubscription, OnUpdateMeetingModelByEditorsSubscriptionVariables } from 'src/API';
import { onUpdateMeetingModelByEditors } from 'src/graphql/subscriptions';
import { getMe, useAuthStore } from 'src/modules/auth/authStore';
import queryClient from 'src/queryClient';
import { PayloadType } from 'src/utils/type-utils/ResultType';
import Observable from 'zen-observable-ts';
import { MeetingModelComplete } from '../api/MeetingModel';
import { MEETINGS_QUERY_KEY } from '../query-hooks/meetingQueryKeys';
import useMeetingByIdQuery from '../query-hooks/useMeetingByIdQuery';

const ActiveMeetingWatcher: FC<{ meeting: MeetingModelComplete }> = ({ meeting }) => {
  const me = useAuthStore(getMe);

  useEffect(() => {
    let unsubscribe;

    if (me?.sub) {
      if (meeting.editors) {
        const variables: OnUpdateMeetingModelByEditorsSubscriptionVariables = {
          editors: meeting.editors,
        };

        const observable = API.graphql({
          query: onUpdateMeetingModelByEditors,
          variables,
        });

        if (observable instanceof Observable) {
          const subscription = (observable as Observable<
            PayloadType<OnUpdateMeetingModelByEditorsSubscription>
          >).subscribe({
            next: (payload) => {
              const result = payload.value.data?.onUpdateMeetingModelByEditors;
              if (result) {
                queryClient.setQueryData<ReturnType<typeof useMeetingByIdQuery>['data']>(
                  [MEETINGS_QUERY_KEY, result.id],
                  result
                );
              }
            },
          });
          unsubscribe = () => subscription.unsubscribe();
        }
      }
    }

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meeting, me?.sub]);

  return null;
};

export default ActiveMeetingWatcher;
