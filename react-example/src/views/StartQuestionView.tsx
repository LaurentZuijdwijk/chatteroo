import React from 'react';
export const StartQuestionView = (props:any)=>{
    return (
        <div className={props.className}>
            <p>How can I help</p>
            <button onClick={()=>{props.dataCallback('find job')}}>Find a job</button><br />
            <button onClick={()=>{props.dataCallback('build bot')}}>Build a bot</button><br />
            <button onClick={()=>{props.dataCallback('help')}}>Help</button>
            <button onClick={()=>{props.dataCallback('forgotten')}}>Forget me</button>
            <p>Or type a command</p>
            <input type="text" onKeyDown={(e)=> {
                console.log(e.key)
                if(e.key === 'Enter'){
                    props.dataCallback((e.target as HTMLInputElement).value)
                }
            }} />
        </div>
    )
}