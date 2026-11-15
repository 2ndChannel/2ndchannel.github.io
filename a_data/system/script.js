(function() {
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
async function initGamesPage() {
const gamesContainer = document.getElementById("games");
if (!gamesContainer) return;
const [streams, allGames] = await Promise.all([
fetch('/streams/streams.json').then(r => r.json()),
fetch('/games/games.json').then(r => r.json())
]);
function applyFilters() {
let filtered = [...allGames];
const plat = document.getElementById('f-plat').value;
const status = document.getElementById('f-status').value;
const dStart = document.getElementById('f-date-start').value;
const dEnd = document.getElementById('f-date-end').value;
const sortVal = document.getElementById('f-sort').value;
if(plat !== 'all') filtered = filtered.filter(g => g.platform === plat);
if(status !== 'all') filtered = filtered.filter(g => g.status === status);
if(dStart || dEnd) {
filtered = filtered.filter(g => {
const s = streams.find(st => st.id === g.streamId);
return s && (dStart ? s.date >= dStart : true) && (dEnd ? s.date <= dEnd : true);
});
}
filtered.sort((a, b) => {
const dateA = (streams.find(s => s.id === a.streamId) || {}).date || "";
const dateB = (streams.find(s => s.id === b.streamId) || {}).date || "";
if (sortVal === 'date-desc') return dateB.localeCompare(dateA);
if (sortVal === 'date-asc') return dateA.localeCompare(dateB);
if (sortVal === 'name-asc') return a.name.localeCompare(b.name);
return 0;
});
renderList(filtered);
}
function renderList(data) {
gamesContainer.innerHTML = "";
if(data.length === 0) { gamesContainer.innerHTML = "<p style='text-align:center;'>Ничего не найдено</p>"; return; }
streams.forEach(s => {
const gamesInStream = data.filter(g => g.streamId === s.id);
if (gamesInStream.length > 0) renderGroup(gamesContainer, s.title, s.date, gamesInStream);
});
}
function renderGroup(cont, title, date, games) {
const wrapper = document.createElement("div");
wrapper.className = "game-card";
wrapper.innerHTML = `<div class="stream-header"><h3>${title}</h3><span class="stream-date-header">${date}</span></div><div class="list-body"></div>`;
const body = wrapper.querySelector(".list-body");
games.forEach(g => {
const div = document.createElement("div");
div.className = `badge ${g.status}`;
div.innerHTML = `<div class="game-icon-box"><img src="${g.icon}" class="game-icon"><span class="plat-label">${g.platform}</span></div><div class="game-content"><strong>${g.name}</strong><div class="game-links"><a href="${g.stream}" target="_blank">🎥</a><a href="${g.download}" target="_blank">⬇</a></div></div>`;
body.appendChild(div);
});
cont.appendChild(wrapper);
}
document.querySelectorAll('.filters-panel select, .filters-panel input').forEach(el => el.addEventListener('change', applyFilters));
document.getElementById('resetFilters').onclick = () => {
['f-plat', 'f-status', 'f-date-start', 'f-date-end'].forEach(id => document.getElementById(id).value = 'all' || '');
applyFilters();
};
renderList(allGames);
}
