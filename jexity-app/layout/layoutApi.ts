import { ReactNode } from 'react';

export type GetLayout = (page: ReactNode) => ReactNode;

export interface HasLayout {
  getLayout?: GetLayout;
}
