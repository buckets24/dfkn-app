import { MutableRefObject } from 'react';
import create from 'zustand';

export enum DocumentGuideSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

type DocumentGuidePosition = {
  scrollElRef: MutableRefObject<HTMLDivElement | null>;
  coverElRef: MutableRefObject<HTMLDivElement | null>;
  currentActive: string | undefined;
  setCurrentActive: (name: string | undefined) => void;
  showGuide: boolean;
  toggleShowGuide: () => void;
  size: DocumentGuideSize;
  setSize: (size: DocumentGuideSize) => void;
};

const useDocumentGuidePosition = create<DocumentGuidePosition>((set, get) => ({
  scrollElRef: { current: null },
  coverElRef: { current: null },
  currentActive: undefined,
  setCurrentActive: (name) => {
    const currentName = get().currentActive;
    if (name !== currentName) {
      set({
        currentActive: name,
      });
    }
  },
  showGuide: false,
  toggleShowGuide: () => set({ showGuide: !get().showGuide }),
  size: DocumentGuideSize.SMALL,
  setSize: (size) => {
    const currentSize = get().size;
    if (size !== currentSize) {
      set({
        size: size,
      });
    }
  },
}));

export default useDocumentGuidePosition;
