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

  if(isOpen){
    title.textContent = "Меню";
  } else {
    title.textContent = getPageTitle();
  }
}

function toggleMenu(){
  const menu = document.getElementById("menu");
  if(menu) menu.classList.toggle("open");

  updateMenuTitle();
}

/* ===== MENU INIT ===== */

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

/* ===== ACTIVE LINK ===== */

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

/* ===== ON LOAD ===== */

document.addEventListener("DOMContentLoaded", ()=>{
  updateMenuTitle();
});