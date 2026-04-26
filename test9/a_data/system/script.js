// ===== 1. АНАЛИТИКА (ЗАПУСК) =====
(function() {
    // Яндекс Метрика
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    ym(108755980, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });

    // Google Analytics
    var ga = document.createElement('script');
    ga.async = true;
    ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-GQ6ZY3PPVJ';
    document.head.appendChild(ga);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-GQ6ZY3PPVJ');
    
    console.log("Аналитика подцеплена!");
})();

// ===== OPEN / CLOSE FULLSCREEN IMAGE =====
function openImg(src){
  const fs = document.getElementById("fs");
  if(!fs) return;
  fs.style.display = "flex";
  const img = fs.querySelector("img");
  if(img) img.src = src;
}

function closeImg(){
  const fs = document.getElementById("fs");
  if(!fs) return;
  fs.style.display = "none";
}

// ===== MENU TITLE =====
function getPageTitle(){
  const path = location.pathname; // Берем путь вместо имени файла
  if (path.includes("/games/")) return "Игры";
  if (path.includes("/streams/")) return "Стримы";
  if (path.includes("/tnu4/")) return "TNU4";
  return "Главная";
}

function updateMenuTitle(){
  const title = document.getElementById("menuTitle");
  const menu = document.getElementById("menu");
  if(!title) return;
  const isOpen = menu && menu.classList.contains("open");
  title.textContent = isOpen ? "Меню" : getPageTitle();
}

function toggleMenu(){
  const menu = document.getElementById("menu");
  if(menu) menu.classList.toggle("open");
  updateMenuTitle();
}

// ===== INIT MENU LINKS =====
function initMenu(){
  const menu = document.getElementById("menu");
  if(!menu) return;

  menu.querySelectorAll("a").forEach(a => {
    a.onclick = () => {
      menu.classList.remove("open");
      updateMenuTitle();
    };
  });
}

function setActiveLink(){
  const links = document.querySelectorAll("#menu a");
  const current = location.href.split("/").pop().split("?")[0].toLowerCase() || "index.html";

  links.forEach(link => {
    const href = (link.getAttribute("href") || "").split("/").pop().toLowerCase();
    // Точное совпадение или проверка вхождения
    if(current.includes(href) || (current === "index.html" && href === "index.html")){
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// ===== SMART MENU ADJUSTMENT =====
function adjustMenu(){
  const menu = document.getElementById("menu");
  const toggle = document.getElementById("menuToggle");
  const nav = document.querySelector(".nav");

  if(!menu || !toggle || !nav) return;

  // Сбрасываем для замера
  menu.classList.remove("vertical", "open");
  menu.classList.add("horizontal");
  toggle.style.display = "none";

  const menuWidth = menu.scrollWidth;
  const availableWidth = nav.clientWidth;

  if(menuWidth > availableWidth){
    menu.classList.remove("horizontal");
    menu.classList.add("vertical");
    toggle.style.display = "flex";
  }
  updateMenuTitle();
}

// ===== UNIVERSAL NAV LOADER =====
async function loadNavbar() {
    const navCont = document.getElementById('nav');
    if (!navCont) return;

    try {
        // 1. Загружаем внешний HTML
        const response = await fetch('../a_data/system/nav.html');
        const html = await response.text();
        navCont.innerHTML = html;

        // 2. Названия страниц
        const titles = {
            '/': 'Главная', '/tnu4/': 'TNU4',
            '/streams/': 'Стримы', '/games/': 'Игры'
        };
        const path = window.location.pathname;
        
        // Элементы
        const navInner = document.getElementById('nav-inner');
        const menuTitle = document.getElementById('menuTitle');
        const menuList = document.getElementById('menu-list');
        const menuBtn = document.getElementById('menu-btn');

        // Устанавливаем название
        if (menuTitle) menuTitle.textContent = titles[path] || 'Меню';

        // 3. Функция "Умного адаптива"
        const checkFitting = () => {
            navInner.classList.remove('mobile-mode');
            // Если ширина меню больше ширины окна - включаем гамбургер
            if (menuList.scrollWidth > window.innerWidth - 40) {
                navInner.classList.add('mobile-mode');
            }
        };

        // 4. Логика клика
        menuBtn.onclick = (e) => {
            e.stopPropagation();
            menuList.classList.toggle('active');
        };
        document.addEventListener('click', () => menuList.classList.remove('active'));

        // 5. Подсветка активной ссылки
		document.querySelectorAll('.menu-links a').forEach(link => {
			const href = link.getAttribute('href').replace('../', ''); // Убираем переход вверх для сравнения
			const path = window.location.pathname;
			
			if (path.includes(href) && href !== "") {
				link.classList.add('active');
			}
		});

        // Запуск проверки
        checkFitting();
        window.onresize = checkFitting;
		
		heckFitting();
        window.onresize = checkFitting;
        
        // Добавь это здесь:
        fixNumbers();

    } catch (err) {
        console.error('Ошибка загрузки меню:', err);
    }
}

// ===== ЦИФРЫ ШРИФТА MACHINA ТОЙ ЖЕ ВЫСОТЫ, ЧТО И БУКВЫ =====
function fixNumbers() {
  const targets = document.querySelectorAll('h1, h2, h3, .menu-links a');
  
  targets.forEach(el => {
    const currentFont = window.getComputedStyle(el).fontFamily.toLowerCase();

    // Более надежная проверка на наличие слова "machina"
    if (currentFont.indexOf("machina") !== -1) {
      if (!el.querySelector('.num-fix')) {
        el.innerHTML = el.innerHTML.replace(/(\d+)/g, '<span class="num-fix">$1</span>');
      }
    }
  });
}


// ===== INIT ON PAGE LOAD =====
// Запускаем как только готов HTML (не дожидаясь картинок)
document.addEventListener("DOMContentLoaded", () => {
    fixNumbers();
});

// Дублируем при полной загрузке на всякий случай
window.addEventListener("load", () => {
    fixNumbers();
    // Тут твой старый код для меню...
    if(document.getElementById("menu")) {
        adjustMenu();
    }
});

// ===== ADJUST MENU ON RESIZE =====
window.addEventListener("resize", adjustMenu);

async function initGamesPage() {
    const gamesContainer = document.getElementById("games");
    if (!gamesContainer) return;

    // Загружаем данные: стримы из папки выше, игры из текущей
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
		const sortVal = document.getElementById('f-sort').value; // Получаем значение сортировки

		// 1. Фильтрация по платформе и статусу
		if(plat !== 'all') filtered = filtered.filter(g => g.platform === plat);
		if(status !== 'all') filtered = filtered.filter(g => g.status === status);

		// 2. Фильтрация по датам
		if(dStart || dEnd) {
			filtered = filtered.filter(g => {
				const s = streams.find(st => st.id === g.streamId);
				if (!s) return false;
				const matchStart = dStart ? s.date >= dStart : true;
				const matchEnd = dEnd ? s.date <= dEnd : true;
				return matchStart && matchEnd;
			});
		}

		// 3. ЛОГИКА СОРТИРОВКИ (Добавляем этот блок)
		filtered.sort((a, b) => {
			const streamA = streams.find(st => st.id === a.streamId);
			const streamB = streams.find(st => st.id === b.streamId);
			const dateA = streamA ? streamA.date : "";
			const dateB = streamB ? streamB.date : "";

			if (sortVal === 'date-desc') {
				return dateB.localeCompare(dateA); // Новые сверху
			} else if (sortVal === 'date-asc') {
				return dateA.localeCompare(dateB); // Старые сверху
			} else if (sortVal === 'name-asc') {
				return a.name.localeCompare(b.name); // А-Я по названию
			}
			return 0;
		});

		renderList(filtered);
	}

    function renderList(data) {
        gamesContainer.innerHTML = "";
        if(data.length === 0) { gamesContainer.innerHTML = "<p style='text-align:center;'>Ничего не найдено</p>"; return; }
        
        // Группируем по стримам (используем порядок из streams.json)
        streams.forEach(s => {
            const gamesInStream = data.filter(g => g.streamId === s.id);
            if (gamesInStream.length > 0) renderGroup(gamesContainer, s.title, s.date, gamesInStream);
        });
    }

	function renderGroup(cont, title, date, games) {
        const wrapper = document.createElement("div");
        // Заменили "card" на "game-card"
        wrapper.className = "game-card"; 
        wrapper.innerHTML = `
            <div class="stream-header">
                <h3>${title}</h3>
                <span class="stream-date-header">${date}</span>
            </div>
            <div class="list-body"></div>`;
        const body = wrapper.querySelector(".list-body");
        
        games.forEach(g => {
            const div = document.createElement("div");
            div.className = `badge ${g.status}`;
            div.innerHTML = `
                <div class="game-icon-box">
                    <img src="${g.icon}" class="game-icon">
                    <span class="plat-label">${g.platform}</span>
                </div>
                <div class="game-content">
                    <strong>${g.name}</strong>
                    <div class="game-links">
                        <a href="${g.stream}" target="_blank">🎥</a>
                        <a href="${g.download}" target="_blank">⬇</a>
                    </div>
                </div>`;
            body.appendChild(div);
        });
        cont.appendChild(wrapper);
    }

    document.querySelectorAll('.filters-panel select, .filters-panel input').forEach(el => el.addEventListener('change', applyFilters));
    document.getElementById('resetFilters').onclick = () => {
        document.getElementById('f-plat').value = 'all';
        document.getElementById('f-status').value = 'all';
        document.getElementById('f-date-start').value = '';
        document.getElementById('f-date-end').value = '';
        applyFilters();
    };

    renderList(allGames);
}

