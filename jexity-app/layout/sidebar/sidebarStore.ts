import create from 'zustand';

type SidebarStoreType = {
  toggleSidebar: boolean;
  setToggleSidebar: (sidebar: boolean) => void;
};

export const useSidebarStore = create<SidebarStoreType>((set) => ({
  toggleSidebar: false,
  setToggleSidebar: (sidebar) => set({ toggleSidebar: sidebar }),
}));
