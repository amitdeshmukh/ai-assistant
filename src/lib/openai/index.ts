import axios from 'axios';
import 'dotenv/config';
import { OPENAI_APIKEY, OPENAI_API_URL } from '$env/static/private';
import type { ChatCompletionRequestMessage } from 'openai';

const maxTokens = 600;

// generates the prompt for the OpenAI API
const generatePrompt = (messageHistory: ChatCompletionRequestMessage[], businessInfo: any): any[] => {
  const infoString = JSON.stringify(businessInfo, null, 2);
  // Only use the last 6 messages
  let messages = messageHistory.slice(-6);

  return [
    {
      role: "system",
      content: `You are an AI trained to assist users with inquiries related to the business ${businessInfo.about.name}. 
      Your main tasks are:
      - Provide information about the business.
      - Gently lead the conversation towards sales, product proposals, brand information or awareness.
      - Show deep understanding and maintain a friendly, human-like conversation.
      - If the topic goes off the business context, gently steer back to the company's products or services.
      - Be human, friendly, and helpful. If you don't know how to answer, just say "I don't know" or "I don't understand".
      - Keep a motivated excited, engaging tone.
      - You can use sentences like, What else could I help you with? or propose some topics like, would you like to know more about our products? or, would you like to know more about our products or our founder?
      - IMPORTANT! Reply in the language of the user.

      Business Information:
      ${infoString}`
    },
    ...messages
  ];

};

// returns the response to the users message
export async function generateTextFromUserMessage(messageHistory: ChatCompletionRequestMessage[], businessInfo: any): Promise<string | null> {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${OPENAI_APIKEY!}`
  };

  const promptData: any[] = generatePrompt(messageHistory, businessInfo);
  console.log(promptData)

  const data = {
    model: "gpt-3.5-turbo",
    messages: promptData,
    max_tokens: maxTokens,
    temperature: 0,
    frequency_penalty: 0,
    presence_penalty: 0,
  };

  try {
    const response = await axios.post(OPENAI_API_URL, data, { headers });
    console.log(`Generated text: ${response.data.choices[0]?.message.content}`);

    return response.data.choices[0]?.message;
  } catch (error) {
    console.error(`Error generating text: ${error}`);
    return null;
  }
}
