<script lang="ts">
    import Play from "$lib/assets/icons/Play.svelte";

    export let title = '';
    export let description = '';
    export let link = '';
</script>

<div id="widget-canvas">
    <p>{description}</p>
    <div id="icon">
        <a href={link}><Play /></a>
    </div>
    
</div>

<style lang="scss">
    #widget-canvas {
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--background-10);
        gap: 1.5rem;
        padding: 1rem 1rem;
        border-radius: 7px;
        width: 100%;
    }

    #icon {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    h1 {
		color: var(--font-2);
		font-family: var(--f-ExtraBold), sans-serif;
		font-size: 2rem;
		font-weight: 100;
    }

    p {
		color: var(--font-2);
		line-height: 1.5;
		font-family: var(--f-Regular), sans-serif;
		font-size: 1.4rem;
        // max-height: 3rem;
    }

    a {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem 0.5rem;
    }
</style>