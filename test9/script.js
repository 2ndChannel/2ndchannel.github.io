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

function toggleMenu(){
  const menu = document.getElementById("menu");
  if(menu) menu.classList.toggle("open");

  updateMenuTitle();
}

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

/* ===== УМНОЕ МЕНЮ ===== */

function adjustMenu(){
  const menu = document.getElementById("menu");
  const toggle = document.getElementById("menuToggle");
  const nav = document.querySelector(".nav");

  if(!menu || !toggle || !nav) return;

  // сброс
  menu.classList.remove("vertical","open");
  menu.classList.add("horizontal");
  toggle.style.display = "none";

  const menuWidth = menu.scrollWidth;
  const availableWidth = nav.clientWidth;

  if(menuWidth > availableWidth){
    menu.classList.remove("horizontal");
    menu.classList.add("vertical");
    toggle.style.display = "flex";
  }
}

/* ===== INIT ===== */

document.addEventListener("DOMContentLoaded", ()=>{
  updateMenuTitle();
  initMenu();
  setActiveLink();
  adjustMenu();
});

window.addEventListener("resize", adjustMenu);