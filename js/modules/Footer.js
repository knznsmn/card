import { ans } from "./utils.js";
import { body } from "./utils.js";

export function Footer() {

  const footer    = document.createElement('footer');
  const span      = document.createElement('span');
  const p         = document.createElement('p');
  const a         = document.createElement('a');

  span.innerHTML  = `${ans} `;
  a.href          = "https://www.github.com/knznsmn";
  a.title         = "knznsmn's GitHub profile";
  a.textContent   = "knznsmn. ";

  // Anchors
  p.insertAdjacentElement('afterbegin', span);
  p.appendChild(a);
  p.insertAdjacentText('beforeend', 'All rights reversed.')
  footer.appendChild(p);
  body.appendChild(footer);
}