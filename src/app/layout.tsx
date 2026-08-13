import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/features/auth";

export const metadata: Metadata = {
  title: "Earnova — One subscription, real earning opportunities",
  description:
    "Micro-tasks, freelance jobs, and skill guides — all in one dashboard. Subscribe once, earn across ad-watching, surveys, data entry, design, development, copywriting, and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
