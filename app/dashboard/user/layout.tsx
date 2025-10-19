'use client';

import { AuthProvider } from '@/components/AuthProvider';

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
