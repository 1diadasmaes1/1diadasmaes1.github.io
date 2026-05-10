const MORSE = {
  'A': '.-',    'B': '-...',  'C': '-.-.',  'D': '-..',   'E': '.',
  'F': '..-.',  'G': '--.',   'H': '....',  'I': '..',    'J': '.---',
  'K': '-.-',   'L': '.-..',  'M': '--',    'N': '-.',    'O': '---',
  'P': '.--.',  'Q': '--.-',  'R': '.-.',   'S': '...',   'T': '-',
  'U': '..-',   'V': '...-',  'W': '.--',   'X': '-..-',  'Y': '-.--',
  'Z': '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
  '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.'
};

const MORSE_REVERSE = Object.fromEntries(
  Object.entries(MORSE).map(([k, v]) => [v, k])
);

export function encodeMorse(str) {
  return str.toUpperCase().split('').map(ch => {
    if (ch === ' ') return '/';
    return MORSE[ch] ?? '';
  }).filter(Boolean).join(' ');
}

export function decodeMorse(code) {
  return code.trim().split(/\s+/).map(token => {
    if (token === '/') return ' ';
    return MORSE_REVERSE[token] ?? '';
  }).join('');
}

export function encodeB64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

export function decodeB64(str) {
  try {
    return decodeURIComponent(escape(atob(str.trim())));
  } catch {
    return '';
  }
}

export function encodeHex(str) {
  const bytes = new TextEncoder().encode(str);
  return Array.from(bytes)
    .map(b => b.toString(16).toUpperCase().padStart(2, '0'))
    .join(' ');
}

export function decodeHex(str) {
  const cleaned = str.replace(/\s+/g, '').replace(/^0x/i, '');
  if (cleaned.length % 2 !== 0) return '';
  const bytes = [];
  for (let i = 0; i < cleaned.length; i += 2) {
    const code = parseInt(cleaned.substr(i, 2), 16);
    if (Number.isNaN(code)) return '';
    bytes.push(code);
  }
  // decoda como UTF-8 (suporta acentos)
  try {
    return new TextDecoder('utf-8').decode(new Uint8Array(bytes));
  } catch {
    return '';
  }
}

// === BINÁRIO ===
// cada caractere UTF-8 vira 8 bits, separados por espaço
export function encodeBin(str) {
  const bytes = new TextEncoder().encode(str);
  return Array.from(bytes)
    .map(b => b.toString(2).padStart(8, '0'))
    .join(' ');
}

export function decodeBin(str) {
  const cleaned = str.replace(/[^01]/g, '');
  if (cleaned.length % 8 !== 0 || cleaned.length === 0) return '';
  const bytes = [];
  for (let i = 0; i < cleaned.length; i += 8) {
    bytes.push(parseInt(cleaned.substr(i, 8), 2));
  }
  try {
    return new TextDecoder('utf-8').decode(new Uint8Array(bytes));
  } catch {
    return '';
  }
}

export function attachLiveDecoder(inputEl, outputEl, decoder) {
  const update = () => {
    const decoded = decoder(inputEl.value);
    outputEl.textContent = decoded;
    outputEl.classList.toggle('has-content', decoded.length > 0);
  };
  inputEl.addEventListener('input', update);
  update();
}

// === Normalização pra comparações flexíveis ===
// Tira acentos, lowercase, trim — ela pode digitar RESILIENCIA ou resilíência.
export function normalize(s) {
  return (s || '').normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();
}
