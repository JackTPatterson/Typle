import { createClient } from "@/db/sbserver"


export const getTests = async (userId: string) => {
    const supabase = await createClient()
    const {data: tests, error: testsError} = await supabase.from('tests').select('*').eq('user', userId)
    if(testsError) return []
    return tests
}
