<script lang="ts">
	import { onMount } from 'svelte';
	
	import Chat from './Icons/Chat.svelte';
	import Pencil from './Icons/Pencil.svelte';
	import Plus from './Icons/Plus.svelte';
	import Trash from './Icons/Trash.svelte';
	import Hamburger from './Icons/Hamburger.svelte';
	
	import { chatMessages } from '$lib/stores/chat-messages';
	import {
		chatHistory,
		filterHistory,
		chatHistorySubscription,
		loadMessages
	} from '../stores/chat-history';

	let chatHistoryKeys: any = [];
	let isMobile = false;
	let isMenuOpen = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	onMount(() => {
		chatHistorySubscription.set($chatHistory);
		chatHistorySubscription.subscribe((value: any) => {
			chatHistoryKeys = Object.keys(value);
		});

		const mediaQuery = window.matchMedia('(max-width: 768px)');
		isMobile = mediaQuery.matches;

		mediaQuery.addEventListener('change', (e) => {
			isMobile = e.matches;
		});
	});
</script>

{#if isMobile}
	<div class="hamburger-menu">
		<button on:click={toggleMenu}>
			<Hamburger />
		</button>
		{#if isMenuOpen}
			<!-- Chat history component for mobile view -->
			<div class="h-[700px] w-[350px] bg-white bg-opacity-20 rounded-md py-4 px-2 overflow-y-auto flex flex-col gap-2">
				<!-- ... existing code ... -->
			</div>
		{/if}
	</div>
{:else}
	<div class="h-[700px] w-[350px] bg-white bg-opacity-20 rounded-md py-4 px-2 overflow-y-auto flex flex-col gap-2">
		<button
			on:click={chatMessages.reset}
			class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-black cursor-pointer text-sm mb-2 flex-shrink-0 border border-black/20"
		>
			<Plus /> New chat
		</button>

		{#if chatHistoryKeys.length > 0}
			{#each chatHistoryKeys as message (message)}
				<div
					on:click={() => loadMessages(message)}
					on:keydown={() => {}}
					class="flex py-3 px-3 items-center gap-3 relative rounded-md cursor-pointer break-all pr-14 bg-opacity-40 hover:bg-black/5 bg-white group animate-flash text-sm text-black"
				>
					<Chat />
					<div class="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">{message}</div>

					<div class="absolute flex right-1 z-10 text-black-300 visible">
						<button on:click={() => loadMessages(message)} class="p-1 hover:text-black">
							<Pencil />
						</button>
						<button
							on:click|preventDefault={() => filterHistory(message)}
							class="p-1 hover:text-black"
						>
							<Trash />
						</button>
					</div>
				</div>
			{/each}
		{/if}
	</div>
{/if}