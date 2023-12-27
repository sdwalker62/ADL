<script>
	import constructionImg from '$lib/assets/images/construction.svg';
</script>

<div id="home-canvas">
	<h1>Documentation</h1>
	<img src={constructionImg} alt="construction" />
	<h1 id="construction-text">Under Construction</h1>
	<div id="current-prog">
		<div class="progress-item">
			<label for="file">Total Documentation Progress:</label>
			<progress max="100" value="80"> 40% </progress>
		</div>
		<div class="progress-item">
			<label for="file">Basic Documentation:</label>
			<progress max="100" value="95"> 80% </progress>
		</div>
		<div class="progress-item">
			<label for="file">Search:</label>
			<progress max="100" value="0"> 0% </progress>
		</div>
		<div class="progress-item">
			<label for="file">Random Bug Fixes:</label>
			<progress max="100" value="0"> 0% </progress>
		</div>
	</div>
</div>

<style>
	#home-canvas {
		display: flex;
		flex-direction: column;
		background-color: var(--background-1);
		padding: 20px;
		gap: 40px;
	}

	#current-prog {
		display: grid;
		grid-template-rows: 10rem;
		align-items: center;
	}

	.progress-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 20px;
		justify-content: end;
		margin-right: 40%;
		height: 8rem;
	}

	progress {
		border: 0;
		height: 40px;
		border-radius: 10px;
		width: 50%;
	}
	progress::-webkit-progress-bar {
		border: 0;
		height: 40px;
		border-radius: 10px;
		background-color: var(--background-4);
	}
	progress::-webkit-progress-value {
		border: 0;
		height: 40px;
		border-radius: 10px;
		background-color: var(--highlight);
	}
	progress::-moz-progress-bar {
		border: 0;
		height: 40px;
		border-radius: 10px;
		background-color: var(--background-4);
	}

	label {
		font-family: 'SF Pro';
		font-size: 1.4em;
		font-weight: 500;
		color: var(--font-1);
	}

	h1 {
		font-family: 'EB Garamond';
		color: var(--font-2);
		font-weight: 300;
	}

	h1::first-letter {
		font-size: 1.5em;
		font-weight: 500;
	}

	img {
		height: 100px;
		filter: invert(59%) sepia(64%) saturate(3911%) hue-rotate(17deg) brightness(98%) contrast(97%);
	}

	#construction-text {
		display: flex;
		align-self: center;
	}
</style>
