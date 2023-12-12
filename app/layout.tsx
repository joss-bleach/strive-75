import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Providers
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/providers/modal-provider";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Strive75",
  description:
    "Track & Conquer 75 Hard Challenge Progress - Stay Accountable & Motivated | A web portfolio project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={font.className} suppressHydrationWarning>
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
