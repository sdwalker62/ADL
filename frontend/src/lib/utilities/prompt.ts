export function addPrompt(element: HTMLElement) {
	const nLines = element.querySelectorAll('span.code-line');
	if (nLines.length === 1) {
		if (element.childNodes[0]) {
			let codeContainer = element.childNodes[0] as HTMLElement;
			let promptElement = document.createElement('span');
			promptElement.className = 'document-code-prompt';
			promptElement.textContent = 'user@host$ ';
			codeContainer.prepend(promptElement);
		}
	}
}
