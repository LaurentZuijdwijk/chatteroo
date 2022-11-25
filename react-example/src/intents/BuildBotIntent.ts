import { sleep } from "../lib/sleep";
import { Context, IIntent, Intent } from "../lib/Intent";
import { ButtonOptionsView } from "../views/ButtonOptionsView";

export class BuildBotIntent extends Intent implements IIntent{
    constructor() {
        super();
        this.entities = []
    }
    match(msg: string): boolean {
        return msg.includes('build') && msg.includes('bot')
    }
    async begin(ctx: Context, next:() => void) {
        await sleep(1000);

        ctx.sendMsg(`So you want to build a bot?`)
        await sleep(1500);
        ctx.sendMsg(`🤔`)
        ctx.loading();
        await sleep(2500);
        ctx.sendMsg(`Ok, maybe I can help, let's get started`)
        await sleep(2500);

        ctx.sendMsg(`Like any other software project, we need to understand the problem`)
        await sleep(3000);
        
        ctx.sendMsg(`We need to ask ourselves several questions`)
        await sleep(3000);
        ctx.sendMsg(`What will we be building?`)
        await sleep(1000);
        ctx.sendMsg(`- A chatbot?`)
        await sleep(1000);
        ctx.sendMsg(`- A state sequence system?`)
        await sleep(1000);
        ctx.sendMsg(`- Something else?`)
        await sleep(1800);
        await ctx.addComponent(ButtonOptionsView, {className:'', msg: 'What is it that you want to build?', options: ['Chat bot', 'Chat Bot', 'Chat Bot']});
        ctx.loading();
        await sleep(2000);
        ctx.sendMsg(`Ah, something like this?`)    
        await sleep(1600);

        ctx.sendMsg(`<img src="https://img.freepik.com/premium-photo/cyborg-girl-cyberpunk-style-digital-art-illustrated-painting_379823-2871.jpg?w=400" />`)
        await sleep(2600);
        await ctx.addComponent(ButtonOptionsView, {className:'', msg: 'Robot?', options: ['Yes']});
        await sleep(1600);
        ctx.sendMsg(`Ok, lets continue.`);    
        await sleep(1600);


        ctx.sendMsg(`Have other people solved this problem before?`)
        await sleep(4000);
        ctx.sendMsg(`Are there any existing libraries we can use?`)
        await sleep(4000);
        ctx.sendMsg(`What is the common language around this problem?`)
        await sleep(4000);
        ctx.sendMsg(`In chatbots the vocabulary includes "intents", "entities" and "utterances"`)
        await sleep(4500);
        ctx.sendMsg(`Using the right language helps us find the right abstractions`)
        await sleep(4000);


        ctx.sendMsg(`What are the NFRs?`)
        await sleep(2000);
        ctx.sendMsg(`- Simple to implement/use`)
        await sleep(1000);
        ctx.sendMsg(`- Testable`)
        await sleep(1000);
        ctx.sendMsg(`- Extendable`)
        await sleep(1000);
        ctx.sendMsg(`- Maintainable`)
        await sleep(1000);
        await ctx.addComponent(ButtonOptionsView, {className:'', msg: 'Are you happy with this explanation so far?', options: ['yes', 'no']});
        ctx.loading();
        await sleep(1000);
        ctx.sendMsg(`Great! Thanks for the feedback`)
        await sleep(1000);

        ctx.sendMsg(`When we have a rough idea of the above we can build a technical POC or prototype`)
        await sleep(5000);
        ctx.sendMsg(`The POC will show us how we can easily implement 
        the product requirements, but also shows us if the architecture works`)
        await sleep(5000);
        ctx.sendMsg(`A POC should be tested with different use cases`)
        await sleep(3000);
        ctx.sendMsg(`Does it still fulfill the requirements?`)
        await sleep(3000);
        ctx.sendMsg(`We constantly refactor and refine in this phase to come to the best solution`)
        await sleep(3000);
        await ctx.addComponent(ButtonOptionsView, {className:'', msg: 'Was this helpful?', options: ['yes', 'no']});
        ctx.loading();
        await sleep(6000);

        next();
    }
    async finally(ctx: Context, next:()=>void) {
        next();
    }
}