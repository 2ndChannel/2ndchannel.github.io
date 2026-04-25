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
function loadNavbar() {
  const navContainer = document.getElementById("nav");
  if (!navContainer) return;

  fetch("/a_data/system/nav.html")
    .then(r => {
      if (!r.ok) throw new Error("Nav file not found");
      return r.text();
    })
    .then(html => {
      navContainer.innerHTML = html;

      // Инициализируем только после того, как HTML реально появился
      initMenu();
      setActiveLink();
      updateMenuTitle();
      
      // Запускаем серию замеров адаптивности
      adjustMenu();
      setTimeout(adjustMenu, 50);
      setTimeout(adjustMenu, 150);
      requestAnimationFrame(adjustMenu);
	  fixNumbers();
    })
    .catch(err => console.error("Error loading navigation:", err));
}


// ===== ЦИФРЫ ШРИФТА MACHINA ТОЙ ЖЕ ВЫСОТЫ, ЧТО И БУКВЫ =====
function fixNumbers() {
  const headers = document.querySelectorAll('h1, h2, h3, .menu-links a');
  
  headers.forEach(header => {
    // Получаем название шрифта, который реально сейчас применен к элементу
    const currentFont = window.getComputedStyle(header).fontFamily;

    // Проверяем: если в названии шрифта есть "Machina"
    if (currentFont.includes("Machina")) {
      
      // Если мы еще не исправляли этот заголовок (чтобы не дублировать)
      if (!header.querySelector('.num-fix')) {
        header.innerHTML = header.innerHTML.replace(/(\d+)/g, '<span class="num-fix">$1</span>');
      }
      
    } else {
      // Если это другой шрифт — мы ничего не делаем.
      // Скрипт просто пропустит этот заголовок.
    }
  });
}


// ===== INIT ON PAGE LOAD =====
window.addEventListener("load", () => {
  // Если навигация уже есть в HTML (статическая), настраиваем её
  // Если нет — её настроит loadNavbar после загрузки
  if(document.getElementById("menu")) {
    updateMenuTitle();
    initMenu();
    setActiveLink();
    adjustMenu();
	fixNumbers();
    setTimeout(adjustMenu, 50);
    requestAnimationFrame(adjustMenu);
  }
});

// ===== ADJUST MENU ON RESIZE =====
window.addEventListener("resize", adjustMenu);