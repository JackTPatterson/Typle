'use client'

import Link from "next/link";
import React from "react";

export default function Home() {
  return (
      <div className="flex flex-col min-h-screen  mx-auto">

        <div className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 mx-auto">
            <div className="px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Welcome to Typle
                  </h1>
                  <p className="mx-auto max-w-[700px] opacity-75 md:text-xl dark:text-gray-400 mt-2">
                    The best app for daily typing practice.
                  </p>
                </div>
                <div className="space-x-4">
                  <Link
                      href="/test"
                      className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:opacity-75 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                      prefetch={false}
                  >
                    Take a Test
                  </Link>

                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
  );
}
