export function copyCode(event: Event) {
	const curTargetElement = event.currentTarget;
	/* @ts-ignore */
	const parElement = curTargetElement.parentElement;
	const codeContainer = parElement.parentElement;
	const divBlock = codeContainer.children[1];
	const hasPre = divBlock.children[0].tagName === 'PRE' ? true : false;

	// Outline code blocks don't use pre!
	let codeBlock;
	if (hasPre) {
		const preBlock = divBlock.children[0];
		codeBlock = preBlock.children[0];
	} else {
		codeBlock = divBlock.children[0];
	}
	const codeBlockComponents = codeBlock.children;

	let code = '';
	for (let i = 0; i < codeBlockComponents.length; i++) {
		if (!codeBlockComponents[i].classList.contains('document-code-prompt')) {
			code += codeBlockComponents[i].textContent;
		}
	}
	if (code.includes('user@host$ | ')) {
		navigator.clipboard.writeText(code.slice(13));
	} else {
		navigator.clipboard.writeText(code);
	}
	return null;
}
