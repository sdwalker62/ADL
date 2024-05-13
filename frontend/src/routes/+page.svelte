<script lang="ts">
	import VMAN from '$lib/assets/images/VMAN.svg';
</script>

<div id="content-main__container">
	<h1>Welcome to the Athena Library!</h1>
	<img src={VMAN} alt="Athena Logo" />
	<p>
		This library contains information on numerous subjects within Mathematics and Computer Science.
	</p>
</div>

<style lang="scss">
	#content-main__container {
		display: flex;
		flex-direction: column;
		background-color: var(--background-2);
		height: 100%;
		align-items: center;
		padding: 4rem;
	}

	img {
		height: 50rem;
		width: 80%;
		@media (min-width: 640px) {
			height: 50rem;
			width: 50rem;
		}
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
