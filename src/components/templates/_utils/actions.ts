'use server'

import {createClient} from "@/db/sbserver";

export const getUser = async() => {
    const supabase = await createClient()

    const {data, error} = await supabase.auth.getUser()

    return data;

}
