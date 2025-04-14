'use client'

import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import {Button} from "@/components/ui/button";
import React, {useEffect, useState} from "react";
import {useKeyboard} from 'react-aria';
import NumberFlow, {Value} from "@number-flow/react";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { saveTest } from './actions';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from 'next/navigation';

export function TestPage({prompt, user, is_benchmark, has_completed_daily_challenge}: {prompt: string, user: string, is_benchmark: boolean, has_completed_daily_challenge: boolean}) {

    const words = prompt
    const router = useRouter()

    const [events, setEvents] = React.useState<string>();
    const [currIndex, setCurrIndex] = useState<number>(0)
    const [charStatus, setCharStatus] = useState<any>()
    const [wpm, setWPM] = useState<string>("0")
    const [startTime, setStartTime] = useState<Date>()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [timeCompleted, setTimeCompleted] = useState<Date>()
    const [totalKeystrokes, setTotalKeystrokes] = useState<number>(0)
    const [correctKeystrokes, setCorrectKeystrokes] = useState<number>(0)
    const [activeKey, setActiveKey] = useState<string>("")

    const { keyboardProps } = useKeyboard({
        onKeyDown: (e) => {
            // Ignore modifier and special keys
            const ignoredKeys = [
                "Shift", "Control", "Alt", "Meta",
                "CapsLock", "Tab", "Enter", "ArrowLeft",
                "ArrowRight", "ArrowUp", "ArrowDown",
                "Home", "End", "PageUp", "PageDown",
                "Insert", "Delete", "Escape", "F1", "F2",
                "F3", "F4", "F5", "F6", "F7", "F8", "F9",
                "F10", "F11", "F12"
            ];

            if (!ignoredKeys.includes(e.key)) {
                setEvents((events: any) => `${e.key}_${new Date().getMilliseconds()}`);
                setActiveKey(e.key.toLowerCase());

                if (e.key !== 'Backspace') {
                    setTotalKeystrokes(prev => prev + 1);
                    if (words[currIndex] === e.key) {
                        setCorrectKeystrokes(prev => prev + 1);
                    }
                }
            }
        },
        onKeyUp: () => {
            setActiveKey("");
        }
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

    const calculateAccuracy = () => {
        if (totalKeystrokes === 0) return "0"
        return ((correctKeystrokes / totalKeystrokes) * 100).toFixed(1)
    }

    return (
        <div className={"flex flex-col gap-2 justify-between items-center w-full text-center"}>
            {is_benchmark && (
                <Alert className="mb-4">

                    <AlertTitle>Benchmark Test</AlertTitle>
                    <AlertDescription>
                        This is your first test. Your results will be used as a baseline to track your progress.
                    </AlertDescription>
                </Alert>
            )}
            {has_completed_daily_challenge && (
                <Alert className="mb-4">
                    <AlertTitle>Daily Challenge</AlertTitle>
                    <AlertDescription>
                        You have completed the daily challenge.
                    </AlertDescription>
                </Alert>
            )}
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
                    <Keyboard
                        physicalKeyboardHighlight={true}
                        layout={{
                            default: [
                                "q w e r t y u i o p [ ]",
                                "a s d f g h j k l ; '",
                                "z x c v b n m , . /",
                                "{space}"
                            ]
                        }}
                        display={{
                            "{space}": "qwerty"
                        }}
                        buttonTheme={[
                            {
                                class: "spacebar",
                                buttons: "{space}"
                            },
                            {
                                class: "active-key",
                                buttons: activeKey
                            }
                        ]}
                    />
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
                            <p>{Math.floor((timeCompleted?.getTime()! - startTime?.getTime()!) / 1000 / 60)} Minutes {Math.floor(((timeCompleted?.getTime()! - startTime?.getTime()!) / 1000) % 60)} Seconds</p>
                        </div>
                        <div className="flex justify-between items-center gap-4 text-nowrap">
                            <p>
                                Words Per Minute
                            </p>
                            <p>{(wpm)}</p>
                        </div>
                        <div className="flex justify-between items-center gap-4 text-nowrap">
                            <p>
                                Accuracy
                            </p>
                            <p>{calculateAccuracy()}%</p>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose>
                            <Button onClick={()=>{
                                saveTest({
                                    uuid: user,
                                    time: (timeCompleted?.getTime()! - startTime?.getTime()!),
                                    prompt: words,
                                    accuracy: parseFloat(calculateAccuracy()),
                                    wpm: parseFloat(wpm)
                                })
                                router.push("/profile")
                            }}>Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
