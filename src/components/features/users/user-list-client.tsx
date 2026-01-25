'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { getUsers, deleteUser } from '@/lib/api/users';
import { useDebounce } from '@/hooks/use-debounce';
import { toast } from 'sonner';
import type { User } from '@/types';

export function UserListClient() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(search, 500);

  // 사용자 목록 로드
  const loadUsers = async (page: number, searchTerm: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await getUsers({
        page,
        page_size: 10,
        search: searchTerm || undefined,
      });

      setUsers(response.items);
      setCurrentPage(response.page);
      setTotalPages(response.total_pages);
    } catch (error) {
      const message = error instanceof Error ? error.message : '사용자 목록을 불러오는데 실패했습니다.';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  // 초기 로드 및 검색어 변경 시
  useEffect(() => {
    loadUsers(1, debouncedSearch);
  }, [debouncedSearch]);

  // 삭제 처리
  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await deleteUser(id);
      toast.success('사용자가 삭제되었습니다.');
      loadUsers(currentPage, debouncedSearch);
    } catch (error) {
      const message = error instanceof Error ? error.message : '사용자 삭제에 실패했습니다.';
      toast.error(message);
    }
  };

  if (error && users.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">{error}</p>
          <Button onClick={() => loadUsers(1, debouncedSearch)}>
            다시 시도
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* 검색 및 생성 버튼 */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="사용자 검색 (이름, 이메일)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={() => router.push('/users/create')}>
          <Plus className="mr-2 h-4 w-4" />
          새 사용자
        </Button>
      </div>

      {/* 사용자 목록 테이블 */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr className="bg-muted/50">
                <th className="px-6 py-3 text-left text-sm font-medium">이름</th>
                <th className="px-6 py-3 text-left text-sm font-medium">이메일</th>
                <th className="px-6 py-3 text-left text-sm font-medium">나이</th>
                <th className="px-6 py-3 text-left text-sm font-medium">생성일</th>
                <th className="px-6 py-3 text-right text-sm font-medium">작업</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    로딩 중...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    사용자가 없습니다.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-muted/50">
                    <td className="px-6 py-4 text-sm font-medium">{user.name}</td>
                    <td className="px-6 py-4 text-sm">{user.email}</td>
                    <td className="px-6 py-4 text-sm">{user.age || '-'}</td>
                    <td className="px-6 py-4 text-sm">
                      {new Date(user.created_at).toLocaleDateString('ko-KR')}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => router.push(`/users/${user.id}`)}
                      >
                        수정
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(user.id)}
                      >
                        삭제
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            총 {totalPages}페이지
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              이전
            </Button>
            <span className="flex items-center px-4 text-sm">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              다음
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
