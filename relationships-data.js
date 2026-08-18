/**
 * 人際關係資料庫
 * ─────────────────────────────────────────
 * nodes : 關係網中的人物節點（含本頁主角）
 * edges : 人物之間的連線
 *   label   : 常態顯示的「關係」
 *   feeling : 點擊角色後顯示的「感覺」（可省略）
 *
 * 座標為關係圖世界座標（像素），主角建議放在 (0, 0)
 * 新增人物：在 nodes 加入一筆；連線則在 edges 加入
 */

const RELATIONSHIPS_DB = {
  networks: {
    alaya: {
      centerId: 'alaya',
      nodes: [
        {
          id: 'alaya',
          name: '艾萊亞',
          role: '本頁角色',
          image: 'images/Alaya/Alaya_Head_.png',
          x: 0,
          y: 0,
        },
        {
          id: 'cae',
          name: 'CAE',
          role: '互利共生',
          image: 'images/CAE/CAE_Head.PNG',
          x: -420,
          y: -180,
        },
        {
          id: 'jessica',
          name: '潔西卡',
          role: '眷屬',
          image: 'images/Jessica/Jessica_Head.PNG',
          x: 420,
          y: -160,
        },
        {
          id: 'morris',
          name: '莫里斯公司',
          role: '所屬勢力',
          image: 'images/MORRIS_LOGO.png',
          x: 0,
          y: 340,
        },
      ],
      edges: [
        { from: 'alaya', to: 'cae', label: '互利共生', feeling: '恐懼／好奇' },
        { from: 'alaya', to: 'jessica', label: '眷屬', feeling: '恐懼' },
        { from: 'alaya', to: 'morris', label: '所屬' },
      ],
    },
    cae: {
      centerId: 'cae',
      nodes: [
        {
          id: 'cae',
          name: 'CAE',
          role: '本頁角色',
          image: 'images/CAE/CAE_Head.PNG',
          x: 0,
          y: 0,
        },
        {
          id: 'lily',
          name: '莉莉．莫里斯',
          role: '上下屬',
          image: 'images/Lily/Lily_Head.jpg',
          x: -420,
          y: -180,
        },
        {
          id: 'jessica',
          name: '潔西卡',
          role: '被寄生',
          image: 'images/Jessica/Jessica_Head.PNG',
          x: 420,
          y: -160,
        },
        {
          id: 'alaya',
          name: '艾萊亞',
          role: '物品',
          image: 'images/Alaya/Alaya_Head_.png',
          x: 300,
          y: 340,
        },
        {
          id: 'morris',
          name: '莫里斯公司',
          role: '所屬勢力',
          image: 'images/MORRIS_LOGO.png',
          x: -300,
          y: 340,
        },
      ],
      edges: [
        { from: 'cae', to: 'lily', label: '上下屬', feeling: '信賴／愧疚' },
        { from: 'cae', to: 'jessica', label: '被寄生', feeling: '憎恨' },
        { from: 'cae', to: 'alaya', label: '物品', feeling: '煩人' },
        { from: 'cae', to: 'morris', label: '所屬' },
      ],
    },
    jessica: {
      centerId: 'jessica',
      nodes: [
        {
          id: 'jessica',
          name: '潔西卡',
          role: '本頁角色',
          image: 'images/Jessica/Jessica_Head.PNG',
          x: 0,
          y: 0,
        },
        {
          id: 'cae',
          name: 'CAE',
          role: '寄宿於體內',
          image: 'images/CAE/CAE_Head.PNG',
          x: -420,
          y: -200,
        },
        {
          id: 'lily',
          name: '莉莉．莫里斯',
          role: '敵對',
          image: 'images/Lily/Lily_Head.jpg',
          x: 420,
          y: -180,
        },
        {
          id: 'alaya',
          name: '艾萊亞',
          role: '眷屬',
          image: 'images/Alaya/Alaya_Head_.png',
          x: 400,
          y: 300,
        },
        {
          id: 'witch',
          name: '魔女議會',
          role: '敵對',
          image: 'images/force_witch.png',
          x: -400,
          y: 300,
        },
        {
          id: 'morris',
          name: '莫里斯公司',
          role: '敵對',
          image: 'images/MORRIS_LOGO.png',
          x: 0,
          y: 400,
        },
      ],
      edges: [
        { from: 'jessica', to: 'cae', label: '寄宿於體內', feeling: '「愛」' },
        { from: 'jessica', to: 'lily', label: '敵對', feeling: '討厭鬼' },
        { from: 'jessica', to: 'alaya', label: '眷屬', feeling: '有趣的玩具' },
        { from: 'jessica', to: 'witch', label: '敵對', feeling: '一大群討厭鬼' },
        { from: 'jessica', to: 'morris', label: '敵對', feeling: '一群討厭鬼' },
      ],
    },
    '42': {
      centerId: '42',
      nodes: [
        {
          id: '42',
          name: '42',
          role: '本頁角色',
          image: 'images/42/42_Head.png',
          x: 0,
          y: 0,
        },
        {
          id: 'lily',
          name: '莉莉．莫里斯',
          role: '監護人',
          image: 'images/Lily/Lily_Head.jpg',
          x: -420,
          y: -40,
        },
        {
          id: 'morris',
          name: '莫里斯公司',
          role: '收容的異常事件',
          image: 'images/MORRIS_LOGO.png',
          x: 420,
          y: 40,
        },
      ],
      edges: [
        { from: '42', to: 'lily', label: '監護人', feeling: '宛如至親' },
        { from: '42', to: 'morris', label: '收容的異常事件' },
      ],
    },
    lily: {
      centerId: 'lily',
      nodes: [
        {
          id: 'lily',
          name: '莉莉．莫里斯',
          role: '本頁角色',
          image: 'images/Lily/Lily_Head.jpg',
          x: 0,
          y: 0,
        },
        {
          id: 'cae',
          name: 'CAE',
          role: '上下屬／朋友',
          image: 'images/CAE/CAE_Head.PNG',
          x: -420,
          y: -200,
        },
        {
          id: 'jessica',
          name: '潔西卡',
          role: '勢不兩立',
          image: 'images/Jessica/Jessica_Head.PNG',
          x: 420,
          y: -180,
        },
        {
          id: '42',
          name: '42',
          role: '監護人',
          image: 'images/42/42_Head.png',
          x: 400,
          y: 280,
        },
        {
          id: 'alaya',
          name: '艾萊亞',
          role: '上下屬',
          image: 'images/Alaya/Alaya_Head_.png',
          x: -400,
          y: 280,
        },
        {
          id: 'morris',
          name: '莫里斯公司',
          role: 'CEO／董事長',
          image: 'images/MORRIS_LOGO.png',
          x: 0,
          y: 400,
        },
      ],
      edges: [
        { from: 'lily', to: 'cae', label: '上下屬／朋友', feeling: '擔憂／信賴' },
        { from: 'lily', to: 'jessica', label: '勢不兩立', feeling: '警戒' },
        { from: 'lily', to: '42', label: '監護人', feeling: '關愛' },
        { from: 'lily', to: 'alaya', label: '上下屬', feeling: '有趣的人／懷疑' },
        { from: 'lily', to: 'morris', label: 'CEO／董事長', feeling: '責任' },
      ],
    },
    miriam: {
      centerId: 'miriam',
      nodes: [
        {
          id: 'miriam',
          name: '米利暗',
          role: '本頁角色',
          image: 'images/Miriam/Miriam_Head_.png',
          x: 0,
          y: 0,
        },
        {
          id: 'michael',
          name: '聖彌迦勒',
          role: '大姐',
          x: -420,
          y: -40,
        },
        {
          id: 'cta',
          name: '中央技術局',
          role: '所屬勢力',
          image: 'images/force_CTA.png',
          x: 420,
          y: 40,
        },
      ],
      edges: [
        { from: 'miriam', to: 'michael', label: '大姐', feeling: '敬重／依靠' },
        { from: 'miriam', to: 'cta', label: '所屬' },
      ],
    },
  },
};

function getRelationshipNetwork(characterId) {
  return RELATIONSHIPS_DB.networks[characterId] || null;
}
