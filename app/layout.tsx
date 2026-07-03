import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "./providers/AuthProvider";

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
        </AuthProvider>
      </body>
    </html>
  );
}