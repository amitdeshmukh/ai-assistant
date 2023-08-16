// Use llm-client to generate a response
import 'dotenv/config';
import { OpenAI, AssistantPrompt, OpenAIGenerateModel, OpenAIDefaultOptions, Memory } from '@dosco/llm-client';
import { OPENAI_APIKEY, DEBUG, LLM_CLIENT_APIKEY } from '$env/static/private';
import { assistantPromptText } from '$lib/llm-client/assistantPrompt';
import { getChatHistory } from '$lib/utils/misc';
import type { ChatCompletionRequestMessage } from 'openai';

const debugStatus: boolean = DEBUG === 'true' ? true : false;

const conf = OpenAIDefaultOptions();
conf.model = OpenAIGenerateModel.GPT35Turbo;
conf.temperature = 0;

const ai: OpenAI = new OpenAI(OPENAI_APIKEY!, conf);
const memory = new Memory();

interface Result {
  content: string | Map<string, string[]>;
}

interface isTask {
  isTask: boolean;
}

const assistantPrompt: AssistantPrompt = new AssistantPrompt(assistantPromptText);
assistantPrompt.setDebug(debugStatus);

const aiMessageResponse = async (messages: ChatCompletionRequestMessage[]): Promise<Result | string> => {
  // Only use the last 6 messages
  messages = messages.slice(-6);

  let chatHistory = await getChatHistory(messages);
  try {
    const assistantResponse = await assistantPrompt.generate(ai, chatHistory, { memory, apiKey: LLM_CLIENT_APIKEY });
    return { content: assistantResponse.value() };
  }
  catch (err: any) {
    console.log(err.message);
    return err.message;
  }
}

export { aiMessageResponse };
export type { Result };