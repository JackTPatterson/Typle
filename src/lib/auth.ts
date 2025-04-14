'use server'

import {createClient} from "@/db/sbserver"
import {getTests} from "@/lib/tests"

export const getUser = async (withTests: boolean = false) => {
    const supabase = await createClient()
    const {data: {user}, error: userError} = await supabase.auth.getUser()
    const {data: userData, error: userDataError} = await supabase.from('profiles').select('*').eq('id', user?.id).single()
    if(!user || !userData || userError || userDataError) return null
    return {
        ...userData,
        ...user,
        ...(withTests ? {tests: await getTests(userData.id)} : {})
    }
}
