import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { Toaster } from 'sonner';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Next.js Starter Kit',
  description: 'Next.js v15 + TypeScript + Tailwind CSS + shadcn/ui 스타터 킷',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen">
            {/* 사이드바 */}
            <Sidebar />

            {/* 메인 콘텐츠 */}
            <div className="flex-1 flex flex-col">
              <Header />
              <main className="flex-1 p-6 bg-background">
                {children}
              </main>
            </div>
          </div>

          {/* 토스트 알림 */}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
