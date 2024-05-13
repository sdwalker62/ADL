<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import { Menu } from 'lucide-svelte';
	import { page } from '$app/stores';
</script>

<main>
	<nav>
		<button id="main-menu__button"><Menu size={36}/></button>
		<menu>
			<menuitem><a href="/" class:active="{$page.url.pathname.endsWith("/")}">Home</a></menuitem>
			<menuitem><a href="/docs" class:active="{$page.url.pathname.includes("/docs")}">Documentation</a></menuitem>
		</menu>
	</nav>
	<slot />
</main>
<ModeWatcher />

<style lang="scss"> 
	main {
		height: 100%;
		display: grid;
		background-color: var(--background-1);
		grid-template: "nav" "content";
		grid-template-rows: 8rem calc(100vh - 8rem);
		overflow: hidden;
		@media (min-width: 640px) {
			grid-template-rows: 2.5rem auto;
		}
	}

	nav {
		grid-area: "nav";
		@media (min-width: 640px) {
			display: flex;
			align-items: center;
		}
	}

	#main-menu__button {
		margin: 2rem;
		background: none;
		border: none;

		&:hover {
			border-radius: 7px;
			background: var(--background-4);
			cursor: pointer;
		}

		@media (min-width: 640px) {
			display: none;
		}
	}

	menu {
		display: none;
		@media (min-width: 640px) {
			padding-left: 1.2rem;
			display: flex;
			flex-direction: row;
			gap: 1.2rem;
		}
	}

	a {
		text-decoration: none;
		color: var(--font-3);
		font: 1.2em var(--f-Regular);
		padding: 0.1rem 0.7rem;
		border-radius: 4px;
	}

	.active {
		color: var(--font-1);
		background: var(--background-4);
	}

</style>