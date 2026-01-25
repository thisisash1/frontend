import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function UserListSkeleton() {
  return (
    <div className="space-y-4">
      {/* 검색 및 버튼 스켈레톤 */}
      <div className="flex items-center gap-4">
        <Skeleton className="flex-1 h-10 rounded-md" />
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>

      {/* 테이블 스켈레톤 */}
      <Card>
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="px-6 py-4 border-b flex items-center gap-4">
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-8 w-24" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
