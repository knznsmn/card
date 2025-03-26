import { body } from "./utils.js";

export function Main() {

  // Elements
  const main = document.createElement('main');
  const button_clipboard = document.createElement('button');
  button_clipboard.id = "clipboard";
  button_clipboard.textContent = "Paste Clipboard";

  // Anchors
  
  main.appendChild(button_clipboard);
  body.appendChild(main);
}