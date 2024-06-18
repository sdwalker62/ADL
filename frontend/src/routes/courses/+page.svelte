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
        <a href="/courses/deep_learning" class="course-anchor">
            <div id="course-container__deep-learning">
                <DeepLearning />
                <span class="course-title">Deep Learning Fundamentals</span>
            </div>
        </a>
        
    </div>
</main>

<style lang="scss">

    video {
        position: absolute;
        width: 100vw;
        height: 100%;
        top: 2.5rem;
        left: 0;
        margin: 0;
        padding: 0;
        object-fit: cover;
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
        overflow: scroll;
        width: 40rem;
        height: calc(100vh - 2.5rem - 4rem);
        max-height: calc(100vh - 2.5rem - 4rem);
        background: #0a0a0ad8;
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border-radius: 1rem;
        padding: 2rem;

        &::-webkit-scrollbar {
            display: none;
        }
    }



    #course-container__deep-learning {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        background: var(--background-4);
        padding: 1rem 1rem;
        border-radius: 7px;
        margin-top: 2rem;
        width: 100%;
        max-height: 8rem;
        min-height: 8rem;
        overflow: scroll;

        &:hover {
            background: var(--gradient-1);
            cursor: pointer;
        }
    }

    .course-title {
        font-family: var(--f-Medium), sans-serif;
        font-size: 2rem;
    }

    h1 {
		color: var(--font-2);
		font-family: var(--f-ExtraBold), sans-serif;
		font-size: 4rem;
		font-weight: 100;
		padding: 3rem 0;
    }

    p {
		color: var(--font-2);
		line-height: 1.5;
		font-family: var(--f-Regular), sans-serif;
		font-size: 1.6rem;
        max-width: 80ch;
        margin: 1rem 0;
    }

    .course-anchor {
        text-decoration: none;
        color: var(--font-1);

        &::-webkit-scrollbar {
            display: none;
        }
    }
</style>