import API from '@aws-amplify/api-graphql';
import produce from 'immer';
import { FC, useEffect } from 'react';
import { OnDeleteClientModelByOwnerSubscription, OnDeleteClientModelByOwnerSubscriptionVariables } from 'src/API';
import { onDeleteClientModelByOwner } from 'src/graphql/subscriptions';
import { getMe, useAuthStore } from 'src/modules/auth/authStore';
import { CLIENTS_QUERY_KEY } from 'src/modules/client/query-hooks/clientQueryKeys';
import { UseClientsByOwnerInfiniteQueryValue } from 'src/modules/client/query-hooks/useClientsByOwnerInfiniteQuery';
import queryClient from 'src/queryClient';
import { PayloadType } from 'src/utils/type-utils/ResultType';
import Observable from 'zen-observable-ts';

const ClientDeleteWatcher: FC = () => {
  const me = useAuthStore(getMe);

  useEffect(() => {
    let unsubscribe;
    if (me?.sub) {
      const variables: OnDeleteClientModelByOwnerSubscriptionVariables = {
        owner: me.sub,
      };
      const observable = API.graphql({
        query: onDeleteClientModelByOwner,
        variables,
      });

      if (observable instanceof Observable) {
        const subscription = (observable as Observable<PayloadType<OnDeleteClientModelByOwnerSubscription>>).subscribe({
          next: (payload) => {
            const result = payload.value.data?.onDeleteClientModelByOwner;
            if (result) {
              /**
               * Remove the specific item
               */
              queryClient.removeQueries([CLIENTS_QUERY_KEY, result.id], { exact: true });

              /**
               * Search and remove the specific item in the list
               */
              queryClient.setQueryData<UseClientsByOwnerInfiniteQueryValue | undefined>(
                [CLIENTS_QUERY_KEY],
                (clientsListResults) => {
                  const updated = produce(clientsListResults, (draftList) => {
                    draftList?.pages.forEach((page) => {
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
        });
        unsubscribe = () => subscription.unsubscribe();
      }
    }

    return unsubscribe;
  }, [me?.sub]);

  return null;
};

export default ClientDeleteWatcher;
