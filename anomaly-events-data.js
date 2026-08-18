/**
 * 異常事件資料庫（多對多關聯）
 * ─────────────────────────────────────────
 * types     : 事件分類標籤
 * events    : 所有事件主檔（每筆只定義一次）
 * ownership : 角色 ↔ 事件 關聯表
 *
 * type 取值：
 *   anomaly    → 異常事件
 *   controlled → 受管束事件
 *
 * brief       : 列表頁簡述
 * detailBrief : 詳情頁簡述（可與 brief 不同）
 * detail      : 詳情頁結構化內容區塊
 *
 * detail 區塊 type：doc-title | rule | p | h3 | h4 | list | note
 */

const ANOMALY_EVENTS_DB = {
  types: {
    anomaly: '異常事件',
    controlled: '受管束事件',
  },

  typeOrder: ['controlled', 'anomaly'],

  events: [
    {
      id: 'pei-zi-ti',
      name: '配子體',
      type: 'anomaly',
      brief: '被異常事件「吞噬邪神的少女」之異常產出物寄生。在適當條件下，肉體能以一定的速度癒合。',
      detailBrief: '強制植入的命運。',
      detail: [
        { type: 'doc-title', text: '配子體_能力詳解' },
        { type: 'rule' },
        {
          type: 'p',
          text: '配子體為異常未協定概念/活態樣本-021＿吞噬邪神的少女產出物之一，在艾萊亞身上視作附著物。是一個C/U型異常事件。',
        },
        {
          type: 'p',
          text: '艾萊亞的身體在瀕臨死亡時被潔西卡注入了自己身體的一部分，在一定時間後長成一球形畸胎，以此延續生命。',
        },
        {
          type: 'p',
          text: '與邪神的鍾愛之物相比，配子體的影響無法對艾萊亞的外觀進行明顯的改造，但其肉體與精神的影響會隨著時間與高度刺激的增長而愈發明顯。',
        },
        { type: 'h4', text: '長期遭受配子體影響會展現出以下特徵：' },
        {
          type: 'list',
          items: [
            '對於暴力行徑的渴望提升，破壞性提高',
            '痛覺鈍化，甚至會因痛覺而分泌腦內啡、血清素、多巴胺及腎上腺素。',
            '以超出肉體耐受極限的方式使用肉體。',
            '能夠與其他未協定概念/活態樣本-1的衍生物進行共感。',
          ],
        },
        {
          type: 'p',
          text: '此外，艾萊亞雖也有與CAE相同的肉體恢復，也能達到理論不死的程度，卻多了限制。',
        },
        {
          type: 'list',
          items: [
            '受損的肉體在靠近與接觸母體時能夠快速地恢復',
            '若是遠離母體，恢復能力將會變弱',
          ],
        },
        { type: 'note', text: '註：這裡的母體指 CAE。' },
        { type: 'h3', text: '應用' },
        { type: 'rule' },
        {
          type: 'p',
          text: '這個能力可讓艾萊亞變成一個不停死而復生的殭屍，進行一回又一回的車輪戰。',
        },
        {
          type: 'list',
          items: [
            '若是肉體遭受感染，她會直接切下被感染的部位來防止擴張（伴隨著痛苦的慘叫）。',
            '精神被影響時，她會破壞自己的大腦來重啟自己的意識。',
            '肉體被操控時，可以直接破壞中樞神經系統來讓自己暫時癱瘓。',
            '可以犧牲四肢來換取優勢。',
          ],
        },
        {
          type: 'p',
          text: '她不需要一擊殺死目標，她只需要在痛苦中一次又一次的輪迴死亡，直到自己幹掉對方，或對方找到方法幹掉自己為止。',
        },
      ],
    },
    {
      id: 'silent-world',
      name: '不語世界',
      type: 'controlled',
      brief: '能夠自由的進出屬於自身的口袋空間，也能將外界事物拖入其中。',
      detailBrief: '她克服了這個異常，將其轉化為他人的災厄。',
      detail: [
        { type: 'doc-title', text: '不語世界_能力詳解' },
        { type: 'rule' },
        {
          type: 'p',
          text: '不語世界的原型為界外矩陣-125，是一個OPCU條款的異常事件。其本體是一個無法存在任何文字的無人三維世界。',
        },
        {
          type: 'p',
          text: '在 CAE 適應這個異常後，她便有能力可以在任何表面上開啟一個全黑的「門」作為不語世界的出入口。',
        },
        { type: 'h3', text: '開啟門的方式' },
        { type: 'rule' },
        {
          type: 'p',
          text: '要開啟門，CAE 必須在欲開啟門的定點，以觸碰的方式設置「定錨點（Anchor point）」。',
        },
        {
          type: 'p',
          text: '在設置定錨點後，整個門會以「碎形（fractal）」的形狀展開，在五秒內即可延伸出一處約12吋的出入口。',
        },
        {
          type: 'figure',
          src: 'images/CAE/CAE_ability_WWW_01.png',
          alt: '不語世界的入口示意圖',
          caption: '不語世界的入口（示意圖）',
        },
        {
          type: 'p',
          text: '這些出入口會隨著時間無限擴張下去。',
        },
        {
          type: 'p',
          text: 'CAE 可以知道定錨點的整體數量與何時關閉這些出入口，她也能決定這些出入口通向哪。',
        },
        {
          type: 'p',
          text: '只要門夠大，任何物品都能進出該出入口，來到不語世界中，或從中離開。',
        },
        {
          type: 'p',
          text: '這些門會吸收光線，由外而內的「入口」無法看到門內部的情況，「出口」則反之。',
        },
        {
          type: 'p',
          text: '此外，CAE 在她的斗蓬裏側也開了一個出入口，用來應對各種情況。',
        },
        { type: 'h3', text: '不語世界' },
        { type: 'rule' },
        {
          type: 'p',
          text: '當不語世界被嵌入 CAE 體內後，這個世界便轉化為由 CAE 的想像所構築的空間，其物理法則、結構與氣候均與現實相同。',
        },
        {
          type: 'p',
          text: '這類由記憶與意識撐起的區域，統稱為「拓樸空間」。這些空間會隨 CAE 的記憶生成或消失。',
        },
        {
          type: 'p',
          text: '一個拓樸空間須同時滿足以下三種條件才得以成立。',
        },
        {
          type: 'list',
          items: [
            '不存在任何文字（包含書寫、圖示、代碼等任何形式的符號）',
            '不存在任何的原生生物（植物及非動態生態環境可存在）',
            '不存在任何的文化',
          ],
        },
        {
          type: 'p',
          text: '在這些世界中也可通過設置出入口來前往其他拓樸空間，或回到常規世界。',
        },
        { type: 'h3', text: '休息室' },
        { type: 'rule' },
        {
          type: 'p',
          text: '這是一個在不語世界中特別的存在。於不語世界內確認存在一處特殊的離散空間。',
        },
        {
          type: 'p',
          text: '該空間不受常規拓樸空間條件限制，能夠容納文字、生物及文化。且性質穩定，不會隨著記憶改變。',
        },
        {
          type: 'p',
          text: '其空間約六坪左右，四周由黑色水泥牆包覆。',
        },
        {
          type: 'p',
          text: 'CAE在與潔西卡的結合後，透過潔西卡發現了這個空間，她們以休息室代稱，並開始在內部放置各類作戰用品。',
        },
        {
          type: 'p',
          text: '潔西卡最常於此出沒， CAE 也將其當成安全室來使用。',
        },
        { type: 'h3', text: '應用' },
        { type: 'rule' },
        {
          type: 'p',
          text: 'CAE 能夠透過設置入口來達成各種用途。',
        },
        {
          type: 'list',
          items: [
            '她能夠從斗篷裏側取出休息室內的各種武器供自己使用（這些武器通常由一個特殊的武器架收納，可以快速地取出和放回）',
            '可以透過用斗篷覆蓋物體，將其送入不語世界內。可藉此來轉移目標或吸收攻擊。',
            '緊急時，她能夠藉由倒在斗篷上來回到不語世界進行位置轉移。其轉移距離與方式為：來到一個與當前區域相同的鏡像世界，在方圓五公里內開啟出入口進行轉移。',
            '某些情況下，可以只開啟小型的出入口來進行射擊或投放爆裂物。',
            '可以在表面上設置定錨點，當成陷阱，讓踩入其中的人轉移至高空、墜落死亡。或在他人不知覺的情況下設置在隨身物體上，當成射擊口或拿來竊聽。',
            '在艾萊亞能夠進入休息室後，也能夠甩出裝備叩式推進器的艾萊亞進行攻擊。',
          ],
        },
      ],
    },
    {
      id: 'beloved-of-evilgod',
      name: '邪神的鍾愛之物',
      type: 'anomaly',
      brief: '被異常事件「吞噬邪神的少女」寄宿並侵蝕，其肉體能以極快的速度重生，理論上無法死亡。',
      detailBrief: '這是讚揚著愛之歌的詛咒。',
      detail: [
        { type: 'doc-title', text: '邪神的鍾愛之物_能力詳解' },
        { type: 'rule' },
        {
          type: 'p',
          text: '邪神的鍾愛之物為異常未協定概念/活態樣本-1＿吞噬邪神的少女產出的衍生物之一。是一個 C/U 型異常事件。',
        },
        {
          type: 'p',
          text: '當 CAE 被潔西卡寄宿後，她的身體便遭到了潔西卡的改造。',
        },
        {
          type: 'p',
          text: '其具體特徵為：',
        },
        {
          type: 'list',
          items: [
            '全身的骨架、聲線、外貌轉變為女性。',
            '除生殖器官的性徵器官全數消失（喉結、鬍子等）。',
            '髮色、髮長、瞳色與臉型完全改變。',
            '肌肉密度與力量大幅增加，與其纖細的外表不符。',
          ],
        },
        {
          type: 'p',
          text: '潔西卡的寄宿也讓 CAE 的身體能無止盡的增生，但潔西卡會以自己的細胞與基因來取代一部分的復原，她也是用這種方法來改造 CAE 身體的。',
        },
        {
          type: 'p',
          text: '這個異常也讓 CAE 獲得了一部分潔西卡本就有的能力。',
        },
        {
          type: 'list',
          items: [
            '能夠感知他人的情緒。',
            '可以聽到他人的心跳。',
            '嗅覺靈敏，對於血腥味更甚。',
            '只能進食具情感意識的活體生物（人肉）',
          ],
        },
        {
          type: 'p',
          text: '此外，這個異常現象讓 CAE 與潔西卡產生了詭異的連結，導致只有 CAE 有辦法使用那把從潔西卡體內取出的受管束物品——「愛的信標（Sign Of Love）」。',
        },
      ],
    },
    {
      id: 'devourer-of-evilgod',
      name: '吞噬邪神的少女',
      type: 'anomaly',
      brief: '吞噬了邪神，能夠自由自在的對生物肉體做出各種影響。',
      detailBrief: '吞噬了邪神，能夠自由自在的對生物肉體做出各種影響。',
      detail: [
        { type: 'doc-title', text: '吞噬邪神的少女_能力詳解' },
        { type: 'rule' },
        {
          type: 'p',
          text: '吞噬了邪神，能夠自由自在的對生物肉體做出各種影響。',
        },
      ],
    },
    {
      id: 'soul-of-all-truth',
      name: '帶來宇宙、萬物，以及一切真理的靈魂',
      type: 'anomaly',
      brief: '被高維度意識附身，使得其任何方式的表達都將對現實世界造成定義上的改變。',
      detailBrief: '被高維度意識附身，使得其任何方式的表達都將對現實世界造成定義上的改變。',
      detail: [
        { type: 'doc-title', text: '帶來宇宙、萬物，以及一切真理的靈魂_能力詳解' },
        { type: 'rule' },
        {
          type: 'p',
          text: '被高維度意識附身，使得其任何方式的表達都將對現實世界造成定義上的改變。',
        },
      ],
    },
    {
      id: 'covenant',
      name: '約',
      type: 'anomaly',
      brief: '千年所立的約，如今在這新天新地實現。',
      detailBrief: '「律法既是將來美事的影，不是本物的真像」——《希伯來書》10:1',
      detail: [
        { type: 'doc-title', text: '約_能力詳解' },
        { type: 'rule' },
        {
          type: 'p',
          text: '「約」是由預表所延伸出的一系列異常事件中的其中一項。',
        },
        {
          type: 'p',
          text: '這項異常事件造就了米利暗與其他天使的存在，並給予了他們不同的能力。',
        },
        {
          type: 'p',
          text: '關於「天使」的詳細設定，請見：',
        },
        {
          type: 'link-card',
          href: 'glossary-angel.html',
          image: 'images/wing.png',
          label: '天使 (釋義頁)',
        },
        {
          type: 'p',
          text: '作為數千件與「天使」相關的異常事件的其中一件，約在米利暗身上呈現的外貌較為不同。',
        },
        {
          type: 'p',
          text: '本欄目以米利暗為例，講述約在她身上行使的奇蹟。',
        },
        { type: 'h3', text: '翅膀' },
        { type: 'rule' },
        {
          type: 'p',
          text: '除了頭上的光環外，在米利暗的身後有著六片多邊形的片狀透明物體，類似於翅膀的存在。',
        },
        {
          type: 'p',
          text: '這些翅膀堅硬無比，重量卻極為輕盈。觸摸上去時感覺不到其質量，卻能夠輕易地切開鍛鋼，米利暗能夠控制這些翅膀是否切開物體。',
        },
        {
          type: 'p',
          text: '每一片翅膀似乎都對應著七號的一把槍，至於少的那一把，米利暗並不是那麼在意。',
        },
        {
          type: 'p',
          text: '米利暗可以自由地控制這些翅膀獨立的快速移動，並達成各種用處：',
        },
        {
          type: 'list',
          items: [
            '當成僚機，作為飛刀從各個角度進行襲擊。',
            '組合成盾牌，擋下各種攻擊。',
            '藉由與物體接觸來固定。',
            '直接當成刀具使用。',
          ],
        },
        { type: 'h3', text: '飛行' },
        { type: 'rule' },
        {
          type: 'p',
          text: '約給了所有天使飛行的能力，與其說是飛行，實際上是能夠以自己為中心施加各方位的力，從而達到飛行、浮空的效果。',
        },
        {
          type: 'p',
          text: '如果夠純熟，甚至可以從多方向施力，來做出各種動作，比如滑壘、高速移動、空中轉向等。',
        },
        {
          type: 'p',
          text: '米利暗將這種能力鍛鍊到了極致，是所有天使中數一數二的佼佼者。能夠自由自在地做出各類特技、也能完善的利用這一技巧在戰鬥中取得優勢。',
        },
        { type: 'h3', text: '感知邪惡' },
        { type: 'rule' },
        {
          type: 'p',
          text: '在天使原先的「能夠感知到邪惡」之上，米利暗自身額外具有「能夠感知敵意、殺意」的能力，在她眼中以直線條連線至殺意放出者心臟為表現手法。',
        },
        {
          type: 'p',
          text: '在充分進入戰鬥的狀態下，米利暗的反應力能提升至媲美光速的等級，且意識幾乎不會中斷。',
        },
        { type: 'h3', text: '光環' },
        { type: 'rule' },
        {
          type: 'p',
          text: '米利暗的光環具有未知的潛能。',
        },
        {
          type: 'p',
          text: '在過往的事件中，她使用光環的方式，超出了天使們的認知，原本作為對等溝通的渠道，在米利暗的爆發之下竟成了能「指使、命令」其他天使的訊號，甚至能控制住他們的行動。',
        },
        {
          type: 'p',
          text: '雖然在那之後，透過米利暗自身的協調，此事件未再發生過，但仍舊在 CTA 內留下了紀錄，說不定有朝一日能做為某種手段來使用……',
        },
        { type: 'h3', text: '各類模式' },
        { type: 'rule' },
        {
          type: 'p',
          text: '米利暗經由長時間的高強度練習，充分的習得了關於翅膀的各種使用方式，她使用不同的「模式」來記住這些狀態。模式的變化可以從翅膀看出。',
        },
        {
          type: 'list',
          items: [
            '<strong>恆常</strong>——米利暗最常以這種方式進行作戰，各項能力都較為全面，也能更好的操控翅膀的個體移動。',
            '<strong>強襲</strong>——此模式下，米利暗會將全數的翅膀擺置身體兩側，並指向前方，這樣能夠在前進時擋住兩側的致命火力，更可以在需要時直接控制翅膀撕裂敵人。',
            '<strong>磐石</strong>——偏向防守的模式，米利暗能將翅膀聚集成一塊盾牌，常用於掩護中彈的隊友，用身上的救援鉤與繩索實行救護，並同時以短武器進行火力掩護，將隊友送至安全的地方。',
            '<strong>遷躍</strong>——米利暗將翅膀至後，重疊翅膀且翅膀長度增加，此舉是為了讓她可以更好的「飛行」。在此模式下，米利暗的機動性會達到最高水平。能夠輕易地控制移動方位，且最高速可達到 200km/h。',
          ],
        },
      ],
    },
    {
      id: 'seven-trumpets',
      name: '七支號',
      type: 'controlled',
      brief: '可以投影出七把功能不同的強力光銃進行作戰。',
      detailBrief: '第七位天使吹號，天上就有聲音說：世上的國成了我主和主基督的國；他要作王，直到永永遠遠。——啟示錄 11:15',
      detail: [
        { type: 'doc-title', text: '七支號_能力詳解' },
        { type: 'rule' },
        {
          type: 'p',
          text: '七號是米利暗由「約」而取得的受管束事件。由於米利暗本身為異常事件「約」的產物，此異常事件被歸類於受管束事件中。',
        },
        {
          type: 'p',
          text: '七號為米利暗能隨時從任意地方取出的七把武器，這七把武器皆為現代熱兵器，約為1990年後的各式槍枝，其大部分槍枝外型都接近以色列國防軍服役槍枝。',
        },
        {
          type: 'p',
          text: '其取出方式接近她以光線「投影」出這些武器。經異常事件產出物標準測試之結果可得出，這七把武器由光的波長構成。',
        },
        {
          type: 'p',
          text: '這些武器並不需要換彈，且只要米利暗仍有體力，便可無限制的發射。',
        },
        { type: 'h3', text: '模式與變化' },
        { type: 'rule' },
        {
          type: 'p',
          text: '在米利暗處於不同的「模式」時，這些武器將出現不同的變化，以此契合該模式的長處。',
        },
        {
          type: 'p',
          text: '以「苦艾星」為例。這把衝鋒槍在米利暗處於「遷躍」模式時能夠一次性地取出兩把，使她在高速飛行的狀態下仍能以輕武器的火力覆蓋達到最有效的殺傷範圍。',
        },
      ],
    },
  ],

  ownership: [
    { characterId: 'alaya', eventId: 'pei-zi-ti' },
    { characterId: 'cae', eventId: 'silent-world' },
    { characterId: 'cae', eventId: 'beloved-of-evilgod' },
    { characterId: 'jessica', eventId: 'devourer-of-evilgod' },
    { characterId: '42', eventId: 'soul-of-all-truth' },
    { characterId: 'miriam', eventId: 'seven-trumpets' },
    { characterId: 'miriam', eventId: 'covenant' },
  ],
};

function getAnomalyEventById(id) {
  return ANOMALY_EVENTS_DB.events.find((event) => event.id === id) || null;
}

function getAllAnomalyEvents() {
  return ANOMALY_EVENTS_DB.events.slice();
}

function getAnomalyEventPage(event) {
  const href = `anomaly-event.html#${event.id}`;
  return typeof siteUrl === 'function' ? siteUrl(href) : href;
}

function getAnomalyEventTypeLabel(type) {
  return ANOMALY_EVENTS_DB.types[type] || type;
}

function getAnomalyEventsByCharacter(characterId) {
  const eventIds = ANOMALY_EVENTS_DB.ownership
    .filter((entry) => entry.characterId === characterId)
    .map((entry) => entry.eventId);

  return eventIds.map((id) => getAnomalyEventById(id)).filter(Boolean);
}

function getAnomalyEventsByCharacterAndType(characterId, type) {
  return getAnomalyEventsByCharacter(characterId).filter((event) => event.type === type);
}

function getCharactersByAnomalyEvent(eventId) {
  const characterIds = ANOMALY_EVENTS_DB.ownership
    .filter((entry) => entry.eventId === eventId)
    .map((entry) => entry.characterId);

  return characterIds.map((id) => getCharacterById(id)).filter(Boolean);
}

function renderAnomalyEventDetail(event) {
  if (event.detail && event.detail.length) {
    return event.detail
      .map((block) => {
        switch (block.type) {
          case 'doc-title':
            return `<h3 class="anomaly-event-detail__doc-title">${block.text}</h3>`;
          case 'rule':
            return '<hr class="anomaly-event-detail__rule">';
          case 'p':
            return `<p>${block.text}</p>`;
          case 'h3':
            return `<h3 class="anomaly-event-detail__heading">${block.text}</h3>`;
          case 'h4':
            return `<h4 class="anomaly-event-detail__subheading">${block.text}</h4>`;
          case 'list':
            return `<ul class="anomaly-event-detail__list">${block.items
              .map((item) => `<li>${item}</li>`)
              .join('')}</ul>`;
          case 'figure':
            return `<figure class="anomaly-event-detail__figure">
              <img src="${typeof siteUrl === 'function' ? siteUrl(block.src) : block.src}" alt="${block.alt || ''}" class="anomaly-event-detail__figure-img">
              ${block.caption ? `<figcaption class="anomaly-event-detail__figure-caption">${block.caption}</figcaption>` : ''}
            </figure>`;
          case 'quote': {
            const textHtml = block.html || block.text || '';
            return `
              <figure class="quote-card anomaly-event-detail__quote">
                <span class="quote-card__mark" aria-hidden="true">「</span>
                <blockquote class="quote-card__text">${textHtml}</blockquote>
                <span class="quote-card__close" aria-hidden="true">」</span>
              </figure>
            `;
          }
          case 'link-card': {
            const imgSrc = typeof siteUrl === 'function' ? siteUrl(block.image) : block.image;
            return `
              <a class="anomaly-event-detail__link-card" href="${block.href || '#'}">
                <img src="${imgSrc}" alt="" class="anomaly-event-detail__link-card-img">
                <span class="anomaly-event-detail__link-card-label">${block.label}</span>
                <span class="anomaly-event-detail__link-card-arrow">→</span>
              </a>
            `;
          }
          case 'note':
            return `<p class="anomaly-event-detail__note">${block.text}</p>`;
          default:
            return '';
        }
      })
      .join('');
  }

  if (Array.isArray(event.summary)) {
    return event.summary.map((paragraph) => `<p>${paragraph}</p>`).join('');
  }

  return event.summary ? `<p>${event.summary}</p>` : '';
}

function getAnomalyEventDetailBrief(event) {
  return event.detailBrief || event.brief || '';
}
