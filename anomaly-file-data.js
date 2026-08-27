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
 * 4) 保密等級圖示（C.E.I.S.T）
 *    完整印章（分類說明頁）：images/anomaly/{C|E|I|S|T}.png
 *    精簡圖示（清單篩選／摘要徽章／檔案頁）：images/anomaly/{C|E|I|S|T}_0.png
 *      C_0.png  Clandestine  極機密
 *      E_0.png  Encrypted    受保護
 *      I_0.png  Intramural   內部流通
 *      S_0.png  Sanitized    有限度公開
 *      T_0.png  Transparent  完全公開
 *
 * 5) 新增步驟
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
 * ceist       'C'|'E'|'I'|'S'|'T' 保密等級（單選；與 OPCU 的 C 無關）
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

const ANOMALY_FILE_CEIST = [
  {
    id: 'C',
    zh: '極機密',
    en: 'Clandestine',
    image: 'images/anomaly/C.png',
    icon: 'images/anomaly/C_0.png',
    desc: '僅在國家領導人、CTA 核心領導層等最高級別授權下始可檢閱。其外洩後果將造成無法挽回的災難性破壞，絕對禁止對外公開。未經授權之知情者將面臨最嚴厲之懲處，最高可逕行判處死刑。',
  },
  {
    id: 'E',
    zh: '受保護',
    en: 'Encrypted',
    image: 'images/anomaly/E.png',
    icon: 'images/anomaly/E_0.png',
    desc: '受加密與權限管控之資訊。僅限多數政府高層與 CTA 內部核心人員進行完整檢閱。因全面公開的潛在風險極高，針對低權限人員仍需進行嚴格的資訊屏蔽（Redaction）或存取限制。',
  },
  {
    id: 'I',
    zh: '內部流通',
    en: 'Intramural',
    image: 'images/anomaly/I.png',
    icon: 'images/anomaly/I_0.png',
    desc: '僅限於政府相關部門與 CTA 內部流通之資訊。若未經授權外洩，可能引發社會恐慌或對組織運作造成干擾。需進行標準的保密管控，嚴禁外部人士存取。',
  },
  {
    id: 'S',
    zh: '有限度公開',
    en: 'Sanitized',
    image: 'images/anomaly/S.png',
    icon: 'images/anomaly/S_0.png',
    desc: '經脫敏處理之資訊，在特定條件下可有限度釋出。經評估確認「適度公開有助於該異常事件的管理或公眾安全」時，將授權開放給特定新聞媒體、醫療組織、教育機構或法律顧問等外部單位。',
  },
  {
    id: 'T',
    zh: '完全公開',
    en: 'Transparent',
    image: 'images/anomaly/T.png',
    icon: 'images/anomaly/T_0.png',
    desc: '無任何閱覽限制之公開資訊。經確認全面公開不會引發負面效應，或該異常事件之威脅已完全解除（或已常態化）時適用此等級，任何人皆可自由查閱。',
  },
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
    ceist: 'T',
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
    ceist: 'E',
    controlled: true,
    measures: '當前已交由十號部門管理。',
    description: 'O-EXM-125 經受管束事件化後，已完全附著至 ■■■■■■■■ 上。本條目僅就其異常本體之表現進行紀錄。O-EXM-125 為一異常空間事件，以碎形構成之純黑通道作為進出途徑；該通道呈不規則形狀，並以極度緩慢之速度持續擴張。進入後，內部呈現溫帶平原景觀，地理結構與當前世界一致，然任何文化、語言及原生碳基生物皆無法於其中存續。',
  },
  {
    code: 'OP-UKS-420',
    displayCode: 'O／P-UKS-420',
    name: '祈願艾薇',
    nameEn: 'I wish for Ivy',
    opcu: ['O', 'P'],
    tags: ['UKS'],
    ceist: 'I',
    controlled: false,
    brief: '極端絕望狀態下現身的常春藤纏繞人影，遞交未知藥品予接收者。',
    measures: '未決定',
    description:
      '少數案例表示自己曾在極端狀態下聽見高頻的電子聲響，接著看見模糊的人影出現在眼前。\n\n' +
      '具倖存者描述，該人影似乎是某種被常春藤曼纏繞的女性，接著她會伸出石雕材質的手，交付給絕望者未知的藥品。\n\n' +
      '無論如何，接收者一定會將該藥品服下，或採用各種方式將其吸收，最終獲得某種結果或直接死亡。\n\n' +
      '該異常並非單純許願可觸發，推估眾人對極端狀態與絕望的定義各有不同，觸發條件嚴苛，無法確認這是某種「倖存者迴光返照的幻覺」還是「都市傳說」。',
  },
  {
    code: 'P-ANS-909',
    displayCode: 'P-ANS-909',
    name: '配子體',
    nameEn: 'Gametophyte',
    opcu: ['P'],
    tags: ['ANS'],
    ceist: 'E',
    controlled: false,
    brief: '亞裔混血女性外觀之活態樣本；體內含 U-UKS/UBC-666 植入生物質，於劇場型收容區塊「日落鎮」輪換監控管理。',
    measures:
      '需管理於劇場型收容區塊內，需經由約500名以上的人員協助管理。\n\n' +
      '因應劇場型收容區塊之規則，本文檔將以「日落鎮」代稱劇場型收容區塊 CTA-BLOCK-C-6。\n\n' +
      'P-ANS-909 需以輪換監控的方式進行管理。以周來進行輪次，每週一至週四的早上 9：00 至下午 4：00 需管理於一處標準 CTA 行政設施之高階管理階層辦公室內，並使其進行 CTA 金幣部門的文書處理工作內容。\n\n' +
      '其工作內容需進行嚴格的審理與控管，必要時可進行捏造事件以協助管理。\n\n' +
      '每週一至週四的下午 5：00 至隔日的早上 7：00 項目管理於一處現代類型的紐約市中心公寓中。其內部擺設需盡可能淨空，以不遮擋視線為前提進行擺設與監控攝影機與監聽設備的安裝，且冷暖氣出風口、芳香機皆需定時維修以確保 P-ANS-909 的投藥正常。\n\n' +
      '公寓內的鏡面皆需設計為單向透視玻璃，且非必要時不可開啟。\n\n' +
      'P-ANS-909 的身上需隨時啟用生理狀態觀測，倘若項目的心跳速率超過每分鐘 100～140 下，則需立即通報示劍小隊進入現場處理，並優先給予 P-PER-520 以確保心率下降。\n\n' +
      '若有需要，請扮演「管理層」的人員批准 P-ANS-909 的任何請假程序，並啟動脫離常態移動地點的監管措施直至假期結束。\n\n' +
      '日落鎮需以維持項目的「記憶一致性」為目的進行運作，詳情可參照附件三* 中提及的內容。\n\n' +
      'P-ANS-909 的工作、生活起居將指派一名權杖部門的管理人員進行陪同，該名管理人員將以「未婚夫」的身份加入 P-ANS-909 的生活中，以此壓制 P-ANS-909 的各項症狀。\n\n' +
      '必要時，可提供 P-ANS-909 各式摻入 C-EXM-394「月亮花園」內植物的提取素（P-PER-520），以維持其記憶的一致性。',
    description:
      'P-ANS-909 是一名高 164 公分、外觀年齡約 25 歲的亞裔混血女性。\n\n' +
      '其身上存在 U-UKS/UBC-666「吞噬邪神的少女」所植入的一部分生物質，該生物質造成 P-ANS-909 具備某種程度的再生，且該再生與 ■■■■■■■ 有直接性的關連。\n\n' +
      '項目曾任職於 CTA 金幣部門中，擔當基層文書處理員工，後因意外而被困於莫里斯公司中，遭植入 U-UKS/UBC-666 的一部分並遭強制勞動。\n\n' +
      '備註，雖該項目經推斷係由莫里斯內部成員交出，但其實際意圖仍不清楚，又，因其為莫里斯公司內十號部門管理者直接交付，故仍需長時間觀察。',
  },

  /* ── 新增事件時，複製以下區塊到陣列末尾（逗號記得加）──────────────
  {
    code: 'X-XXX-000',
    displayCode: 'X-XXX-000',
    name: '中文名稱',
    nameEn: 'English name',
    opcu: ['P'],
    tags: ['ANM'],
    ceist: 'T',
    controlled: false,
    measures: '管理措施全文。',
    description: '項目描述全文。',
  },
  ─────────────────────────────────────────────────────────────── */
];

function getAnomalyFileCeist(id) {
  return ANOMALY_FILE_CEIST.find((item) => item.id === id) || null;
}

function formatAnomalyFileCeist(id) {
  const item = getAnomalyFileCeist(id);
  return item ? `${item.zh}（${item.en}）` : id;
}

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
