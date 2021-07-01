import API from '@aws-amplify/api-graphql';
import produce from 'immer';
import { FC, useEffect } from 'react';
import { OnCreateAgentModelSubscription } from 'src/API';
import { onAgentCreate } from 'src/graphql/customQueries';
import { AGENTS_QUERY_KEY } from 'src/modules/agent/query-hooks/agentQueryKeys';
import { UseAgentByIdQueryValue } from 'src/modules/agent/query-hooks/useAgentByIdQuery';
import { UseAgentsInfiniteQueryValue } from 'src/modules/agent/query-hooks/useAgentsInfiniteQuery';
import queryClient from 'src/queryClient';
import { PayloadType } from 'src/utils/type-utils/ResultType';
import Observable from 'zen-observable-ts';

const AgentCreateWatcher: FC = () => {
  useEffect(() => {
    let unsubscribe;
    const observable = API.graphql({
      query: onAgentCreate,
    });

    if (observable instanceof Observable) {
      const subscription = (observable as Observable<PayloadType<OnCreateAgentModelSubscription>>).subscribe({
        next: (payload) => {
          const result = payload.value.data?.onCreateAgentModel;

          if (result) {
            /**
             * Push a new cache item data
             */
            queryClient.setQueryData<UseAgentByIdQueryValue>([AGENTS_QUERY_KEY, result.id], result);

            /**
             * Push the new item to the first page
             */
            queryClient.setQueryData<UseAgentsInfiniteQueryValue | undefined>(
              [AGENTS_QUERY_KEY],
              (agentsListResults) => {
                const updated = produce(agentsListResults, (draftList) => {
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

    return unsubscribe;
  }, []);

  return null;
};

export default AgentCreateWatcher;
