'use client'

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import {Toaster} from "@/components/ui/toaster";
import React from "react";
import {Header} from "@/components/templates/Header";

const poppins = Poppins({
  subsets: ["latin"],
    weight: ['200', '300', '400', '500', '600', '700']
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
      <Header/>
        {children}
        <Toaster/>

      </body>
    </html>
  );
}
