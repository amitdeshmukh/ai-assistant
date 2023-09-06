import axios from 'axios';
import 'dotenv/config';
import type { ChatCompletionRequestMessage } from 'openai';
import { AI_SERVER_URL } from '$env/static/private';

// returns the response to the users message
export async function getApiResponse(messageHistory: ChatCompletionRequestMessage[]): Promise<string | null> {
  const defaultResponse = "Sorry, I'm having some trouble right now. Please try calling us.";

  const headers = {
    'Content-Type': 'application/json',
  };

  const data = {
    uuid: "df3f22be-a179-4276-b27e-d0a50efe3344",
    messages: messageHistory,
  };

  try {
    const response = await axios.post(`${AI_SERVER_URL}/chat`, data, { headers });

    // Check if the response status code is valid
    if (response.data.status.code >= 400) {
      throw new Error(response.data.error.message);
    }
    // Return the response data
    return response.data.message ?? defaultResponse;

  } catch (error) {
      console.error(`Error generating text: ${error}`);
      return defaultResponse;
  }
}
