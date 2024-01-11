<script>
</script>

<label class="container"
	>One
	<input type="checkbox" />
	<img class="checkmark" />
</label>

<style>
	.container {
		display: block;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;

		/* TESTING */
		position: absolute;
		left: 500px;
		top: 500px;
		scale: 10;
	}

	.container input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}

	/* Create a custom checkbox */
	.checkmark {
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 8px;
		height: 25px;
		width: 25px;
		background-color: var(--background-2);
	}

	/* On mouse-over, add a grey background color */
	.container:hover input ~ .checkmark {
		background-color: var(--background-4);
	}

	/* When the checkbox is checked, add a blue background */
	.container input:checked ~ .checkmark {
		content: url('src/lib/assets/images/checkmark.square.fill.svg');
		/* background-repeat: no-repeat;
		background-size: 100% 100%; */
	}

	/* Create the checkmark/indicator (hidden when not checked) */
	/* .checkmark:after {
		content: '';
		position: absolute;
		display: none;
	} */

	/* Show the checkmark when checked */
	.container input:checked ~ .checkmark:after {
		display: block;
	}

	/* Style the checkmark/indicator */
	/* .container .checkmark:after {
		left: 9px;
		top: 5px;
		width: 5px;
		height: 10px;
		border: solid white;
		border-width: 0 3px 3px 0;
		-webkit-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		transform: rotate(45deg);
	} */
</style>
