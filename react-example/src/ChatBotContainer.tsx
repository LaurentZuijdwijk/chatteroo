import React, { useState, useEffect, ReactNode, useRef } from "react"
import { ApplicationIntent } from "./intents/ApplicationIntent";
import { EndIntent } from "./intents/EndIntent";
import { HelpIntent } from "./intents/HelpIntent";
import { JobSearchIntent } from "./intents/JobSearchIntent";
import { ReminderIntent } from "./intents/ReminderIntent";
import { StartIntent } from "./intents/StartIntent";
import { Chatteroo } from "./lib/Chatteroo";

const bot = new Chatteroo({ log: console.log, debug: false, loading:()=>{},sendMsg: () => { }, addQuestion: () => new Promise<string>(() => { }) })
    .addIntent(new StartIntent())
    .addIntent(new EndIntent())
    .addIntent(new JobSearchIntent())
    .addIntent(new ApplicationIntent())
    .addIntent(new ReminderIntent())
    .addIntent(new HelpIntent())

const QuestionElement = ({ msg, cb }: { msg: string, cb: any }) => {
    const onKeyDown = (e: any) => {
        if (e.code === 'Enter') cb(e.target.value)
        console.log(e)
    }
    return (<div className="question"><h3>{msg}</h3>
        <input type="text" onKeyDown={onKeyDown} />
    </div>
    )
}
const Loader = () => {
    return (<h3>...</h3>)
}

export const ChatBotContainer = () => {
    const bottomRef = useRef<any>();

    const [loading, setLoading] = useState(false);
    const ii = useRef<(ReactNode)[]>([])
    const [items, setItems] = useState<(ReactNode)[]>(ii.current || []);

    const scrollToBottom = () => {
        bottomRef?.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };


    useEffect(() => {

        const addQuestion = (msg: any) => {
            return new Promise<string>((resolve) => {
                const cb = (val: any) => {
                    resolve(val)
                }
                setLoading(false)

                console.log(items, ii)
                ii.current = [...ii.current, (<QuestionElement cb={cb} key={msg+Date.now()} msg={msg}></QuestionElement>)]
                setItems([...ii.current])
            })
        }

        const loading = ()=> setLoading(true)

        const sendMsg = (msg: string) => {
            setLoading(false)
            ii.current = [...ii.current, <h3 key={msg+Date.now()} dangerouslySetInnerHTML={{__html:msg}}></h3>]

            setItems([...ii.current]);
        }
        bot
            .options({
                sendMsg: sendMsg,
                addQuestion,
                loading
            })
            .start();
    }, []);



    useEffect(() => {
        scrollToBottom()
    }, [items, loading])


    return (
        <div>
            <div className="chatContainer">
                {items}
                {loading && <Loader />}    
            </div>
            <div ref={bottomRef} className="list-bottom"></div>

        </div>
    )

}