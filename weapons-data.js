/**
 * 武器資料庫（多對多關聯）
 * ─────────────────────────────────────────
 * weapons    : 所有武器主檔（每把武器只定義一次）
 * ownership  : 角色 ↔ 武器 關聯表（多對多）
 *
 * 範例：
 *   - 艾萊亞持有武器 A、B  → 兩筆 ownership，characterId 皆為 'alaya'
 *   - 武器 A 同時被艾萊亞、另一角色使用 → 兩筆 ownership，weaponId 皆為 'A'
 *
 * 新增武器：在 weapons 加入一筆，圖片放入 images/weapons/
 * 可選 hoverSound：游標移入卡片時播放的音效路徑（如 audio/weapons/xxx.wav）
 * 指定持有者：在 ownership 加入 { characterId, weaponId }
 */

const WEAPONS_DB = {
  weapons: [
    {
      id: 'thelma',
      name: '匕首「末路」',
      image: 'images/weapons/ALAYA_ARM_Thelma.png',
      hoverSound: 'audio/weapons/ALAYA_ARM_Thelma.wav',
      hoverText: '不惜代價的求生之道。',
      summary: [
        '艾萊亞所持的裝備之一。由渡鴉設計原型，八號部門製作，並依照艾萊亞本人的建議進行改造。',
        '全長約30公分，刀柄13公分、刀刃17公分。其設計以 Astronaut Knife M-1 為藍本，主打輕量與易於掌握。刀身採用特殊金屬製成，不僅極為輕巧，堅韌度更是遠勝常見刀具數倍。',
        '在艾萊亞的要求下，刀背特別刻上了鋸齒。會這麼做的緣故，是因為艾萊亞力氣太小，剁不斷自己的四肢，唯有依靠鋸齒的來回切割才能「斷尾求生」。',
        '這把刀的英文名稱「Thelma」出自電影《末路狂花》（Thelma & Louise），不只是身為前演員的渡鴉在替武器取名字時的癖好，更是為了與另一把連發手槍「狂花」做搭配。',
      ],
    },
    {
      id: 'louise',
      name: '連發手槍「狂花」',
      image: 'images/weapons/ALAYA_ARM_Louise.png',
      hoverSound: 'audio/weapons/ALAYA_ARM_Louise.wav',
      hoverText: '被逼至末路的癲狂之花。',
      summary: [
        '艾萊亞所持有的裝備之一，是渡鴉專門為她所設計的槍。',
        '以發狂般的射速與不少的彈容量來彌補艾萊亞不擅射擊的問題，並搭配了一個特殊的雷射瞄準器，能夠配合瞄鏡與內置的計算系統，進行更加有效率的射擊校準。',
        '此外，為了配合艾萊亞的作戰風格，這把根據 Morris AT PST-09 改造而來的槍枝將板機護弓挖空了一部分，以免她一緊張連手指要扣哪都忘了。',
        '這把槍的英文名稱「Louise」出自電影《末路狂花》（Thelma & Louise），不只是身為前演員的渡鴉在替武器取名字時的癖好，更是為了與另一把匕首《末路》做搭配。',
      ],
    },
    {
      id: 'uxs-30',
      name: 'Morris AT UXS-30 全自動衝鋒槍',
      image: 'images/weapons/ARM_UXS30.png',
      hoverSound: 'audio/weapons/ARM_UXS30.wav',
      hoverText: '室內不能開全自動！',
      summary: [
        '由八號部門設計並測試，使用 9mm 手槍彈。',
        '這把 PDW 採用恆定後座系統，使槍枝操控性大幅提升，就算單手射擊也感覺不到半點後座力。其精心設計的結構使這把武器在保有強大火力的同時亦能輕便攜帶。',
        '全自動情況下，能在半秒內清空 30 發的彈匣。是公司內銷量最好的一批槍。',
      ],
    },
    {
      id: 'sign-of-love',
      name: '長刀「愛的信標」',
      image: 'images/weapons/CAE_ARM_SignOfLove.png',
      hoverSound: 'audio/weapons/ALAYA_ARM_Thelma.wav',
      hoverText: '愛是無形的。',
      summary: [
        {
          type: 'p',
          text: 'CAE 所持有的裝備之一，從異常事件「吞噬邪神的少女」中取得的刀具。',
        },
        {
          type: 'p',
          text: '她從潔西卡的胸腔取出了這把長約75公分左右的刀具，並作為最常使用的武器。',
        },
        {
          type: 'p',
          text: '基於邪神的性質，任何妄圖觸碰這把武器的人都會被邪神給控制。',
        },
        {
          type: 'p',
          text: '而 CAE 因自身的受管束事件「邪神的鍾愛之物」的緣故，不會受到這把刀的[ 未明意識 ]影響，這把刀也成了她專用的武器。',
        },
        {
          type: 'p',
          text: '這把武器非常的「不合常理」。極輕的刀身卻有著能夠斬斷鋼鐵的鋒利度，不管怎樣彎折都看不出一絲裂痕，久經沙場也從未曾有過鏽跡。',
        },
        {
          type: 'quote',
          text: '這可是我們兩個愛的結晶喔～ —— 潔西卡。',
          html: '這可是我們兩個<em>愛的結晶喔</em>～ —— 潔西卡。',
        },
        {
          type: 'p',
          text: '這把武器在特定情況下會短暫失去物理性質，雖外觀仍在、且 CAE 能抓握，卻會穿透除生物心臟外的任何物理表面。',
        },
        {
          type: 'p',
          text: 'CAE 能夠將「不語世界」的定錨點放置於刀刃，藉此在敵人的心臟上開通門，使目標向內被吞噬。',
        },
        {
          type: 'quote',
          text: '原理？那當然是因為，愛是無形的嘛。 —— 潔西卡。',
        },
        {
          type: 'p',
          text: '順帶一題，這把武器似乎會偷偷的吸收沾染於上方的血。',
        },
      ],
    },
    {
      id: 'detest',
      name: '單手斧「憎恨」',
      image: 'images/weapons/CAE_ARM_Detest.png',
      hoverSound: 'audio/weapons/CAE_ARM_AXE.wav',
      hoverText: '另一種形式的愛。',
      summary: [
        {
          type: 'p',
          text: 'CAE 所持有的裝備之一，自她遭異常事件「吞噬邪神的少女」影響後，由自身的一部份肉體轉化。',
        },
        {
          type: 'p',
          text: '潔西卡將她的左肢取下、吞噬、占為己有，用剩餘的血肉與 CAE 的一根肋骨鑄造出了這把手斧。',
        },
        {
          type: 'p',
          text: '配重均勻，無論是要投擲還是劈砍都非常順手。前段的鉤型結構可以勾住目標進行各種發揮。',
        },
        {
          type: 'p',
          text: '她會反握這把武器，將鉤型結構產生的凹槽當成磨刀石，藉此削銳刀具——這當然也包括另一把「愛的信標」。',
        },
        {
          type: 'quote',
          text: '恨也是愛的一種表現嘛～ —— 潔西卡。',
        },
        {
          type: 'quote',
          text: '……歪理。 —— CAE。',
        },
        {
          type: 'p',
          text: '與「愛的信標」不同的是，這把斧頭可以供任何人使用——前提是 CAE 認同你能使用，否則這把斧頭會難以控制、甚至讓持有者陷入狂暴之中。',
        },
      ],
    },
    {
      id: 'duck',
      name: '泵動式霰彈槍「鴨嘴」',
      image: 'images/weapons/CAE_ARM_DUCK.png',
      hoverSound: 'audio/weapons/CAE_ARM_DUCK.wav',
      hoverText: '來自一個被常理撕碎的訴願。',
      summary: [
        {
          type: 'p',
          text: 'CAE 所持有的裝備之一，是她從任務中繳獲的一把單管泵動式霰彈槍。',
        },
        {
          type: 'p',
          text: '由 Morris AT SGH-10 霰彈槍改裝而來，雖然最大載彈量縮減、但威力卻提升了不只一個檔次，特殊的膛口裝置能夠使其在擊發時迸發出扇狀電磁，命中後能停機大部分的生體改造裝置，對各路改造狂人來說簡直就是剋星。',
        },
        {
          type: 'p',
          text: '這把武器是 CAE 在擦桌行動中，從一名叛變的莫里斯公司八號部門人員身上取得的。',
        },
        {
          type: 'p',
          text: '據說原本持有這把武器的人，在生死關頭中選擇抓緊一個人，而非這把可靠的槍，最終死於 CAE 的刀下。',
        },
      ],
    },
    {
      id: 'akovou-127',
      name: '射手步槍「ΑΚΩΒΟΥ-1:27」',
      image: 'images/weapons/CAE_ARM_127.png',
      hoverSound: 'audio/weapons/CAE_ARM_127.wav',
      hoverText: '無作為的信心是死的。',
      summary: [
        {
          type: 'p',
          text: 'CAE所持有的裝備之一，是她從任務中繳獲的一把射手步槍。',
        },
        {
          type: 'p',
          text: '能在中遠距離內對目標進行精確殺傷，其原型為永夜重工製造的SAR-762 射手步槍，使用 7.62×51mm NATO彈藥。',
        },
        {
          type: 'p',
          text: '基於其取得的場合已經遭異常事件影響，這把武器也或多或少的被汙染——然而結果卻與常理相反，它似乎免疫任何形式的汙穢，也不會讓其影響自身運作，上方的瞄準鏡能夠看出被「未明意識」類異常給控制的人事物。',
        },
        {
          type: 'p',
          text: '這把武器是CAE在一次外派委託中，從一名被異常事件洗腦的神父身上取得的武器。',
        },
        {
          type: 'p',
          text: '「ΑΚΩΒΟΥ-1:27」的命名與槍身上的銘文，皆取自《新約聖經》雅各書 1:27：',
        },
        {
          type: 'quote',
          text: '在神我們的父面前，那清潔沒有玷汙的虔誠，就是看顧在患難中的孤兒寡婦，並且保守自己不沾染世俗。\n\nPure religion and undefiled before our God and Father is this, to visit the fatherless and widows in their affliction, and to keep himself unspotted from the world.',
          html: '在神我們的父面前，那清潔沒有玷汙的虔誠，就是看顧在患難中的孤兒寡婦，並且保守自己不沾染世俗。<br><br><em>Pure religion and undefiled before our God and Father is this, to visit the fatherless and widows in their affliction, and to keep himself unspotted from the world.</em>',
        },
      ],
      related: [
        {
          id: 'eternal-night',
          image: 'images/weapons/weapon_comp/EternalNight.png',
          name: '永夜重工 (Eternal Night Industry)',
          alt: '永夜重工',
          summary:
            '設立於德國的軍工廠，其創辦人羅科先生曾在俄羅斯地區進行異常事件搜索長達四年之久。',
        },
      ],
    },
    {
      id: 'hail-and-fire',
      name: '手槍「雹、火與血」',
      image: 'images/weapons/MIRIAM_ARM_Hail and fire mingled with blood.png',
      hoverText:
        '第一位天使吹號，就有雹子與火攙著血丟在地上；地的三分之一和樹的三分之一被燒了，一切的青草也被燒了。\n—— 《啟示錄》 8:7',
      captionTone: 'gold',
      summary: [
        '由七支號所映射出的武器之一，是米利暗所持有的武器。',
        '有著最快的取出速度，開火時能看到上方的碎片狀滑套張開、震動。中間的白色部分並非槍管，而是一種材質類似陶瓷的柱狀結晶體。',
        '她通常會在敵火下照護（Care Under Fire, CUF）中使用這把武器，並用自己的翅膀組成盾牌進行掩護。',
        '解剖報告指出，這把武器在擊中人體時的瞬間會產生類似於凝固汽油彈（Napalm）的特性，著彈點會產生一種膠狀物質並釋放高達1200℃的高溫，但由於僅有一瞬間，因此體感上與被開槍擊中是極為類似的。',
        '目前仍不確定這種性質是因何種原因而導致。',
      ],
    },
    {
      id: 'wormwood',
      name: '緊湊型衝鋒槍「苦艾星」',
      image: 'images/weapons/MIRIAM_ARM_Wromwood.png',
      hoverText:
        '第三位天使吹號，就有燒著的大星好像火把從天上落下來，落在江河的三分之一和眾水的泉源上。\n—— 《啟示錄》 8:10',
      captionTone: 'gold',
      summary: [
        '由七支號所映射出的武器之一，是米利暗所持有的武器。',
        '其特色在於極高的射擊速度。開火時，後方的環狀部位會開始高速旋轉。',
        '在米利暗處於「遷躍」時能同時映射出兩把，且射速進一步提升，可說是最能發揮這一強調機動性狀態之長處的武器。',
        '根據戰鬥資料來看，這把武器所射出的彈藥具有某種程度的高爆性質，會在空氣中殘留一種微量氣體。',
        '經採檢，這些氣體含有微量一氧化碳和氯氣，並透過七支號的命中痕跡反應成碳醯氯——也就是光氣。倘若反應更加完全，將達到致死劑量，僅是吸入一些就足以致命。',
        '目前仍不確定這種性質是因何種原因而導致。',
      ],
    },
    {
      id: 'woe',
      name: '突擊步槍「禍哉」',
      image: 'images/weapons/MIRIAM_ARM_Woe.png',
      hoverText:
        '我又看見一個鷹飛在空中，並聽見牠大聲說：「三位天使要吹那其餘的號，你們住在地上的民禍哉！禍哉！禍哉！」\n—— 《啟示錄》 8:13',
      captionTone: 'gold',
      summary: [
        '由七支號所映射出的武器之一，是米利暗所持有的武器。',
        '擁有極強的穩定性、殺傷力與穿透力，其發射的彈藥甚至能把IV級的陶瓷防彈板如同紙板般撕開。',
        '在米利暗處於「強襲」時，武器的終點彈道效能將大幅提升，能在500~1000米的射程內輕易擊穿任何個人防彈衣、15–25 mm 均質鋼裝甲及各類磚石掩體。',
        '令人驚豔的是，這把武器可在米利暗的意志驅使下展現出不同的射擊模式，靈活運作於半自動單發、全自動連發、三點發乃至五點發之間。',
        '經由傷檢報告可看出，受擊目標的創口組織內皆檢出微量放射線殘留。經成分分析，確認為類似衰變鈾的重金屬物質，這也為其極高的動能穿透力提供了物理學依據。',
        '目前仍不確定這種性質是因何種原因而導致。',
      ],
    },
  ],

  ownership: [
    { characterId: 'alaya', weaponId: 'thelma' },
    { characterId: 'alaya', weaponId: 'louise' },
    { characterId: 'alaya', weaponId: 'uxs-30' },
    { characterId: 'cae', weaponId: 'sign-of-love' },
    { characterId: 'cae', weaponId: 'detest' },
    { characterId: 'cae', weaponId: 'duck' },
    { characterId: 'cae', weaponId: 'akovou-127' },
    { characterId: 'miriam', weaponId: 'hail-and-fire' },
    { characterId: 'miriam', weaponId: 'wormwood' },
    { characterId: 'miriam', weaponId: 'woe' },
    // 艾萊亞持有更多武器：再追加 { characterId: 'alaya', weaponId: '...' }
    // 其他角色共用同一把：追加 { characterId: '其他角色id', weaponId: 'weapon-01' }
  ],
};

function getWeaponById(id) {
  return WEAPONS_DB.weapons.find((weapon) => weapon.id === id) || null;
}

function getWeaponPage(weapon) {
  const href = `weapon.html#${weapon.id}`;
  return typeof siteUrl === 'function' ? siteUrl(href) : href;
}

function getWeaponsByCharacter(characterId) {
  const weaponIds = WEAPONS_DB.ownership
    .filter((entry) => entry.characterId === characterId)
    .map((entry) => entry.weaponId);

  return weaponIds.map((id) => getWeaponById(id)).filter(Boolean);
}

function getCharactersByWeapon(weaponId) {
  const characterIds = WEAPONS_DB.ownership
    .filter((entry) => entry.weaponId === weaponId)
    .map((entry) => entry.characterId);

  return characterIds.map((id) => getCharacterById(id)).filter(Boolean);
}

function escapeWeaponHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getWeaponCaptionHtml(weapon) {
  if (!weapon || !weapon.hoverText) return '';
  const toneClass =
    weapon.captionTone === 'gold' ? ' weapon-detail__caption--gold' : '';
  return `<p class="weapon-detail__caption${toneClass}">${escapeWeaponHtml(
    weapon.hoverText
  )}</p>`;
}

function renderWeaponSummary(summary) {
  if (!summary) return '';
  if (!Array.isArray(summary)) {
    return `<p>${escapeWeaponHtml(summary)}</p>`;
  }

  return summary
    .map((block) => {
      if (typeof block === 'string') {
        return `<p>${escapeWeaponHtml(block)}</p>`;
      }

      if (block.type === 'quote') {
        const textHtml = block.html || escapeWeaponHtml(block.text || '');
        return `
          <figure class="quote-card weapon-detail__quote">
            <span class="quote-card__mark" aria-hidden="true">「</span>
            <blockquote class="quote-card__text">${textHtml}</blockquote>
            <span class="quote-card__close" aria-hidden="true">」</span>
          </figure>
        `;
      }

      if (block.html) {
        return `<p>${block.html}</p>`;
      }

      return `<p>${escapeWeaponHtml(block.text || '')}</p>`;
    })
    .join('');
}

function renderWeaponRelated(related) {
  if (!related || !related.length) return '';

  const items = related
    .map((item) => {
      const imageSrc =
        typeof siteUrl === 'function' ? siteUrl(item.image) : item.image;
      return `
        <button
          type="button"
          class="weapon-detail__related-item"
          data-weapon-related-id="${escapeWeaponHtml(item.id)}"
          aria-label="${escapeWeaponHtml(item.name)}"
        >
          <img
            src="${escapeWeaponHtml(imageSrc)}"
            alt="${escapeWeaponHtml(item.alt || item.name)}"
            class="weapon-detail__related-img"
          >
        </button>
      `;
    })
    .join('');

  return `
    <div class="weapon-detail__related">
      <span class="weapon-detail__related-label">相關</span>
      <div class="weapon-detail__related-list">
        ${items}
      </div>
    </div>
  `;
}

function getWeaponRelatedById(weapon, relatedId) {
  if (!weapon || !Array.isArray(weapon.related)) return null;
  return weapon.related.find((item) => item.id === relatedId) || null;
}

function renderWeaponRelatedDetail(item) {
  if (!item) return '';

  const imageSrc =
    typeof siteUrl === 'function' ? siteUrl(item.image) : item.image;

  return `
    <div class="weapon-related-detail">
      <div class="weapon-related-detail__media">
        <img
          src="${escapeWeaponHtml(imageSrc)}"
          alt="${escapeWeaponHtml(item.alt || item.name)}"
          class="weapon-related-detail__img"
        >
      </div>
      <h2 class="weapon-related-detail__name" id="weapon-related-modal-title">
        ${escapeWeaponHtml(item.name)}
      </h2>
      <p class="weapon-related-detail__summary">
        ${escapeWeaponHtml(item.summary || '')}
      </p>
    </div>
  `;
}
