import { createContext, useContext } from 'react';

export interface Measurements {
  height?: number;
  width?: number;
}

export const MeasuredBoxContext = createContext<Measurements>({});

export const useMeasuredBox = (): Measurements => useContext(MeasuredBoxContext);
