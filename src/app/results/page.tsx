import {LoginForm} from "@/app/(auth)/login/LoginPage";
import {KeyboardIcon} from "lucide-react";
import React from "react";
import type {Metadata} from "next";
import {TypingAnimation} from "@/components/ui/typing-animation";
import {ResultsPage} from "@/app/test/ResultsPage";
import {Header} from "@/components/templates/Header";

export const metadata: Metadata = {
    title: "Results",
};


export default function Login(){
    return <div className={'h-screen'}>
        <Header/>
        <ResultsPage/>
    </div>
}
