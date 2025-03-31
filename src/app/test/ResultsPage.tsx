'use client'

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import React, {FormEvent} from "react";
import {loginUser} from "@/app/(auth)/login/actions";
import {toast} from "@/hooks/use-toast";

export function ResultsPage() {


    return (
        <div className={"flex flex-col gap-2 justify-center items-center w-full text-center"}>
            <div className={'p-4 w-1/3 bg-neutral-100 rounded-lg'}>
                <h1 className={'text-3xl font-semibold'}>Time's Up!</h1>
                <div className={'mt-4'}>
                    <h1 className={'text-2xl font-medium'}>Your Score</h1>
                    <p className={'font-mono mt-2 text-3xl'}>11,284</p>
                    <div className={'mt-10 flex justify-around'}>

                        <div>
                            <p>Accuracy</p>
                            <p className={'font-mono'}>88%</p>
                        </div>
                        <div>
                            <p>Speed</p>
                            <p className={'font-mono'}>89 WPM</p>
                        </div>
                    </div>
                    <div className={'mt-10'}>
                        <p>Personal Best</p>
                        <p className={'font-mono text-2xl'}>15,021</p>
                    </div>
                </div>
            </div>
            <Button>Share</Button>

        </div>
    )
}
