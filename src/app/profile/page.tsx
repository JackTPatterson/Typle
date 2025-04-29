'use server'

import { createClient } from '@/db/sbserver'
import { ProfilePage } from './ProfilePage'
import { redirect } from 'next/navigation'
import { getTests } from '@/lib/tests'


export default async function Page() {
  const supabase = await createClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  const streak = (await supabase.from('profiles').select('streak_length').eq('id', user?.id).single()).data?.streak_length ?? 0

  // If no user is logged in, redirect to login page
  if (!user) {
    redirect('/login?redirect=/profile')
  }

  const stats = await getTests(user.id)



  return <ProfilePage user={user} stats={stats} streak={streak}/>
}
