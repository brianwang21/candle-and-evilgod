/**
 * Site navigation: remember scroll, land instantly on hash,
 * and use history.back() when the navbar parent is the previous page.
 */
(function () {
  const SCROLL_KEY = 'myoc:scroll';
  const HERE_KEY = 'myoc:here';
  const PREV_KEY = 'myoc:prev';
  const FROM_KEY = 'myoc:from';

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  function normalizePath(pathname) {
    let path = decodeURIComponent(pathname || '');
    path = path.replace(/\\/g, '/');
    if (path.endsWith('/')) path += 'index.html';
    return path.toLowerCase();
  }

  function pageKey(urlLike) {
    try {
      const url = new URL(urlLike, location.href);
      return normalizePath(url.pathname);
    } catch (error) {
      return normalizePath(String(urlLike || ''));
    }
  }

  function samePage(a, b) {
    return pageKey(a) === pageKey(b);
  }

  function readJson(key) {
    try {
      return JSON.parse(sessionStorage.getItem(key) || '{}');
    } catch (error) {
      return {};
    }
  }

  function saveScroll() {
    try {
      const data = readJson(SCROLL_KEY);
      data[pageKey(location.href)] = {
        y: window.scrollY,
        hash: location.hash.replace(/^#/, ''),
        t: Date.now(),
      };
      sessionStorage.setItem(SCROLL_KEY, JSON.stringify(data));
    } catch (error) {
      /* private mode / quota */
    }
  }

  function getSavedScroll() {
    const data = readJson(SCROLL_KEY);
    return data[pageKey(location.href)] || null;
  }

  function rememberPage() {
    try {
      const current = location.pathname + location.search + location.hash;
      const fromClick = sessionStorage.getItem(FROM_KEY) || '';
      const here = sessionStorage.getItem(HERE_KEY) || '';
      const prev = fromClick || (here === current ? sessionStorage.getItem(PREV_KEY) || '' : here);
      if (prev && prev !== current) {
        sessionStorage.setItem(PREV_KEY, prev);
      }
      sessionStorage.setItem(HERE_KEY, current);
      sessionStorage.removeItem(FROM_KEY);
    } catch (error) {
      /* private mode */
    }
  }

  function saveDrawers() {
    try {
      const glossary = document.getElementById('glossary-drawer');
      if (glossary) {
        sessionStorage.setItem(
          'myoc:drawer-glossary',
          glossary.classList.contains('is-open') ? '1' : '0'
        );
      }
      const worldview = document.getElementById('worldview-drawer');
      if (worldview) {
        sessionStorage.setItem(
          'myoc:drawer-worldview',
          worldview.classList.contains('is-open') ? '1' : '0'
        );
      }
    } catch (error) {
      /* ignore */
    }
  }

  function restoreDrawers() {
    const hash = location.hash.slice(1);
    const glossary = document.getElementById('glossary-drawer');
    if (glossary) {
      let open = hash === 'glossary';
      try {
        open = open || sessionStorage.getItem('myoc:drawer-glossary') === '1';
      } catch (error) {}
      if (open) {
        glossary.classList.add('is-open', 'is-open-instant');
        document.documentElement.classList.add('open-glossary');
        const toggle = document.getElementById('glossary-drawer-toggle');
        if (toggle) toggle.setAttribute('aria-expanded', 'true');
      }
    }
    const worldview = document.getElementById('worldview-drawer');
    if (worldview) {
      let open = hash === 'worldview' || hash === 'opcu-ref';
      try {
        open = open || sessionStorage.getItem('myoc:drawer-worldview') === '1';
      } catch (error) {}
      if (open) {
        worldview.classList.add('is-open', 'is-open-instant');
        document.documentElement.classList.add('open-worldview');
        const toggle = document.getElementById('worldview-drawer-toggle');
        if (toggle) toggle.setAttribute('aria-expanded', 'true');
      }
    }
  }

  function revealPage() {
    document.documentElement.classList.remove('myoc-pending-scroll');
    document.documentElement.classList.add('is-smooth-nav');
  }

  function withInstantScroll(fn) {
    const root = document.documentElement;
    root.classList.add('is-instant-scroll');
    root.classList.remove('is-smooth-nav');
    fn();
    window.requestAnimationFrame(() => {
      root.classList.remove('is-instant-scroll');
      root.classList.add('is-smooth-nav');
    });
  }

  function scrollToY(y) {
    withInstantScroll(() => {
      window.scrollTo(0, Math.max(0, y));
    });
  }

  function scrollToEl(el) {
    if (!el) return false;
    withInstantScroll(() => {
      el.scrollIntoView({ behavior: 'auto', block: 'start' });
    });
    return true;
  }

  function hashTarget() {
    const id = decodeURIComponent((location.hash || '').replace(/^#/, ''));
    if (!id) return null;
    try {
      return document.getElementById(id) || document.querySelector(`[name="${id}"]`);
    } catch (error) {
      return document.getElementById(id);
    }
  }

  function restoreScroll() {
    const saved = getSavedScroll();
    const target = hashTarget();

    if (saved && Number.isFinite(saved.y)) {
      scrollToY(saved.y);
      stripHomeHash();
      return;
    }

    if (target) {
      scrollToEl(target);
    }
  }

  function stripHomeHash() {
    const hash = location.hash.slice(1);
    if (!hash) return;
    if (!['glossary', 'worldview', 'opcu-ref', 'factions', 'characters', 'story', 'anomaly-events', 'preface'].includes(hash)) {
      return;
    }
    try {
      history.replaceState(null, '', location.pathname + location.search);
    } catch (error) {}
  }

  function isInternalLink(anchor) {
    if (!anchor || !anchor.getAttribute('href')) return false;
    if (anchor.hasAttribute('download')) return false;
    if (anchor.target && anchor.target !== '_self') return false;
    const href = anchor.getAttribute('href');
    if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
      return false;
    }
    try {
      const url = new URL(anchor.href, location.href);
      if (url.origin === 'null' || location.origin === 'null' || url.protocol === 'file:') {
        return url.protocol === location.protocol;
      }
      return url.origin === location.origin;
    } catch (error) {
      return false;
    }
  }

  function isBackLink(anchor) {
    return (
      anchor.classList.contains('navbar__link--left') ||
      anchor.hasAttribute('data-site-back')
    );
  }

  function previousPage() {
    try {
      const stored = sessionStorage.getItem(PREV_KEY);
      if (stored) return stored;
    } catch (error) {
      /* ignore */
    }
    return document.referrer || '';
  }

  function isSameOriginPrev(prev) {
    if (!prev) return false;
    try {
      const url = new URL(prev, location.href);
      if (url.origin === 'null' || location.origin === 'null' || url.protocol === 'file:') {
        return url.protocol === location.protocol;
      }
      return url.origin === location.origin;
    } catch (error) {
      return true;
    }
  }

  function backLabelFor(prev) {
    const path = pageKey(prev);
    let hash = '';
    try {
      hash = new URL(prev, location.href).hash.replace(/^#/, '');
    } catch (error) {}
    if (path.includes('character-profile')) return '返回人物設定';
    if (path.includes('anomaly-event-list')) return '返回事件清單';
    if (path.includes('anomaly-event')) return '返回異常事件';
    if (path.includes('faction-morris')) return '返回莫里斯公司';
    if (path.includes('faction-cta')) return '返回 CTA';
    if (path.includes('faction-witch')) return '返回魔女議會';
    if (path.includes('glossary-angel')) return '返回天使釋義';
    if (path.includes('glossary-biomod')) return '返回生體改造';
    if (path.includes('anomaly-adaptability')) return '返回異常適性';
    if (path.endsWith('/index.html') || path.endsWith('index.html')) {
      if (path.includes('/story/')) return '返回段落列表';
      if (hash === 'glossary') return '返回設定釋義';
      if (hash === 'factions') return '返回勢力';
      if (hash === 'characters') return '返回人物設定';
      if (hash === 'story') return '返回劇情';
      if (hash === 'anomaly-events') return '返回異常事件';
      if (hash === 'worldview' || hash === 'opcu-ref') return '返回世界觀';
      try {
        if (sessionStorage.getItem('myoc:drawer-glossary') === '1') return '返回設定釋義';
        if (sessionStorage.getItem('myoc:drawer-worldview') === '1') return '返回世界觀';
      } catch (error) {}
      if (!path.includes('/html/') && !path.includes('/story/')) return '返回首頁';
    }
    return '返回上一頁';
  }

  function relabelBackLink() {
    const link = document.querySelector('.navbar__link--left');
    if (!link) return;
    const prev = previousPage();
    if (!prev || !isSameOriginPrev(prev) || pageKey(prev) === pageKey(location.href)) return;
    link.textContent = '← ' + backLabelFor(prev);
  }

  document.addEventListener(
    'click',
    (event) => {
      const anchor = event.target.closest && event.target.closest('a[href]');
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!anchor || !isInternalLink(anchor)) return;

      try {
        sessionStorage.setItem(
          FROM_KEY,
          location.pathname + location.search + location.hash
        );
      } catch (error) {}
      saveScroll();
      saveDrawers();

      if (!isBackLink(anchor)) return;

      const prev = previousPage();
      const useBack = history.length >= 2 && isSameOriginPrev(prev) && pageKey(prev) !== pageKey(location.href);
      if (!useBack) return;

      event.preventDefault();
      history.back();
    },
    true
  );

  window.addEventListener('pagehide', () => {
    saveScroll();
    saveDrawers();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      saveScroll();
      saveDrawers();
    }
  });

  function onArrive(persisted) {
    rememberPage();
    restoreDrawers();
    relabelBackLink();
    if (!persisted) restoreScroll();
    revealPage();
  }

  window.addEventListener('pageshow', (event) => {
    onArrive(event.persisted);
  });
})();
