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
    a.addEventListener("click", ()=>{
      menu.classList.remove("open");
    });
  });
}

const observer = new MutationObserver(()=>{
  if(document.getElementById("menu")){
    initMenu();
  }
});

observer.observe(document.body, {childList:true, subtree:true});