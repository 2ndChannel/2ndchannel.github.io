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

const observer = new MutationObserver(()=>{
  const menu = document.getElementById("menu");
  if(menu){
    initMenu();
    setActiveLink();
  }
});

observer.observe(document.body, {childList:true, subtree:true});

function updateMenuTitle(){
  const btn = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");

  if(!btn || !menu) return;

  const isOpen = menu.classList.contains("open");

  if(isOpen){
    btn.textContent = "☰ Меню";
    return;
  }

  const current = location.href.split("/").pop().toLowerCase();

  const map = {
    "index.html": "Главная",
    "games.html": "Игры",
    "streams.html": "Стримы",
    "tnu4.html": "TNU4"
  };

  btn.textContent = map[current] || "☰ Меню";
}

document.addEventListener("DOMContentLoaded", ()=>{
  updateMenuTitle();
});