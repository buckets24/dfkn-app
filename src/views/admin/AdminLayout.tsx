import DashboardLayout from 'jexity-app/layout/DashboardLayout';
import { GetLayout } from 'jexity-app/layout/layoutApi';
import dynamic from 'next/dynamic';
import React, { FC } from 'react';
import Header from 'src/views/common/Header';
import { AuthGuard } from '../common/AuthGuard';
import AdminSidebar from './AdminSidebar';

const AgentCreateWatcher = dynamic(() => import('src/modules/admin/watchers/AgentCreateWatcher'), { ssr: false });
const AgentUpdateWatcher = dynamic(() => import('src/modules/admin/watchers/AgentUpdateWatcher'), { ssr: false });
const AgentDeleteWatcher = dynamic(() => import('src/modules/admin/watchers/AgentDeleteWatcher'), { ssr: false });

const AdminLayout: FC = ({ children }) => {
  return (
    <AuthGuard>
      <AgentCreateWatcher />
      <AgentUpdateWatcher />
      <AgentDeleteWatcher />
      <DashboardLayout header={<Header />} sidebar={<AdminSidebar />}>
        {children}
      </DashboardLayout>
    </AuthGuard>
  );
};

export const getAdminLayout: GetLayout = (page) => <AdminLayout>{page}</AdminLayout>;

// noinspection JSUnusedGlobalSymbols
export default AdminLayout;
