import {LoginForm} from "@/app/(auth)/login/LoginPage";
import {KeyboardIcon} from "lucide-react";
import React from "react";
import type {Metadata} from "next";
import {TypingAnimation} from "@/components/ui/typing-animation";

export const metadata: Metadata = {
    title: "Login",
};


export default function Login(){
    return <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
            <div className="flex flex-1 items-center justify-center">
                <div className="w-full max-w-md">
                    <LoginForm/>
                </div>
            </div>
        </div>
        <div className="relative hidden bg-muted lg:block bg-blue-100">
            <TypingAnimation className={'absolute lg:left-16 xl:left-32 lg:max-w-sm xl:max-w-lg leading-10 top-40 text-left '} >Take today&apos;s typing challenge. You only get one shot per day, so make it count!</TypingAnimation>
        </div>

    </div>
}
