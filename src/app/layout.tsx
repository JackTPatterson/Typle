

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Toaster} from "@/components/ui/toaster";
import React from "react";
import Header from "@/components/templates/Header";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

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
  const cookieStore = await cookies();
  const supabase = createServerClient(
    "https://ribcayxeubylkmwsqnef.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpYmNheXhldWJ5bGttd3NxbmVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2MTQ4NjIsImV4cCI6MjA1NDE5MDg2Mn0.6ia2H0ADkleHwzBDbuzI8UfAgaMTEWL7tc3wY1SDahI",
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );

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
