"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User } from "@supabase/supabase-js"
import { createBrowserClient } from "@supabase/ssr"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserCircle, Bell } from "lucide-react"

interface HeaderProps {
  user: User | null
}

export default function Header({ user }: HeaderProps) {
  const pathname = usePathname()
  const supabase = createBrowserClient(
    "https://ribcayxeubylkmwsqnef.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpYmNheXhldWJ5bGttd3NxbmVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2MTQ4NjIsImV4cCI6MjA1NDE5MDg2Mn0.6ia2H0ADkleHwzBDbuzI8UfAgaMTEWL7tc3wY1SDahI"
  )

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Typle</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">

            <Link
              href="/test"
              className={`text-sm transition-colors hover:text-gray-600 ${
                pathname === "/test" ? "text-gray-900" : "text-gray-500"
              }`}
            >
              Take Todays Test
            </Link>

          </nav>
        </div>

        <div className="flex items-center space-x-4">

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <UserCircle />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="ghost">
              <Link href="/login">Sign in</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
