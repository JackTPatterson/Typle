import {LoginForm} from "@/app/(auth)/login/LoginPage";

import React from "react";
import type {Metadata} from "next";
import {TypingAnimation} from "@/components/ui/typing-animation";
import {AnimatedGridPattern} from "@/components/ui/AnimatedGridPattern";
import { cn } from "@/lib/utils";
export const metadata: Metadata = {
    title: "Login",
};


export default function Login(){
    return <div className="grid min-h-svh lg:grid-cols-2 overflow-hidden">
        <div className="flex flex-col gap-4 p-6 md:p-10">
            <div className="flex flex-1 items-center justify-center">
                <div className="w-full max-w-md">
                    <LoginForm/>
                </div>
            </div>
        </div>
        <div className="relative hidden bg-muted lg:block bg-blue-100">
        <div className="relative flex h-screen w-full items-center justify-center overflow-hidden rounded-lg bg-background p-20">
            <AnimatedGridPattern
                numSquares={30}
                maxOpacity={0.1}
                duration={3}
                repeatDelay={1}
                className={cn(
                "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                "inset-x-0 inset-y-[-30%] h-full skew-y-12",
                )}
            />
        </div>
            <TypingAnimation className={'absolute lg:left-16 xl:left-32 lg:max-w-sm xl:max-w-lg !leading-snug top-40 text-left '} >Take today&apos;s typing challenge. You only get one shot per day, so make it count!</TypingAnimation>
        </div>

    </div>
}
