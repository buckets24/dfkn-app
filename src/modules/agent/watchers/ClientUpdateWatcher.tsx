import API from '@aws-amplify/api-graphql';
import { useToast } from '@chakra-ui/react';
import produce from 'immer';
import { FC, useEffect } from 'react';
import { OnUpdateClientModelByOwnerSubscription, OnUpdateClientModelByOwnerSubscriptionVariables } from 'src/API';
import { onUpdateClientModelByOwner } from 'src/graphql/subscriptions';
import { getMe, useAuthStore } from 'src/modules/auth/authStore';
import { CLIENTS_QUERY_KEY } from 'src/modules/client/query-hooks/clientQueryKeys';
import { UseClientByIdQueryValue } from 'src/modules/client/query-hooks/useClientByIdQuery';
import { UseClientsByOwnerInfiniteQueryValue } from 'src/modules/client/query-hooks/useClientsByOwnerInfiniteQuery';
import queryClient from 'src/queryClient';
import { PayloadType } from 'src/utils/type-utils/ResultType';
import Observable from 'zen-observable-ts';

const ClientUpdateWatcher: FC = () => {
  const me = useAuthStore(getMe);
  const toast = useToast();

  useEffect(() => {
    let unsubscribe;
    if (me?.sub) {
      const variables: OnUpdateClientModelByOwnerSubscriptionVariables = {
        owner: me.sub,
      };
      const observable = API.graphql({
        query: onUpdateClientModelByOwner,
        variables,
      });

      if (observable instanceof Observable) {
        const subscription = (observable as Observable<PayloadType<OnUpdateClientModelByOwnerSubscription>>).subscribe({
          next: async (payload) => {
            const result = payload.value.data?.onUpdateClientModelByOwner;
            if (result) {
              /**
               * Update item data
               */
              queryClient.setQueryData<UseClientByIdQueryValue>([CLIENTS_QUERY_KEY, result.id], result);

              /**
               * Update list data
               */
              queryClient.setQueryData<UseClientsByOwnerInfiniteQueryValue | undefined>(
                [CLIENTS_QUERY_KEY],
                (clientsListResults) => {
                  const updated = produce(clientsListResults, (draftList) => {
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
                }
              );
            }
          },
        });
        unsubscribe = () => subscription.unsubscribe();
      }
    }

    return unsubscribe;
  }, [me?.sub, toast]);

  return null;
};

export default ClientUpdateWatcher;
