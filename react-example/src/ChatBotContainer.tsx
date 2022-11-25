import React, { useState, useEffect, ReactNode, useRef } from "react"
import { ApplicationIntent } from "./intents/ApplicationIntent";
import { BuildBotIntent } from "./intents/BuildBotIntent";
import { EndIntent } from "./intents/EndIntent";
import { ForgottenIntent } from "./intents/ForgottenIntent";
import { HelpIntent } from "./intents/HelpIntent";
import { JobSearchIntent } from "./intents/JobSearchIntent";
import { ReminderIntent } from "./intents/ReminderIntent";
import { StartIntent } from "./intents/StartIntent";
import { Chatteroo } from "./lib/Chatteroo";

const bot = new Chatteroo({ log: console.log, debug: false, loading: () => { }, sendMsg: () => { }, addQuestion: () => new Promise<string>(() => { }) })
    .addIntent(new StartIntent())
    .addIntent(new EndIntent())
    .addIntent(new JobSearchIntent())
    .addIntent(new ApplicationIntent())
    .addIntent(new ReminderIntent())
    .addIntent(new BuildBotIntent())
    .addIntent(new HelpIntent())
    .addIntent(new ForgottenIntent())

const QuestionElement = ({ msg, cb }: { msg: string, cb: any }) => {
    const onKeyDown = (e: any) => {
        if (e.code === 'Enter') cb(e.target.value)
    }
    return (<div className="msg question"><h3>{msg}</h3><br />
        <input type="text" onKeyDown={onKeyDown} />
    </div>
    )
}
const Loader = () => {
    return (<div className="loader msg"><div className="dot-typing"></div></div>)
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
        // TODO: Refactor into a custom hook
        const addQuestion = (msg: any) => {
            return new Promise<string>((resolve) => {
                const cb = (val: any) => {
                    resolve(val)
                }
                setLoading(false)

                console.log(items, ii)
                ii.current = [...ii.current, (<QuestionElement cb={cb} key={msg + Date.now()} msg={msg}></QuestionElement>)]
                setItems([...ii.current])
            })
        }
        const addComponent = <T,>(component: React.FC, props: any): Promise<T> => {
            return new Promise<T>((resolve) => {
                const dataCallback = (val: any) => {
                    ii.current.pop();
                    setItems([...ii.current])
                    resolve(val)
                }
                setLoading(false)

                console.log(items, ii)
                ii.current = [...ii.current, React.createElement(component, { className: "component", dataCallback, ...props } as any)]
                setItems([...ii.current])
            })
        }
        const loading = () => setLoading(true)

        const sendMsg = (msg: string) => {
            setLoading(false)
            ii.current = [...ii.current, <div className="msg" ><h3 key={msg + Date.now()} dangerouslySetInnerHTML={{ __html: msg }}></h3></div>]

            setItems([...ii.current]);
        }
        bot
            .options({
                sendMsg: sendMsg,
                addQuestion,
                addComponent,
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