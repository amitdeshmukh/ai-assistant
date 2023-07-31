// Use llm-client to generate a response
import 'dotenv/config';
import { OpenAI, SPrompt, OpenAIGenerateModel, OpenAIDefaultOptions, Memory } from '@dosco/llm-client';
import { OPENAI_APIKEY, DEBUG } from '$env/static/private';
import { taskPromptText } from '$lib/llm-client/prompt';
import { taskFunctions } from '$lib/llm-client/functions';
import { taskResultSchema } from '$lib/llm-client/resultSchema';

const debugStatus: boolean = DEBUG === 'true' ? true : false;

// const mem: Memory = new Memory();
const conf = OpenAIDefaultOptions();
conf.model = OpenAIGenerateModel.GPT35Turbo16K;

const ai: OpenAI = new OpenAI(OPENAI_APIKEY!, conf);

interface Result {
  content: string;
}

const taskPrompt: SPrompt<Result> = new SPrompt(taskResultSchema, taskFunctions);
taskPrompt.setDebug(debugStatus);

const aiTaskResponse = async (messages: any) => {
  // Append the last 5 messages to taskPromptText
  let lastMessages = JSON.stringify(messages.slice(-5));
  let currPrompt = taskPromptText + lastMessages;

  try {
    const response = await taskPrompt.generate(ai, currPrompt);
    let aiResponse = response.value();
    console.log('aiResponse', aiResponse);
    return aiResponse;
  } catch (err: any) {
    console.log(err.message);
    return err.message;  
  }
}

export { aiTaskResponse };