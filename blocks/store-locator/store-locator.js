import { h, render } from '../../scripts/preact.js';
import htm from '../../scripts/htm.js';
import LocationMap from './locationMap.js';

// Initialize htm with Preact
const html = htm.bind(h);

export default function decorate(block) {

  const pText = block.querySelector('p').textContent;
  block.innerHTML = '';
  render(html`<${LocationMap} heading=${pText} />`, block);

}