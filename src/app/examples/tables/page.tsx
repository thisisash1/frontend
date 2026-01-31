'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronUp, ChevronDown } from 'lucide-react';

// 샘플 데이터 타입
interface DataItem {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
}

// 샘플 데이터
const sampleData: DataItem[] = [
  { id: 1, name: '홍길동', email: 'hong@example.com', role: '관리자', status: 'active', joinDate: '2024-01-15' },
  { id: 2, name: '김영희', email: 'kim@example.com', role: '사용자', status: 'active', joinDate: '2024-02-20' },
  { id: 3, name: '이순신', email: 'lee@example.com', role: '사용자', status: 'inactive', joinDate: '2024-03-10' },
  { id: 4, name: '박지성', email: 'park@example.com', role: '매니저', status: 'pending', joinDate: '2024-04-05' },
  { id: 5, name: '최민준', email: 'choi@example.com', role: '사용자', status: 'active', joinDate: '2024-05-12' },
  { id: 6, name: '정은정', email: 'jung@example.com', role: '사용자', status: 'active', joinDate: '2024-06-18' },
  { id: 7, name: '신동협', email: 'shin@example.com', role: '매니저', status: 'inactive', joinDate: '2024-07-22' },
  { id: 8, name: '우지현', email: 'woo@example.com', role: '사용자', status: 'active', joinDate: '2024-08-30' },
];

type SortKey = 'name' | 'email' | 'role' | 'status' | 'joinDate';
type SortOrder = 'asc' | 'desc';

export default function TablesPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [sortKey, setSortKey] = useState<SortKey>('joinDate');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 필터링 및 정렬 적용
  const filteredData = useMemo(() => {
    let result = sampleData.filter(item => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase());
      const matchesRole = !roleFilter || item.role === roleFilter;
      const matchesStatus = !statusFilter || item.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });

    // 정렬 적용
    result.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        const comparison = aVal.localeCompare(bVal);
        return sortOrder === 'asc' ? comparison : -comparison;
      }
      return 0;
    });

    return result;
  }, [search, roleFilter, statusFilter, sortKey, sortOrder]);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 정렬 토글
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  // 상태 배지 색상
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 상태 텍스트
  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return '활성';
      case 'inactive':
        return '비활성';
      case 'pending':
        return '대기중';
      default:
        return status;
    }
  };

  // 정렬 아이콘 컴포넌트
  const SortIcon = ({ columnKey }: { columnKey: SortKey }) => {
    if (sortKey !== columnKey) return null;
    return sortOrder === 'asc' ?
      <ChevronUp className="inline h-4 w-4 ml-1" /> :
      <ChevronDown className="inline h-4 w-4 ml-1" />;
  };

  return (
    <div className="space-y-8">
      {/* 헤더 */}
      <div>
        <h1 className="text-3xl font-bold">테이블 예제</h1>
        <p className="text-muted-foreground">정렬, 필터링, 페이지네이션 기능이 있는 데이터 테이블</p>
      </div>

      {/* 검색 및 필터 */}
      <Card>
        <CardHeader>
          <CardTitle>필터 및 검색</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 검색 */}
            <div>
              <label className="text-sm font-medium">이름/이메일 검색</label>
              <Input
                placeholder="검색어 입력..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="mt-2"
              />
            </div>

            {/* 역할 필터 */}
            <div>
              <label className="text-sm font-medium">역할 필터</label>
              <select
                value={roleFilter}
                onChange={(e) => {
                  setRoleFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">모든 역할</option>
                <option value="관리자">관리자</option>
                <option value="매니저">매니저</option>
                <option value="사용자">사용자</option>
              </select>
            </div>

            {/* 상태 필터 */}
            <div>
              <label className="text-sm font-medium">상태 필터</label>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">모든 상태</option>
                <option value="active">활성</option>
                <option value="inactive">비활성</option>
                <option value="pending">대기중</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 데이터 테이블 */}
      <Card>
        <CardHeader>
          <CardTitle>사용자 목록</CardTitle>
          <CardDescription>
            총 {filteredData.length}명 (페이지: {currentPage}/{totalPages})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th
                    className="px-6 py-3 text-left font-medium cursor-pointer hover:bg-muted"
                    onClick={() => handleSort('name')}
                  >
                    이름 <SortIcon columnKey="name" />
                  </th>
                  <th
                    className="px-6 py-3 text-left font-medium cursor-pointer hover:bg-muted"
                    onClick={() => handleSort('email')}
                  >
                    이메일 <SortIcon columnKey="email" />
                  </th>
                  <th
                    className="px-6 py-3 text-left font-medium cursor-pointer hover:bg-muted"
                    onClick={() => handleSort('role')}
                  >
                    역할 <SortIcon columnKey="role" />
                  </th>
                  <th
                    className="px-6 py-3 text-left font-medium cursor-pointer hover:bg-muted"
                    onClick={() => handleSort('status')}
                  >
                    상태 <SortIcon columnKey="status" />
                  </th>
                  <th
                    className="px-6 py-3 text-left font-medium cursor-pointer hover:bg-muted"
                    onClick={() => handleSort('joinDate')}
                  >
                    가입일 <SortIcon columnKey="joinDate" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                      조건에 맞는 데이터가 없습니다.
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-muted/50">
                      <td className="px-6 py-4 font-medium">{item.name}</td>
                      <td className="px-6 py-4">{item.email}</td>
                      <td className="px-6 py-4">{item.role}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(item.status)}`}>
                          {getStatusText(item.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">{item.joinDate}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
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
