import { createContext, Dispatch, SetStateAction, useContext } from 'react';

interface FullscreenContextValue {
  fullscreen: boolean;
  setFullscreen: Dispatch<SetStateAction<boolean>>;
}

const defaultFullscreenContextValue: FullscreenContextValue = {
  fullscreen: false,
  setFullscreen: () => {
    return;
  },
};

const FullscreenContext = createContext<FullscreenContextValue>(defaultFullscreenContextValue);

export const FullScreenProvider = FullscreenContext.Provider;

export const useFullscreenContext = (): FullscreenContextValue => useContext(FullscreenContext);
