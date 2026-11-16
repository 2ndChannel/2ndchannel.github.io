(function () {
  const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const pad = n => (n < 10 ? '0' : '') + n;
  const iso = (y, m, d) => y + '-' + pad(m + 1) + '-' + pad(d);
  const fmt = v => { const p = v.split('-'); return p[2] + '.' + p[1] + '.' + p[0]; };
  const valueDesc = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
  let popup = null, owner = null;

  function close() {
    if (popup) { popup.remove(); popup = null; }
    if (owner) { owner.trigger.setAttribute('aria-expanded', 'false'); owner = null; }
  }

  function open(state) {
    owner = state;
    state.trigger.setAttribute('aria-expanded', 'true');
    const cur = valueDesc.get.call(state.input);
    const now = new Date();
    const todayIso = iso(now.getFullYear(), now.getMonth(), now.getDate());
    let y = now.getFullYear(), m = now.getMonth();
    if (/^\d{4}-\d{2}-\d{2}$/.test(cur)) { const p = cur.split('-'); y = +p[0]; m = +p[1] - 1; }
    popup = document.createElement('div');
    popup.className = 'dp-popup';
    popup.setAttribute('role', 'dialog');
    document.body.appendChild(popup);

    const place = () => {
      const r = state.trigger.getBoundingClientRect();
      const w = popup.offsetWidth, h = popup.offsetHeight;
      const left = Math.min(Math.max(8, r.left), Math.max(8, window.innerWidth - w - 8));
      let top = r.bottom + 4;
      if (top + h > window.innerHeight - 8) top = Math.max(8, r.top - h - 4);
      popup.style.left = left + 'px';
      popup.style.top = top + 'px';
    };

    const build = () => {
      const sel = valueDesc.get.call(state.input);
      const lead = (new Date(y, m, 1).getDay() + 6) % 7;
      const count = new Date(y, m + 1, 0).getDate();      const maxY = now.getFullYear(), maxM = now.getMonth();
      const noNextMonth = y > maxY || (y === maxY && m >= maxM);
      const noNextYear = y + 1 > maxY || (y + 1 === maxY && m > maxM);
      let h = '<div class="dp-head">' +
        '<button type="button" class="dp-nav" data-act="py" title="Год назад">«</button>' +
        '<button type="button" class="dp-nav" data-act="pm" title="Месяц назад">‹</button>' +
        '<span class="dp-title">' + MONTHS[m] + ' ' + y + '</span>' +        '<button type="button" class="dp-nav" data-act="nm" title="Месяц вперёд"' + (noNextMonth ? ' disabled' : '') + '>›</button>' +        '<button type="button" class="dp-nav" data-act="ny" title="Год вперёд"' + (noNextYear ? ' disabled' : '') + '>»</button></div><div class="dp-grid">';
      DAYS.forEach(d => { h += '<span class="dp-dow">' + d + '</span>'; });
      for (let i = 0; i < lead; i++) h += '<span></span>';
      for (let d = 1; d <= count; d++) {
        const v = iso(y, m, d);        h += '<button type="button" class="dp-day' + (v === sel ? ' sel' : '') + (v === todayIso ? ' today' : '') + '" data-v="' + v + '"' + (v > todayIso ? ' disabled' : '') + '>' + d + '</button>';
      }
      h += '</div><div class="dp-foot"><button type="button" class="dp-mini" data-act="today">Сегодня</button><button type="button" class="dp-mini" data-act="clear">Очистить</button></div>';
      popup.innerHTML = h;
      place();
    };

    const pick = v => {
      const input = state.input;
      const changed = valueDesc.get.call(input) !== v;
      input.value = v;
      close();
      if (changed) input.dispatchEvent(new Event('change', { bubbles: true }));
    };

    popup.addEventListener('click', e => {
      e.stopPropagation();
      const b = e.target.closest('button');      if (!b || b.disabled) return;
      const act = b.dataset.act;
      if (b.dataset.v) { pick(b.dataset.v); return; }
      if (act === 'today') { pick(todayIso); return; }
      if (act === 'clear') { pick(''); return; }
      if (act === 'pm') { m--; if (m < 0) { m = 11; y--; } }
      else if (act === 'nm') { m++; if (m > 11) { m = 0; y++; } }
      else if (act === 'py') y--;
      else if (act === 'ny') y++;
      build();
    });
    build();
  }

  function attach(input) {
    if (!input || input._dp) return;
    const wrap = document.createElement('div');
    wrap.className = 'dp-wrap';
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'dp-trigger';
    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.setAttribute('aria-expanded', 'false');
    const label = document.createElement('span');
    label.className = 'dp-label';
    trigger.appendChild(label);
    input.parentNode.insertBefore(wrap, input);
    wrap.appendChild(trigger);
    wrap.appendChild(input);
    const state = { input, trigger };
    input._dp = state;
    const refresh = () => {
      const v = valueDesc.get.call(input);
      label.textContent = v ? fmt(v) : 'выбрать';
      trigger.classList.toggle('dp-set', !!v);
    };
    Object.defineProperty(input, 'value', {
      configurable: true,
      get() { return valueDesc.get.call(this); },
      set(v) { valueDesc.set.call(this, v); refresh(); }
    });
    refresh();
    trigger.addEventListener('click', e => {
      e.stopPropagation();
      const same = owner === state;
      close();
      if (!same) open(state);
    });
  }

  document.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  window.addEventListener('resize', close);
  window.addEventListener('scroll', e => { if (popup && !popup.contains(e.target)) close(); }, true);

  window.DatePicker = { attach, close };
})();