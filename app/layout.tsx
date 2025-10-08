import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ServiceWorker - Find Service Providers Near You",
  description: "Connect with trusted service providers within 50km radius",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
