/**
 * 
 * @param {boolean} isSerif 
 */
// export function toggleSerif(isSerif) {
//     let documentRender = document.getElementById('document');
//
//     let paragraphStyle, headingStyle;
//     if (isSerif) {
//         paragraphStyle = 'EB Garamond';
//         headingStyle = 'EB Garamond';
//     } else {
//         paragraphStyle = 'SF-Pro-Text-Regular';
//         headingStyle = 'SF Pro Display Semibold';
//     }
//
//     if (documentRender) {
//
//         // Switch Paragraphs
//         let paragraphs = documentRender.getElementsByTagName('p');
//         for (let i = 0; i < paragraphs.length; i++) {
//             let paragraph = paragraphs.item(i);
//             paragraph.style.fontFamily = paragraphStyle;
//
//         }
//         let headings = documentRender.querySelectorAll('h1, h2, h3, h4, h5, h6');
//         for (let i = 0; i < headings.length; i++) {
//             let heading = headings.item(i);
//             heading.style.fontFamily = headingStyle;
//         }
//     }
// };