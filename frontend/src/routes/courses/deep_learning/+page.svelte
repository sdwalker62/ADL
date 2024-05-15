<script lang="ts">
    import backgroundVideo from '$lib/assets/videos/deep_learning_landing_page.webm';

</script>

<main>
    <h1>Deep Learning Course</h1>
    <video autoplay loop muted playsinline preload="metadata" src={backgroundVideo}></video>
</main>

<style lang="scss">
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 100%;

    }

    h1 {
        font-size: 6rem;
        font-family: var(--f-Light), sans-serif;
        color: var(--font-1);
        padding: 4rem;
    }

    video {
        // position: fixed;
        width: 100%;
        height: 50%;
        // background-size: cover;
    }
</style>