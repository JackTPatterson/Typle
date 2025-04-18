'use server'

import {createClient} from "@/db/sbserver";

export const registerUser = async (email: string, password: string) => {
    const supabase = await createClient();
    return await supabase.auth.signUp({
        email,
        password
    })
}
