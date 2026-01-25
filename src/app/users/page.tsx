import { Suspense } from 'react';
import { UserListClient } from '@/components/features/users/user-list-client';
import { UserListSkeleton } from '@/components/features/users/user-list-skeleton';

export const metadata = {
  title: '사용자 관리',
  description: '사용자 목록 조회, 수정, 삭제',
};

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">사용자 관리</h1>
      </div>

      <Suspense fallback={<UserListSkeleton />}>
        <UserListClient />
      </Suspense>
    </div>
  );
}
