/* Подгонка «крупного» вида под окно: сначала колонки, потом умеренное уменьшение картинок.
   Текст не мельчает ниже TMIN. Если всё равно не помещается — страница просто листается вниз. */
(function () {
  var KEY = 'ngivFit';
  var root = document.documentElement;
  var wrap = document.querySelector('.fitwrap');
  var main = document.querySelector('.main');
  var btn = document.getElementById('fitbtn');
  if (!wrap || !main) return;
  var embed = window.parent !== window;
  var TMIN = 0.88;   /* нижний предел масштаба текста */
  var UMIN = 0.42;   /* нижний предел масштаба картинок */
  var GOOD = 0.62;   /* картинки не меньше этого — считаем раскладку удачной */
  var first = true, busy = false, raf = 0;

  function on() { try { return localStorage.getItem(KEY) !== '0'; } catch (e) { return true; } }
  function set(u, t) { root.style.setProperty('--u', u); root.style.setProperty('--t', t); }
  function setCols(n) {
    main.classList.toggle('cols', n > 1);
    main.style.columnCount = n > 1 ? String(n) : '';
  }
  function label(s) { if (btn) btn.textContent = s; }
  function navB() {
    var n = document.getElementById('nav-inner') || document.getElementById('nav');
    if (!n) return 0;
    var f = false, e = n;
    while (e && e !== document.body) { if (/fixed|sticky/.test(getComputedStyle(e).position)) f = true; e = e.parentElement; }
    return f ? Math.max(n.getBoundingClientRect().bottom, 0) : 0;
  }

  function run() {
    var W = innerWidth;
    if (!on() || W <= 760) {
      setCols(1); set(1, 1);
      label('Режим: крупно (нажми — по размеру экрана)');
      return;
    }
    label('Режим: по размеру экрана (нажми — крупно)');
    var H = innerHeight - (embed ? 12 : navB() + 16);
    var txt = +main.dataset.txt || 0;
    var maxCols = txt > 300 ? Math.max(1, Math.min(4, Math.floor(W / (embed ? 330 : 400)))) : 1;
    var startCols = (txt > 700 && maxCols >= 2) ? 2 : 1;

    function fits() { return wrap.offsetHeight <= H; }
    /* наибольший масштаб картинок (текст не ниже TMIN), при котором всё помещается; 0 — не помещается */
    function search() {
      set(1, 1);
      if (fits()) return 1;
      set(UMIN, Math.max(TMIN, UMIN));
      if (!fits()) return 0;
      var lo = UMIN, hi = 1;
      for (var i = 0; i < 12; i++) {
        var m = (lo + hi) / 2;
        set(m, Math.max(TMIN, m));
        if (fits()) lo = m; else hi = m;
      }
      set(lo, Math.max(TMIN, lo));
      return lo;
    }

    var best = null, c, u;
    for (c = startCols; c <= maxCols; c++) {
      setCols(c);
      u = search();
      if (u >= GOOD) return;
      if (u > 0 && (!best || u > best.u)) best = { c: c, u: u };
    }
    if (best) { setCols(best.c); search(); return; }
    /* не помещается — максимум колонок, минимальные размеры, дальше обычная прокрутка */
    setCols(maxCols);
    set(UMIN, Math.max(TMIN, UMIN));
  }

  function fit() {
    if (busy) return;
    busy = true;
    try { run(); } finally { busy = false; }
    if (first) {
      first = false;
      if (!embed) setTimeout(function () { window.scrollTo(0, wrap.getBoundingClientRect().top + pageYOffset - navB() - 8); }, 500);
    }
  }

  if (btn) btn.onclick = function (e) {
    e.preventDefault();
    try { localStorage.setItem(KEY, on() ? '0' : '1'); } catch (x) {}
    fit();
  };
  addEventListener('resize', function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(fit); });
  addEventListener('load', function () { fit(); setTimeout(fit, 600); setTimeout(fit, 1500); });
  document.addEventListener('DOMContentLoaded', fit);
})();
