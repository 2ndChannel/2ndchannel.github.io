function openImg(src){
  const f=document.getElementById("fs");
  if(!f) return;
  f.style.display="flex";
  f.querySelector("img").src=src;
}

function closeImg(){
  const f=document.getElementById("fs");
  if(!f) return;
  f.style.display="none";
}

function toggleMenu(){
  const m=document.getElementById("menu");
  if(m) m.classList.toggle("open");
  updateMenuTitle();
}

function updateMenuTitle(){
  const t=document.getElementById("menuTitle");
  const m=document.getElementById("menu");
  if(!t) return;

  t.textContent = (m && m.classList.contains("open")) ? "Меню" : "2nd Channel";
}

function initMenu(){
  const m=document.getElementById("menu");
  if(!m) return;

  m.querySelectorAll("a").forEach(a=>{
    a.onclick=()=>{
      m.classList.remove("open");
      updateMenuTitle();
    };
  });
}

function setActiveLink(){
  const cur=location.pathname.split("/").pop();
  document.querySelectorAll("#menu a").forEach(a=>{
    if(a.getAttribute("href")===cur) a.classList.add("active");
  });
}