(function () {
  /* Оригинал, открытый отдельной страницей (не в окне просмотрщика), — только на английском:
     без перевода, без переключателя языка и без подсказок. */  if (window.parent === window && /\/site\/[^\/]*$/.test(location.pathname)) {
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
      var vp = document.createElement('meta');
      vp.name = 'viewport';
      document.head.appendChild(vp);
      var fitVp = function () {
        var r = document.getElementById('root');
        var t = r ? null : document.querySelector('body > table');
        var w = r ? r.offsetWidth : (t ? t.offsetWidth + 20 : 0);
        vp.content = 'width=' + (w > 200 ? w : 700);
      };
      fitVp();
      window.addEventListener('load', fitVp);
    }
    return;
  }
  var KEY = 'ngivLang';  var lang = 'en';
  try { lang = localStorage.getItem(KEY) === 'ru' ? 'ru' : 'en'; } catch (e) {}
  var q = location.search.match(/[?&]lang=(ru|en)/);
  if (q) {
    lang = q[1];
    try { localStorage.setItem(KEY, lang); } catch (e) {}  }
  if (window.parent !== window) {
    document.documentElement.classList.add('nv-embed');
    try {
      var rawGet = Storage.prototype.getItem;
      Storage.prototype.getItem = function (k) { return k === 'ngivFit' ? '1' : rawGet.call(this, k); };
    } catch (e) {}
  }
  function mountSwitch() {
    var bar = document.querySelector('.ngiv-top');
    if (!bar && window.parent !== window) return;
    var box = document.createElement('span');
    box.id = 'ngiv-lang-switch';
    if (!bar) box.style.cssText = 'position:fixed;top:6px;right:6px;z-index:9999;background:rgba(0,0,0,.82);border:1px solid #666;border-radius:8px;padding:4px 10px;font:13px Arial,sans-serif;color:#ddd';
    if (bar) box.className = 'nv-seg';
    else box.appendChild(document.createTextNode('Язык / Language: '));    [['en', 'English'], ['ru', 'Русский']].forEach(function (p, i) {
      if (i && !bar) box.appendChild(document.createTextNode(' / '));
      var a = document.createElement('a');      a.href = '#';
      a.setAttribute('data-l', p[0]);
      a.title = p[1];
      if (bar) {
        a.textContent = p[0].toUpperCase();
        if (lang === p[0]) a.className = 'on';
      } else {
        a.textContent = p[1];
        a.style.fontWeight = lang === p[0] ? 'bold' : 'normal';
        a.style.textDecoration = lang === p[0] ? 'none' : 'underline';
      }
      a.addEventListener('click', function (e) {
        e.preventDefault();
        if (lang === p[0]) return;
        try { localStorage.setItem(KEY, p[0]); } catch (x) {}
        var u = location.pathname + location.search.replace(/([?&])lang=(ru|en)(&|$)/, function (m, a1, b1, c1) { return c1 ? a1 : ''; }) + location.hash;
        history.replaceState(null, '', u);
        location.reload();
      });
      box.appendChild(a);
    });
    (bar || document.body).appendChild(box);
  }  (function () {
    var cs = document.currentScript;
    if (!cs || !cs.src || window.ngivUiLoaded) return;
    window.ngivUiLoaded = true;
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = new URL('ngiv-ui.css', cs.src).href;
    document.head.appendChild(css);
    var js = document.createElement('script');
    js.src = new URL('ngiv-ui.js', cs.src).href;    document.head.appendChild(js);
  })();

  mountSwitch();

  if (lang !== 'ru') return;
  var src = document.currentScript && document.currentScript.src;
  if (!src || !window.fetch) return;

  var FONT = '"Segoe UI", Tahoma, Verdana, "DejaVu Sans", Arial, sans-serif';
  var st = document.createElement('style');
  st.textContent =
    'body, td, div, span, font, b, i, a, p { font-family: ' + FONT + ' !important; }' +
    'i, em { font-style: normal !important; }' +
    'font[color="#0000FF" i], font[color="#0000ff" i] { color: #8a8aff !important; }' +
    '.ng .txt, #root td { letter-spacing: 0.01em; }';
  document.head.appendChild(st);

  function norm(s) {
    return s.replace(/[\s\u00a0]+/g, ' ').trim();
  }

  function rootChild(node, root) {
    var n = node;
    while (n && n.parentNode !== root) n = n.parentNode;
    return n && n.nodeType === 1 ? n : null;
  }

  function fitBox(box) {
    var m = (box.getAttribute('style') || '').match(/height:\s*(\d+)/);
    var tbl = box.querySelector('table');
    var spans = box.querySelectorAll('span');
    if (!m || !tbl || !spans.length) return;
    var h = +m[1];
    if (tbl.offsetHeight <= h + 1) return;
    var orig = [];
    Array.prototype.forEach.call(spans, function (s) {
      orig.push(parseFloat(getComputedStyle(s).fontSize) || 12);
    });
    var scale = 1;
    while (scale > 0.74 && tbl.offsetHeight > h + 1) {
      scale -= 0.04;
      for (var i = 0; i < spans.length; i++) spans[i].style.fontSize = (orig[i] * scale).toFixed(2) + 'px';
    }
    if (tbl.offsetHeight > h + 1) box.style.height = tbl.offsetHeight + 'px';
  }

  function apply(dict) {
    var root = document.getElementById('root');
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    var touched = [];
    nodes.forEach(function (node) {
      var p = node.parentNode && node.parentNode.nodeName;
      if (p === 'SCRIPT' || p === 'STYLE') return;
      var v = node.nodeValue;
      var k = norm(v);
      if (!k || !Object.prototype.hasOwnProperty.call(dict, k)) return;
      var lead = v.match(/^[\s\u00a0]*/)[0];
      var trail = v.match(/[\s\u00a0]*$/)[0];
      node.nodeValue = lead + dict[k] + trail;
      if (root) {
        var b = rootChild(node, root);
        if (b && touched.indexOf(b) < 0) touched.push(b);
      }
    });
    var t = norm(document.title || '');
    if (t && Object.prototype.hasOwnProperty.call(dict, t)) {
      document.title = dict[t];
      if (window.parent !== window) {
        try { window.parent.document.title = dict[t] + ' | 2nd Channel'; } catch (e) {}
      }
    }
    document.documentElement.lang = 'ru';
    var refit = function () {
      touched.forEach(fitBox);
      if (root) {
        var maxB = 0;
        for (var i = 0; i < root.children.length; i++) {
          var c = root.children[i];
          maxB = Math.max(maxB, c.offsetTop + c.offsetHeight);
        }
        if (maxB > root.offsetHeight) root.style.height = maxB + 'px';
      }
      window.dispatchEvent(new Event('resize'));
      if (window.parent !== window) {
        try { window.parent.dispatchEvent(new Event('resize')); } catch (e) {}
      }
    };
    refit();
    setTimeout(refit, 300);
    setTimeout(refit, 1200);
  }

  fetch(new URL('ru.json', src))
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (d) { if (d) apply(d); })
    .catch(function () {});
})();
