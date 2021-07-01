import API from '@aws-amplify/api-graphql';
import produce from 'immer';
import { FC, useEffect } from 'react';
import { OnCreateClientModelByOwnerSubscription, OnCreateClientModelByOwnerSubscriptionVariables } from 'src/API';
import { onCreateClientModelByOwner } from 'src/graphql/subscriptions';
import { getMe, useAuthStore } from 'src/modules/auth/authStore';
import queryClient from 'src/queryClient';
import { PayloadType } from 'src/utils/type-utils/ResultType';
import Observable from 'zen-observable-ts';
import { CLIENTS_QUERY_KEY } from 'src/modules/client/query-hooks/clientQueryKeys';
import { UseClientByIdQueryValue } from 'src/modules/client/query-hooks/useClientByIdQuery';
import { UseClientsByOwnerInfiniteQueryValue } from 'src/modules/client/query-hooks/useClientsByOwnerInfiniteQuery';

const ClientCreateWatcher: FC = () => {
  const me = useAuthStore(getMe);

  useEffect(() => {
    let unsubscribe;
    if (me?.sub) {
      const variables: OnCreateClientModelByOwnerSubscriptionVariables = {
        owner: me.sub,
      };
      const observable = API.graphql({
        query: onCreateClientModelByOwner,
        variables,
      });

      if (observable instanceof Observable) {
        const subscription = (observable as Observable<PayloadType<OnCreateClientModelByOwnerSubscription>>).subscribe({
          next: (payload) => {
            const result = payload.value.data?.onCreateClientModelByOwner;

            if (result) {
              /**
               * Push a new cache item data
               */
              queryClient.setQueryData<UseClientByIdQueryValue>([CLIENTS_QUERY_KEY, result.id], result);

              /**
               * Push the new item to the first page
               */
              queryClient.setQueryData<UseClientsByOwnerInfiniteQueryValue | undefined>(
                [CLIENTS_QUERY_KEY],
                (clientsListResults) => {
                  const updated = produce(clientsListResults, (draftList) => {
                    draftList?.pages[0]?.items?.unshift(result);
                    return draftList;
                  });
                  return updated;
                }
              );
            }
          },
        });
        unsubscribe = () => subscription.unsubscribe();
      }
    }

    return unsubscribe;
  }, [me?.sub]);

  return null;
};

export default ClientCreateWatcher;
