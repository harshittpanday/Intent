import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "./providers/AuthProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "INTENT",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}