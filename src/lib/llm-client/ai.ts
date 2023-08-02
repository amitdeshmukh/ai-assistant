// Use llm-client to generate a response
import 'dotenv/config';
import { OpenAI, SPrompt, AssistantPrompt, OpenAIGenerateModel, OpenAIDefaultOptions } from '@dosco/llm-client';
import { OPENAI_APIKEY, DEBUG } from '$env/static/private';
import { messagePromptText, taskPromptText } from '$lib/llm-client/prompt';
import { taskFunctions } from '$lib/llm-client/functions';
import { messageResultSchema, taskResultSchema } from '$lib/llm-client/resultSchema';
import { getChatHistory } from '$lib/utils/misc';

const debugStatus: boolean = DEBUG === 'true' ? true : false;

// const mem: Memory = new Memory();
const conf = OpenAIDefaultOptions();
conf.model = OpenAIGenerateModel.GPT35Turbo16K;
conf.temperature = 0;

const ai: OpenAI = new OpenAI(OPENAI_APIKEY!, conf);

interface Result {
  content: string;
}
interface isTask {
  isTask: boolean;
}

const messagePrompt: SPrompt<isTask> = new SPrompt(messageResultSchema, []);
messagePrompt.setDebug(debugStatus);

const assistantPrompt: AssistantPrompt = new AssistantPrompt();
// assistantPrompt.setDebug(debugStatus);

const taskPrompt: SPrompt<Result> = new SPrompt(taskResultSchema, taskFunctions);
taskPrompt.setDebug(debugStatus);

const aiTaskResponse = async (chatHistory: string) => {
  let currPrompt = taskPromptText + '\n' + chatHistory;

  try {
    const response = await taskPrompt.generate(ai, currPrompt);
    let aiTaskResponse = response.value();
    return aiTaskResponse;
  } catch (err: any) {
    console.log(err.message);
    return err.message;  
  }
}

const aiMessageResponse = async (messages: any) => {
  // Only use the last 7 messages
  messages = messages.slice(-7);
  let chatHistory = await getChatHistory(messages);
  let currPrompt = messagePromptText + chatHistory;

  try {
    // Check if the response is a task or not
    const response = await messagePrompt.generate(ai, currPrompt);
    let messageResponse = response.value();
    console.log(messageResponse)

    // If the response is not a task, generate an assistant response
    if (!messageResponse.isTask) {
      const assistantResponse = await assistantPrompt.generate(ai, chatHistory);
      return { content: assistantResponse.value() };
    }

    // If the response is a task, generate a task response
    const taskResponse = await aiTaskResponse(chatHistory);
    return taskResponse;
  }
  catch (err: any) {
    console.log(err.message);
    return err.message;
  }
}

export { aiMessageResponse };