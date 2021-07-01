import API from '@aws-amplify/api-graphql';
import produce from 'immer';
import { FC, useEffect } from 'react';
import { OnDeleteAgentModelSubscription } from 'src/API';
import { onAgentDelete } from 'src/graphql/customQueries';
import { AGENTS_QUERY_KEY } from 'src/modules/agent/query-hooks/agentQueryKeys';
import { UseAgentsInfiniteQueryValue } from 'src/modules/agent/query-hooks/useAgentsInfiniteQuery';
import queryClient from 'src/queryClient';
import { PayloadType } from 'src/utils/type-utils/ResultType';
import Observable from 'zen-observable-ts';

const AgentDeleteWatcher: FC = () => {
  useEffect(() => {
    /**
     * TODO
     * Need to figure out. Probably we'll need to dynamic import a component that will act as a handler.
     * Set SSR to false for that component handler. And setState from that.
     */
    let unsubscribe;
    /**
     * Initialize subscriptions
     *
     * Known typing issues raised on github
     * https://github.com/aws-amplify/amplify-js/issues/5741
     */
    const observable = API.graphql({
      query: onAgentDelete,
    });

    if (observable instanceof Observable) {
      const subscription = (observable as Observable<PayloadType<OnDeleteAgentModelSubscription>>).subscribe({
        next: (payload) => {
          const result = payload.value.data?.onDeleteAgentModel;
          if (result) {
            /**
             * Remove the specific item
             */
            queryClient.removeQueries([AGENTS_QUERY_KEY, result.id], { exact: true });

            /**
             * Search and remove the specific item in the list
             */
            queryClient.setQueryData<UseAgentsInfiniteQueryValue | undefined>(
              [AGENTS_QUERY_KEY],
              (agentsListResults) => {
                const updated = produce(agentsListResults, (draftList) => {
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

    return unsubscribe;
  }, []);

  return null;
};

export default AgentDeleteWatcher;
