import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ahmad Hossamo - Full Stack Developer Portfolio",
  description:
    "Full Stack Developer specializing in React, Next.js, and modern web technologies. View my projects, skills, and experience.",
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Web Development",
    "Portfolio",
  ],
  authors: [{ name: "Ahmad Hossamo" }],
  creator: "Ahmad Hossamo",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "Ahmad Hossamo - Full Stack Developer Portfolio",
    description:
      "Full Stack Developer specializing in React, Next.js, and modern web technologies.",
    siteName: "Ahmad Hossamo Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmad Hossamo - Full Stack Developer Portfolio",
    description:
      "Full Stack Developer specializing in React, Next.js, and modern web technologies.",
    creator: "@yourusername",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
