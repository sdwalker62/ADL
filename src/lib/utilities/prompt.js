/**
 *
 * @param {HTMLElement | Element} element
 */
export function addPrompt(element) {
	const nLines = element.querySelectorAll('span.code-line');
	if (nLines.length === 1) {
		if (element.childNodes[0].hasChildNodes) {
			let codeContainer = element.childNodes[0];
			let promptElement = document.createElement('span');
			promptElement.className = 'document-code-prompt';
			promptElement.textContent = 'user@host$ | ';
			/* @ts-ignore */
			codeContainer.prepend(promptElement);
		}
	}
}
