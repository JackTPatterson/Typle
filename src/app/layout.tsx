
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

function setInitialTheme() {
  try {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      document.documentElement.setAttribute('data-theme', storedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'light'); // fallback default
    }
  } catch (e) {
    console.error('Theme error', e);
  }
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en">
    <head>
      {/* EARLY THEME SCRIPT */}
      <script
          dangerouslySetInnerHTML={{
            __html: `(${setInitialTheme.toString()})()`,
          }}
      />
    </head>
      <body className={inter.className}>
        <Header user={user} />
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
