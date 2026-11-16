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
document.documentElement.style.setProperty('--page-color', btnColor);
document.documentElement.style.setProperty('--page-ink', link.classList.contains('is-yellow') ? '#000' : '#fff');
document.documentElement.style.setProperty('--scrollbar-color', btnColor);
navInner.classList.add('color-loaded');
}
}
});
if (!foundActive) {
if (menuTitle) menuTitle.textContent = "Страница не найдена";
navInner.style.setProperty('--active-color', '#888888');
document.documentElement.style.setProperty('--scrollbar-color', '#888888');
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
function setupToTop() {
  if (document.getElementById('to-top')) return;
  const b = document.createElement('button');
  b.id = 'to-top';
  b.type = 'button';
  b.title = 'Наверх';
  b.setAttribute('aria-label', 'Наверх');
  b.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>';
  b.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  document.body.appendChild(b);
  const check = () => b.classList.toggle('show', (window.scrollY || document.documentElement.scrollTop) > 300);
  window.addEventListener('scroll', check, { passive: true });
  check();
}
document.addEventListener("DOMContentLoaded", () => {loadNavbar(); fixNumbers(); setupToTop(); });
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
const strip = nav ? nav.querySelector('.dev-strip') : null;
const nb = nav ? Math.round((strip || nav).getBoundingClientRect().bottom) : 66;
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
function collate(a, b) {
  const cls = s => {
    const c = String(s).trim().charAt(0);
    if (/[0-9]/.test(c)) return 1;
    if (/[A-Za-z]/.test(c)) return 2;
    if (/[А-Яа-яЁё]/.test(c)) return 3;
    return 0;
  };
  return cls(a) - cls(b) || String(a).localeCompare(String(b), 'ru', { numeric: true, sensitivity: 'base' });
}
function placeGroup(g) {
  const tg = g.querySelector('.plat-toggle'), box = g.querySelector('.plat-list'), panel = g.closest('.filters-panel');
  if (!tg || !box || !panel) return;
  box.style.top = Math.round(tg.getBoundingClientRect().bottom - panel.getBoundingClientRect().top - panel.clientTop + 4) + 'px';
}
function closeGroups() {
  document.querySelectorAll('.plat-group.open').forEach(g => {
    g.classList.remove('open');
    const b = g.querySelector('.plat-toggle');
    if (b) b.setAttribute('aria-expanded', 'false');
  });
}
document.addEventListener('mousedown', e => { if (!e.target.closest('.plat-group')) closeGroups(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeGroups(); });
window.addEventListener('resize', () => document.querySelectorAll('.plat-group.open').forEach(placeGroup));
function chipGroup(box, values, allBtn, noneBtn) {
  box.innerHTML = values.map(v => '<label class="plat-chip"><input type="checkbox" class="plat-cb" value="' + escHtml(v) + '" checked>' + escHtml(v) + '</label>').join('');
  if (noneBtn) noneBtn.remove();
  if (allBtn) box.insertBefore(allBtn, box.firstChild);
  const boxes = () => [...box.querySelectorAll('.plat-cb')];
  const selected = () => new Set(boxes().filter(c => c.checked).map(c => c.value));
  const setAll = on => { boxes().forEach(c => c.checked = on); box.dispatchEvent(new Event('change', { bubbles: true })); };
  if (allBtn) allBtn.onclick = () => setAll(selected().size !== values.length);
  
  const group = box.parentNode;
  const title = group.querySelector('.plat-title');
  const tg = document.createElement('button');
  tg.type = 'button';
  tg.className = 'plat-toggle';
  tg.setAttribute('aria-expanded', 'false');
  tg.innerHTML = '<span class="plat-name"></span><span class="plat-n"></span>';
  tg.querySelector('.plat-name').textContent = title ? title.textContent : '';
  if (title) title.replaceWith(tg); else group.insertBefore(tg, group.firstChild);
  const count = () => {
    const n = selected().size, all = n === values.length;
    tg.querySelector('.plat-n').textContent = n + '/' + values.length;
    tg.classList.toggle('all', all);
    if (allBtn) allBtn.textContent = all ? 'Снять все' : 'Выделить все';
  };
  tg.onclick = () => {
    const willOpen = !group.classList.contains('open');
    document.querySelectorAll('.plat-group.open').forEach(g => {
      g.classList.remove('open');
      const b = g.querySelector('.plat-toggle');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
    if (willOpen) { group.classList.add('open'); tg.setAttribute('aria-expanded', 'true'); placeGroup(group); }
  };
  box.addEventListener('change', count);
  count();
  return { el: box, selected, active: () => selected().size !== values.length, reset: () => { boxes().forEach(c => c.checked = true); count(); } };
}
function setupFilters(render, defaults, extra) {
  const $ = id => document.getElementById(id);
  const panel = $('filters'), btn = $('toggleFilters'), cnt = $('fcount');  const ids = Object.keys(defaults);
  const extras = !extra ? [] : (Array.isArray(extra) ? extra : [extra]);
  if (window.CustomSelect) document.querySelectorAll('#filters select').forEach(el => window.CustomSelect.attach(el));
  if (window.DatePicker) document.querySelectorAll('#filters input[data-datepicker]').forEach(el => window.DatePicker.attach(el));
  function updateCount() {
    const n = ids.filter(id => $(id).value !== defaults[id]).length + extras.filter(x => x.active()).length;
    cnt.textContent = n ? n : '';
  }
  btn.onclick = () => {
    closeGroups();
    const open = panel.hasAttribute('hidden');
    if (open) panel.removeAttribute('hidden'); else panel.setAttribute('hidden', '');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  };
  document.querySelectorAll('#filters select, #filters input:not(.plat-cb)').forEach(el => el.addEventListener('change', () => { updateCount(); render(); }));
extras.forEach(x => x.el.addEventListener('change', () => { updateCount(); render(); }));
setupStickyBar();
  $('f-search').addEventListener('input', render);
  $('resetFilters').onclick = () => {
    $('f-search').value = '';
    ids.forEach(id => $(id).value = defaults[id]);
extras.forEach(x => x.reset());
    updateCount(); render();
  };
  updateCount(); render();
}

async function initStreamsPage() {
  const box = document.getElementById("streams-list");
  if (!box) return;
  const all = (await fetch('streams.json').then(r => r.json())).filter(s => !s.hidden);
  const $ = id => document.getElementById(id);
  const canon = x => { const t = x.trim(); return t.toLowerCase() === 'blood_man' ? 'Blood_Man' : t; };
  const parse = v => (v || '').split(',').map(canon).filter(Boolean);
  all.forEach(s => { s._frame = parse(s.frame); s._voice = parse(s.voice); s._year = s.date.slice(0, 4); });
  const ranked = lists => {
    const cnt = new Map();
    lists.forEach(l => l.forEach(p => cnt.set(p, (cnt.get(p) || 0) + 1)));    return [...cnt.keys()].sort(collate);
  };
  const years = [...new Set(all.map(s => s._year))].sort().reverse();
  const gYear = chipGroup($('f-year'), years, $('year-all'), $('year-none'));
  const gFrame = chipGroup($('f-frame'), ranked(all.map(s => s._frame)), $('frame-all'), $('frame-none'));
  const gVoice = chipGroup($('f-voice'), ranked(all.map(s => s._voice)), $('voice-all'), $('voice-none'));
  const norm = x => x.toLowerCase();

  function render() {
    const q = norm($('f-search').value.trim());
    const dStart = $('f-date-start').value, dEnd = $('f-date-end').value, sort = $('f-sort').value;
    const yOn = gYear.active() ? gYear.selected() : null;
    const fOn = gFrame.active() ? gFrame.selected() : null;
    const vOn = gVoice.active() ? gVoice.selected() : null;
    let list = all.filter(s =>
      (!q || norm(s.title).includes(q)) &&
      (!yOn || yOn.has(s._year)) &&
      (!fOn || s._frame.some(p => fOn.has(p))) &&
      (!vOn || s._voice.some(p => vOn.has(p))) &&
      (!dStart || s.date >= dStart) && (!dEnd || s.date <= dEnd));
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
        (s.duration ? '<span>⏱ ' + s.duration + '</span>' : '') +        '</div></div>';
    });
    box.innerHTML = html;
  }
  setupFilters(render, { 'f-date-start': '', 'f-date-end': '', 'f-sort': 'date-desc' }, [gYear, gFrame, gVoice]);
}

async function initGamesPage() {
  const gamesContainer = document.getElementById("games");
  if (!gamesContainer) return;
  const [streams, rawGames] = await Promise.all([
    fetch('../streams/streams.json').then(r => r.json()),
    fetch('games.json').then(r => r.json())
  ]);
  const $ = id => document.getElementById(id);
  const sById = {};
  streams.forEach(s => sById[s.id] = s);
  const secOf = u => { const m = /[?&#]t=(\d+)/.exec(u || ''); return m ? +m[1] : null; };
  const byTime = (a, b) => {
    const x = a.t == null ? Infinity : a.t, y = b.t == null ? Infinity : b.t;
    return x === y ? 0 : x - y;
  };
  const merged = new Map();
  rawGames.forEach(g => {
    const k = g.streamId + '|' + g.name + '|' + (g.platform || '');
    let m = merged.get(k);
    if (!m) { m = Object.assign({}, g, { attempts: [] }); merged.set(k, m); }
    m.attempts.push({ status: g.status, timecode: g.timecode, t: secOf(g.timecode) });
    if (!m.download && g.download) m.download = g.download;
    if (!m.icon && g.icon) m.icon = g.icon;
  });
  const allGames = [...merged.values()];
  allGames.forEach(m => {
    m.attempts.sort(byTime);
    const st = m.attempts.map(a => a.status);
    m.status = st.includes('green') ? 'green' : st.includes('red') ? 'red' : 'yellow';
  });
  const platforms = [...new Set(allGames.map(g => g.platform).filter(Boolean))].sort(collate);
  const gPlat = chipGroup($('f-plat'), platforms, $('plat-all'), $('plat-none'));
  const statusBox = $('f-status');
  const statusCbs = () => [...statusBox.querySelectorAll('.plat-cb')];
  const gStatus = {
    el: statusBox,
    selected: () => new Set(statusCbs().filter(c => c.checked).map(c => c.value)),
    active: () => statusCbs().some(c => !c.checked),
    reset: () => statusCbs().forEach(c => { c.checked = true; })
  };
  const statusIcon = { red: 'не пройдено', yellow: 'просто смотрели', green: 'пройдено' };

  function applyFilters() {
    const q = $('f-search').value.trim().toLowerCase();
    const platOn = gPlat.active() ? gPlat.selected() : null, stOn = gStatus.selected();
    const dStart = $('f-date-start').value, dEnd = $('f-date-end').value, sortVal = $('f-sort').value;
    let list = allGames.filter(g => {
      const s = sById[g.streamId];
      if (!s) return false;
      return (!q || g.name.toLowerCase().includes(q)) &&
        (!platOn || platOn.has(g.platform)) &&
        stOn.has(g.status) &&
        (!dStart || s.date >= dStart) && (!dEnd || s.date <= dEnd);
    });
    const total = list.length;
    $('summary').innerHTML = '<b>' + total + '</b> ' + plural(total, 'игра', 'игры', 'игр') + ' из ' + allGames.length;
    if (sortVal === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
      renderByLetter(list);
      return;
    }
    renderGrouped(list, sortVal === 'date-asc');
  }

  function momentLink(a, cls, text, title) {
    const tc = safeUrl(a.timecode);
    return '<a class="' + (cls ? cls + ' ' : '') + (tc ? '' : 'off') + '"' + (tc ? ' href="' + tc + '" target="_blank" rel="noopener noreferrer"' : '') + ' title="' + escHtml(title) + '">' + text + '</a>';
  }

  let tipMode = false;
  function tipOf(g) {
    const base = statusIcon[g.status] || '';
    if (!tipMode) return base;
    const s = sById[g.streamId];
    return s ? s.title + '\n' + fmtDate(s.date) + (base ? ' · ' + base : '') : base;
  }

  function badge(g) {
    const dl = safeUrl(g.download);
    const n = g.attempts.length;
    const meta = [g.platform ? escHtml(g.platform) : '', n > 1 ? n + ' ' + plural(n, 'попытка', 'попытки', 'попыток') : ''].filter(Boolean).join(' · ');
    const moments = n > 1
      ? g.attempts.map((a, i) => momentLink(a, 'try ' + a.status, i + 1, 'Попытка ' + (i + 1) + ': ' + (statusIcon[a.status] || ''))).join('')
      : momentLink(g.attempts[0], '', '🎥', 'Момент на стриме');
    return '<div class="badge ' + g.status + '" title="' + escHtml(tipOf(g)) + '">' +
      (g.icon ? '<img class="game-icon" src="' + escHtml(g.icon) + '" alt="" loading="lazy">' : '') + '<div class="game-content"><span class="game-name">' + escHtml(g.name) + '</span>' +
      (meta ? '<span class="plat-label">' + meta + '</span>' : '') + '</div>' +
      '<div class="game-links">' + moments +
      '<a ' + (dl ? 'href="' + dl + '" target="_blank" rel="noopener noreferrer"' : 'class="off"') + ' title="Скачать / страница игры">📥</a>' +
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

  function renderByLetter(list) {
    if (!list.length) { gamesContainer.innerHTML = '<div class="empty">Ничего не найдено</div>'; return; }
    const letterOf = g => {
      const c = String(g.name || '').trim().charAt(0).toUpperCase();
      if (/[0-9]/.test(c)) return '0–9';
      return /[A-ZА-ЯЁ]/.test(c) ? c : '#';
    };
    const groups = new Map();
    list.forEach(g => { const l = letterOf(g); if (!groups.has(l)) groups.set(l, []); groups.get(l).push(g); });
    tipMode = true;
    gamesContainer.innerHTML = [...groups.keys()].sort(collate).map(l => {
      const items = groups.get(l);
      return '<div class="game-card letter-card"><div class="stream-header"><h3>' + escHtml(l) + '</h3><span class="stream-date-header">' + items.length + ' ' + plural(items.length, 'игра', 'игры', 'игр') + '</span></div>' +
        '<div class="list-body">' + items.map(badge).join('') + '</div></div>';
    }).join('');
    tipMode = false;
  }

  function renderFlat(list) {
    if (!list.length) { gamesContainer.innerHTML = '<div class="empty">Ничего не найдено</div>'; return; }
    gamesContainer.innerHTML = '<div class="game-card"><div class="list-body">' + list.map(badge).join('') + '</div></div>';
  }

  setupFilters(applyFilters, { 'f-date-start': '', 'f-date-end': '', 'f-sort': 'date-desc' }, [gPlat, gStatus]);
}
