import React from "react";

export const StartQuestionView = (props: any) => {
  return (
    <div className={props.className} style={{ width: "100%" }}>
      <p className="startQuestionHeader">How can I help</p>
      <div className="startQuestionListOfButtons">
        <button
          onClick={() => {
            props.dataCallback("find job");
          }}
        >
          Find a job
        </button>
        <br />
        <button
          onClick={() => {
            props.dataCallback("build bot");
          }}
        >
          Build a bot
        </button>
        <br />
        <button
          onClick={() => {
            props.dataCallback("help");
          }}
        >
          Help
        </button>
        <button
          onClick={() => {
            props.dataCallback("forgotten");
          }}
        >
          Forget me
        </button>
      </div>
      <p className="startQuestionHeader">Or type a command</p>
      <input
        className="startQuestionInput"
        type="text"
        onKeyDown={(e) => {
          console.log(e.key);
          if (e.key === "Enter") {
            props.dataCallback((e.target as HTMLInputElement).value);
          }
        }}
      />
    </div>
  );
};