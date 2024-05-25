import './style.css';
import { initialize, onKeydown, update } from './classes/gamemanager'; 

function main() {
  initialize();

  function loop(timestamp: DOMHighResTimeStamp) {
    update(timestamp);
    window.requestAnimationFrame(loop);
  }

  window.requestAnimationFrame(loop);

  document.addEventListener("keydown", ev => {
    onKeydown(ev);
  });
}

main();
