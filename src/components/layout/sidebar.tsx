'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useUiStore } from '@/store/ui-store';
import {
  Home,
  Users,
  LayoutDashboard,
  FileText,
  Table,
} from 'lucide-react';

// 네비게이션 메뉴
const menuItems = [
  {
    title: '홈',
    href: '/',
    icon: Home,
  },
  {
    title: '대시보드',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: '사용자 관리',
    href: '/users',
    icon: Users,
  },
  {
    title: '예제',
    icon: FileText,
    children: [
      {
        title: '폼 예제',
        href: '/examples/forms',
      },
      {
        title: '테이블 예제',
        href: '/examples/tables',
      },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isSidebarOpen, isSidebarCollapsed } = useUiStore();

  if (!isSidebarOpen) return null;

  return (
    <aside
      className={cn(
        'border-r bg-background transition-all duration-300',
        isSidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <nav className="space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          if (item.children) {
            return (
              <div key={item.title} className="space-y-1">
                <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground">
                  <Icon className="h-5 w-5" />
                  {!isSidebarCollapsed && <span>{item.title}</span>}
                </div>
                {!isSidebarCollapsed && (
                  <div className="ml-6 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent',
                          pathname === child.href
                            ? 'bg-accent text-accent-foreground'
                            : 'text-muted-foreground'
                        )}
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href!}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent',
                isActive
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              {!isSidebarCollapsed && <span>{item.title}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
