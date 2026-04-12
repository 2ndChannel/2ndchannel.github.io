fetch("nav.html")
.then(r => r.text())
.then(html => {
  document.getElementById("nav").innerHTML = html;
  initMenu();
  setActiveLink();
  updateMenuTitle();
});