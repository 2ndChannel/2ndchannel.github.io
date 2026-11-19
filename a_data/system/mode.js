(function () {
  var root = document.documentElement;
  var last = '';
  function mq(q) {
    return window.matchMedia(q).matches;
  }
  function update() {
    var w = window.innerWidth;
    var touchMain = mq('(hover: none) and (pointer: coarse)');
    var anyTouch = touchMain || navigator.maxTouchPoints > 0;
    var shortSide = Math.min(window.screen.width, window.screen.height);
    var mode = (w <= 700 || (anyTouch && shortSide <= 600)) ? 'phone' : (w < 1000 ? 'tablet' : 'pc');
    var input = touchMain ? 'touch' : 'mouse';
    var size = w <= 420 ? 'tiny' : (w <= 480 ? 'small' : (w >= 1200 ? 'wide' : 'normal'));
    var scale = (mode === 'pc' && input === 'mouse') ? Math.min(1.6, Math.max(1, Math.round(w / 1500 * 20) / 20)) : 1;
    root.setAttribute('data-mode', mode);
    root.setAttribute('data-input', input);
    root.setAttribute('data-size', size);
    root.style.setProperty('--ui-scale', String(scale));
    var key = mode + '|' + input + '|' + size;
    if (key !== last) {
      last = key;
      window.dispatchEvent(new Event('modechange'));
    }
  }
  update();
  window.addEventListener('resize', update);
  window.addEventListener('orientationchange', update);
})();