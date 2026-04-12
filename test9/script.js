/* ===== FULLSCREEN IMAGE ===== */
function openImg(src){
  const fs = document.getElementById("fs");
  if(!fs) return;
  fs.style.display = "flex";
  fs.querySelector("img").src = src;
}

function closeImg(){
  const fs = document.getElementById("fs");
  if(!fs) return;
  fs.style.display = "none";
}

/* ===== MENU ===== */
function getPageTitle(){
  const current = location.href.split("/").pop().toLowerCase();
  const map = {
    "index.html": "Главная",
    "games.html": "Игры",
    "streams.html": "Стримы",
    "tnu4.html": "TNU4"
  };
  return map[current] || "Главная";
}

function updateMenuTitle(){
  const title = document.getElementById("menuTitle");
  const menu = document.getElementById("menu");
  if(!title) return;
  const isOpen = menu && menu.classList.contains("open");
  title.textContent = isOpen ? "Меню" : getPageTitle();
}

/* toggleMenu */
function toggleMenu(){
  const menu = document.getElementById("menu");
  if(menu) menu.classList.toggle("open");
  updateMenuTitle();
}

/* initMenu */
function initMenu(){
  const menu = document.getElementById("menu");
  if(!menu) return;
  menu.querySelectorAll("a").forEach(a=>{
    a.onclick = ()=>{
      menu.classList.remove("open");
      updateMenuTitle();
    };
  });
}

/* setActiveLink */
function setActiveLink(){
  const links = document.querySelectorAll("#menu a");
  const current = location.href.split("/").pop().toLowerCase();
  links.forEach(link=>{
    const href = (link.getAttribute("href") || "").split("/").pop().toLowerCase();
    if(current.includes(href)){
      link.classList.add("active");
    }
  });
}

/* wrap numbers */
function wrapNumbers(node){
  if(node.nodeType === Node.TEXT_NODE){
    const replaced = node.textContent.replace(/(\d+)/g,'<span class="num">$1</span>');
    if(replaced !== node.textContent){
      const temp = document.createElement('span');
      temp.innerHTML = replaced;
      node.replaceWith(...temp.childNodes);
    }
  } else if(node.nodeType === Node.ELEMENT_NODE && !["SCRIPT","STYLE"].includes(node.tagName)){
    node.childNodes.forEach(wrapNumbers);
  }
}

/* ===== RESPONSIVE MENU BY WIDTH ===== */
function checkMenuWidth() {
  const menu = document.getElementById("menu");
  const menuToggle = document.querySelector(".menu-toggle");
  const links = document.querySelector(".menu-links");
  if(!menu || !links || !menuToggle) return;

  // суммарная ширина всех ссылок
  let totalWidth = 0;
  links.querySelectorAll("a").forEach(a => {
    const style = getComputedStyle(a);
    totalWidth += a.offsetWidth + parseInt(style.marginLeft) + parseInt(style.marginRight);
  });

  const availableWidth = menu.offsetWidth;

  if(totalWidth <= availableWidth) {
    // достаточно места → горизонтально
    links.classList.add("horizontal");
    links.classList.remove("open");
    menuToggle.style.display = "none"; // скрываем кнопку
  } else {
    // мало места → вертикально
    links.classList.remove("horizontal");
    menuToggle.style.display = "flex"; // показываем кнопку
  }
}

/* ===== INIT ON DOM READY ===== */
document.addEventListener("DOMContentLoaded", ()=>{
  updateMenuTitle();
  initMenu();
  setActiveLink();
  wrapNumbers(document.body);
  checkMenuWidth();
});

/* проверка при ресайзе */
window.addEventListener("resize", checkMenuWidth);