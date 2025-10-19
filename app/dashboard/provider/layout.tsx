'use client';

import { AuthProvider } from '@/components/AuthProvider';

export default function ProviderDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
