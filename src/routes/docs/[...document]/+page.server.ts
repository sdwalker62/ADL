import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';
import rehypeSectionize from '@hbsnow/rehype-sectionize';
import rehypeWrap from 'rehype-wrap-all';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypeRewrite from 'rehype-rewrite';
import fs from 'fs';
import jsdom from 'jsdom';
import dotenv from 'dotenv';
import type { Element } from 'hast';

const { JSDOM } = jsdom;

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	dotenv.config();
	console.log(process.env.INIT_CWD);
	// Handle PDF documents
	if (params.document.endsWith('.pdf')) {
		const contents = fs.readFileSync(params.document, 'base64');
		const outline: Array<any> = [];
		return {
			document: contents,
			outline: outline,
			isPDF: true,
			root: process.env.INIT_CWD
		};
	}

	const contents = fs.readFileSync(params.document, 'utf-8');

	if (!contents) {
		const doc = '<h1> No Document Found! </h1> <p> You can help by writing me!</p>';
		const outline: Array<any> = [];
		return {
			document: doc,
			outline: outline,
			isPDF: false
		};
	}

	const docs = unified()
		.data('settings', { fragment: true })
		.use(remarkParse)
		.use(remarkMath)
		.use(remarkRehype)
		.use(remarkGfm)
		.use(rehypeStringify)
		.use(rehypeKatex)
		.use(rehypePrism)
		.use(rehypeSectionize)
		.use(rehypeSlug)
		.use(rehypeAutolinkHeadings)
		// @ts-ignore
		.use(rehypeWrap, { selector: 'table', wrapper: 'div.table-block' })
		// @ts-ignore
		.use(rehypeRewrite, {
			// A list of supported selectors can be found here:
			// https://github.com/syntax-tree/hast-util-select/blob/main/readme.md#support
			selector: 'section',
			rewrite: (node: Element) => {
				if (node.children) {
					for (let child of node.children) {
						// @ts-ignore
						if (child.tagName && child.tagName[0] === 'h') {
							const sectionHash = String(Math.floor(Math.random() * 90 + 10));
							// @ts-ignore
							child.properties.id = sectionHash + child.properties.id;
						}
					}
				}
			}
		})
		.processSync(contents);

	/*
    We will create a temporary DOM to walk through instead of attempting to extract
    heading information using regular expressions. Regular expressions are more error
    prone and require knowing the appropriate match groups. This method is therefore
    less error prone and more maintainable.
    */
	const htmlDoc = new JSDOM(docs.toString());

	const isMath = (node: HTMLElement) => node.querySelectorAll('span.katex-mathml').length;
	const isCode = (node: HTMLElement) => node.querySelectorAll('code').length;
	const isTable = (node: HTMLElement) => node.querySelectorAll('table').length;

	interface Node {
		name: string;
		tagName: string;
		sectionLevel: string | number | null;
		html: string;
		children: Array<object>;
	}

	function buildOutlineObject(node: HTMLElement): Node {
		let heading = node.querySelector('h1, h2, h3, h4, h5, h6');
		const sectionLevel = node.getAttribute('data-heading-rank')
			? node.getAttribute('data-heading-rank')
			: 0;
		let newNode: Node = {
			name: heading!.id,
			tagName: node.tagName.toLowerCase(),
			sectionLevel: sectionLevel,
			html: node.innerHTML,
			children: [] as Array<object>
		};
		if (node.children) {
			for (const c of node.children) {
				if (c.tagName === 'SECTION') {
					let section = {};
					section = buildOutlineObject(c as HTMLElement);
					newNode.children.push(section);
				} else if (isCode(c as HTMLElement)) {
					if (c.tagName === 'PRE') {
						newNode.children.push({
							tagName: 'code',
							sectionLevel: Number(sectionLevel) + 1,
							html: c.innerHTML
						});
					}
				} else if (isMath(c as HTMLElement)) {
					newNode.children.push({
						tagName: 'math',
						sectionLevel: Number(sectionLevel) + 1,
						html: c.innerHTML
					});
				} else if (isTable(c as HTMLElement)) {
					newNode.children.push({
						tagName: 'table',
						sectionLevel: Number(sectionLevel) + 1,
						html: c.querySelector('thead')!.outerHTML
					});
				}
			}
			return newNode;
		}
		return newNode;
	}

	const outline = buildOutlineObject(
		htmlDoc.window.document.children[0]?.children[1] as HTMLElement
	);

	return {
		document: docs.toString(),
		outline: outline.children,
		isPDF: false
	};
}
