<script lang="ts">
  import ChatHistory from '$lib/components/ChatHistory.svelte';
  import ChatMessage from '$lib/components/ChatMessage.svelte';
  import Input from '$lib/components/Input.svelte';
  import { chatMessages, answer } from '$lib/stores/chat-messages';

  let query = '';

  const handleSubmit = async () => {
    answer.set('...');
    await chatMessages.set(query);
    query = '';
  };
</script>

<section class="flex max-w-6xl w-full pt-4 justify-center">
  <div class="flex flex-col gap-2">
    <ChatHistory />
  </div>

  <div class="flex flex-col w-full px-8 items-center gap-2">
    <div
      class="h-[700px] w-full bg-white bg-opacity-20 rounded-md p-4 overflow-y-auto flex flex-col gap-4"
    >
      <div class="flex flex-col gap-2">
        {#each $chatMessages.messages as message}
          <ChatMessage type={message.role} message={message.content} />
        {/each}

        {#if $answer}
          <ChatMessage type="assistant" message={$answer} />
        {/if}
      </div>
    </div>
    <form
      class="flex w-full rounded-md gap-4 bg-white bg-opacity-20 p-2"
      on:submit|preventDefault={handleSubmit}
    >
      <Input type="text" bind:value={query} class="w-full" />
      <button
        type="submit"
        class="bg-white bg-opacity-40 hover:bg-white/5 px-8 py-1.5 border border-black/40 ml-[-0.5rem] rounded-md text-black"
      >
        Send
      </button>
    </form>
  </div>
</section>
