
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Toaster} from "@/components/ui/toaster";
import React from "react";
import Header from "@/components/templates/Header";
import { createClient } from "@/db/sbserver";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Typle",
  description: "Learn to type faster",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header user={user} />
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
