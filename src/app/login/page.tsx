import {LoginForm} from "@/app/login/LoginPage";
import {KeyboardIcon} from "lucide-react";
import React from "react";

export default function Login(){
    return <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
            <div className="flex justify-center gap-2 md:justify-start">
                <a href="#" className="flex items-center gap-2 font-medium">
                    <div
                        className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-300 text-primary-foreground">
                        <KeyboardIcon className="size-4"/>
                    </div>
                    Typle
                </a>
            </div>
            <div className="flex flex-1 items-center justify-center">
                <div className="w-full max-w-md">
                    <LoginForm/>
                </div>
            </div>
        </div>
        <div className="relative hidden bg-muted lg:block bg-blue-100"/>

    </div>
}