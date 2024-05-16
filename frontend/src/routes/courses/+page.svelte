<script lang="ts">
    import backgroundVideo from '$lib/assets/videos/rubiks_robot_color.webm';
	import { onMount } from 'svelte';

    onMount(() => {
        const video = document.querySelector('video');
        video!.playbackRate = 0.9;
    });
</script>

<video autoplay loop muted playsinline preload="metadata" src={backgroundVideo}></video>
<main>
    <div id="main-course__canvas">
        <h1>Available Courses</h1>
        <p>
            Below are the currently available courses. We intend to add courses from throughout 
            the Machine Learning and Mathematics world. Only a small team of dedicated individuals
            work to build and maintain these courses, so please be patient as we work to add more. 
        </p>
        <p>
            Each course is designed to be self-paced and will teach you the fundamentals of the subject 
            as well as delve into some advanced topics that we hope will spark your interest and keep
            you engaged. 
        </p>
        <a href="/courses/deep_learning"> Deep Learning </a>
    </div>
</main>

<style lang="scss">

    video {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 1.4rem;
        left: 0;
        background-size: cover;
        margin: 0;
        padding: 0;
        // z-index: -1;
    }

    main {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        padding: 2rem;
        z-index: 1;
    }

    #main-course__canvas {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 33vw;
        max-width: 33vw;
        height: 100%;
        background: #0a0a0ad8;
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border-radius: 1rem;
    }

    h1 {
		color: var(--font-2);
		font-family: var(--f-ExtraBold), sans-serif;
		font-size: 4rem;
		font-weight: 100;
		padding: 3rem 0;
    }

    p {
        padding: 1rem 2rem;
		color: var(--font-2);
		line-height: 1.5;
		font-family: var(--f-Regular), sans-serif;
		font-size: 2rem;
        max-width: 80ch;
    }

    a {
        font-size: 2rem;
        font-family: var(--f-Medium), sans-serif;
        padding: 2rem 1.5rem;
        border: none;
        border-radius: 7px;
        color: white;
        background: var(--gradient-2);
        text-decoration: none;
        margin: 3rem;

        &:hover {
            background: var(--gradient-1);
        }
    }
</style>