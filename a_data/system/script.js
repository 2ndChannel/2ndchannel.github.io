(function() {
if (/^(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\]|192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+|.+\.local)$/.test(location.hostname) || location.protocol === 'file:') return;
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
ym(108755980, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });
var clarityId = "ВСТАВЬТЕ_ID";
if (clarityId !== "ВСТАВЬТЕ_ID") {
(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script",clarityId);
}
(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","ze7yswuyd9");
var ga = document.createElement('script');
ga.async = true;
ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-GQ6ZY3PPVJ';
document.head.appendChild(ga);
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-GQ6ZY3PPVJ');
})();
function openImg(src){
const fs = document.getElementById("fs");
if(fs) { fs.style.display = "flex"; const img = fs.querySelector("img"); if(img) img.src = src; }
}
function closeImg(){
const fs = document.getElementById("fs");
if(fs) fs.style.display = "none";
}
async function loadNavbar() {
const navCont = document.getElementById('nav');
if (!navCont) return;
try {
const isSubDir = window.location.pathname.includes('/games/') ||
window.location.pathname.includes('/streams/') ||
window.location.pathname.includes('/tnu4/');
const relPath = isSubDir ? '../' : './';
const response = await fetch(relPath + 'a_data/system/nav.html');
const html = await response.text();
navCont.innerHTML = html;
const navInner = document.getElementById('nav-inner');
const menuList = document.getElementById('menu-list');
const menuBtn = document.getElementById('menu-btn');
const menuTitle = document.getElementById('menuTitle');
function isSmallTouch() {
const touch = navigator.maxTouchPoints > 0 || window.matchMedia('(hover: none) and (pointer: coarse)').matches;
return touch && Math.min(window.screen.width, window.screen.height) < 600;
}
if (isSmallTouch()) navInner.classList.add('mobile-mode');
const checkFitting = () => {
if (isSmallTouch()) {
navInner.classList.add('mobile-mode');
return;
}
navInner.classList.remove('mobile-mode');
if (window.innerWidth < 850 || menuList.scrollWidth > navInner.clientWidth - 20) {
navInner.classList.add('mobile-mode');
}
};
menuBtn.onclick = (e) => {
e.stopPropagation();
menuList.classList.toggle('active');
};
document.addEventListener('click', () => {
menuList.classList.remove('active');
});
const links = document.querySelectorAll('.menu-links a');
const currentPath = window.location.pathname.replace(/\/$/, "").toLowerCase();
let foundActive = false;
links.forEach(link => {
const rawHref = link.getAttribute('href');
link.href = relPath + rawHref;
const linkPath = link.pathname.replace(/\/$/, "").toLowerCase();
const btnColor = getComputedStyle(link).getPropertyValue('--btn-color').trim();
if (btnColor.includes('216, 164, 0') || btnColor.includes('#d8a400')) {
link.classList.add('is-yellow');
}
const isHome = (currentPath === "" || currentPath.endsWith("index.html")) &&
(rawHref === "./" || rawHref === "index.html");
const isCurrent = (currentPath === linkPath && rawHref !== "./");
if (isHome || isCurrent) {
link.classList.add('active');
foundActive = true;
if (menuTitle) menuTitle.textContent = link.innerText.trim();
if (btnColor) {
navInner.style.setProperty('--active-color', btnColor);
navInner.classList.add('color-loaded');
}
}
});
if (!foundActive) {
if (menuTitle) menuTitle.textContent = "Страница не найдена";
navInner.style.setProperty('--active-color', '#888888');
navInner.classList.add('color-loaded');
}
checkFitting();
window.addEventListener('resize', checkFitting);
const onNavScroll = () => {
const y = window.scrollY || document.documentElement.scrollTop;
if (y > 40) navInner.classList.add('compact');
else if (y < 10) navInner.classList.remove('compact');
};
window.addEventListener('scroll', onNavScroll, { passive: true });
onNavScroll();
if (typeof fixNumbers === 'function') fixNumbers();
} catch (err) {
console.error('Ошибка загрузки навигации:', err);
}
}
function fixNumbers() {
document.querySelectorAll('h1, h2, h3, .menu-links a').forEach(el => {
if (window.getComputedStyle(el).fontFamily.toLowerCase().includes("machina") && !el.querySelector('.num-fix')) {
Array.from(el.childNodes).forEach(node => {
if (node.nodeType === Node.TEXT_NODE) {
const text = node.textContent;
if (/\d+/.test(text)) {
const span = document.createElement('span');
span.innerHTML = text.replace(/(\d+)/g, '<span class="num-fix">$1</span>');
el.replaceChild(span, node);
}
}
});
}
});
}
document.addEventListener("DOMContentLoaded", () => {loadNavbar(); fixNumbers(); });
window.addEventListener("load", fixNumbers);

function escHtml(t) {
  return String(t == null ? "" : t).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function safeUrl(u) {
  return /^https?:\/\//i.test(u || "") ? escHtml(u) : "";
}
function fmtDate(iso) {
  const p = iso.split('-');
  return p[2] + '.' + p[1] + '.' + p[0];
}
function plural(n, a, b, c) {
  const m = Math.abs(n) % 100, d = m % 10;
  if (m > 10 && m < 20) return c;
  if (d > 1 && d < 5) return b;
  return d === 1 ? a : c;
}
function fillSelect(sel, values, first) {
  sel.innerHTML = '<option value="all">' + first + '</option>' + values.map(v => '<option value="' + escHtml(v) + '">' + escHtml(v) + '</option>').join('');
}


function setupStickyBar() {
const card = document.querySelector('.top-card');
if (!card || card._sticky) return;
card._sticky = true;
const anchor = document.createElement('div');
anchor.className = 'sticky-anchor';
card.parentNode.insertBefore(anchor, card);
let stuck = false, timer = null;
function update() {
const nav = document.getElementById('nav-inner');
const nb = nav ? Math.round(nav.getBoundingClientRect().bottom) : 66;
document.documentElement.style.setProperty('--nav-h', nb + 'px');
const want = anchor.getBoundingClientRect().top <= nb + 2;
if (want === stuck) return;
stuck = want;
if (want) {
anchor.style.height = (card.offsetHeight + 4) + 'px';
card.classList.add('stuck');
const tb = document.getElementById('toggleFilters');
if (tb && tb.getAttribute('aria-expanded') === 'true') tb.click();
} else {
card.classList.remove('stuck');
anchor.style.height = '0';
}
}
function later() { update(); clearTimeout(timer); timer = setTimeout(update, 320); }
window.addEventListener('scroll', later, { passive: true });
window.addEventListener('resize', later);
update();
}
function setupFilters(render, defaults, extra) {
  const $ = id => document.getElementById(id);
  const panel = $('filters'), btn = $('toggleFilters'), cnt = $('fcount');  const ids = Object.keys(defaults);
  if (window.CustomSelect) document.querySelectorAll('#filters select').forEach(el => window.CustomSelect.attach(el));
  function updateCount() {
    const n = ids.filter(id => $(id).value !== defaults[id]).length + (extra && extra.active() ? 1 : 0);
    cnt.textContent = n ? n : '';
  }
  btn.onclick = () => {
    const open = panel.hasAttribute('hidden');
    if (open) panel.removeAttribute('hidden'); else panel.setAttribute('hidden', '');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  };
  document.querySelectorAll('#filters select, #filters input:not(.plat-cb)').forEach(el => el.addEventListener('change', () => { updateCount(); render(); }));
if (extra) extra.el.addEventListener('change', () => { updateCount(); render(); });
setupStickyBar();
  $('f-search').addEventListener('input', render);
  $('resetFilters').onclick = () => {
    $('f-search').value = '';
    ids.forEach(id => $(id).value = defaults[id]);
if (extra) extra.reset();
    updateCount(); render();
  };
  updateCount(); render();
}

async function initStreamsPage() {
  const box = document.getElementById("streams-list");
  if (!box) return;
  const all = (await fetch('streams.json').then(r => r.json())).filter(s => !s.hidden);
  const $ = id => document.getElementById(id);
  fillSelect($('f-year'), [...new Set(all.map(s => s.date.slice(0, 4)))].sort().reverse(), 'Все');
  fillSelect($('f-channel'), [...new Set(all.map(s => s.channel))], 'Все');
  const people = new Set();
  all.forEach(s => (s.frame + ',' + s.voice).split(',').map(x => x.trim()).filter(Boolean).forEach(x => people.add(x.toLowerCase() === 'blood_man' ? 'Blood_Man' : x)));
  fillSelect($('f-person'), [...people].sort((a, b) => a.localeCompare(b, 'ru')), 'Все');
  const norm = x => x.toLowerCase();

  function render() {
    const q = norm($('f-search').value.trim());
    const year = $('f-year').value, ch = $('f-channel').value, person = $('f-person').value, sort = $('f-sort').value;
    let list = all.filter(s =>
      (!q || norm(s.title).includes(q)) &&
      (year === 'all' || s.date.startsWith(year)) &&
      (ch === 'all' || s.channel === ch) &&
      (person === 'all' || norm(s.frame + ',' + s.voice).includes(norm(person))));
    list.sort((a, b) => sort === 'date-asc' ? a.date.localeCompare(b.date) || a.num - b.num : b.date.localeCompare(a.date) || b.num - a.num);
    $('summary').innerHTML = '<b>' + list.length + '</b> ' + plural(list.length, 'стрим', 'стрима', 'стримов') + ' из ' + all.length;
    if (!list.length) { box.innerHTML = '<div class="empty">Ничего не найдено</div>'; return; }
    let html = '', lastYear = '';
    list.forEach(s => {
      const y = s.date.slice(0, 4);
      if (y !== lastYear) { html += '<div class="year-sep">' + y + '</div>'; lastYear = y; }
      const url = safeUrl(s.link);
      const title = url ? '<a class="stream-title" href="' + url + '" target="_blank" rel="noopener noreferrer">' + escHtml(s.title) + '</a>'
                        : '<span class="stream-title">' + escHtml(s.title) + '</span>';
      const meta = [];
      if (s.frame) meta.push('В кадре: ' + escHtml(s.frame));
      if (s.voice) meta.push('В голосе: ' + escHtml(s.voice));
      html += '<div class="stream-row"><div class="stream-num">#' + s.num + '</div><div class="stream-main">' + title +
        (meta.length ? '<div class="stream-meta">' + meta.join(' • ') + '</div>' : '') + '</div>' +
        '<div class="stream-side"><span class="stream-date">' + fmtDate(s.date) + '</span>' +
        (s.duration ? '<span>⏱ ' + s.duration + '</span>' : '') +
        '<span class="channel-badge channel-' + s.channel.toLowerCase() + '">' + escHtml(s.channel) + '</span></div></div>';
    });
    box.innerHTML = html;
  }
  setupFilters(render, { 'f-year': 'all', 'f-channel': 'all', 'f-person': 'all', 'f-sort': 'date-desc' });
}

async function initGamesPage() {
  const gamesContainer = document.getElementById("games");
  if (!gamesContainer) return;
  const [streams, allGames] = await Promise.all([
    fetch('../streams/streams.json').then(r => r.json()),
    fetch('games.json').then(r => r.json())
  ]);
  const $ = id => document.getElementById(id);
  const sById = {};
  streams.forEach(s => sById[s.id] = s);
  const platforms = [...new Set(allGames.map(g => g.platform).filter(Boolean))].sort();
const platBox = $('f-plat');
platBox.innerHTML = platforms.map(p => '<label class="plat-chip"><input type="checkbox" class="plat-cb" value="' + escHtml(p) + '" checked>' + escHtml(p) + '</label>').join('');
const platBoxes = () => [...platBox.querySelectorAll('.plat-cb')];
const platSelected = () => new Set(platBoxes().filter(c => c.checked).map(c => c.value));
const setAllPlat = on => { platBoxes().forEach(c => c.checked = on); platBox.dispatchEvent(new Event('change', { bubbles: true })); };
$('plat-all').onclick = () => setAllPlat(true);
$('plat-none').onclick = () => setAllPlat(false);
  const statusIcon = { red: 'не пройдено', yellow: 'просто смотрели', green: 'пройдено' };

  function applyFilters() {
    const q = $('f-search').value.trim().toLowerCase();
    const platSel = platSelected(), platAll = platSel.size === platforms.length, status = $('f-status').value;
    const dStart = $('f-date-start').value, dEnd = $('f-date-end').value, sortVal = $('f-sort').value;
    let list = allGames.filter(g => {
      const s = sById[g.streamId];
      if (!s) return false;
      return (!q || g.name.toLowerCase().includes(q)) &&
        (platAll || platSel.has(g.platform)) &&
        (status === 'all' || g.status === status) &&
        (!dStart || s.date >= dStart) && (!dEnd || s.date <= dEnd);
    });
    const total = list.length;
    $('summary').innerHTML = '<b>' + total + '</b> ' + plural(total, 'игра', 'игры', 'игр') + ' из ' + allGames.length;
    if (sortVal === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
      renderFlat(list);
      return;
    }
    renderGrouped(list, sortVal === 'date-asc');
  }

  function badge(g) {
    const dl = safeUrl(g.download), tc = safeUrl(g.timecode);
    const s = sById[g.streamId];
    return '<div class="badge ' + g.status + '" title="' + escHtml(statusIcon[g.status] || '') + '">' +
      (g.icon ? '<img class="game-icon" src="' + escHtml(g.icon) + '" alt="" loading="lazy">' : '') + '<div class="game-content"><span class="game-name">' + escHtml(g.name) + '</span>' +
      (g.platform ? '<span class="plat-label">' + escHtml(g.platform) + '</span>' : '') + '</div>' +
      '<div class="game-links">' +
      '<a ' + (tc ? 'href="' + tc + '" target="_blank" rel="noopener noreferrer"' : 'class="off"') + ' title="Момент на стриме">🎥</a>' +
      '<a ' + (dl ? 'href="' + dl + '" target="_blank" rel="noopener noreferrer"' : 'class="off"') + ' title="Скачать / страница игры">⬇</a>' +
      '</div></div>';
  }

  function renderGrouped(list, asc) {
    if (!list.length) { gamesContainer.innerHTML = '<div class="empty">Ничего не найдено</div>'; return; }
    const groups = new Map();
    list.forEach(g => { if (!groups.has(g.streamId)) groups.set(g.streamId, []); groups.get(g.streamId).push(g); });
    const order = [...groups.keys()].map(id => sById[id]).sort((a, b) => {
      const c = a.date.localeCompare(b.date) || a.num - b.num;
      return asc ? c : -c;
    });
    gamesContainer.innerHTML = order.map(s => {
      const url = safeUrl(s.link);
      const title = url ? '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + escHtml(s.title) + '</a>' : escHtml(s.title);
      return '<div class="game-card"><div class="stream-header"><h3>' + title + '</h3><span class="stream-date-header">' + fmtDate(s.date) + '</span></div>' +
        '<div class="list-body">' + groups.get(s.id).map(badge).join('') + '</div></div>';
    }).join('');
  }

  function renderFlat(list) {
    if (!list.length) { gamesContainer.innerHTML = '<div class="empty">Ничего не найдено</div>'; return; }
    gamesContainer.innerHTML = '<div class="game-card"><div class="list-body">' + list.map(badge).join('') + '</div></div>';
  }

  setupFilters(applyFilters, { 'f-status': 'all', 'f-date-start': '', 'f-date-end': '', 'f-sort': 'date-desc' }, { el: platBox, active: () => platSelected().size !== platforms.length, reset: () => platBoxes().forEach(c => c.checked = true) });
}
