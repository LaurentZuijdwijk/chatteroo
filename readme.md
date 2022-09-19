# Chatbot engine

This chatbot allows for the quick prototyping of new intents and flows and is flexible and framework agnostic. It should be easy to use with React as it is with Node.js.

Intents can have multiple Entities that can be fulfilled, those are easy to write and extend. When all entities are fulfilled, the finally method of the intent can summarize the outcome for the user.

# Quickstart

Create one or more intents, the example below is an intent to create reminders. 

The match function returns a boolean true value when either a message or utterance from the user, or a manual context.swithIntent('reminder') call matches closely enough. The orchestrator will start the intent and try to fullfill the data entities if they exist. 

The next method in the finally function goes straight back to the orchestrator and the message argument in the next function can be used to start a new intent. 

```javascript

export class ReminderIntent extends Intent implements IIntent {
    entities = [SubjectEntity, TimeEntity];

    match(msg: string): boolean {
        return msg.toLowerCase().includes('reminder') || (msg.includes('remind') && msg.includes('me'))
    }
    async finally(ctx: Context, next: () => void) {
        await sleep(1500);

        ctx.sendMsg(`Ok, I will remind you of ${ctx.ReminderIntent.SubjectEntity} @ ${ctx.ReminderIntent.TimeEntity}`)
        await sleep(1500);
        next('another intent');
    }
}

```
An Entity is nothing more than a function that can send messages and questions to the user and calls next when all conditions are fulfilled. It is best to use a single value for an answer, and create multiple entities when more datapoints are needed. 

```javascript
const SubjectEntity: Entity = async (ctx: Context, next) => {
    const answer = await ctx.question('What do you want me to remind you of? \n')
    ctx.sendMsg(`Ok, I'll remind you of ${answer}`);
    next(answer);

}
```


Addd intents to the chatot instance and start.
```javascript
new Chatteroo({log:console.log, debug:false})
.addIntent(new StartIntent())
.addIntent(new EndIntent())
.addIntent(new ReminderIntent())
.addIntent(new HelpIntent())
.start();
```

The engine doesn't know about rendering, we need to supply our chatbot engine with functions to display messages and ask questions. 