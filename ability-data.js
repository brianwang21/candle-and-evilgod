/**
 * 能力評分資料庫
 * ─────────────────────────────────────────
 * definitions : 各能力項目的評估定義（電腦：滑鼠移至能力名稱；手機：清單內直接顯示）
 * ratings     : 各能力 × 等級的具體描述（電腦：滑鼠移至清單等級標籤；手機：清單內直接顯示）
 * levelScale  : 底部等級標尺的通用說明（各能力細節請見 ratings）
 *
 * 新增／修改文案時，只需編輯此檔案。
 */

const ABILITY_DB = {
  definitions: {
    生理耐受: '評估個體肉體對負面狀態與極端環境的承受底線。',
    戰場機動: '評估個體在交戰環境中的空間位移與神經反射能力。',
    物理強度: '評估個體基礎肉體機能所能釋放的純粹物理破壞力與結構韌性。',
    戰術規劃: '評估個體對局勢的巨觀掌控、邏輯推演與資源調度能力。',
    戰鬥技巧: '評估個體在殺傷技術上的熟練度、精準度與多樣性。',
    心理強度: '評估個體在面臨極端壓力、恐懼或絕望處境時的意志力與情感韌性。',
    認知穩定: '評估個體大腦對抗資訊衝擊時的自我防禦機制與理智維持能力。',
    異常適性: '評估個體對於遭遇異常事件時的綜合表徵。',
  },

  ratings: {
    生理耐受: {
      缺陷:
        '患有嚴重慢性疾病、免疫系統崩潰或肉體極度孱弱。輕微的氣溫變化、擦傷或感染都可能致命，完全無法適應外勤環境。',
      劣勢:
        '體質弱於常人，容易疲勞且恢復期長。在惡劣氣候下極易倒下，受傷後的失血與感染風險高於一般水準。',
      普通:
        '個體具備大眾平均的健康與免疫力。能適應常規氣候，受傷後在標準醫療協助下可正常痊癒。',
      優秀:
        '身體素質堪比頂尖運動員或特種部隊。能長時間在極端環境下生存，對常見毒素與疾病有高度抗性，即使身負非致命重傷也能靠腎上腺素維持戰鬥機能。',
      卓越:
        '突破人類生理極限（可能是基因改造或特殊體質）。擁有驚人的自癒能力，對劇毒、高輻射或致命感染幾乎免疫，能在器官受損的情況下持續運作。',
    },

    戰場機動: {
      缺陷:
        '行動能力有嚴重障礙（如重度殘疾或神經反應極度遲緩）。在戰場上完全是活靶，無法進行任何規避動作。',
      劣勢:
        '動作笨拙或反應慢半拍。無法適應複雜地形的移動，面對快速襲來的攻擊通常來不及閃避。',
      普通:
        '個體具備大眾平均的靈活性與神經反應。能進行基本奔跑、攀爬與閃避，但在高強度交戰中缺乏優勢。',
      優秀:
        '擁有跑酷專家般的空間穿梭能力與極快的神經反射。能在槍林彈雨或廢墟中高速移動，並能預判並閃避大部分的常規攻擊。',
      卓越:
        '動態視力與瞬間爆發力達到非人領域。移動速度肉眼難以捕捉，能在極限距離下迴避致命打擊，甚至能利用幾何死角將自身化為戰場上的幽靈。',
    },

    物理強度: {
      缺陷:
        '肌力嚴重退化或存在結構性骨骼問題。連舉起標準防身武器都有困難，無法造成任何有效的物理傷害。',
      劣勢:
        '力量低於平均值。無法攜帶重型裝備，近身肉搏時極易被壓制，防禦力低，難以承受劇烈撞擊。',
      普通:
        '個體具備大眾平均的肌力與骨骼韌性。能負重常規裝備，可進行一般勞動與基礎防身反擊。',
      優秀:
        '擁有怪力與強悍的抗擊打能力。能輕易揮舞重型兵器或徒手打穿磚牆，承受重擊後仍能維持站立，是隊伍中的攻堅主力。',
      卓越:
        '純粹的破壞兵器。徒手便能掀翻裝甲車或扭斷鋼筋，肌肉與骨骼密度極高，肉體本身就等同一座移動堡壘。',
    },

    戰術規劃: {
      缺陷:
        '邏輯混亂或極度衝動。完全無法理解指令，行事不計後果，在團隊中往往會引發毀滅性的連鎖失誤。',
      劣勢:
        '視野狹隘、容易慌亂。只能執行死板的單一命令，缺乏臨場變通能力，一旦計畫生變就會不知所措。',
      普通:
        '個體具備大眾平均的邏輯與常識。能理解並執行連貫的作戰計畫，在熟悉的狀況下能做出合理的判斷與自保。',
      優秀:
        '具備指揮官級別的戰略眼光。能快速分析情報，在戰場上冷靜調度資源，並善於利用地形與敵方弱點策劃反擊。',
      卓越:
        '宛如預知未來的戰術大師。能將戰場上數百種變數同時納入計算，擅長多線佈局與心理博弈，總能以最小代價將絕境翻盤。',
    },

    戰鬥技巧: {
      缺陷:
        '毫無任何戰鬥概念。握槍姿勢錯誤、揮拳毫無章法，若持有致命武器，對友軍的威脅甚至大於對敵人。',
      劣勢:
        '僅有粗淺的自衛概念或未經實戰檢驗的技巧。攻擊意圖明顯、動作多餘，面對受過訓練的敵人會瞬間落敗。',
      普通:
        '個體接受過基礎防身或新兵級別的軍事訓練。熟悉常見武器的操作，懂得基本的掩護與攻擊發力。',
      優秀:
        '精通多種冷熱兵器與近身格鬥術的殺戮專家。動作精煉無多餘破綻，能在瞬間找出敵方弱點並給予致命一擊。',
      卓越:
        '達到技藝的化境。能將任何身邊物品化為致命武器，甚至開創出獨屬於自己的戰鬥流派，僅憑技巧就能彌補絕對的數值劣勢。',
    },

    心理強度: {
      缺陷:
        '精神極度脆弱。遭遇微小挫折或輕度驚嚇就會崩潰、尖叫或完全失去行動能力，無法承受任何壓力。',
      劣勢:
        '意志力薄弱。在逆境中容易產生放棄念頭，面對強敵威壓或血腥場面會感到恐懼退縮，極易患上創傷後壓力症候群 (PTSD)。',
      普通:
        '個體具備大眾平均的情感與韌性。會感到恐懼與壓力，但能勉強克制情緒以完成任務，有其無法承受的心理底線。',
      優秀:
        '擁有鋼鐵般的意志。面對死亡威脅、殘酷審訊或同伴陣亡，仍能保持絕對的冷靜與專注，是隊伍中的精神支柱。',
      卓越:
        '絕對的無畏或信仰狂熱。情感機制可能已異於常人，任何痛苦與絕望都無法動搖其目標，精神層面堅不可摧。',
    },

    認知穩定: {
      缺陷:
        '理智防線已千瘡百孔。極易被幻覺牽著走，或是大腦已經被嚴重污染，無法分辨現實與虛妄，處於隨時會發瘋的邊緣。',
      劣勢:
        '容易受到外界資訊或異常現象干擾。接觸到超常理事件時容易陷入混亂、記憶錯亂或產生輕度認知偏差。',
      普通:
        '個體具備大眾平均的理智防衛機制。目擊異常會感到震驚與不適，但在脫離環境後能靠自我調節恢復正常，對精神干擾有基礎抵抗力。',
      優秀:
        '大腦如同一座防火牆。對催眠、記憶篡改與精神污染有極高的抗性，能直視違反常理的不可名狀之物而保持自我認知不崩潰。',
      卓越:
        '絕對的思想禁區。任何試圖入侵、扭曲或污染其認知的異常力量，都會如泥牛入海般失效。即使世界觀遭到覆寫，也能確信「我是誰」。',
    },

    異常適性: {
      缺陷: { link: true },
      劣勢: { link: true },
      普通: { link: true },
      優秀: { link: true },
      卓越: { link: true },
    },
  },

  /* 異常適性各評級詳情頁連結（編輯網址即可更換目標頁面） */
  anomalyDetailPages: {
    缺陷: 'anomaly-adaptability.html#defect',
    劣勢: 'anomaly-adaptability.html#disadvantage',
    普通: 'anomaly-adaptability.html#normal',
    優秀: 'anomaly-adaptability.html#excellent',
    卓越: 'anomaly-adaptability.html#outstanding',
  },

  anomalyDetailLabel: '點此以查看詳情',

  levelScale: {
    缺陷: '最低評級。',
    劣勢: '低於平均水準。',
    普通: '大眾平均水準。',
    優秀: '高於平均水準。',
    卓越: '最高評級。',
  },
};

function getAbilityDefinition(abilityName) {
  return ABILITY_DB.definitions[abilityName] || `（${abilityName} 定義待填入）`;
}

function getAbilityRating(abilityName, level) {
  const ratings = ABILITY_DB.ratings[abilityName];
  if (!ratings || !ratings[level]) {
    return `（${abilityName} · ${level} 說明待填入）`;
  }

  const entry = ratings[level];
  if (abilityName === '異常適性' && entry && entry.link) {
    let href = ABILITY_DB.anomalyDetailPages[level];
    if (href) {
      const fromId =
        (typeof window !== 'undefined' && window.CURRENT_CHARACTER_ID) || null;
      if (fromId) {
        const hashIndex = href.indexOf('#');
        const path = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
        const hash = hashIndex >= 0 ? href.slice(hashIndex) : '';
        href = `${path}?from=${encodeURIComponent(fromId)}${hash}`;
      }
      return {
        link: typeof siteUrl === 'function' ? siteUrl(href) : href,
        label: ABILITY_DB.anomalyDetailLabel,
      };
    }
  }

  return typeof entry === 'string' ? entry : entry.text || `（${abilityName} · ${level} 說明待填入）`;
}

function getLevelScale(level) {
  return ABILITY_DB.levelScale[level] || `（${level} 說明待填入）`;
}

document.addEventListener('DOMContentLoaded', () => {
  const mobileMq = window.matchMedia('(max-width: 768px)');

  function injectAbilityScaleHints() {
    document.querySelectorAll('.abilities__list > li').forEach((item) => {
      const levelTrigger = item.querySelector('.abilities__item-level');
      if (!levelTrigger) return;
      const label = levelTrigger.querySelector('.ability-hud-trigger__label');
      const hud = levelTrigger.querySelector('.ability-hud');
      if (!label || !hud || hud.querySelector('.abilities__item-scale')) return;

      const scaleEl = document.createElement('span');
      scaleEl.className = 'abilities__item-scale';
      scaleEl.textContent = getLevelScale(label.textContent.trim());
      const hudText = hud.querySelector('.ability-hud__text');
      hud.insertBefore(scaleEl, hudText || null);
    });
  }

  function syncAbilityHudMode(isMobile) {
    document.querySelectorAll('.abilities__label-trigger').forEach((el) => {
      if (isMobile) {
        el.removeAttribute('tabindex');
      } else {
        el.setAttribute('tabindex', '0');
      }
    });

    document
      .querySelectorAll('.abilities__list .ability-hud-trigger, .abilities__scale .ability-hud-trigger')
      .forEach((el) => {
        if (isMobile) {
          el.removeAttribute('tabindex');
        } else {
          el.setAttribute('tabindex', '0');
        }
      });

    document.querySelectorAll('.abilities__list > li').forEach((item) => {
      if (isMobile) {
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');
        item.setAttribute('aria-expanded', item.classList.contains('is-open') ? 'true' : 'false');
      } else {
        item.classList.remove('is-open');
        item.removeAttribute('role');
        item.removeAttribute('tabindex');
        item.removeAttribute('aria-expanded');
      }
    });
  }

  function toggleAbilityItem(item) {
    const open = !item.classList.contains('is-open');
    item.classList.toggle('is-open', open);
    item.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  document.addEventListener('click', (event) => {
    if (!mobileMq.matches) return;
    const item = event.target.closest('.abilities__list > li');
    if (!item) return;
    if (event.target.closest('a')) return;
    toggleAbilityItem(item);
  });

  document.addEventListener('keydown', (event) => {
    if (!mobileMq.matches) return;
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const item = event.target.closest('.abilities__list > li');
    if (!item || event.target !== item) return;
    event.preventDefault();
    toggleAbilityItem(item);
  });

  injectAbilityScaleHints();
  syncAbilityHudMode(mobileMq.matches);
  if (typeof mobileMq.addEventListener === 'function') {
    mobileMq.addEventListener('change', (event) => syncAbilityHudMode(event.matches));
  }
});
