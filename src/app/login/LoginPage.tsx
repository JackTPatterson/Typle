'use client'

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import React, {FormEvent} from "react";
import {cn} from "@/lib/utils";
import {loginUser} from "@/app/login/actions";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const {error} = await loginUser(
            formData.get("email") as string,
            formData.get("password") as string,
        )

        if(error) return alert(error)

    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>

                    <form onSubmit={onSubmit} className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Welcome back</h1>
                                <p className="text-balance text-muted-foreground">Login to your Typle account</p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" name={'email'} placeholder="m@example.com" required />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input name={'password'} id="password" type="password" required />
                            </div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <a href="/register" className="underline underline-offset-4">
                                    Sign up
                                </a>
                            </div>
                        </div>
                    </form>
        </div>
    )
}
