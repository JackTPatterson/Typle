'use server'

import { createClient } from '@/db/sbserver'
import { ProfilePage } from './ProfilePage'
import { redirect } from 'next/navigation'

interface TypingStats {
  wpm: number
  accuracy: number
  timestamp: string
  testType: string
}

interface TypingResult {
  wpm: number
  accuracy: number
  created_at: string
  test_type: string
}

export default async function Page() {
  const supabase = await createClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()

  // If no user is logged in, redirect to login page
  if (!user) {
    redirect('/login?redirect=/profile')
  }

  // Get typing test results
  const { data: results } = await supabase
    .from('typing_results')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  // Transform the results into the format expected by the ProfilePage component
  const stats: TypingStats[] = results ? results.map((result: TypingResult) => ({
    wpm: result.wpm,
    accuracy: result.accuracy,
    timestamp: new Date(result.created_at).toLocaleDateString(),
    testType: result.test_type
  })) : []

  return <ProfilePage user={user} stats={stats} />
}
