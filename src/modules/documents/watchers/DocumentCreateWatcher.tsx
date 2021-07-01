import API from '@aws-amplify/api-graphql';
import { useToast } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import {
  OnCreateOnlineDocumentModelByEditorsSubscription,
  OnCreateOnlineDocumentModelByEditorsSubscriptionVariables,
} from 'src/API';
import { onCreateOnlineDocumentModelByEditors } from 'src/graphql/subscriptions';
import { getMe, useAuthStore } from 'src/modules/auth/authStore';
import queryClient from 'src/queryClient';
import { PayloadType } from 'src/utils/type-utils/ResultType';
import Observable from 'zen-observable-ts';
import { documentToastCreateDocumentSuccess } from '../documentMsg';
import { CLIENT_DOCUMENTS_QUERY_KEY, DOCUMENTS_QUERY_KEY } from '../query-hooks/documentQueryKeys';

type Editor = NonNullable<NonNullable<OnCreateOnlineDocumentModelByEditorsSubscriptionVariables['editors']>[number]>;

interface DocumentCreateWatcherProps {
  editors: Editor[];
}

const DocumentCreateWatcher: FC<DocumentCreateWatcherProps> = ({ editors }) => {
  const me = useAuthStore(getMe);
  const toast = useToast();

  useEffect(() => {
    let unsubscribe;
    if (me?.sub) {
      const variables: OnCreateOnlineDocumentModelByEditorsSubscriptionVariables = {
        editors,
      };
      const observable = API.graphql({
        query: onCreateOnlineDocumentModelByEditors,
        variables,
      });

      if (observable instanceof Observable) {
        const subscription = (observable as Observable<
          PayloadType<OnCreateOnlineDocumentModelByEditorsSubscription>
        >).subscribe({
          next: (payload) => {
            const result = payload.value.data?.onCreateOnlineDocumentModelByEditors;
            if (result) {
              toast(documentToastCreateDocumentSuccess());
              void queryClient.refetchQueries([DOCUMENTS_QUERY_KEY]);
              void queryClient.refetchQueries([CLIENT_DOCUMENTS_QUERY_KEY, result.clientId]);
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

export default DocumentCreateWatcher;
