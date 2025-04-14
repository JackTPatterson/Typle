
import {TestPage} from "@/app/test/TestPage";
import type {Metadata} from "next";
import {getUser} from "@/lib/auth";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const metadata: Metadata = {
    title: "Test Page",
};


const isBenchmark = async () => {
    const user = await getUser(true)
    return user?.tests?.length === 0
}

const getUserLevel = async (user: any) => {
    const user_level: "Beginner" | "Intermediate" | "Expert" = user?.skill_level
    return user_level
}

const prompt = async (user: any) => {
    const user_level = await getUserLevel(user)
    console.log(user_level)
    if(await isBenchmark()){
        const response = await axios.get('http://192.168.1.177:8000/prompt/benchmark')
        return response.data.prompt
    }
    else{
        const response = await axios.get(`http://192.168.1.177:8000/prompt/${user_level?.toLowerCase()}`)
        return response.data.prompt
    }

}

const hasUserCompletedDailyChallenge = async (user: any) => {
    const tests = user?.tests
    const today = new Date()
    const today_date = today.toISOString().split('T')[0]

    const completed_today = tests?.filter((test: any) => new Date(test.completion_date).toISOString().split('T')[0] === today_date)

    return completed_today?.length > 0
}


export default async function Login(){
    const user = await getUser(true)
    const user_id = user?.id
    const is_benchmark = await isBenchmark()
    const has_completed_daily_challenge = await hasUserCompletedDailyChallenge(user)

    if(has_completed_daily_challenge){
        return <div className={'h-screen flex items-center justify-center w-1/2 mx-auto -mt-48'}>
            <Alert variant={'destructive'}>
                <AlertTitle>Daily Challenge Completed</AlertTitle>
                <AlertDescription>
                    You have already completed your test for today. Come back tomorrow for a new challenge!
                </AlertDescription>
            </Alert>
        </div>
    }

    return <div className={'h-screen'}>
        <TestPage user={user_id} prompt={await prompt(user)} is_benchmark={is_benchmark} has_completed_daily_challenge={has_completed_daily_challenge}/>
    </div>
}
