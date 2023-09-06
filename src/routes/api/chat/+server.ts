import { json } from '@sveltejs/kit';
import type { Config } from '@sveltejs/adapter-vercel';
import { getApiResponse } from '$lib/inference-api';

export const config: Config = {
  runtime: 'edge'
};

export const POST: any = async ({ request }) => {

  // Read the request body which contains the entire chat transcript
  const requestData = await request.json();
  if (!requestData) {
    throw new Error('No request data');
  }

  let latestMessage = requestData.messages[requestData.messages.length - 1];
  console.log(latestMessage)

  try {
    // Do something with the request data
    if (latestMessage && latestMessage.role === 'user') {
      
      // Forward chat history to the API
      let result: any = await getApiResponse(requestData.messages)

      // Return a response to the user
      if (result && result.content) {
        console.log({role: "assistant", content: result.content})
        return new Response(JSON.stringify({ role: 'assistant', content: result.content }), {
          headers: {
            'Content-Type': 'application/json'
          },
        });``
      }
      // Throw an error if the AI response is empty
      throw new Error('AI response is empty');
    }

    // Return a response to the user
    return new Response(JSON.stringify({ role: 'assistant', content: 'Sorry! I missed your last message.' }), {
      headers: {
        'Content-Type': 'application/json'
      },
    });
  } 
  catch (err) {
    console.error(err);
    return json({ error: 'There was an error processing your request' }, {status: 500});
  }
};
