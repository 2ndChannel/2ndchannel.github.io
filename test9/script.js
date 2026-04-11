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
  const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  links.forEach(link=>{
    const href = (link.getAttribute("href") || "").split("/").pop().toLowerCase();

    if(href === current){
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