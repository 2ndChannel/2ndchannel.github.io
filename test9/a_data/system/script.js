// ===== 1. АНАЛИТИКА (ЗАПУСК) =====
(function() {
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    ym(108755980, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });

    var ga = document.createElement('script');
    ga.async = true;
    ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-GQ6ZY3PPVJ';
    document.head.appendChild(ga);
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-GQ6ZY3PPVJ');
})();

// ===== OPEN / CLOSE FULLSCREEN IMAGE =====
function openImg(src){
    const fs = document.getElementById("fs");
    if(fs) { fs.style.display = "flex"; const img = fs.querySelector("img"); if(img) img.src = src; }
}
function closeImg(){
    const fs = document.getElementById("fs");
    if(fs) fs.style.display = "none";
}

// ===== UNIVERSAL NAV LOADER =====
async function loadNavbar() {
    const navCont = document.getElementById('nav');
    if (!navCont) return;

    try {
        const isTest = window.location.pathname.includes('/test9/');
        const basePath = isTest ? '/test9/' : '/';
        const response = await fetch(basePath + 'a_data/system/nav.html'); 
        const html = await response.text();
        navCont.innerHTML = html;

        const navInner = document.getElementById('nav-inner');
        const menuList = document.getElementById('menu-list');
        const menuBtn = document.getElementById('menu-btn');
        const menuTitle = document.getElementById('menuTitle');
        const path = window.location.pathname;

// Логика гамбургера
        const checkFitting = () => {
            // 1. Сбрасываем всё в десктоп
            navInner.classList.remove('mobile-mode');
            document.body.classList.remove('is-mobile');

            // 2. Если контент меню шире места в навигации
            if (menuList.scrollWidth > navInner.clientWidth - 40) {
                navInner.classList.add('mobile-mode');
                document.body.classList.add('is-mobile');
            } else {
                // 3. Трюк: даем 10мс на перерисовку, прежде чем пинать YouTube-плашки
                setTimeout(() => {
                    window.dispatchEvent(new Event('resize'));
                }, 10);
            }
        };

		menuBtn.onclick = (e) => { e.stopPropagation(); menuList.classList.toggle('active'); };
		document.addEventListener('click', () => menuList.classList.remove('active'));

		// Настройка ссылок и цветов
		// Настройка ссылок и цветов
		const links = document.querySelectorAll('.menu-links a');
		const navElement = document.querySelector('.nav');
		let foundActive = false; // Флаг: нашли ли мы текущую страницу в меню?

		links.forEach(link => {
		const rawHref = link.getAttribute('href') ? link.getAttribute('href').replace(/^\//, '') : '';
		const fullPath = basePath + rawHref.replace(basePath.replace(/^\//, ''), '');
		link.setAttribute('href', fullPath);

		const btnColor = getComputedStyle(link).getPropertyValue('--btn-color').trim();
		if (btnColor === '#d8a400' || btnColor === 'rgb(216, 164, 0)') {
			link.classList.add('is-yellow');
		}

		// Проверка на активность
		if (path === fullPath || (path === basePath && rawHref === 'index.html')) {
			link.classList.add('active');
			if (menuTitle) menuTitle.textContent = link.innerText.trim();
			foundActive = true; // Пометили, что страница есть в меню
			
			if (btnColor) {
				navElement.style.setProperty('--active-color', btnColor);
				navElement.classList.add('color-loaded');
			}
		}
	});

// А ТЕПЕРЬ ГЛАВНОЕ: если страница не в меню (например, 404)
if (!foundActive) {
    navElement.style.setProperty('--active-color', '#888888'); // Линия станет серой
    navElement.classList.add('color-loaded');
}

// Завершение работы функции
checkFitting();
window.addEventListener('resize', checkFitting);
if (typeof fixNumbers === 'function') fixNumbers();
} catch (err) { console.error('Ошибка загрузки меню:', err); }
}

// ===== FIX NUMBERS =====
function fixNumbers() {
    document.querySelectorAll('h1, h2, h3, .menu-links a').forEach(el => {
        // Проверяем, что это шрифт Machina и мы еще не обрабатывали этот элемент
        if (window.getComputedStyle(el).fontFamily.toLowerCase().includes("machina") && !el.querySelector('.num-fix')) {
            
            // Проходим по всем дочерним узлам
            Array.from(el.childNodes).forEach(node => {
                // Работаем ТОЛЬКО с текстом, не трогаем <img> и другие теги
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

// ===== GAMES PAGE LOGIC =====
async function initGamesPage() {
    const gamesContainer = document.getElementById("games");
    if (!gamesContainer) return;
    const [streams, allGames] = await Promise.all([
        fetch('../streams/streams.json').then(r => r.json()),
        fetch('games.json').then(r => r.json())
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