import DashboardLayout from 'jexity-app/layout/DashboardLayout';
import { GetLayout } from 'jexity-app/layout/layoutApi';
import React, { FC } from 'react';
import ClientCreateWatcher from 'src/modules/agent/watchers/ClientCreateWatcher';
import ClientDeleteWatcher from 'src/modules/agent/watchers/ClientDeleteWatcher';
import ClientUpdateWatcher from 'src/modules/agent/watchers/ClientUpdateWatcher';
import MeetingCreateWatcher from 'src/modules/meetings/watchers/MeetingCreateWatcher';
import MeetingDeleteWatcher from 'src/modules/meetings/watchers/MeetingDeleteWatcher';
import MeetingUpdateWatcher from 'src/modules/meetings/watchers/MeetingUpdateWatcher';
import Header from 'src/views/common/Header';
import { AuthGuard } from '../common/AuthGuard';
import AgentSidebar from './AgentSidebar';

const AgentLayout: FC = ({ children }) => {
  return (
    <AuthGuard>
      <ClientCreateWatcher />
      <ClientUpdateWatcher />
      <ClientDeleteWatcher />

      <MeetingCreateWatcher />
      <MeetingUpdateWatcher />
      <MeetingDeleteWatcher />

      <DashboardLayout header={<Header />} sidebar={<AgentSidebar />}>
        {children}
      </DashboardLayout>
    </AuthGuard>
  );
};

export const getAgentLayout: GetLayout = (page) => <AgentLayout>{page}</AgentLayout>;

// noinspection JSUnusedGlobalSymbols
export default AgentLayout;
