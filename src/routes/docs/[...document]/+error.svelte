<script>
	import errorImg from '$lib/assets/images/error.svg';
</script>

<div>
	<img src={errorImg} alt="error" />
	<h1>Something Has Caused An Error!</h1>

	<p>
		Apologies! An error has occured. There are a few known reasons for a document to render
		improperly:
	</p>
	<ol>
		<li>No H1 (#) tag in the markdown file (fix coming soon!)</li>
	</ol>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		margin: 20px;
	}

	h1 {
		font-family: 'EB Garamond';
		font-size: 3em;
		color: var(--font-2);
	}
	p {
		font-family: 'EB Garamond';
		font-size: 2em;
		color: var(--font-1);
	}

	li {
		font-family: 'EB Garamond';
		font-size: 1.5em;
		color: var(--font-1);
	}

	img {
		height: 6rem;
		filter: invert(63%) sepia(95%) saturate(6235%) hue-rotate(333deg) brightness(88%) contrast(91%);
	}
</style>
