import React from 'react';

type questionViewType = {
    dataCallback?: (t:any)=>void
}

export const ButtonOptionsView = (props:any ) => {
    return (
        <div className={props.className}>
            <p>{props?.msg}</p>
            {props.options.map((el:string)=>(<div><button onClick={()=>{props.dataCallback!(el)}}>{el}</button></div>))}
        </div>
    )
}