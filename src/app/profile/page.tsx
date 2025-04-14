'use server'

import { createClient } from '@/db/sbserver'
import { ProfilePage } from './ProfilePage'
import { redirect } from 'next/navigation'
import { getTests } from '@/lib/tests'


export default async function Page() {
  const supabase = await createClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()

  // If no user is logged in, redirect to login page
  if (!user) {
    redirect('/login?redirect=/profile')
  }

  const stats = await getTests(user.id)



  return <ProfilePage user={user} stats={stats}/>
}
