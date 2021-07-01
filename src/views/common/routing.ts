import { NextRouter } from 'next/router';

export function gotoLogin(router: NextRouter): void {
  if (router.pathname !== '/login') {
    void router.push('/login');
  }
}

export function gotoAgentHome(router: NextRouter): void {
  if (router.pathname !== '/agent') {
    void router.push('/agent');
  }
}

export function gotoClientHome(router: NextRouter): void {
  if (router.pathname !== '/client') {
    void router.push('/client');
  }
}

export function gotoAdminHome(router: NextRouter): void {
  if (router.pathname !== '/admin') {
    void router.push('/admin');
  }
}

export function gotoAgentClients(router: NextRouter): void {
  if (router.pathname !== '/agent/clients') {
    void router.push('/agent/clients');
  }
}

export function gotoAgentSpecificClient(router: NextRouter, clientId: string): void {
  if (router.pathname !== '/agent/clients/[id]') {
    void router.push(`/agent/clients/${clientId}`);
  }
}

export function gotoAgentSpecificClientDocuments(router: NextRouter, clientId: string): void {
  if (router.pathname !== '/agent/clients/[id]/documents') {
    void router.push(`/agent/clients/${clientId}/documents`);
  }
}

export function gotoAgentMeetings(router: NextRouter): void {
  if (router.pathname !== '/agent/meetings') {
    void router.push('/agent/meetings');
  }
}
