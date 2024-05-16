import { h, render } from '../../scripts/preact.js';
import htm from '../../scripts/htm.js';

// Initialize htm with Preact
const html = htm.bind(h);

function App (props) {
  return html`<h1>Hello ${props.name}!</h1>`;
}


export default function decorate(block) {

  block.innerHTML = '';
  render(html`<${App} name="World" />`, block);

}