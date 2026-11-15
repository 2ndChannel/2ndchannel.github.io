(function (root) {
    let activePopup = null;
    function closeActivePopup() {
        if (!activePopup) return;
        if (activePopup._cleanup) activePopup._cleanup();
        activePopup.remove();
        activePopup = null;
        document.removeEventListener('mousedown', onDocMouseDown, true);
        document.removeEventListener('keydown', onDocKeyDown, true);
    }
    function onDocMouseDown(e) {
        if (!activePopup) return;
        if (activePopup.contains(e.target)) return;
        if (activePopup._trigger === e.target || activePopup._trigger.contains(e.target)) return;
        closeActivePopup();
    }
    function onDocKeyDown(e) {
        if (e.key === 'Escape') closeActivePopup();
    }    function readOptions(selectEl) {
        const items = [];
        let idx = 0;
        Array.from(selectEl.children).forEach(child => {
            if (child.tagName === 'OPTGROUP') {
                const groupItems = [];
                Array.from(child.children).forEach(o => {
                    if (o.tagName !== 'OPTION') return;
                    const i = idx++;
                    if (o.hidden) return;
                    groupItems.push({ type: 'option', idx: i, value: o.value, label: o.textContent, disabled: o.disabled, title: o.getAttribute('title') || '', cls: o.getAttribute('data-cs-class') || '' });
                });
                if (groupItems.length) {
                    items.push({ type: 'group', label: child.label });
                    items.push(...groupItems);
                }
            } else if (child.tagName === 'OPTION') {
                const i = idx++;
                if (child.hidden) return;
                items.push({ type: 'option', idx: i, value: child.value, label: child.textContent, disabled: child.disabled, title: child.getAttribute('title') || '', cls: child.getAttribute('data-cs-class') || '' });
            }
        });
        return items;
    }
    function attach(selectEl, config) {
        if (!selectEl || selectEl._customSelectAttached) return;
        selectEl._customSelectAttached = true;        config = config || {};
        const accent = config.accentColor || selectEl.getAttribute('data-cs-accent') || '#319b0f';
        const actionMode = config.actionMode !== undefined ? !!config.actionMode : (selectEl.getAttribute('data-cs-action') === 'true');
        const doneText = config.doneText || selectEl.getAttribute('data-cs-done-text') || '✅ Готово';
        const doneDuration = parseInt(config.doneDuration || selectEl.getAttribute('data-cs-done-duration'), 10) || 1500;
        let showingFeedback = false;
        let feedbackTimer = null;
        const originalInlineStyle = selectEl.getAttribute('style') || '';
        const flexMatch = originalInlineStyle.match(/(?:^|;)\s*flex\s*:\s*([^;]+)/);        const hasWidthFull = (/width\s*:\s*100%/.test(originalInlineStyle) || selectEl.classList.contains('select-custom')) && !selectEl.classList.contains('select-compact');
        const hasFillIntent = !!flexMatch || hasWidthFull;
        const isCompact = !hasFillIntent;        selectEl.style.setProperty('position', 'absolute', 'important');
        selectEl.style.setProperty('opacity', '0', 'important');
        selectEl.style.setProperty('width', '1px', 'important');
        selectEl.style.setProperty('height', '1px', 'important');
        selectEl.style.setProperty('background', 'transparent', 'important');
        selectEl.style.setProperty('border', 'none', 'important');
        selectEl.style.setProperty('pointer-events', 'none', 'important');
        selectEl.tabIndex = -1;        const wrap = document.createElement('span');
        wrap.className = 'cs-wrap';
        if (flexMatch) {
            wrap.style.flex = flexMatch[1].trim();
            wrap.style.minWidth = '0';
        } else if (hasWidthFull) {
            wrap.classList.add('cs-wrap-fill');
        }
        selectEl.parentNode.insertBefore(wrap, selectEl);
        wrap.appendChild(selectEl);        const trigger = document.createElement('button');
        trigger.type = 'button';
        trigger.className = 'cs-trigger ' + (selectEl.className || '');
        trigger.style.setProperty('--cs-accent', accent);
        trigger.disabled = selectEl.disabled;        wrap.appendChild(trigger);
        selectEl._csTrigger = trigger;
        const triggerLabel = document.createElement('span');
        triggerLabel.className = 'cs-trigger-label';
        trigger.appendChild(triggerLabel);        function currentOption() { return selectEl.options[selectEl.selectedIndex] || null; }
        function syncTrigger() {
            if (actionMode) {
                if (showingFeedback) return;
                const placeholderOpt = selectEl.options[0];
                triggerLabel.textContent = placeholderOpt ? placeholderOpt.textContent : '';
                trigger.classList.add('cs-placeholder');
                return;
            }
            const opt = currentOption();
            triggerLabel.textContent = opt ? opt.textContent : '';
            trigger.classList.toggle('cs-placeholder', !opt || opt.disabled);
        }
        selectEl._csRefresh = syncTrigger;        function fixTriggerWidth() {
            if (!isCompact) {
                trigger.style.setProperty('width', '100%', 'important');
                trigger.style.removeProperty('min-width');
                return;
            }
            const cs = getComputedStyle(trigger);
            const measureCanvas = document.createElement('canvas');
            const measureCtx = measureCanvas.getContext('2d');
            measureCtx.font = cs.font && cs.font.trim() ? cs.font : `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
            const textsToMeasure = actionMode
                ? [(selectEl.options[0] ? selectEl.options[0].textContent : ''), doneText]
                : Array.from(selectEl.options).map(o => o.textContent);
            let maxTextW = 0;
            textsToMeasure.forEach(text => {
                maxTextW = Math.max(maxTextW, measureCtx.measureText(text).width);
            });
            const paddingLeft = parseFloat(cs.paddingLeft) || 0;
            const paddingRight = parseFloat(cs.paddingRight) || 0;
            const borderLeft = parseFloat(cs.borderLeftWidth) || 0;
            const borderRight = parseFloat(cs.borderRightWidth) || 0;
            const gap = parseFloat(cs.columnGap) || 6;
            const arrowWidth = 10;
            const total = Math.ceil(maxTextW + paddingLeft + paddingRight + borderLeft + borderRight + gap + arrowWidth) + 3;
            trigger.style.setProperty('width', total + 'px', 'important');
            trigger.style.setProperty('min-width', total + 'px', 'important');
        }
        selectEl._csFixWidth = fixTriggerWidth;
        const nativeValueDesc = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value');
        Object.defineProperty(selectEl, 'value', {
            configurable: true,
            get() { return nativeValueDesc.get.call(selectEl); },
            set(v) { nativeValueDesc.set.call(selectEl, v); syncTrigger(); }
        });
        const nativeIdxDesc = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'selectedIndex');
        Object.defineProperty(selectEl, 'selectedIndex', {
            configurable: true,
            get() { return nativeIdxDesc.get.call(selectEl); },
            set(v) { nativeIdxDesc.set.call(selectEl, v); syncTrigger(); }
        });
        Object.defineProperty(selectEl, 'disabled', {
            configurable: true,
            get() { return selectEl.hasAttribute('disabled'); },
            set(v) {
                if (v) selectEl.setAttribute('disabled', ''); else selectEl.removeAttribute('disabled');
                trigger.disabled = !!v;
            }
        });        selectEl.addEventListener('change', syncTrigger);
        syncTrigger();
        fixTriggerWidth();
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(fixTriggerWidth);
        const optionsObserver = new MutationObserver(() => { syncTrigger(); fixTriggerWidth(); });
        optionsObserver.observe(selectEl, { childList: true, subtree: true, characterData: true });        function showFeedback() {
            showingFeedback = true;
            triggerLabel.textContent = doneText;
            trigger.classList.remove('cs-placeholder');
            trigger.classList.add('flash-added');
            if (feedbackTimer) clearTimeout(feedbackTimer);
            feedbackTimer = setTimeout(() => {
                showingFeedback = false;
                trigger.classList.remove('flash-added');
                nativeIdxDesc.set.call(selectEl, 0);
                syncTrigger();
            }, doneDuration);
        }
        function selectOption(idx) {
            const opt = selectEl.options[idx];
            if (!opt || opt.disabled) return;
            selectEl.selectedIndex = idx;
            selectEl.dispatchEvent(new Event('change', { bubbles: true }));
            closeActivePopup();
            if (actionMode) showFeedback();
        }

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            if (activePopup && activePopup._trigger === trigger) { closeActivePopup(); return; }
            closeActivePopup();
            openPopup();
        });

        function openPopup() {
            const popup = document.createElement('div');
            popup.className = 'cs-popup';
            popup.style.setProperty('--cs-accent', accent);
            popup._trigger = trigger;
            document.body.appendChild(popup);
            activePopup = popup;
            if (window.ModalKeyNav) {
                window.ModalKeyNav.attach(popup, {
                    autoFocus: false,
                    onClose: closeActivePopup,
                    getButtons: () => Array.from(popup.querySelectorAll('.cs-item:not(.cs-disabled)'))
                });
            }            function measureMaxItemWidth(options) {
                const canvas = document.createElement('canvas');
                const measureCtx = canvas.getContext('2d');
                measureCtx.font = '12px Arial, sans-serif';
                let max = 0;
                options.forEach(o => {
                    const w = measureCtx.measureText(o.label).width + (o.cls ? 24 : 0);
                    if (w > max) max = w;
                });
                return Math.ceil(max) + 34;
            }            function reposition() {
                const r = trigger.getBoundingClientRect();
                const contentWidth = Math.min(measureMaxItemWidth(opts), window.innerWidth - 16);
                popup.style.minWidth = Math.max(r.width, contentWidth) + 'px';
                const spaceBelow = window.innerHeight - r.bottom - 12;
                const spaceAbove = r.top - 12;
                const openAbove = spaceBelow < 160 && spaceAbove > spaceBelow;
                popup.style.maxHeight = Math.max(120, Math.floor(openAbove ? spaceAbove : spaceBelow)) + 'px';
                let left = r.left;
                if (left + popup.offsetWidth > window.innerWidth - 8) left = window.innerWidth - popup.offsetWidth - 8;
                left = Math.max(8, left);
                const popupHeight = popup.offsetHeight;
                const top = openAbove ? Math.max(8, r.top - popupHeight - 4) : (r.bottom + 4);
                popup.style.left = left + 'px';
                popup.style.top = top + 'px';
            }            const opts = readOptions(selectEl);
            opts.forEach(o => {
                if (o.type === 'group') {
                    const groupEl = document.createElement('div');
                    groupEl.className = 'cs-group-label';
                    groupEl.textContent = o.label;
                    popup.appendChild(groupEl);
                    return;
                }
                const item = document.createElement('div');
                item.className = 'cs-item' + (o.disabled ? ' cs-disabled' : '') + (o.idx === selectEl.selectedIndex ? ' cs-selected' : '') + (o.cls ? ' ' + o.cls : '');
                item.textContent = o.label;
                if (o.title) item.title = o.title;
                item.tabIndex = o.disabled ? -1 : 0;
                if (!o.disabled) {
                    item.addEventListener('click', () => selectOption(o.idx));
                    item.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectOption(o.idx); }
                    });
                }
                popup.appendChild(item);
            });
            reposition();
            requestAnimationFrame(reposition);
            popup._cleanup = () => {};
            setTimeout(() => {
                document.addEventListener('mousedown', onDocMouseDown, true);
                document.addEventListener('keydown', onDocKeyDown, true);
            }, 0);
        }
    }
    root.CustomSelect = { attach };
})(typeof window !== 'undefined' ? window : this);