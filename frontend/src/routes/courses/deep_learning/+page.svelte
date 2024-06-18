<script lang="ts">
    import backgroundVideo from '$lib/assets/videos/deep_learning_1080.webm';
    import PageLink from '$lib/components/Courses/PageLink.svelte';
</script>

<video autoplay loop muted playsinline preload="metadata" src={backgroundVideo}></video>
<main>
    <div id="main-background__container">
        <h1>Deep Learning</h1>
        <p>description coming soon</p>
        <div id="main-course__grid">
            <div class="course-list__container">
                <h3>Linear Classifiers and Gradient Descent</h3>
                <PageLink
                    title="Supervised Learning and Parametric Models"
                    description="Supervised Learning and Parametric Models"
                    link="https://athenalib.com/docs//var/www/athenalib.com/source/frontend/data/Machine%20Learning/Deep%20Learning/Novice/Module%201%20-%20Lesson%201:%20Linear%20Classifiers%20and%20Gradient%20Descent/Supervised%20Learning%20and%20Parametric%20Models.md"
                />
                <PageLink
                title="Components of a Parametric Learning Algorithm"
                description="Components of a Parametric Learning Algorithm"
                link="https://athenalib.com/docs//var/www/athenalib.com/source/frontend/data/Machine%20Learning/Deep%20Learning/Novice/Module%201%20-%20Lesson%201:%20Linear%20Classifiers%20and%20Gradient%20Descent/Components%20of%20A%20Parametric%20Learning%20Algorithm.md"
                />
                <PageLink
                title="Performance Measure For A Classifier"
                description="Performance Measure For A Classifier"
                link="https://athenalib.com/docs//var/www/athenalib.com/source/frontend/data/Machine%20Learning/Deep%20Learning/Novice/Module%201%20-%20Lesson%201:%20Linear%20Classifiers%20and%20Gradient%20Descent/Performance%20Measure%20For%20A%20Classifier.md"
                />
                <PageLink
                title="Linear Algebra View: Vector and Matrix Sizes"
                description="Linear Algebra View: Vector and Matrix Sizes"
                link="https://athenalib.com/docs//var/www/athenalib.com/source/frontend/data/Machine%20Learning/Deep%20Learning/Novice/Module%201%20-%20Lesson%201:%20Linear%20Classifiers%20and%20Gradient%20Descent/Linear%20Algebra%20View:%20Vector%20and%20Matrix%20Sizes.md"
                />
                <PageLink
                title="How is Deep Learning Different? Hierarchical Compositionality"
                description="How is Deep Learning Different? Hierarchical Compositionality"
                link="https://athenalib.com/docs//var/www/athenalib.com/source/frontend/data/Machine%20Learning/Deep%20Learning/Novice/Module%201%20-%20Lesson%201:%20Linear%20Classifiers%20and%20Gradient%20Descent/How%20is%20Deep%20Learning%20Different:%20HC.md"
                />
                <PageLink
                title="How is Deep Learning Different? End-to-End Learning"
                description="How is Deep Learning Different? End-to-End Learning"
                link="https://athenalib.com/docs//var/www/athenalib.com/source/frontend/data/Machine%20Learning/Deep%20Learning/Novice/Module%201%20-%20Lesson%201:%20Linear%20Classifiers%20and%20Gradient%20Descent/How%20is%20Deep%20Learning%20Different:%20End-to-End.md"
                />
                <PageLink
                title="Gradient Descent"
                description="Gradient Descent"
                link="https://athenalib.com/docs//var/www/athenalib.com/source/frontend/data/Machine%20Learning/Deep%20Learning/Novice/Module%201%20-%20Lesson%201:%20Linear%20Classifiers%20and%20Gradient%20Descent/Gradient%20Descent.md"
                />
                <PageLink
                title="How is Deep Learning Different? Distributed Representations"
                description="How is Deep Learning Different? Distributed Representations"
                link="https://athenalib.com/docs//var/www/athenalib.com/source/frontend/data/Machine%20Learning/Deep%20Learning/Novice/Module%201%20-%20Lesson%201:%20Linear%20Classifiers%20and%20Gradient%20Descent/How%20is%20Deep%20Learning%20Different:%20DR.md"
                />
                <PageLink
                title="Deep Learning Book: Linear Algebra"
                description="Deep Learning Book: Linear Algebra"
                link="https://athenalib.com/docs//var/www/athenalib.com/source/frontend/data/Machine%20Learning/Deep%20Learning/Novice/Module%201%20-%20Lesson%201:%20Linear%20Classifiers%20and%20Gradient%20Descent/DL_Book_Linear_Algebra.pdf"
                />
                <PageLink
                title="Deep Learning Book: Probability and Information Theory"
                description="Deep Learning Book: Probability and Information Theory"
                link="https://athenalib.com/docs//var/www/athenalib.com/source/frontend/data/Machine%20Learning/Deep%20Learning/Novice/Module%201%20-%20Lesson%201:%20Linear%20Classifiers%20and%20Gradient%20Descent/DL_Book_Probability_And_Information_Theory.pdf"
                />
                <PageLink
                title="Deep Learning Book: Machine Learning Basics"
                description="Deep Learning Book: Machine Learning Basics"
                link="https://athenalib.com/docs//var/www/athenalib.com/source/frontend/data/Machine%20Learning/Deep%20Learning/Novice/Module%201%20-%20Lesson%201:%20Linear%20Classifiers%20and%20Gradient%20Descent/DL_Book_Machine_Learning_Basics.pdf"
                />
                <PageLink
                title="Deep Learning"
                description="Deep Learning"
                link="https://athenalib.com/docs//var/www/athenalib.com/source/frontend/data/Machine%20Learning/Deep%20Learning/Novice/Module%201%20-%20Lesson%201:%20Linear%20Classifiers%20and%20Gradient%20Descent/Deep_Learning.pdf"
                />
                <PageLink
                title="The Bandwagon"
                description="The Bandwagon"
                link="https://athenalib.com/docs//var/www/athenalib.com/source/frontend/data/Machine%20Learning/Deep%20Learning/Novice/Module%201%20-%20Lesson%201:%20Linear%20Classifiers%20and%20Gradient%20Descent/The_Bandwagon.pdf"
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
        height: calc(100vh - 2.5rem);
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
        height: 100vh;
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