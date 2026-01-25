import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UiState {
  // 사이드바 상태
  isSidebarOpen: boolean;
  isSidebarCollapsed: boolean;

  // 모달 상태
  isDialogOpen: boolean;
  dialogContent: React.ReactNode | null;

  // 액션
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  toggleSidebarCollapse: () => void;
  openDialog: (content: React.ReactNode) => void;
  closeDialog: () => void;
}

export const useUiStore = create<UiState>()(
  devtools(
    persist(
      (set) => ({
        isSidebarOpen: true,
        isSidebarCollapsed: false,
        isDialogOpen: false,
        dialogContent: null,

        toggleSidebar: () =>
          set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

        setSidebarOpen: (isOpen) =>
          set({ isSidebarOpen: isOpen }),

        toggleSidebarCollapse: () =>
          set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),

        openDialog: (content) =>
          set({ isDialogOpen: true, dialogContent: content }),

        closeDialog: () =>
          set({ isDialogOpen: false, dialogContent: null }),
      }),
      {
        name: 'ui-storage',
        // 사이드바 상태만 localStorage에 저장
        partialize: (state) => ({
          isSidebarCollapsed: state.isSidebarCollapsed,
        }),
      }
    ),
    { name: 'UiStore' }
  )
);
