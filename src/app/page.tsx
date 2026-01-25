import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, LayoutDashboard, FormInput, Table } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-8">
      {/* 헤더 */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Next.js 스타터 킷</h1>
        <p className="text-lg text-muted-foreground">
          Next.js v15 + TypeScript + Tailwind CSS + shadcn/ui로 만든 모던 스타터 프로젝트
        </p>
      </div>

      {/* 소개 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 사용자 관리 */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6" />
              <CardTitle>사용자 관리</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              백엔드 API와 연동된 사용자 CRUD 기능을 보여주는 예제입니다.
            </p>
            <Link href="/users">
              <Button className="w-full">사용자 관리 보기</Button>
            </Link>
          </CardContent>
        </Card>

        {/* 대시보드 */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <LayoutDashboard className="h-6 w-6" />
              <CardTitle>대시보드</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              차트와 통계를 포함한 대시보드 레이아웃 예제입니다.
            </p>
            <Link href="/dashboard">
              <Button className="w-full">대시보드 보기</Button>
            </Link>
          </CardContent>
        </Card>

        {/* 폼 예제 */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FormInput className="h-6 w-6" />
              <CardTitle>폼 예제</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              React Hook Form + Zod를 사용한 폼 검증 예제입니다.
            </p>
            <Link href="/examples/forms">
              <Button className="w-full">폼 예제 보기</Button>
            </Link>
          </CardContent>
        </Card>

        {/* 테이블 예제 */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Table className="h-6 w-6" />
              <CardTitle>테이블 예제</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              정렬, 필터링, 페이지네이션 기능이 있는 테이블 예제입니다.
            </p>
            <Link href="/examples/tables">
              <Button className="w-full">테이블 예제 보기</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* 주요 기능 */}
      <Card>
        <CardHeader>
          <CardTitle>주요 기능</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Next.js 15 App Router</li>
            <li>TypeScript 엄격한 타입 체크</li>
            <li>Tailwind CSS + shadcn/ui</li>
            <li>Zustand 상태 관리</li>
            <li>백엔드 API 연동</li>
            <li>다크모드 지원</li>
            <li>반응형 레이아웃</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
