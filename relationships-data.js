/**
 * 人際關係資料庫
 * ─────────────────────────────────────────
 * nodes : 關係網中的人物節點（含本頁主角）
 * edges : 人物之間的連線（from / to / label）
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
          image: 'images/Alaya_Head_.png',
          x: 0,
          y: 0,
        },
        {
          id: 'cae',
          name: 'CAE',
          role: '母體／威脅',
          image: 'images/CAE_Head.PNG',
          x: -280,
          y: -160,
        },
        {
          id: 'jessica',
          name: '潔西卡',
          role: '異常關聯',
          image: 'images/Jessica_Head.PNG',
          x: 260,
          y: -180,
        },
        {
          id: 'raven',
          name: '渡鴉',
          role: '裝備設計',
          image: '',
          x: 300,
          y: 140,
        },
        {
          id: 'morris',
          name: '莫里斯公司',
          role: '所屬勢力',
          image: 'images/MORRIS_LOGO.png',
          x: -260,
          y: 170,
        },
      ],
      edges: [
        { from: 'alaya', to: 'cae', label: '依存／恐懼' },
        { from: 'alaya', to: 'jessica', label: '配子體來源' },
        { from: 'alaya', to: 'raven', label: '武器設計者' },
        { from: 'alaya', to: 'morris', label: '所屬' },
        { from: 'cae', to: 'jessica', label: '關聯' },
      ],
    },
    cae: {
      centerId: 'cae',
      nodes: [
        {
          id: 'cae',
          name: 'CAE',
          role: '本頁角色',
          image: 'images/CAE_Head.PNG',
          x: 0,
          y: 0,
        },
        {
          id: 'alaya',
          name: '艾萊亞',
          role: '配子體／依存',
          image: 'images/Alaya_Head_.png',
          x: 280,
          y: -40,
        },
        {
          id: 'morris',
          name: '莫里斯公司',
          role: '所屬勢力',
          image: 'images/MORRIS_LOGO.png',
          x: -260,
          y: 160,
        },
      ],
      edges: [
        { from: 'cae', to: 'alaya', label: '帶入／支配' },
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
          image: 'images/Jessica_Head.PNG',
          x: 0,
          y: 0,
        },
        {
          id: 'cae',
          name: 'CAE',
          role: '共生／「愛著」',
          image: 'images/CAE_Head.PNG',
          x: -300,
          y: -40,
        },
        {
          id: 'alaya',
          name: '艾萊亞',
          role: '感興趣',
          image: 'images/Alaya_Head_.png',
          x: 300,
          y: -120,
        },
        {
          id: 'lily',
          name: '莉莉．莫里斯',
          role: '討厭',
          image: 'images/profile_icon/LILI_profile_ICON.png',
          x: 260,
          y: 180,
        },
        {
          id: 'witch',
          name: '魔女議會',
          role: '討厭',
          image: 'images/force_witch.png',
          x: -240,
          y: 200,
        },
      ],
      edges: [
        { from: 'jessica', to: 'cae', label: '共生／「愛著」' },
        { from: 'jessica', to: 'alaya', label: '感興趣' },
        { from: 'jessica', to: 'lily', label: '討厭' },
        { from: 'jessica', to: 'witch', label: '討厭' },
      ],
    },
    '42': {
      centerId: '42',
      nodes: [
        {
          id: '42',
          name: '42',
          role: '本頁角色',
          image: 'images/42_Head.png',
          x: 0,
          y: 0,
        },
        {
          id: 'lily',
          name: '莉莉．莫里斯',
          role: '宛如母女般',
          image: 'images/profile_icon/LILI_profile_ICON.png',
          x: 280,
          y: -40,
        },
      ],
      edges: [
        { from: '42', to: 'lily', label: '宛如母女般' },
      ],
    },
  },
};

function getRelationshipNetwork(characterId) {
  return RELATIONSHIPS_DB.networks[characterId] || null;
}
