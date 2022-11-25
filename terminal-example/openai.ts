const { Configuration, OpenAIApi } = require("openai");
const dotenv = require('dotenv');

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI,
});
const openai = new OpenAIApi(configuration);
export const handleMsg = (msg:string)=>
 openai.createCompletion({
  model: "text-davinci-002",
  prompt: `Utterance: ${msg}  
  Intents: [{name: 'find job', entities: ['JobTitle', 'Location', 'Salary']}
  {name:'create CV', entities: null}]
  {name:'application status', entities: null}]

  json object with an intent and possible entities from the utterance above

  example json:
    {
        "intent": string,
        "entities?: [{
            name: string,
            value: string,
            confidence: float
        }]
    }

  json: 
  `,
  temperature: 0,
 max_tokens: 200,
});
