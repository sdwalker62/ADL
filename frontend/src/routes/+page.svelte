<script lang="ts">
	import VMAN from '$lib/assets/images/VMAN.svg';
</script>

<div id="home-canvas">
	<img src={VMAN} alt="Athena Logo" />
	<h1>Welcome to the Athena Library!</h1>
	<p>
		This library contains information on numerous subjects within Mathematics and Computer Science.
	</p>
</div>

<style lang="scss">
	#home-canvas {
		display: flex;
		flex-direction: column;
		background-color: var(--background-1);
		padding: 40px;
		gap: 40px;
		height: 100vh;
		align-items: center;
	}

	img {
		height: 100rem;
		width: 100rem;
	}

	h1 {
		color: var(--font-1);
		font-family: var(--f-ExtraBold), sans-serif;
		font-size: 3rem;
	}

	p {
		color: var(--font-1);
		font-family: var(--f-Regular), sans-serif;
		font-size: 2rem;
	}
</style>
