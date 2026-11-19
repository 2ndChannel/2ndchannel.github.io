(function () {  if (window.ngivUi) return;
  var lang = 'en';
  try { lang = localStorage.getItem('ngivLang') === 'ru' ? 'ru' : 'en'; } catch (e) {}
  var q = location.search.match(/[?&]lang=(ru|en)/);
  if (q) lang = q[1];
  var PAGES = {
    NG4Home: ['Главная', 'Home'],
    NG4New: ['Что нового?', "What's new?"],
    NG4Story: ['Сюжет', 'Story'],
    NG4Credits: ['Благодарности', 'Credits'],
    NG4Links: ['Ссылки', 'Links'],
    NG4Misc: ['Разное', 'Misc'],
    NG4Ryu: ['Рю', 'Ryu'],
    NG4Rob: ['Роберт', 'Robert'],
    NG4Enemies: ['Враги', 'Enemies'],
    NG4Boss: ['Боссы', 'Bosses'],
    NG4NewBoss: ['Новые боссы', 'New bosses'],
    NG4Heads: ['Главные злодеи', 'Head villains'],
    NG4DN: ['Демон-ниндзя', 'Demon Ninja'],
    NGTHome: ['Трилогия: главная', 'Trilogy: home'],
    NGTArts: ['Искусства ниндзя', 'Arts of the Ninja'],
    NGTBoss: ['Боссы трилогии', 'Trilogy bosses'],
    NGTEnemies: ['Враги трилогии', 'Trilogy enemies'],
    NGTHeads: ['Главные злодеи трилогии', 'Trilogy head villains'],
    NGTLevels: ['Карта уровней', 'Level maps'],
    NGTRyu: ['Рю (трилогия)', 'Ryu (Trilogy)']
  };
  var GROUPS = [
    ['Ninja Gaiden IV', ['NG4Home', 'NG4New', 'NG4Story', 'NG4Credits', 'NG4Links', 'NG4Misc']],
    ['Герои', ['NG4Ryu', 'NG4Rob']],
    ['Противники', ['NG4Enemies', 'NG4Boss', 'NG4NewBoss', 'NG4Heads', 'NG4DN']],
    ['Трилогия', ['NGTHome', 'NGTArts', 'NGTBoss', 'NGTEnemies', 'NGTHeads', 'NGTLevels', 'NGTRyu']]
  ];
  var GROUP_OF = {};
  GROUPS.forEach(function (g, gi) { g[1].forEach(function (n) { GROUP_OF[n] = gi; }); });

  function parentName(n) {
    if (!n) return null;
    if (PAGES[n]) return n;
    if (/^NG[123]Enemies$/.test(n)) return 'NGTEnemies';
    var b = n.replace(/_.*$/, '').replace(/(\D)\d+$/, '$1');
    return PAGES[b] ? b : null;
  }

  function pageOfLocation() {
    var m = location.pathname.match(/([^\/]+)\.html$/);
    return m ? parentName(m[1]) : null;
  }

  function dstOf(img) {
    var a = img.closest ? img.closest('a') : null;
    if (a) {
      var m = (a.getAttribute('href') || '').match(/^([A-Za-z0-9_]+)\.html$/);
      if (m && parentName(m[1])) return { name: parentName(m[1]), cur: false, a: a };
    }
    if (/(^|\/)HBut[^\/]*\.gif$/.test(img.getAttribute('src') || '')) {
      var n = pageOfLocation();
      if (n) return { name: n, cur: true, a: null };
    }
    return null;
  }

  var tip = null, t1, t2, t3, hot = null;

  function build() {
    if (tip) return;
    tip = document.createElement('div');
    tip.className = 'nv-tip';
    tip.setAttribute('role', 'tooltip');
    t1 = document.createElement('b');
    t2 = document.createElement('span');
    t3 = document.createElement('i');
    tip.appendChild(t1); tip.appendChild(t2); tip.appendChild(t3);
    document.body.appendChild(tip);
  }

  function show(img, d) {
    build();
    var p = PAGES[d.name];
    t1.textContent = p[0];
    t2.textContent = p[1];
    t2.style.display = '';
    t3.textContent = 'вы здесь';
    t3.style.display = d.cur ? '' : 'none';
    if (hot && hot !== img) hot.classList.remove('nv-hot');
    hot = img;
    if (!d.cur) img.classList.add('nv-hot');

    var r = img.getBoundingClientRect();
    var vw = document.documentElement.clientWidth || window.innerWidth;
    var vh = document.documentElement.clientHeight || window.innerHeight;
    tip.classList.remove('on');
    tip.style.left = '0px'; tip.style.top = '0px';
    var w = tip.offsetWidth, h = tip.offsetHeight;
    var side = 'r';
    var x = r.right + 12;
    if (x + w > vw - 6) { side = 'l'; x = r.left - w - 12; }
    if (x < 6) { side = 'r'; x = Math.max(6, Math.min(r.right + 12, vw - w - 6)); }
    var cy = r.top + r.height / 2;
    var y = Math.max(6, Math.min(cy - h / 2, vh - h - 6));
    tip.setAttribute('data-side', side);
    tip.style.setProperty('--arrow-y', Math.round(cy - y) + 'px');
    tip.style.left = Math.round(x) + 'px';
    tip.style.top = Math.round(y) + 'px';
    tip.classList.add('on');
  }

  function hide() {
    if (tip) tip.classList.remove('on');
    if (hot) { hot.classList.remove('nv-hot'); hot = null; }
  }

  function imgFrom(e) {
    var t = e.target;
    if (!t || t.nodeName !== 'IMG') return null;
    return /(^|\/)H?But[^\/]*\.gif$/.test(t.getAttribute('src') || '') ? t : null;
  }

  document.addEventListener('mouseover', function (e) {
    if (window.matchMedia && !window.matchMedia('(hover: hover)').matches) return;
    var img = imgFrom(e);
    if (!img) {
      var bt = e.target.closest ? e.target.closest('.nv-btn, .nv-seg a') : null;
      if (bt && bt._nvTip) showText(bt, bt._nvTip);
      return;
    }
    var d = dstOf(img);
    if (d) show(img, d);
  });
  document.addEventListener('mouseout', function (e) {
    if (imgFrom(e) || (e.target.closest && e.target.closest('.nv-btn, .nv-seg a'))) hide();
  });
  window.addEventListener('scroll', hide, { passive: true });
  window.addEventListener('blur', hide);

  function label() {
    Array.prototype.forEach.call(document.images, function (img) {
      if (!/(^|\/)H?But[^\/]*\.gif$/.test(img.getAttribute('src') || '')) return;
      var d = dstOf(img);
      if (!d) return;
      var p = PAGES[d.name];
      img.alt = lang === 'en' ? p[1] : p[0];
    });
  }
  label();

  window.ngivUi = {
    pages: PAGES,
    groups: GROUPS,
    parentName: parentName,
    lang: lang,
    setLang: function (l) {
      lang = l === 'en' ? 'en' : 'ru';
      window.ngivUi.lang = lang;
      label();
    }
  };

  function initChips() {
    var bar = document.querySelector('.ngiv-top');
    if (!bar || bar.classList.contains('nv-chips')) return;
    bar.classList.add('nv-chips');
    Array.prototype.forEach.call(bar.children, function (c) {
      if (c.nodeName === 'A') c.classList.add('nv-btn');
    });
    var n = pageOfLocation();
    if (n) {
      var c = document.createElement('span');
      c.className = 'nv-crumb';
      c.textContent = GROUPS[GROUP_OF[n]][0] + ' \u203a ' + PAGES[n][0];
      bar.insertBefore(c, bar.firstChild);
      var back = bar.querySelector('a[href^="../#"]');
      if (back) back.setAttribute('href', '../?v=orig#' + n);
    }
  }
  initChips();

  var TIP_ORIG = [['Оригинал', 'Страница в оригинальной вёрстке, как на Geocities. Откроется в новой вкладке.']];
  var TIP_OPEN = [['Оригинал отдельно', 'Эта страница в оригинальной вёрстке, на английском, в новой вкладке. Не зависит от выбранного вида.']];
  var TIP_VIEW = [['Оригинал в окне', 'Эта страница в окне просмотра оригинального сайта.']];
  var TIP_EN = [['Оригинал (English)', 'Язык оригинального сайта, без перевода.']];
  var TIP_RU = [['Перевод на русский', 'Русский текст — перевод, оригинал на английском.']];
  var TIP_NEW = [['Крупный вид', 'Адаптированная вёрстка: крупнее и целиком по размеру окна. Это не оригинал.']];
  var TIP_ORG = [['Оригинальный вид', 'Страница ровно такой, какой была на Geocities, уменьшенная до размера окна.']];
  var TIPS = [
    ['.nv-seg a[data-l="en"]', TIP_EN],
    ['.nv-seg a[data-l="ru"]', TIP_RU],
    ['.nv-seg a[data-v="new"]', TIP_NEW],
    ['.nv-seg a[data-v="orig"]', TIP_ORG],
    ['#ngiv-open', TIP_OPEN],
    ['.ngiv-top a[href^="../site/"]', TIP_ORIG],
    ['.ngiv-top a[href^="../?v=orig"]', TIP_VIEW]
  ];
  TIPS.forEach(function (r) {
    var e = document.querySelector(r[0]);
    if (!e) return;
    e._nvTip = r[1];
    e.removeAttribute('title');
  });

  function showText(el, spec) {
    build();
    t1.textContent = spec[0][0];
    t2.textContent = spec[0][1];
    t2.style.display = '';
    t3.style.display = 'none';
    tip.classList.remove('on');
    tip.style.left = '0px';
    tip.style.top = '0px';
    var r = el.getBoundingClientRect();
    var vw = document.documentElement.clientWidth || window.innerWidth;
    var vh = document.documentElement.clientHeight || window.innerHeight;
    var w = tip.offsetWidth, h = tip.offsetHeight;
    if (el.getAttribute('data-tip-side') === 'r' && r.right + w + 16 < vw) {
      var cy = r.top + r.height / 2;
      var yy = Math.max(6, Math.min(cy - h / 2, vh - h - 6));
      tip.setAttribute('data-side', 'r');
      tip.style.setProperty('--arrow-y', Math.round(cy - yy) + 'px');
      tip.style.left = Math.round(r.right + 12) + 'px';
      tip.style.top = Math.round(yy) + 'px';
      tip.classList.add('on');
      return;
    }
    var cx = r.left + r.width / 2;
    var x = Math.max(6, Math.min(cx - w / 2, vw - w - 6));
    var side = 'b', y = r.bottom + 10;
    if (y + h > vh - 6) { side = 't'; y = r.top - h - 10; }
    tip.setAttribute('data-side', side);
    tip.style.setProperty('--arrow-x', Math.round(cx - x) + 'px');
    tip.style.left = Math.round(x) + 'px';
    tip.style.top = Math.round(Math.max(6, y)) + 'px';
    tip.classList.add('on');
  }
})();
