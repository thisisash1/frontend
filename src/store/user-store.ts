import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { User } from '@/types';

interface UserState {
  // 상태
  users: User[];
  selectedUser: User | null;
  isLoading: boolean;
  error: string | null;

  // 페이지네이션
  currentPage: number;
  totalPages: number;
  totalCount: number;

  // 액션
  setUsers: (users: User[]) => void;
  setSelectedUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setPagination: (pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
  }) => void;
  reset: () => void;
}

const initialState = {
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalCount: 0,
};

export const useUserStore = create<UserState>()(
  devtools(
    (set) => ({
      ...initialState,

      setUsers: (users) => set({ users }),

      setSelectedUser: (user) => set({ selectedUser: user }),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      setPagination: (pagination) => set(pagination),

      reset: () => set(initialState),
    }),
    { name: 'UserStore' }
  )
);
