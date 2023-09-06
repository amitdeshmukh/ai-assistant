import type { ChatCompletionRequestMessage } from 'openai';
import { get, writable } from 'svelte/store';

export interface ChatTranscript {
  messages: ChatCompletionRequestMessage[];
  chatState: 'idle' | 'loading' | 'error' | 'message';
}

const { subscribe, update, ...store } = writable<ChatTranscript>({
  messages: [
    { role: 'assistant', content: 'Hello! How can I help you?' }
  ],
  chatState: 'idle'
});

const set = async (query: string) => {
  updateMessages(query, 'user', 'loading');

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ messages: get(chatMessages).messages })
    });

    const data = await response.json();
    console.log(data);

    // Handle the response data here
    if (data.content) {
      updateMessages(data.content, 'assistant', 'idle');
    }
  } catch (error) {
    handleError(error);
    updateMessages(error, 'assistant', 'error');
  }
};

const replace = (messages: ChatTranscript) => {
  store.set(messages);
};

const reset = () =>
  store.set({
    messages: [
      { role: 'assistant', content: 'Hello, I am your virtual assistant. How can I help you?' }
    ],
    chatState: 'idle'
  });

const updateMessages = (content: any, role: any, state: any) => {
  console.log({ role, content, state});
  chatMessages.update((messages: ChatTranscript) => {
    return { messages: [...messages.messages, { role: role, content: content }], chatState: state };
  });
};

const handleError = <T>(err: T) => {
  updateMessages(err, 'system', 'error');
  console.error(err);
};

export const chatMessages = { subscribe, set, update, reset, replace };
export const answer = writable<string>('');
export const clientId = writable<string>('');
