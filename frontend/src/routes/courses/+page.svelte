<script lang="ts">
    import backgroundVideo from '$lib/assets/videos/rubiks_robot_color.webm';
    import DeepLearning from '$lib/assets/icons/deep_learning.svelte';
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
        <div id="course-container__deep-learning">
            <DeepLearning />
            <div id="course-description__container">
                <p class="course-description">
                    This will introduce you to the fundamentals of Deep Learning. It covers 
                    loss functions, activation functions, network optimization, and more.
                </p>
            </div>
            <a href="/courses/deep_learning"> Start </a>
        </div>
        
    </div>
</main>

<style lang="scss">

    video {
        position: absolute;
        width: 100vw;
        height: 100%;
        top: 2.5rem;
        left: 0;
        // background-size: auto;
        margin: 0;
        padding: 0;
        object-fit: fill;
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

    #course-container__deep-learning {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        background: var(--background-4);
        padding: 1rem 1rem;
        border-radius: 7px;
        margin-top: 2rem;
        max-width: 90%;
    }

    #course-description__container {
        background: var(--background-2);
        border-radius: 7px;
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

    .course-description {
        font-size: 1.7rem;
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
        padding: 1.5rem 1.5rem;
        border: none;
        border-radius: 7px;
        color: white;
        background: var(--gradient-2);
        text-decoration: none;

        &:hover {
            background: var(--gradient-1);
        }
    }
</style>