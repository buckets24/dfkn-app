import { useContext, createContext } from 'react';

/**
 * THIS FILE IS NOT IN USE, but I imagined a use case
 * for it but dropped the idea for now.
 *
 * Maybe should be provided by the theme instead,
 * if it is in the theme it can be server side rendered.
 * This is a shortcut
 */

export interface DashboardLayoutValue {
  headerHeight: string;
  sidebarWidth: string;
}
export const DashboardLayoutContext = createContext<DashboardLayoutValue>({
  headerHeight: '64px',
  sidebarWidth: '280px',
});

export const useDashboardLayout = (): DashboardLayoutValue => useContext(DashboardLayoutContext);
