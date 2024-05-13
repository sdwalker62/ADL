<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import { Menu } from 'lucide-svelte';
	import { page } from '$app/stores';
</script>

<main>
	<nav>
		<button id="main__menu"><Menu size={36}/></button>
		<menu>
			<menuitem><a href="/" class:active="{$page.url.pathname.endsWith("/")}">Home</a></menuitem>
			<menuitem><a href="/docs" class:active="{$page.url.pathname.includes("/docs")}">Documentation</a></menuitem>
		</menu>
	</nav>
	<slot />
</main>
<ModeWatcher />

<style lang="scss"> 

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

	main {
		// position: absolute;
		// top: 0;
		// left: 0;
		background-color: var(--background-1);
		// width: 100vw;
		// height: 100vh;
	}

	nav {
		@media (min-width: 640px) {
			display: flex;
			align-items: center;
			height: 2.5rem;
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

	#main__menu {
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

</style>