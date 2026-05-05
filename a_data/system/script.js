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
        // 1. Умное определение базового пути
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

        // 2. Логика компактности и мобильного режима
        const checkFitting = () => {
            navInner.classList.remove('mobile-mode');
            // Если экран узкий ИЛИ кнопки начинают не влезать в строку
            if (window.innerWidth < 850 || menuList.scrollWidth > navInner.clientWidth - 20) {
                navInner.classList.add('mobile-mode');
            }
        };

        // 3. Управление гамбургером
        menuBtn.onclick = (e) => { 
            e.stopPropagation(); 
            menuList.classList.toggle('active'); 
        };
        
        // Закрытие меню при клике в любое место экрана
        document.addEventListener('click', () => {
            menuList.classList.remove('active');
        });

        // 4. Настройка кнопок и определение активной страницы
        const links = document.querySelectorAll('.menu-links a');
        const currentPath = window.location.pathname.replace(/\/$/, "").toLowerCase();
        let foundActive = false;

        links.forEach(link => {
            // Приводим ссылки к правильному пути относительно текущей папки
            const rawHref = link.getAttribute('href');
            link.href = relPath + rawHref;

            // Получаем "чистый" путь ссылки для сравнения
            const linkPath = link.pathname.replace(/\/$/, "").toLowerCase();

            // Определяем цвет кнопки из CSS переменной
            const btnColor = getComputedStyle(link).getPropertyValue('--btn-color').trim();
            
            // Специальный класс для желтой кнопки (черный текст при наведении)
            if (btnColor.includes('216, 164, 0') || btnColor.includes('#d8a400')) {
                link.classList.add('is-yellow');
            }

            // ПРОВЕРКА НА АКТИВНОСТЬ (чтобы не горело лишнее)
            const isHome = (currentPath === "" || currentPath.endsWith("index.html")) && 
                           (rawHref === "./" || rawHref === "index.html");
            const isCurrent = (currentPath === linkPath && rawHref !== "./");

            if (isHome || isCurrent) {
                link.classList.add('active');
                foundActive = true;
                
                // Ставим название страницы в мобильную шапку
                if (menuTitle) menuTitle.textContent = link.innerText.trim();
                
                // Красим нижнюю полоску в цвет активной кнопки
                if (btnColor) {
                    navInner.style.setProperty('--active-color', btnColor);
                    navInner.classList.add('color-loaded');
                }
            }
        });

        // 5. ЛОГИКА ДЛЯ 404 (Страница не найдена)
        if (!foundActive) {
            if (menuTitle) menuTitle.textContent = "Страница не найдена";
            navInner.style.setProperty('--active-color', '#888888'); // Серая полоска
            navInner.classList.add('color-loaded');
        }

        // Запуск проверок при загрузке и ресайзе
        checkFitting();
        window.addEventListener('resize', checkFitting);
        
        // Перезапуск фикса цифр, если меню подгрузилось позже
        if (typeof fixNumbers === 'function') fixNumbers();

    } catch (err) { 
        console.error('Ошибка загрузки навигации:', err); 
    }
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