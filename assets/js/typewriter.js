const typeSound = new Audio('assets/audio/keypress.mp3');
typeSound.preload = 'auto';
typeSound.volume = 0.2;

export function typeLine(container, text, opts = {}) {
  return new Promise(resolve => {
    const div = document.createElement('div');
    if (opts.className) div.className = opts.className;
    container.appendChild(div);
    let i = 0;
    const speed = opts.speed ?? 50;
    const jitter = opts.jitter ?? 30;
    const silent = opts.silent ?? false;
    const interval = setInterval(() => {
      if (i < text.length) {
        div.textContent += text[i];
        if (!silent && text[i] !== ' ') {
          typeSound.currentTime = 0;
          typeSound.play().catch(() => {});
        }
        i++;
      } else {
        clearInterval(interval);
        container.scrollTop = container.scrollHeight;
        resolve();
      }
    }, speed + Math.random() * jitter);
  });
}

export const wait = ms => new Promise(r => setTimeout(r, ms));

export async function typeLines(container, lines, opts = {}) {
  for (let i = 0; i < lines.length; i++) {
    await typeLine(container, lines[i], opts);
    await wait(opts.linePause ?? 400);
    if (opts.clearAt?.includes(i)) {
      await wait(800);
      container.innerHTML = '';
    }
    if (opts.onLine) opts.onLine(i, lines[i]);
  }
}

export function appendCursor(container) {
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  container.appendChild(cursor);
  return cursor;
}
