/**
 * 異常事件歸檔清單（anomaly-event-list.html）
 * ═══════════════════════════════════════════
 *
 * 【命名規則｜務必遵守，否則檔名會亂】
 *
 * 1) 檔名 code（= anomaly_html/{code}.html）
 *    格式：{OPCU}-{TAG}-{NNN}
 *    - OPCU：主要類型字母，複數時依 O→P→C→U 順序直接串接（不加斜線）
 *      例：P　／　CU　／　OU
 *    - TAG ：主要物質標籤簡寫；複數時依下方標籤表順序串接（用連字號）
 *      例：ANM　／　UBC-ANS　／　RPW-EGS
 *    - NNN ：三位數流水號（001–999），同系列勿重複
 *    完整例：
 *      P-ANM-111
 *      O-FRS-003
 *      CU-UBC-ANS-021
 *
 * 2) displayCode（頁面顯示用，可含全形斜線）
 *    單類型：與 code 相同 → P-ANM-111
 *    複數 OPCU：O／P／C／U 用全形「／」→ C／U-UBC／ANS-021
 *
 * 3) 圖片（選填）
 *    images/anomaly/{code}.png　（1:1）
 *    例：images/anomaly/P-ANM-111.png
 *
 * 4) 新增步驟
 *    A. 複製 anomaly_html/_TEMPLATE.html → anomaly_html/{code}.html，替換所有 【】 佔位
 *    B. 在下方 ANOMALY_FILE_EVENTS 陣列末尾追加一筆（格式見註解範本）
 *    C. 若有圖，放入 images/anomaly/{code}.png 並在詳細頁取消 img 註解
 *
 * 【欄位說明】
 * code        檔名代碼（英數與連字號，勿空白）
 * displayCode 顯示用項目標號
 * name / nameEn 中文名／英文名
 * opcu        ['O'|'P'|'C'|'U'] 可複數
 * tags        物質標籤簡寫陣列，可複數（見 ANOMALY_FILE_TAGS.id）
 * controlled  是否為受管束事件 true/false
 * brief       清單折疊列可用短述（目前清單展開不顯示，仍建議填）
 * measures    管理措施（詳細頁）
 * description 項目描述（詳細頁）
 */

const ANOMALY_FILE_OPCU = [
  { id: 'O', zh: '觀測型', en: 'Observation' },
  { id: 'P', zh: '規範型', en: 'Protocol' },
  { id: 'C', zh: '協議型', en: 'Contractual' },
  { id: 'U', zh: '無解型', en: 'Uncontainable' },
];

const ANOMALY_FILE_TAGS = [
  { id: 'FRS', zh: '段訊讀數', en: 'Fragmented Signal', image: 'images/Morris/1-1.png', desc: '異常的電波、數據流、無法解析的亂碼或殘缺的通訊信號。' },
  { id: 'ESD', zh: '密儀標號', en: 'Esoteric Designation', image: 'images/Morris/1-2.png', desc: '涉及神祕學、儀式、神話學或具備未知宗教屬性的異常。' },
  { id: 'RER', zh: '反應餘料', en: 'Reaction Residue', image: 'images/Morris/2.png', desc: '異常事件發生後的殘留物、化學／鍊金副產品或廢棄物。' },
  { id: 'ANS', zh: '活態樣本', en: 'Animate Specimen', image: 'images/Morris/3.png', desc: '具備生命體徵、有機結構或生物繁衍特性的異常。' },
  { id: 'ANM', zh: '異常實質', en: 'Anomalous Matter', image: 'images/Morris/4.png', desc: '不符合常規物理法則的固體／液體材質，或純粹的異常物品。' },
  { id: 'UKS', zh: '未明意識', en: 'Unknown Sentience', image: 'images/Morris/5.png', desc: '表現出思考能力、自主意志或精神控制，但無法理解其運作機制的實體及心理學相關異常。' },
  { id: 'TMV', zh: '逾期變量', en: 'Temporal Variable', image: 'images/Morris/6.png', desc: '涉及時間悖論、時間流速異常、或預言／延遲發生的事件。' },
  { id: 'EXM', zh: '界外矩陣', en: 'Extradimensional Matrix', image: 'images/Morris/7.png', desc: '空間異常、傳送門、亞空間或折疊維度。' },
  { id: 'EGS', zh: '勢能痕跡', en: 'Energy Signature', image: 'images/Morris/8.png', desc: '非物質的能量場、異常輻射、或是某種潛在破壞力的物理遺留。' },
  { id: 'RPW', zh: '解裂轟波', en: 'Rupture Wave', image: 'images/Morris/8-2.png', desc: '具備高度物理破壞性、會引發空間撕裂或物質解體的波動／爆破現象。' },
  { id: 'IFH', zh: '知無條例', en: 'Info hazard', image: 'images/Morris/9.png', desc: '逆模因、認知危害，或「只要知道就會引發危險／無法被記住」的資訊黑洞。' },
  { id: 'UBC', zh: '未協定概念', en: 'Unbound Concept', image: 'images/Morris/010.png', desc: '形而上學的異常。打破現實概念、無法用常理定義或尚未被物理法則「約束」的抽象現象。' },
];

const ANOMALY_FILE_EVENTS = [
  {
    code: 'P-ANM-111',
    displayCode: 'P-ANM-111',
    name: '白麵包',
    nameEn: 'White bread',
    opcu: ['P'],
    tags: ['ANM'],
    controlled: false,
    brief: '數袋異常 Wonder Bread 樣式白麵包；取出並暴露於空氣將導致十公里內自然生物死亡。',
    measures: '樣本須全程留置於原包裝內，嚴禁開封、移出或分裝。一旦取出並暴露於空氣，半徑約十公里範圍內之自然生態將遭受毀滅性破壞。',
    description: 'P-ANM-111 為數袋外觀近似 Wonder Bread 品牌之白麵包樣本。其包裝樣式未見於該產品已知之任何一代市售外包裝；袋面印有金髮白人女性推著購物車、車上堆滿同品牌麵包之插圖。若將包裝內之白麵包取出並暴露於空氣中，半徑約十公里範圍內之自然生物將在短時間內陸續死亡，生態系隨之崩解。',
  },
  {
    code: 'O-EXM-125',
    displayCode: 'O-EXM-125',
    name: '不語世界',
    nameEn: 'World Without Words',
    opcu: ['O'],
    tags: ['EXM'],
    controlled: true,
    measures: '當前已交由十號部門管理。',
    description: 'O-EXM-125 經受管束事件化後，已完全附著至 ■■■■■■■■ 上。本條目僅就其異常本體之表現進行紀錄。O-EXM-125 為一異常空間事件，以碎形構成之純黑通道作為進出途徑；該通道呈不規則形狀，並以極度緩慢之速度持續擴張。進入後，內部呈現溫帶平原景觀，地理結構與當前世界一致，然任何文化、語言及原生碳基生物皆無法於其中存續。',
  },

  /* ── 新增事件時，複製以下區塊到陣列末尾（逗號記得加）──────────────
  {
    code: 'X-XXX-000',
    displayCode: 'X-XXX-000',
    name: '中文名稱',
    nameEn: 'English name',
    opcu: ['P'],
    tags: ['ANM'],
    controlled: false,
    measures: '管理措施全文。',
    description: '項目描述全文。',
  },
  ─────────────────────────────────────────────────────────────── */
];

function getAnomalyFileTag(id) {
  return ANOMALY_FILE_TAGS.find((tag) => tag.id === id) || null;
}

function getAnomalyFileOpcu(id) {
  return ANOMALY_FILE_OPCU.find((item) => item.id === id) || null;
}

function formatAnomalyFileOpcu(opcuIds) {
  return opcuIds
    .map((id) => {
      const item = getAnomalyFileOpcu(id);
      return item ? `${item.zh}（${item.id}）` : id;
    })
    .join('／');
}

function formatAnomalyFileTags(tagIds) {
  return tagIds
    .map((id) => {
      const tag = getAnomalyFileTag(id);
      return tag ? `${tag.zh}（${tag.id}）` : id;
    })
    .join('／');
}

function getAnomalyFilePage(event) {
  const href = `anomaly_html/${event.code}.html`;
  return typeof siteUrl === 'function' ? siteUrl(href) : href;
}
