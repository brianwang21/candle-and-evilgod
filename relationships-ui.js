/**
 * 人際關係圖互動
 * 常態顯示 edge.label（關係），點擊角色切換 edge.feeling（感覺）
 * 切換時沿連線播放心電圖脈衝（由主角傳向對方）
 */
function buildRelationships() {
  const viewport = document.getElementById('relationships-viewport');
  const world = document.getElementById('relationships-world');
  const edgesEl = document.getElementById('relationships-edges');
  const nodesEl = document.getElementById('relationships-nodes');
  const zoomInBtn = document.getElementById('relationships-zoom-in');
  const zoomOutBtn = document.getElementById('relationships-zoom-out');
  const resetBtn = document.getElementById('relationships-reset');
  const hintEl = document.querySelector('.relationships__hint');
  if (!viewport || !world || !edgesEl || !nodesEl) return;

  const characterId = window.CURRENT_CHARACTER_ID;
  const network = getRelationshipNetwork(characterId);
  if (!network || !network.nodes.length) {
    viewport.innerHTML =
      '<p class="relationships__hint" style="padding:2rem;text-align:center">尚無人際關係資料。</p>';
    return;
  }

  if (hintEl) {
    hintEl.textContent = '拖曳移動 · 滾輪縮放 · 點擊角色切換感覺';
  }

  const nodeMap = new Map(network.nodes.map((node) => [node.id, node]));
  const centerNode = nodeMap.get(network.centerId);
  const state = {
    x: 0,
    y: 0,
    scale: 1,
    minScale: 0.45,
    maxScale: 2.4,
    dragging: false,
    pointerId: null,
    lastX: 0,
    lastY: 0,
  };

  /** @type {{ el: SVGTextElement, edge: object, nodeIds: string[], line: SVGLineElement }[]} */
  const edgeLabelEntries = [];

  function applyTransform() {
    world.style.transform = `translate(${state.x}px, ${state.y}px) scale(${state.scale})`;
  }

  function clampScale(value) {
    return Math.min(state.maxScale, Math.max(state.minScale, value));
  }

  function zoomAt(clientX, clientY, nextScale) {
    const rect = viewport.getBoundingClientRect();
    const px = clientX - rect.left - rect.width / 2;
    const py = clientY - rect.top - rect.height / 2;
    const scale = clampScale(nextScale);
    const ratio = scale / state.scale;
    state.x = px - (px - state.x) * ratio;
    state.y = py - (py - state.y) * ratio;
    state.scale = scale;
    applyTransform();
  }

  function resetView() {
    state.x = 0;
    state.y = 0;
    state.scale = 1;
    applyTransform();
  }

  function worldPoint(node) {
    return { x: 2000 + node.x, y: 2000 + node.y };
  }

  /** 經典心電圖形狀（波峰已壓低） */
  function classicBeatShape() {
    return [
      [0.0, 0],
      [0.1, 0],
      [0.16, 0.2],
      [0.22, 0],
      [0.3, -0.16],
      [0.36, 0.52],
      [0.42, -0.24],
      [0.48, 0],
      [0.62, 0.26],
      [0.74, 0],
      [1.0, 0],
    ];
  }

  function sampleBeatAmplitude(t) {
    const beat = classicBeatShape();
    const u = ((t % 1) + 1) % 1;
    for (let i = 0; i < beat.length - 1; i += 1) {
      const [t0, a0] = beat[i];
      const [t1, a1] = beat[i + 1];
      if (u >= t0 && u <= t1) {
        const p = (u - t0) / (t1 - t0 || 1);
        return a0 + (a1 - a0) * p;
      }
    }
    return 0;
  }

  function buildScrollingEcgPath(from, to, phase, ampScale = 1) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len;
    const uy = dy / len;
    const nx = -uy;
    const ny = ux;
    const amp = Math.min(14, Math.max(8, len * 0.028)) * ampScale;
    const beatCount = len > 420 ? 2.4 : 1.55;
    const samples = Math.max(64, Math.round(len / 7));
    const points = [];

    for (let i = 0; i <= samples; i += 1) {
      const s = i / samples;
      const a = sampleBeatAmplitude(s * beatCount - phase);
      points.push([
        from.x + ux * len * s + nx * amp * a,
        from.y + uy * len * s + ny * amp * a,
      ]);
    }

    return points
      .map((point, index) => `${index === 0 ? 'M' : 'L'}${point[0].toFixed(1)} ${point[1].toFixed(1)}`)
      .join(' ');
  }

  function ensureEdgeLayers() {
    let linesLayer = edgesEl.querySelector('.relationships__edge-lines');
    let labelsLayer = edgesEl.querySelector('.relationships__edge-labels');
    if (!linesLayer) {
      linesLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      linesLayer.setAttribute('class', 'relationships__edge-lines');
      edgesEl.appendChild(linesLayer);
    }
    if (!labelsLayer) {
      labelsLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      labelsLayer.setAttribute('class', 'relationships__edge-labels');
      edgesEl.appendChild(labelsLayer);
    }
    return { linesLayer, labelsLayer };
  }

  function stopEcgLoop(entry) {
    if (entry.ecgRaf) {
      cancelAnimationFrame(entry.ecgRaf);
      entry.ecgRaf = null;
    }
  }

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function startEcgLoop(entry, targetNode, options = {}) {
    if (!centerNode || !targetNode || !entry?.ecgPath) return;
    stopEcgLoop(entry);

    const from = worldPoint(centerNode);
    const to = worldPoint(targetNode);
    const path = entry.ecgPath;
    const {
      fromAmp = 0,
      toAmp = 1,
      morphMs = 0,
      onSettled = null,
      holdAfter = true,
    } = options;

    let phase = entry.ecgPhase || 0;
    let last = performance.now();
    const morphStart = performance.now();
    const speed = 0.85;
    let settled = morphMs <= 0;

    function frame(now) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      phase = (phase + dt * speed) % 1;
      entry.ecgPhase = phase;

      let ampScale = toAmp;
      if (!settled && morphMs > 0) {
        const p = Math.min(1, (now - morphStart) / morphMs);
        const e = easeInOutCubic(p);
        ampScale = fromAmp + (toAmp - fromAmp) * e;
        if (p >= 1) {
          settled = true;
          ampScale = toAmp;
          path.setAttribute('d', buildScrollingEcgPath(from, to, phase, ampScale));
          if (onSettled) onSettled();
          if (!holdAfter) {
            entry.ecgRaf = null;
            return;
          }
        }
      }

      path.setAttribute('d', buildScrollingEcgPath(from, to, phase, ampScale));
      entry.ecgRaf = requestAnimationFrame(frame);
    }

    entry.ecgRaf = requestAnimationFrame(frame);
  }

  function setEcgMode(entry, targetNode, mode) {
    if (!centerNode || !targetNode || !entry) return;
    const showFeeling = mode === 'feeling';
    const { linesLayer } = ensureEdgeLayers();

    if (!showFeeling) {
      if (!entry.ecgPath) {
        if (entry.line) {
          entry.line.classList.remove('relationships__edge-line--hidden');
          entry.line.classList.remove('relationships__edge-line--pulse');
        }
        return;
      }

      const path = entry.ecgPath;
      path.classList.remove('is-fading');
      // 振幅逐漸壓平 → 拉成直線後再切回平行線
      startEcgLoop(entry, targetNode, {
        fromAmp: 1,
        toAmp: 0,
        morphMs: 720,
        holdAfter: false,
        onSettled: () => {
          stopEcgLoop(entry);
          path.classList.add('is-fading');
          if (entry.line) {
            entry.line.classList.remove('relationships__edge-line--hidden');
            entry.line.classList.remove('relationships__edge-line--pulse');
          }
          window.setTimeout(() => {
            if (entry.ecgPath === path) {
              path.remove();
              entry.ecgPath = null;
            }
          }, 180);
        },
      });
      return;
    }

    let path = entry.ecgPath;
    if (!path) {
      path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('class', 'relationships__ecg is-active');
      linesLayer.appendChild(path);
      entry.ecgPath = path;
    } else {
      path.classList.remove('is-fading');
      path.classList.add('is-active');
      linesLayer.appendChild(path);
    }

    path.style.strokeDasharray = 'none';
    path.style.strokeDashoffset = '0';
    path.style.opacity = '1';

    if (entry.line) {
      entry.line.classList.add('relationships__edge-line--hidden');
    }

    // 從直線長出波形
    startEcgLoop(entry, targetNode, {
      fromAmp: 0,
      toAmp: 1,
      morphMs: 640,
      holdAfter: true,
    });
  }

  function setEdgeMode(entry, mode) {
    const { el, edge } = entry;
    const showFeeling = mode === 'feeling' && edge.feeling;
    el.textContent = showFeeling ? edge.feeling : edge.label || edge.feeling || '';
    el.dataset.mode = showFeeling ? 'feeling' : 'relation';
    el.classList.toggle('relationships__edge-label--feeling', showFeeling);
  }

  function toggleNodeFeeling(nodeId, card) {
    const related = edgeLabelEntries.filter((entry) => entry.nodeIds.includes(nodeId));
    const togglable = related.filter((entry) => entry.edge.feeling);
    if (!togglable.length) return;

    const anyFeeling = togglable.some((entry) => entry.el.dataset.mode === 'feeling');
    const nextMode = anyFeeling ? 'relation' : 'feeling';
    const targetNode = nodeMap.get(nodeId);

    togglable.forEach((entry) => {
      setEcgMode(entry, targetNode, nextMode);
      setEdgeMode(entry, nextMode);
    });
    card.classList.toggle('relationship-card--feeling', nextMode === 'feeling');
  }

  edgesEl.innerHTML = '';
  const { linesLayer, labelsLayer } = ensureEdgeLayers();

  network.edges.forEach((edge) => {
    const from = nodeMap.get(edge.from);
    const to = nodeMap.get(edge.to);
    if (!from || !to) return;

    const x1 = 2000 + from.x;
    const y1 = 2000 + from.y;
    const x2 = 2000 + to.x;
    const y2 = 2000 + to.y;
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('class', 'relationships__edge-line');
    line.setAttribute('x1', String(x1));
    line.setAttribute('y1', String(y1));
    line.setAttribute('x2', String(x2));
    line.setAttribute('y2', String(y2));
    linesLayer.appendChild(line);

    if (edge.label || edge.feeling) {
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('class', 'relationships__edge-label');
      label.setAttribute('x', String(mx));
      label.setAttribute('y', String(my - 10));
      labelsLayer.appendChild(label);

      const entry = {
        el: label,
        edge,
        nodeIds: [edge.from, edge.to],
        line,
        ecgPath: null,
        ecgRaf: null,
        ecgPhase: 0,
      };
      edgeLabelEntries.push(entry);
      setEdgeMode(entry, 'relation');
    }
  });

  nodesEl.innerHTML = '';
  network.nodes.forEach((node) => {
    const isCenter = node.id === network.centerId;
    const card = document.createElement('article');
    card.className = `relationship-card${isCenter ? ' relationship-card--center' : ''}`;
    card.style.left = `${node.x}px`;
    card.style.top = `${node.y}px`;

    const avatar = document.createElement('div');
    avatar.className = 'relationship-card__avatar';

    if (node.image) {
      const img = document.createElement('img');
      img.className = 'relationship-card__img';
      img.src = siteUrl(node.image);
      img.alt = node.name;
      avatar.appendChild(img);
    } else {
      const fallback = document.createElement('span');
      fallback.className = 'relationship-card__fallback';
      fallback.textContent = node.name.slice(0, 1);
      avatar.appendChild(fallback);
    }

    const name = document.createElement('p');
    name.className = 'relationship-card__name';
    name.textContent = node.name;

    const role = document.createElement('p');
    role.className = 'relationship-card__role';
    role.textContent = node.role || '';

    card.appendChild(avatar);
    card.appendChild(name);
    if (isCenter && node.role) card.appendChild(role);
    nodesEl.appendChild(card);

    if (!isCenter) {
      const hasFeeling = network.edges.some(
        (edge) => edge.feeling && (edge.from === node.id || edge.to === node.id)
      );
      if (hasFeeling) {
        card.classList.add('relationship-card--interactive');
        card.tabIndex = 0;
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `${node.name}：點擊切換關係／感覺`);

        card.addEventListener('pointerdown', (event) => {
          event.stopPropagation();
        });

        card.addEventListener('click', (event) => {
          event.stopPropagation();
          toggleNodeFeeling(node.id, card);
        });

        card.addEventListener('keydown', (event) => {
          if (event.key !== 'Enter' && event.key !== ' ') return;
          event.preventDefault();
          toggleNodeFeeling(node.id, card);
        });
      }
    }
  });

  viewport.addEventListener('pointerdown', (event) => {
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    state.dragging = true;
    state.pointerId = event.pointerId;
    state.lastX = event.clientX;
    state.lastY = event.clientY;
    viewport.classList.add('is-dragging');
    viewport.setPointerCapture(event.pointerId);
  });

  viewport.addEventListener('pointermove', (event) => {
    if (!state.dragging || event.pointerId !== state.pointerId) return;
    const dx = event.clientX - state.lastX;
    const dy = event.clientY - state.lastY;
    state.lastX = event.clientX;
    state.lastY = event.clientY;
    state.x += dx;
    state.y += dy;
    applyTransform();
  });

  function endDrag(event) {
    if (!state.dragging || event.pointerId !== state.pointerId) return;
    state.dragging = false;
    state.pointerId = null;
    viewport.classList.remove('is-dragging');
    if (viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }
  }

  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);

  viewport.addEventListener(
    'wheel',
    (event) => {
      event.preventDefault();
      const factor = event.deltaY < 0 ? 1.12 : 1 / 1.12;
      zoomAt(event.clientX, event.clientY, state.scale * factor);
    },
    { passive: false }
  );

  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => {
      const rect = viewport.getBoundingClientRect();
      zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, state.scale * 1.2);
    });
  }

  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => {
      const rect = viewport.getBoundingClientRect();
      zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, state.scale / 1.2);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', resetView);
  }

  resetView();
}
