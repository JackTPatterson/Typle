'use client'

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import React, {FormEvent} from "react";
import {registerUser} from "@/app/(auth)/register/actions";
import {toast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";

export function RegisterForm() {

    const router = useRouter()

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        if(formData.get("password") !== formData.get("verify-password")) {
            toast({title: 'Error Registering', description: 'Passwords do not match'})
            return
        }

        const {data, error} = await registerUser(
            formData.get("email") as string,
            formData.get("password") as string,
        )

        if(error) {
            console.log(error)
            toast({title: 'Error Registering', description: "Email already in use"})
            return
        }

        if(data || !error) {
            router.push('/')
        }

    }


    return (
        <div className={"flex flex-col gap-6"}>

                    <form onSubmit={onSubmit} className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Welcome to Typle</h1>
                                <p className="text-balance text-muted-foreground">Register to make a Typle account</p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" name={'email'} placeholder="email@example.com" required />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input id="verify-password" type="password" name={'password'} required/>

                                <div className="flex items-center mt-4">
                                    <Label htmlFor="verify-password">Verify Password</Label>
                                </div>
                                <Input id="verify-password" type="password" name={'verify-password'} required/>
                            </div>
                            <Button type="submit" className="w-full">
                                Register
                            </Button>
                            <div className="text-center text-sm">
                               Already have an account?{" "}
                                <a href="/login" className="underline underline-offset-4">
                                Sign In
                                </a>
                            </div>
                        </div>
                    </form>

        </div>
    )
}
