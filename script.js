const title = document.querySelector('#pixelTitle');
const titleWrap = document.querySelector('#titleWrap');
const hero = document.querySelector('.hero');
const phrase = ['HAPPY', 'BIRTHDAY', 'SAMMOOOOOOOO'];
const chars = [];

phrase.forEach((line, lineIndex) => {
  [...line].forEach((character) => {
    const pixel = document.createElement('span');
    pixel.textContent = character;
    title.appendChild(pixel);
    chars.push(pixel);
  });
  if (lineIndex < phrase.length - 1) {
    const lineBreak = document.createElement('span');
    lineBreak.className = 'break';
    title.appendChild(lineBreak);
  }
});

function revealPixels() {
  const distance = window.scrollY;
  const revealStart = Math.min(window.innerHeight * .18, hero.offsetHeight * .18);
  const revealLength = hero.offsetHeight * .6;
  const progress = Math.max(0, Math.min(1, (distance - revealStart) / revealLength));
  const revealed = Math.ceil(progress * chars.length);
  chars.forEach((char, index) => char.classList.toggle('revealed', index < revealed));
  titleWrap.style.transform = `translateY(${Math.max(-18, progress * -28)}px)`;
}
window.addEventListener('scroll', revealPixels, { passive: true });
window.addEventListener('resize', revealPixels);
revealPixels();

const noButton = document.querySelector('#noButton');
const yesButton = document.querySelector('.yes');
const message = document.querySelector('#answerMessage');
function noIsActuallyYes() {
  noButton.textContent = 'YES!!! ♡';
  noButton.classList.remove('no');
  noButton.classList.add('yes');
  message.textContent = 'correct answer unlocked ✧';
}
noButton.addEventListener('mouseenter', noIsActuallyYes, { once: true });
noButton.addEventListener('focus', noIsActuallyYes, { once: true });
document.querySelector('#answers').addEventListener('click', (event) => {
  if (event.target.closest('button')) message.textContent = 'obviously. you are very, very loved. ♡';
});

const photoFiles = [
  'WhatsApp Image 2026-09-19 at 7.18.34 PM.jpeg', 'WhatsApp Image 2026-09-19 at 7.18.34 PM (1).jpeg',
  'WhatsApp Image 2026-09-19 at 7.18.34 PM (2).jpeg', 'WhatsApp Image 2026-09-19 at 7.18.34 PM (3).jpeg',
  'WhatsApp Image 2026-09-19 at 7.18.34 PM (4).jpeg', 'WhatsApp Image 2026-09-19 at 7.18.34 PM (5).jpeg',
  'WhatsApp Image 2026-09-19 at 7.18.34 PM (6).jpeg', 'WhatsApp Image 2026-09-19 at 7.18.34 PM (7).jpeg',
  'WhatsApp Image 2026-09-19 at 7.18.34 PM (8).jpeg', 'WhatsApp Image 2026-09-19 at 7.18.34 PM (9).jpeg',
  'WhatsApp Image 2026-09-19 at 5.12.15 PM.jpeg', 'WhatsApp Image 2026-09-19 at 5.12.16 PM.jpeg',
  'WhatsApp Image 2026-09-19 at 5.12.17 PM.jpeg', 'WhatsApp Image 2026-09-19 at 5.12.17 PM (1).jpeg',
  'WhatsApp Image 2026-09-19 at 5.12.18 PM.jpeg'
];
const memoryTrack = document.querySelector('#memoryTrack');
const modal = document.querySelector('#photoModal');
const modalImage = document.querySelector('#modalImage');
function memoryCard(file, index) {
  const button = document.createElement('button');
  button.className = 'memory-card'; button.style.setProperty('--tilt', `${[-4, 3, -2, 5, -5][index % 5]}deg`);
  button.innerHTML = `<img src="${encodeURI(file)}" alt="Memory ${index + 1} with Sammo" /><span>memory no. ${String(index + 1).padStart(2, '0')} ♡</span>`;
  button.addEventListener('click', () => { modalImage.src = encodeURI(file); modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); });
  return button;
}
[...photoFiles, ...photoFiles].forEach((file, index) => memoryTrack.appendChild(memoryCard(file, index % photoFiles.length)));
document.querySelector('.modal-close').addEventListener('click', () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); });
modal.addEventListener('click', (event) => { if (event.target === modal) document.querySelector('.modal-close').click(); });

const products = [
  { id: 'doctor', name: 'tiny doctor set', description: 'for curing everybody with sparkle medicine', old: '₹1,299', art: '🩺', color: '#e84e78' },
  { id: 'kitchen', name: 'little kitchen set', description: 'five-star pretend pasta, obviously', old: '₹2,499', art: '🍳', color: '#f6a049' },
  { id: 'dog', name: 'puppy soft toy', description: 'a pocket-sized best friend with floppy ears', old: '₹899', art: '🐶', color: '#b27254' },
  { id: 'top', name: 'the cutest top', description: 'for officially serving birthday looks', old: '₹1,799', art: '🎀', color: '#d85593' },
  { id: 'bunny', name: 'another rabbit soft toy', description: 'because one bunny is simply not enough', old: '₹1,099', art: '🐰', color: '#90718d' },
  { id: 'cramp', name: 'cramp relief machine', description: 'a tiny villain-defeating contraption', old: '₹4,999', art: '⚡', color: '#a45d9c', out: true },
  { id: 'boyfriend', name: 'a disloyal boyfriend', description: 'absolutely not. returned to the universe.', old: '₹99,999', art: '<span class="tiny-art">BOY<br>BYE</span>', color: '#7688a8', out: true },
  { id: 'pony', name: 'a pink pony', description: 'for transport and dramatic entrances', old: '₹72,000', art: '🦄', color: '#c86aab', out: true },
  { id: 'moon', name: 'one piece of the moon', description: 'pretty, impractical, currently unavailable', old: '₹∞', art: '🌙', color: '#e2a53e', out: true }
];
const defaultItems = [{ id: 'sundarta', name: 'sundarta', price: 0 }, { id: 'joy', name: 'extra birthday joy', price: 0 }];
let cartItems = [...defaultItems];
const grid = document.querySelector('#productGrid'); const cartList = document.querySelector('#cartItems'); const cartCount = document.querySelector('#cartCount'); const total = document.querySelector('#cartTotal'); const shopMessage = document.querySelector('#shopMessage');
function renderShop() {
  grid.innerHTML = products.map(p => `<article class="product ${p.out ? 'out' : ''} ${cartItems.some(i => i.id === p.id) ? 'is-added' : ''}" style="--product-bg:${p.color}26;--product-color:${p.color}"><div class="product-art">${p.art}</div><span class="tag">${p.out ? 'SOLD OUT' : 'BIRTHDAY 100% OFF'}</span><h3>${p.name}</h3><p>${p.description}</p><div class="price"><del>${p.old}</del><strong>${p.out ? 'not today' : '₹0'}</strong></div><button type="button" data-id="${p.id}">${p.out ? 'notify me never' : cartItems.some(i => i.id === p.id) ? 'in cart ♡' : 'add to tiny cart'}</button></article>`).join('');
  cartList.innerHTML = cartItems.map(item => `<li><span>${item.name}</span>${defaultItems.some(d => d.id === item.id) ? '<small>free forever</small>' : `<button data-remove="${item.id}" aria-label="Remove ${item.name}">×</button>`}</li>`).join('');
  cartCount.textContent = cartItems.length; total.textContent = cartItems.reduce((sum, item) => sum + item.price, 0);
}
grid.addEventListener('click', event => { const id = event.target.dataset.id; if (!id) return; const item = products.find(p => p.id === id); if (item.out) { shopMessage.textContent = `oh no! ${item.name} is not in stock. the universe said absolutely not. ✕`; return; } if (cartItems.some(i => i.id === id)) { shopMessage.textContent = 'that precious thing is already tucked safely in your cart ♡'; return; } cartItems.push({ id: item.id, name: item.name, price: 0 }); shopMessage.textContent = `${item.name} added. birthday magic applied: ₹0! ✦`; renderShop(); });
cartList.addEventListener('click', event => { const id = event.target.dataset.remove; if (!id) return; cartItems = cartItems.filter(item => item.id !== id); shopMessage.textContent = 'item put back on the shelf... for now.'; renderShop(); });
const finale = document.querySelector('#finale');
let dossierTimer;
document.querySelector('#checkoutButton').addEventListener('click', () => {
  const required = products.filter(p => !p.out); const missing = required.filter(p => !cartItems.some(i => i.id === p.id));
  if (missing.length) { shopMessage.textContent = `not enough items in cart! ${missing.length} birthday dream${missing.length > 1 ? 's are' : ' is'} still missing ✕`; return; }
  shopMessage.textContent = 'order accepted! your birthday wishes are now being packed in fairy dust ♡';
  setTimeout(() => {
    finale.classList.remove('gallery'); finale.classList.add('show'); finale.setAttribute('aria-hidden', 'false');
    dossierTimer = setTimeout(() => finale.classList.add('gallery'), 4800);
  }, 850);
});
document.querySelector('#againButton').addEventListener('click', () => { clearTimeout(dossierTimer); finale.classList.remove('show', 'gallery'); finale.setAttribute('aria-hidden', 'true'); });
document.querySelector('#cartToggle').addEventListener('click', () => document.querySelector('#cart').scrollIntoView({ behavior: 'smooth', block: 'center' }));
renderShop();

const dust = document.querySelector('#fairyDust');
function sprinkleDust() { const particle = document.createElement('i'); particle.className = 'dust'; particle.textContent = Math.random() > .55 ? '✦' : '♥'; particle.style.left = `${Math.random() * 100}vw`; particle.style.setProperty('--drift', `${(Math.random() - .5) * 180}px`); particle.style.setProperty('--speed', `${4 + Math.random() * 5}s`); dust.appendChild(particle); particle.addEventListener('animationend', () => particle.remove()); }
setInterval(sprinkleDust, 460);
