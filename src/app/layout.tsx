import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import {Toaster} from "@/components/ui/toaster";

const poppins = Poppins({
  subsets: ["latin"],
    weight: ['200', '300', '400', '500', '600', '700']
});



export const metadata: Metadata = {
  title: {
      default: "Typle",
      template: "%s | Typle"
  },
  description: "A day by day typing challenge.",
};

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
        {children}
        <Toaster/>

      </body>
    </html>
  );
}
