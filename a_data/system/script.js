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
menuList.classList.toggle('active'); if (window.DatePicker) window.DatePicker.close();
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
function showNavBlink() {
if (!navInner.classList.contains('mobile-mode')) return;
try {
if (sessionStorage.getItem('navBlinkShown')) return;
sessionStorage.setItem('navBlinkShown', '1');
} catch (e) {}
setTimeout(() => {
if (!navInner.classList.contains('mobile-mode')) return;
navInner.classList.add('nav-blink');
setTimeout(() => navInner.classList.remove('nav-blink'), 2300);
}, 700);
}
showNavBlink();
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
  const p = iso.split('-');  const mn = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];  return mn[+p[1] - 1] + ' ' + (+p[2]) + ' \u2019' + p[0].slice(2);
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
let stuck = false, timer = null, barH = 56, preH = 0;
function update() {
const nav = document.getElementById('nav-inner');
const strip = nav ? nav.querySelector('.dev-strip') : null;
const nb = nav ? Math.round((strip || nav).getBoundingClientRect().bottom) : 66;
document.documentElement.style.setProperty('--nav-h', nb + 'px');
const edge = stuck ? anchor.getBoundingClientRect().bottom - 4 : anchor.getBoundingClientRect().top + card.offsetHeight;
const want = edge <= nb + 2;
if (want === stuck) return;
stuck = want;
if (want) {
preH = card.offsetHeight; ['toggleFilters', 'toggleView'].forEach(id => { const b = document.getElementById(id); if (b && b.getAttribute('aria-expanded') === 'true') b.click(); });  const h1 = card.offsetHeight; anchor.style.height = (h1 + 4) + 'px'; if (preH > h1) window.scrollBy({ top: h1 - preH, behavior: 'instant' });
card.classList.add('stuck'); barH = card.offsetHeight;
const tb = document.getElementById('toggleFilters');
if (tb && tb.getAttribute('aria-expanded') === 'true') tb.click();
const vb = document.getElementById('toggleView');
if (vb && vb.getAttribute('aria-expanded') === 'true') vb.click();
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
function chipGroup(box, values, allBtn, noneBtn, labels) {
  box.innerHTML = values.map(v => '<label class="plat-chip"><input type="checkbox" class="plat-cb" value="' + escHtml(v) + '" checked>' + escHtml(labels && labels[v] ? labels[v] : v) + '</label>').join('');
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
  count();  const set = vals => { boxes().forEach(c => c.checked = vals.has(c.value)); box.dispatchEvent(new Event('change', { bubbles: true })); };
  return { el: box, selected, set, active: () => selected().size !== values.length, reset: () => { boxes().forEach(c => c.checked = true); count(); } };
}
function setDateRange(dates, kind) {
  const d = dates.filter(Boolean).sort();
  if (!d.length) return;
  ['f-date-start', 'f-date-end'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.dataset.min = d[0]; el.dataset.max = d[d.length - 1]; el.dataset.minMsg = (kind === 'game' ? 'Самая ранняя игра была на стриме от ' : 'Самый ранний стрим был ') + d[0].split('-').reverse().join('.') + '.\nЭфиры после бана прежнего канала.'; el.dataset.maxMsg = (kind === 'game' ? 'Самая поздняя игра была на стриме от ' : 'Самый поздний стрим был ') + d[d.length - 1].split('-').reverse().join('.') + '.'; }
  });
}
document.addEventListener('click', e => {
  const t = e.target;
  if (!t || !t.closest || t.closest('.top-card, .dp-popup, .cs-popup, #nav')) return;
  preH = card.offsetHeight; ['toggleFilters', 'toggleView'].forEach(id => { const b = document.getElementById(id); if (b && b.getAttribute('aria-expanded') === 'true') b.click(); });
});
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
const acceptBtn = $('acceptFilters'); if (acceptBtn) acceptBtn.onclick = () => { if (!panel.hasAttribute('hidden')) btn.click(); };
  $('f-search').addEventListener('input', render);
  $('resetFilters').onclick = () => {
    $('f-search').value = '';
    ids.forEach(id => $(id).value = defaults[id]);
extras.forEach(x => x.reset());
    updateCount(); render();
  };
  updateCount(); render();
}

const PORTRAIT_DIR = '../a_data/system/portraits/';
const PORTRAIT_FILES = {
  'Blood_Man': 'Blood_man',
  'Emerald Weapon': 'Emerald Weapon',
  'Lev Zion': 'Lev Zion',
  'VIKnick': 'VIKnick',
  'Артур': 'Артур',
  'Жыкенден': 'Жыкенден',
  'Игорь': 'Игорь Дрыгин',
  'Максим': 'Максим',
  'Гришац': 'Пашо Гришац',
  'Про Игрок': 'Про Игрок',
  'Рафаэль': 'Рафаэль'
};
const PORTRAIT_LABELS = { 'Игорь': 'Игорь Дрыгин', 'Гришац': 'Пашо Гришац' };
function personLabel(p) {
  return PORTRAIT_LABELS[p] || p;
}
function personHtml(p, role, kind) {
  const label = personLabel(p);
  const file = PORTRAIT_FILES[p] || 'Неизвестно';
  return '<span class="person" tabindex="0" data-person="' + escHtml(p) + '" data-kind="' + kind + '" data-tip="' + escHtml(label + ' — ' + role) + '"><img src="' + PORTRAIT_DIR + encodeURIComponent(file) + '.png" alt="' + escHtml(label) + '" width="34" height="50" loading="lazy" draggable="false"></span>';
}
const STREAM_TYPES = { game: ['🎮', 'Игровой стрим'], movie: ['🎞️', 'Кинопросмотр'], dev: ['🛠️', 'Разработка игры'] };
function streamTypesHtml(s) {
  const list = s.types && s.types.length ? s.types : ['game'];
  return '<span class="stream-types">' + list.filter(k => STREAM_TYPES[k]).map(k => '<span class="st st-' + k + '" title="' + STREAM_TYPES[k][1] + '">' + STREAM_TYPES[k][0] + '</span>').join('') + '</span>';
}
function peopleHtml(s, v) {
  const mk = (list, role, kind) => list.filter(p => v.raf || p !== 'Рафаэль').map(p => personHtml(p, role, kind)).join('');
  if (!v.frame && !v.voice) return '';
  return '<div class="stream-people">' + (v.frame ? '<div class="people-group people-frame">' + mk(s._frame, 'в кадре', 'frame') + '</div>' : '') +
    (v.voice ? '<div class="people-group people-voice">' + mk(s._voice, 'в голосе', 'voice') + '</div>' : '') + '</div>';
}
function lineStreamTitles() {
  const mob = window.matchMedia('(max-width: 600px)').matches;
  const items = [];
  document.querySelectorAll('#streams-list .stream-title').forEach(t => {
    if (t.dataset.t === undefined) t.dataset.t = t.textContent;
    const txt = t.dataset.t;
    t.classList.remove('lined');
    t.textContent = txt;
    if (!mob) return;    const chars = txt.trim().match(/\S\s*/g) || [];
    t.textContent = '';
    const sp = chars.map(c => {
      const s = document.createElement('span');
      s.textContent = c;
      t.appendChild(s);
      return s;
    });
    items.push({ t: t, sp: sp });
  });
  const result = items.map(it => {
    const lines = [];
    let top = null;
    it.sp.forEach(s => {
      const y = s.offsetTop;
      if (top === null || Math.abs(y - top) > 3) { lines.push([]); top = y; }
      lines[lines.length - 1].push(s.textContent);
    });
    return { t: it.t, lines: lines };
  });
  result.forEach(r => {
    r.t.textContent = '';
    r.lines.forEach((l, i) => {
      const d = document.createElement('span');
      d.className = 'tl ' + (i === 0 ? 'tl-first' : i === r.lines.length - 1 ? 'tl-last' : 'tl-mid');
      d.textContent = l.join('').trim();
      r.t.appendChild(d);
    });
    r.t.classList.add('lined');
  });
}
(function () {
  let lastW = window.innerWidth, timer = 0;
  window.addEventListener('resize', () => {
    if (window.innerWidth === lastW) return;
    lastW = window.innerWidth;
    clearTimeout(timer);
    timer = setTimeout(lineStreamTitles, 150);
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (document.getElementById('streams-list')) lineStreamTitles(); });
})();
function lineSplitOne(t) {
  if (!t) return;
  const chars = t.textContent.trim().match(/\S\s*/g) || [];
  t.textContent = '';
  const sp = chars.map(c => {
    const s = document.createElement('span');
    s.textContent = c;
    t.appendChild(s);
    return s;
  });
  const lines = [];
  let top = null;
  sp.forEach(s => {
    const y = s.offsetTop;
    if (top === null || Math.abs(y - top) > 3) { lines.push([]); top = y; }
    lines[lines.length - 1].push(s.textContent);
  });
  t.textContent = '';
  lines.forEach((l, i) => {
    const d = document.createElement('span');
    d.className = 'tl ' + (i === 0 ? 'tl-first' : i === lines.length - 1 ? 'tl-last' : 'tl-mid');
    d.textContent = l.join('').trim();
    t.appendChild(d);
  });
}
function youtubeId(u) {
  const m = /(?:youtube\.com\/(?:watch\?(?:[^#]*&)?v=|live\/|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/.exec(u || '');
  return m ? m[1] : '';
}
function streamCover(s) {
  if (s.cover) return s.cover;
  const id = youtubeId(s.link);
  return id ? 'https://i.ytimg.com/vi/' + id + '/mqdefault.jpg' : '';
}
function setupStreamPreview(box, all, getView) {  const canHover = !!(window.matchMedia && window.matchMedia('(hover: hover)').matches);
  const byId = new Map(all.map(s => [s.id, s]));
  const card = document.createElement('a');
  card.className = 'stream-preview';
  card.target = '_blank';
  card.rel = 'noopener noreferrer';
  document.body.appendChild(card);
  let showT = 0, hideT = 0, current = '';
  const hide = () => {
    clearTimeout(showT);
    clearTimeout(hideT);
    card.classList.remove('show');
    current = '';
  };  const place = anchor => {
    const r = anchor.getBoundingClientRect();
    const w = card.offsetWidth, h = card.offsetHeight;
    const nav = document.getElementById('nav-inner');
    const strip = nav ? nav.querySelector('.dev-strip') : null;
    const topLimit = (nav ? Math.round((strip || nav).getBoundingClientRect().bottom) : 66) + 8;    const bottomLimit = window.innerHeight - (canHover ? 36 : 8);
    const left = Math.min(Math.max(8, r.left), window.innerWidth - w - 8);
    let top = r.bottom + 6;
    if (top + h > bottomLimit) {
      const above = r.top - h - 6;
      top = above >= topLimit ? above : Math.max(topLimit, bottomLimit - h);
    }
    card.style.left = left + 'px';
    card.style.top = top + 'px';
  };
  const show = anchor => {    const s = byId.get(anchor.dataset.sid);
    if (s) { [...card.classList].filter(c => c === 'mc' || c.startsWith('mc-')).forEach(c => card.classList.remove(c)); card.classList.add('mc', 'mc-' + s.date.slice(5, 7)); }
    if (!s) return;
    const cover = streamCover(s);
    
    const info = [];
    info.push(streamTypesHtml(s));
    if (s.channel) info.push(escHtml(s.channel));    info.push(fmtDate(s.date));
    if (s.duration) info.push('⏱ ' + escHtml(s.duration));
    const names = list => list.map(personLabel).join(', ');
    card.href = /^https?:\/\//i.test(s.link || '') ? s.link : '#';
    card.innerHTML = '<div class="sp-thumb"' + (cover ? '' : ' style="display:none"') + '><img src="' + escHtml(cover) + '" alt="" draggable="false">' +
      (s.duration ? '<span class="sp-dur">' + escHtml(s.duration) + '</span>' : '') + '</div>' +
      '<div class="sp-title">' + escHtml(s.title) + '</div>' +
      '<div class="sp-meta">' + info.join(' • ') + '</div>' +      ((!getView || getView().frame) && s._frame.length ? '<div class="sp-people"><b class="sp-frame">В кадре:</b> <i>' + escHtml(names(s._frame)) + '</i></div>' : '') +      ((!getView || getView().voice) && s._voice.length ? '<div class="sp-people"><b class="sp-voice">В голосе:</b> <i>' + escHtml(names(s._voice)) + '</i></div>' : '');    lineSplitOne(card.querySelector('.sp-title'));
    const img = card.querySelector('img');
    img.addEventListener('error', () => { if (img.parentNode) img.parentNode.remove(); });
    place(anchor);
    current = anchor.dataset.sid;
    card.classList.add('show');
  };  box.addEventListener('mouseover', e => {    if (!canHover) return;
    const a = hostOf(e.target);
    if (!a) return;
    clearTimeout(hideT);
    const visible = card.classList.contains('show');
    if (visible && current === a.dataset.sid) return;
    clearTimeout(showT);
    showT = setTimeout(() => show(a), visible ? 60 : 250);
  });  box.addEventListener('mouseout', e => {    if (!canHover) return;
    const a = hostOf(e.target);
    if (!a) return;
    const rt = e.relatedTarget;
    if (rt && ((a.closest('.stream-row').contains(rt) && !(rt.closest && rt.closest('.person'))) || card.contains(rt))) return;
    clearTimeout(showT);
    hideT = setTimeout(hide, 150);
  });  const hostOf = t => { if (!t || !t.closest || t.closest('.person')) return null; const row = t.closest('.stream-row'); return row && box.contains(row) ? row.querySelector('a.stream-title') : null; };
  let pressT = 0, sx = 0, sy = 0, suppressClick = false;
  const cancelPress = () => clearTimeout(pressT);
  box.addEventListener('touchstart', e => {
    suppressClick = false;
    cancelPress();
    const a = e.target.closest ? e.target.closest('a.stream-title') : null;
    if (!a || !box.contains(a) || e.touches.length !== 1) return;
    sx = e.touches[0].clientX;
    sy = e.touches[0].clientY;
    pressT = setTimeout(() => {
      show(a);
      if (card.classList.contains('show')) {
        suppressClick = true;
        if (navigator.vibrate) navigator.vibrate(12);
      }
    }, 450);
  }, { passive: true });
  box.addEventListener('touchmove', e => {
    const t = e.touches[0];
    if (Math.abs(t.clientX - sx) > 10 || Math.abs(t.clientY - sy) > 10) cancelPress();
  }, { passive: true });
  box.addEventListener('touchend', cancelPress, { passive: true });
  box.addEventListener('touchcancel', cancelPress, { passive: true });
  box.addEventListener('contextmenu', e => {
    if (!canHover && e.target.closest && e.target.closest('a.stream-title')) e.preventDefault();
  });
  box.addEventListener('click', e => {
    if (!suppressClick) return;
    suppressClick = false;
    e.preventDefault();
    e.stopPropagation();
  }, true);
  document.addEventListener('touchstart', e => { if (!card.contains(e.target)) hide(); }, { passive: true });
  card.addEventListener('mouseenter', () => clearTimeout(hideT));
  card.addEventListener('mouseleave', () => { hideT = setTimeout(hide, 150); });
  window.addEventListener('scroll', hide, { passive: true });
  document.addEventListener('input', hide);
  document.addEventListener('click', hide);
  return { hide };
}

async function initStreamsPage() {
  const box = document.getElementById("streams-list");
  if (!box) return;
  const all = (await fetch('streams.json').then(r => r.json())).filter(s => !s.hidden);
  const $ = id => document.getElementById(id);
  const canon = x => { const t = x.trim(); return t.toLowerCase() === 'blood_man' ? 'Blood_Man' : t; };
  const parse = v => (v || '').split(',').map(canon).filter(Boolean);
  all.forEach(s => { s._frame = parse(s.frame); s._voice = parse(s.voice); s._year = s.date.slice(0, 4); s._month = s.date.slice(5, 7); });
  const ranked = lists => {
    const cnt = new Map();
    lists.forEach(l => l.forEach(p => cnt.set(p, (cnt.get(p) || 0) + 1)));    return [...cnt.keys()].sort(collate);
  };
  setDateRange(all.map(s => s.date));  const years = [...new Set(all.map(s => s._year))].sort().reverse();  const gYear = chipGroup($('f-year'), years, $('year-all'), $('year-none'));
  const MONTH_NAMES = { '01': 'Январь', '02': 'Февраль', '03': 'Март', '04': 'Апрель', '05': 'Май', '06': 'Июнь', '07': 'Июль', '08': 'Август', '09': 'Сентябрь', '10': 'Октябрь', '11': 'Ноябрь', '12': 'Декабрь' };
  const months = [...new Set(all.map(s => s._month))].sort();
  const gMonth = chipGroup($('f-month'), months, $('month-all'), $('month-none'), MONTH_NAMES);
  const gFrame = chipGroup($('f-frame'), ranked(all.map(s => s._frame)), $('frame-all'), $('frame-none'));  const gVoice = chipGroup($('f-voice'), ranked(all.map(s => s._voice)), $('voice-all'), $('voice-none'));  const vc = { frame: $('v-frame'), voice: $('v-voice'), raf: $('v-raf') }, vDef = { frame: true, voice: true, raf: false };
  const view = {
    el: $('f-view'),
    state: () => ({ frame: vc.frame.checked, voice: vc.voice.checked, raf: vc.raf.checked }),
    active: () => Object.keys(vDef).some(k => vc[k].checked !== vDef[k]),
    reset: () => Object.keys(vDef).forEach(k => { vc[k].checked = vDef[k]; })
  };
  setupStreamPreview(box, all, view.state);
  if (window.CustomSelect) window.CustomSelect.attach($('f-group'));  $('f-group').addEventListener('change', render);
  const pickBar = $('pick-bar');
  let pick = null, applying = false;
  const groupOf = kind => kind === 'frame' ? gFrame : gVoice;
  const apply = (group, vals) => { applying = true; group.set(vals); applying = false; };
  const showPick = () => {
    const parts = [];
    if (pick.frame) parts.push('в кадре — <i>' + escHtml(personLabel(pick.frame)) + '</i>');
    if (pick.voice) parts.push('в голосе — <i>' + escHtml(personLabel(pick.voice)) + '</i>');
    pickBar.querySelector('.pick-text').innerHTML = 'Показаны только стримы: ' + parts.join(', ');
    pickBar.hidden = false;
  };
  const endPick = restore => {
    if (!pick) return;
    const snap = pick.snap;
    pick = null;
    pickBar.hidden = true;
    if (restore) { apply(gFrame, snap.frame); apply(gVoice, snap.voice); }
  };
  const pickPerson = (name, kind) => {
    if (!name || !kind) return;
    if (!pick) pick = { snap: { frame: gFrame.selected(), voice: gVoice.selected() }, frame: null, voice: null };
    if (pick[kind] === name) {
      pick[kind] = null;
      apply(groupOf(kind), pick.snap[kind]);
      if (!pick.frame && !pick.voice) { endPick(false); return; }
    } else {
      pick[kind] = name;
      apply(groupOf(kind), new Set([name]));
    }
    showPick();
  };
  box.addEventListener('click', e => {
    const el = e.target.closest ? e.target.closest('.person') : null;
    if (el && box.contains(el)) pickPerson(el.dataset.person, el.dataset.kind);
  });
  box.addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const el = e.target.closest ? e.target.closest('.person') : null;
    if (!el) return;
    e.preventDefault();
    pickPerson(el.dataset.person, el.dataset.kind);
  });  box.addEventListener('click', e => {
    if (e.target.closest('a, .person')) return;
    const row = e.target.closest('.stream-row');
    const a = row && row.querySelector('a.stream-title');
    if (!a || String(window.getSelection()).length) return;
    a.click();
  });
  $('pick-reset').addEventListener('click', () => endPick(true));
  [gFrame, gVoice].forEach(g => g.el.addEventListener('change', () => { if (!applying) endPick(false); }));
  const norm = x => x.toLowerCase();

  function render() {
    const q = norm($('f-search').value.trim());
    const dStart = $('f-date-start').value, dEnd = $('f-date-end').value, sort = $('f-sort').value;    const ySel = gYear.selected();    const yOn = gYear.active() && ySel.size ? ySel : null;    const mSel = gMonth.selected();    const mOn = gMonth.active() && mSel.size ? mSel : null;    const byMonth = $('f-group').value === 'month';
    const v = view.state();
    box.classList.toggle('no-people', !v.frame && !v.voice);    const fSel = gFrame.selected();
    const fOn = gFrame.active() && fSel.size ? fSel : null;    const vSel = gVoice.selected();
    const vOn = gVoice.active() && vSel.size ? vSel : null;
    let list = all.filter(s =>
      (!q || norm(s.title).includes(q)) &&      (!yOn || yOn.has(s._year)) &&
      (!mOn || mOn.has(s._month)) &&
      (!fOn || s._frame.some(p => fOn.has(p))) &&
      (!vOn || s._voice.some(p => vOn.has(p))) &&
      (!dStart || s.date >= dStart) && (!dEnd || s.date <= dEnd));
    const durSec = s => { const m = /^(\d+):(\d{2}):(\d{2})$/.exec(s.duration || ''); return m ? +m[1] * 3600 + +m[2] * 60 + +m[3] : -1; };
    const durCmp = (a, b, dir) => { const x = durSec(a), y = durSec(b); if (x < 0 || y < 0) return (x < 0) - (y < 0); return dir * (x - y); };
    const byDur = sort === 'dur';
    const dirSign = gDir.asc() ? 1 : -1;
    list.sort((a, b) => byDur ? durCmp(a, b, dirSign) || b.date.localeCompare(a.date) || b.num - a.num : dirSign * (a.date.localeCompare(b.date) || a.num - b.num));
    $('summary').innerHTML = (list.length === all.length ? plural(list.length, 'Показан весь ', 'Показаны все ', 'Показаны все ') : plural(list.length, 'Отображён ', 'Отображено ', 'Отображено ')) + '<b>' + list.length + '</b> ' + plural(list.length, 'стрим', 'стрима', 'стримов') + (list.length === all.length ? '' : ' из ' + all.length);
    if (!list.length) { box.innerHTML = '<div class="empty">Ничего не найдено</div>'; return; }
    let html = '', lastYear = '';
    list.forEach(s => {
      const y = s.date.slice(0, 4);      const groupKey = byMonth ? s.date.slice(0, 7) : y;      if (!byDur && groupKey !== lastYear) { html += '<div class="year-sep' + (byMonth ? ' mc mc-' + s.date.slice(5, 7) : '') + '">' + (byMonth ? MONTH_NAMES[s.date.slice(5, 7)] + ' ' + y : y) + '</div>'; lastYear = groupKey; }
      const url = safeUrl(s.link);      const title = url ? '<a class="stream-title" href="' + url + '" data-sid="' + escHtml(s.id) + '" target="_blank" rel="noopener noreferrer">' + escHtml(s.title) + '</a>'
                        : '<span class="stream-title">' + escHtml(s.title) + '</span>';
      html += '<div class="stream-row mc mc-' + s.date.slice(5, 7) + '"><div class="stream-num">#' + s.num + '</div><div class="stream-main">' + streamTypesHtml(s) + title + '</div>' + peopleHtml(s, v) +
        '<div class="stream-side"><span class="stream-date">' + fmtDate(s.date) + '</span>' +
        (s.duration ? '<span>⏱ ' + s.duration + '</span>' : '') + '</div></div>';
    });    box.innerHTML = html;
    lineStreamTitles();
  }  const dirBtn = $('f-dir');
  let dirAsc = false;
  const drawDir = () => { dirBtn.textContent = dirAsc ? '▲' : '▼'; dirBtn.title = dirAsc ? 'По возрастанию' : 'По убыванию'; dirBtn.setAttribute('aria-label', dirBtn.title); };
  const gDir = { el: dirBtn, asc: () => dirAsc, active: () => dirAsc, reset: () => { dirAsc = false; drawDir(); } };
  dirBtn.addEventListener('click', () => { dirAsc = !dirAsc; drawDir(); dirBtn.dispatchEvent(new Event('change', { bubbles: true })); });
  drawDir();
  setupFilters(render, { 'f-date-start': '', 'f-date-end': '', 'f-sort': 'date' }, [gYear, gMonth, gDir]);
  const vBtn = $('toggleView'), vPanel = $('view-panel'), fBtn = $('toggleFilters'), fPanel = $('filters');
  const mBtn = $('toggleMore'), mRow = mBtn.closest('.search-row');
  mBtn.addEventListener('click', () => {
    const on = !mRow.classList.contains('more-open');    mRow.classList.toggle('more-open', on);    if (!on) [[fBtn, fPanel], [vBtn, vPanel]].forEach(([b, p]) => { if (!p.hasAttribute('hidden')) b.click(); });
    mBtn.setAttribute('aria-expanded', on ? 'true' : 'false');
    mBtn.setAttribute('aria-label', on ? 'Скрыть' : 'Показать остальное');
    mBtn.title = on ? 'Скрыть' : 'Показать остальное';
  });
  const setOpen = (btn, panel, open) => { if (open) panel.removeAttribute('hidden'); else panel.setAttribute('hidden', ''); btn.setAttribute('aria-expanded', open ? 'true' : 'false'); };
  vBtn.addEventListener('click', () => {
    const open = vPanel.hasAttribute('hidden');
    if (open) { closeGroups(); setOpen(fBtn, fPanel, false); }
    setOpen(vBtn, vPanel, open);
  });  fBtn.addEventListener('click', () => { if (!fPanel.hasAttribute('hidden')) setOpen(vBtn, vPanel, false); });
  $('resetFilters').addEventListener('click', () => { closeGroups(); setOpen(fBtn, fPanel, false); });  $('acceptView').addEventListener('click', () => { closeGroups(); setOpen(vBtn, vPanel, false); });  const vCount = () => { $('vcount').textContent = Object.keys(vDef).filter(k => vc[k].checked !== vDef[k]).length + (gFrame.active() ? 1 : 0) + (gVoice.active() ? 1 : 0) || ''; };
  [gFrame, gVoice].forEach(g => g.el.addEventListener('change', () => { vCount(); render(); }));
  $('resetView').addEventListener('click', () => { endPick(false); gFrame.reset(); gVoice.reset(); view.reset(); vCount(); render(); closeGroups(); setOpen(vBtn, vPanel, false); });
  view.el.addEventListener('change', () => {    vCount();
    render();
  });
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
  const perStream = new Map();
  rawGames.forEach((g, i) => {
    const k = g.streamId + '|' + g.name + '|' + (g.platform || '');
    let m = merged.get(k);
    if (!m) { m = Object.assign({}, g, { attempts: [] }); merged.set(k, m); }
    const at = { status: g.status, timecode: g.timecode, t: secOf(g.timecode), idx: i };
    m.attempts.push(at);
    if (!perStream.has(g.streamId)) perStream.set(g.streamId, []);
    perStream.get(g.streamId).push(at);
    if (!m.download && g.download) m.download = g.download;
    if (!m.icon && g.icon) m.icon = g.icon;
    if (!m.note && g.note) m.note = g.note;
  });
  // Порядковый номер запуска внутри стрима: по таймкоду; при равенстве/отсутствии
  // таймкода — по порядку в games.json (там новые сверху, поэтому idx берём в обратную сторону)
  perStream.forEach(list => {
    list.sort((a, b) => b.idx - a.idx);
    list.forEach((a, i) => { a.no = i + 1; });
  });
  const allGames = [...merged.values()];
  setDateRange(allGames.map(g => sById[g.streamId] && sById[g.streamId].date), 'game');
  allGames.forEach(m => {
    m.attempts.sort((a, b) => a.no - b.no);    m.no = m.attempts[0].no;
    m.nos = m.attempts.map(a => a.no).join(', ');
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
    $('summary').innerHTML = (total === allGames.length ? plural(total, 'Показана вся ', 'Показаны все ', 'Показаны все ') : plural(total, 'Отображена ', 'Отображено ', 'Отображено ')) + '<b>' + total + '</b> ' + plural(total, 'игра', 'игры', 'игр') + (total === allGames.length ? '' : ' из ' + allGames.length);
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
    const meta = g.platform ? escHtml(g.platform) : '';
    const moments = n > 1
      ? g.attempts.map((a, i) => momentLink(a, 'try ' + a.status, i + 1, 'Попытка ' + (i + 1) + ' (запуск №' + a.no + '): ' + (statusIcon[a.status] || ''))).join('')
      : momentLink(g.attempts[0], '', '🎥', 'Момент на стриме');
    return '<div class="badge ' + g.status + '" title="' + escHtml(tipOf(g)) + '">' +
      '<div class="game-lead">' + (g.icon ? '<img class="game-icon" src="' + escHtml(g.icon) + '" alt="" loading="lazy">' : '') +
      '<span class="launch-no" title="Порядок запуска в эфире">' + g.nos + '</span></div><div class="game-content"><span class="game-name">' + escHtml(g.name) + '</span>' + (g.note ? '<span class="game-note">' + escHtml(g.note) + '</span>' : '') +
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
        '<div class="list-body">' + groups.get(s.id).slice().sort((a, b) => a.no - b.no).map(badge).join('') + '</div></div>';
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
