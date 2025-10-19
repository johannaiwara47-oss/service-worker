'use client';

import { AuthProvider } from '@/components/AuthProvider';

export default function ProviderSetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
