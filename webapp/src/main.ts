import './style.css';
import { initialize, onKeydown, update } from './classes/gamemanager';

function main() {
  const score = getScore();
  initialize(score);

  function loop(timestamp: DOMHighResTimeStamp) {
    update(timestamp);
    window.requestAnimationFrame(loop);
  }

  window.requestAnimationFrame(loop);

  document.addEventListener("keydown", ev => {
    onKeydown(ev);
  });
}

function getScore(): number | null {
  const params = new URLSearchParams(window.location.search)
  const scoreStr = params.get("score")
  if (scoreStr != null) {
    const score = parseInt(scoreStr);
    if (isNaN(score)) {
      console.error(`Score (${scoreStr}) is not a valid int`);
    } else {
      return score
    }
  }

  return null;
}

main();
