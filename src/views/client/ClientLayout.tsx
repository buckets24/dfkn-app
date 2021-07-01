import DashboardLayout from 'jexity-app/layout/DashboardLayout';
import { GetLayout } from 'jexity-app/layout/layoutApi';
import React, { FC, useEffect } from 'react';
import ClientCreateWatcher from 'src/modules/agent/watchers/ClientCreateWatcher';
import ClientDeleteWatcher from 'src/modules/agent/watchers/ClientDeleteWatcher';
import ClientUpdateWatcher from 'src/modules/agent/watchers/ClientUpdateWatcher';
import { getMe, useAuthStore } from 'src/modules/auth/authStore';
import Header from 'src/views/common/Header';
import { AuthGuard } from '../common/AuthGuard';
import ClientSidebar from './ClientSidebar';

const ClientLayout: FC = ({ children }) => {
  const me = useAuthStore(getMe);

  useEffect(() => {
    if (me?.sub) {
      /**
       * TODO
       * It is not ideal to request every meeting and client.
       * Usually this should be only loaded when a sub page is opened.
       * But for now we'll put it here to make it asap and avoid unexpected
       * behaviors.
       */
      // noinspection JSIgnoredPromiseFromCall
      // requestClientsByOwner(me?.sub);
      /**
       * TODO
       * Replace this with the query of the AgentModelWithMeetings, see customQueries
       */
      // noinspection JSIgnoredPromiseFromCall
      // requestMeetings();
    }
  }, [me?.sub]);

  return (
    <AuthGuard>
      <ClientCreateWatcher />
      <ClientUpdateWatcher />
      <ClientDeleteWatcher />

      <DashboardLayout header={<Header />} sidebar={<ClientSidebar />}>
        {children}
      </DashboardLayout>
    </AuthGuard>
  );
};

export const getClientLayout: GetLayout = (page) => <ClientLayout>{page}</ClientLayout>;

// noinspection JSUnusedGlobalSymbols
export default ClientLayout;
