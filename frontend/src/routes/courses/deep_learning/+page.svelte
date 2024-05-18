<script lang="ts">
    import backgroundVideo from '$lib/assets/videos/deep_learning_1080.webm';
    import PageLink from '$lib/components/Courses/PageLink.svelte';
</script>

<video autoplay loop muted playsinline preload="metadata" src={backgroundVideo}></video>
<main>
    <div id="main-background__container">
        <h1>Deep Learning</h1>
        <p> This is a course on Deep learning!</p>
        <div id="main-course__grid">
            <div class="course-list__container">
                <h3>Introduction</h3>
                <PageLink
                    title="Introduction to Deep Learning"
                    description="This will introduce you to the fundamentals of Deep Learning. It covers loss functions, activation functions, network optimization, and more."
                    link="/courses/deep_learning/introduction"
                />
                <PageLink
                title="Introduction to Deep Learning"
                description="This will introduce you to the fundamentals of Deep Learning. It covers loss functions, activation functions, network optimization, and more."
                link="/courses/deep_learning/introduction"
            />
            </div>
            <div class="course-list__container">
                <h3>Introduction</h3>
                <PageLink
                    title="Introduction to Deep Learning"
                    description="This will introduce you to the fundamentals of Deep Learning. It covers loss functions, activation functions, network optimization, and more."
                    link="/courses/deep_learning/introduction"
                />
            </div>
            <div class="course-list__container">
                <h3>Introduction</h3>
                <PageLink
                    title="Introduction to Deep Learning"
                    description="This will introduce you to the fundamentals of Deep Learning. It covers loss functions, activation functions, network optimization, and more."
                    link="/courses/deep_learning/introduction"
                />
            </div>
        </div>
    </div>
</main>

<style lang="scss">
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 100%;
        z-index: 1;
    }

    #main-course__grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 2rem;
        padding: 2rem;
        width: 100%;
    }

    #main-background__container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
        background: #0a0a0ad8;
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
		border-radius: 1rem;
    }

    .course-list__container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    h1 {
		color: var(--font-2);
		font-family: var(--f-ExtraBold), sans-serif;
		font-size: 6rem;
		font-weight: 100;
		padding: 3rem 0;
    }

    h3 {
        color: var(--font-2);
		font-family: var(--f-Bold), sans-serif;
		font-size: 2.3rem;
		opacity: 0.8;
		padding: 1.3rem 0;
    }

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

    p {
        padding: 1rem 2rem;
		color: var(--font-2);
		line-height: 1.5;
		font-family: var(--f-Regular), sans-serif;
		font-size: 2rem;
    }
</style>