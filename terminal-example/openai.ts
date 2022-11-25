const dotenv = require("dotenv");
dotenv.config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI,
});
const openai = new OpenAIApi(configuration);
export const handleMsg = async (msg: string) => {

  const result = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `Utterance: ${msg}  
  Intents: [{name: 'find job', entities: ['JobTitle', 'Location', 'Salary']}
  {name:'create CV', entities: null}]
  {name:'application status', entities: null}]

  json object with an intent and possible entities from the utterance above

  example json:
    {
        "intent": string,
        "entities"?: [{
            name: string,
            value: string | number,
            confidence: float
        }]
    }

  json: 
  `,
    temperature: 0,
    max_tokens: 200,
  });
  const resultJSON = JSON.parse(result.data.choices[0].text)

  resultJSON.entities = resultJSON.entities.filter((el:any) => el.value)
  .filter((el:any) => {
    if(el.name === 'JobTitle') return el.value !== 'job'
    return true
  })
  .filter((el:any) => {
    if(el.name === 'JobTitle') return el.value !== 'jobs'
    return true
  })
return resultJSON
}


export const handleEntity = async (msg: string, entityName:string) => {

  const result = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `Utterance: ${msg}  
   Entity name(s): ${entityName}
    
  json object with a parsed entities

  example json:
    {
        "entityName": "value"
    }

  json: 
  `,
    temperature: 0,
    max_tokens: 200,
  });
  const resultJSON = JSON.parse(result.data.choices[0].text)

return resultJSON
}
