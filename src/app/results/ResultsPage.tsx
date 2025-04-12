'use client'

import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import React, {FormEvent, KeyboardEventHandler, useCallback, useEffect, useRef, useState} from "react";
import {loginUser} from "@/app/(auth)/login/actions";
import {toast} from "@/hooks/use-toast";
import { useKeyPress } from "@uidotdev/usehooks";
import {useKeyboard} from 'react-aria';
import NumberFlow, {NumberFlowGroup, Value} from "@number-flow/react";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

export function ResultsPage() {

    const words = "Anim irure"

    const [events, setEvents] = React.useState<string>();
    const [currIndex, setCurrIndex] = useState<number>(0)
    const [charStatus, setCharStatus] = useState<any>()
    const [wpm, setWPM] = useState<string>("0")
    const [startTime, setStartTime] = useState<Date>()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [timeCompleted, setTimeCompleted] = useState<Date>()

    let { keyboardProps } = useKeyboard({
        onKeyDown: (e) =>
            setEvents(
                (events: any) => `${e.key}_${new Date().getMilliseconds()}`
            ),
    });

    useEffect(() => {
        setCharStatus(Array(words.length).fill(-1).map((_, i) => -1))
    }, []);

    useEffect(() => {
        const event = events?.split("_")[0]

        if(event && event === ' '){
            calcWPM()
        }
        if(event && event !== "Shift"){
            if(currIndex === 0){
                setStartTime(new Date())
            }
            if(event === 'Backspace'){
                setCharStatus((prev: number[]) => {
                    return prev.map((value, index) =>
                        index === currIndex - 1 ? -1 : value
                    );
                });
                setCurrIndex(prev=>prev-1)
            }
            else{
                setCharStatus((prev: any)=>{
                    return prev.map((value: number, index: number) =>
                        words[currIndex] === event ? index === currIndex && value === -1 ? 0 : value : index === currIndex && value === -1 ? 1 : value
                    );
                })
                setCurrIndex(prev=>prev+1)
            }
        }
    }, [events]);

    useEffect(()=>{
        if(charStatus && charStatus?.[charStatus?.length - 1] !== -1){
            if(!timeCompleted){
                setIsOpen(true)
            }
            setTimeCompleted(new Date())
        }
    }, [charStatus])

    const calcWPM = () => {
        const currTime = new Date()

        const diff = currTime.getTime() - startTime?.getTime()!

        setWPM((wordsCompleted() / (diff / 1000 / 60)).toFixed(0))
    }

    const wordsCompleted = () => {
        const wordList = words.split(" ");
        let typedWordIndex = 0;

        for (let i = 0, wordStart = 0; i < wordList.length; i++) {
            const word = wordList[i];
            const wordEnd = wordStart + word.length;

            if (currIndex >= wordEnd) {
                const isCorrect = charStatus
                    .slice(wordStart, wordEnd)
                    .every((status: any) => status === 0);

                if (isCorrect) {
                    typedWordIndex++;
                }
            } else {
                break;
            }

            wordStart = wordEnd + 1;
        }

        return typedWordIndex;
    };


    return (
        <div className={"flex flex-col gap-2 justify-between items-center w-full text-center"}>
            <input autoFocus={true} className={'opacity-0'} onBlur={e => e.target.focus()}{...keyboardProps}/>
            <NumberFlow value={wpm.toString() as Value} className={'text-6xl font-semibold'} format={{ maximumFractionDigits: 0 }} />
            <p className={'opacity-50 font-medium -mt-2'}>WPM</p>

            <div className={'w-2/3 flex flex-col items-center justify-between mt-10 h-full'}>
                <div>
                    {
                        Array.from(words).map((chars, i)=>{
                            return <span className={charStatus?.[i] === -1 ? `text-black opacity-50 text-2xl` : charStatus?.[i] === 0 ? 'opacity-100 text-2xl text-black' : 'text-red-500 text-2xl'} key={`char_index_${i}`}>{chars}</span>
                        })
                    }
                </div>

                <div className={'mt-40 w-full'}>
                    <Keyboard physicalKeyboardHighlight={true}/>
                </div>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Test Results</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex justify-between items-center gap-4 text-nowrap">
                            <p>
                                Time Elapsed
                            </p>
                            <p>{Math.floor((((timeCompleted?.getTime()! - startTime?.getTime()!) / 1000) % 3600))} Minutes {Math.ceil((((timeCompleted?.getTime()! - startTime?.getTime()!) / 1000) % 60)).toFixed(0)} Seconds</p>
                        </div>
                        <div className="flex justify-between items-center gap-4 text-nowrap">
                            <p>
                                Words Per Minute
                            </p>
                            <p>{(wpm)}</p>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose>
                            <Button type="submit">Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
