/**
 * 目標資料庫
 * ─────────────────────────────────────────
 * 各角色的目標列表，依 order 順序以氣泡連線呈現
 */

const GOALS_DB = {
  goals: {
    alaya: [
      { order: 1, text: '活下來' },
      { order: 2, text: '找到逃出公司的方法' },
      { order: 3, text: '嘗試適應眼下的狀況' },
    ],
    cae: [
      { order: 1, text: '擺脫潔西卡' },
      { order: 2, text: '與所有人保持距離' },
    ],
    jessica: [
      { order: 1, text: '找樂子' },
    ],
    '42': [
      { order: 1, text: '找出可以跟大家一起聊天的方法。' },
    ],
  },

  /* 氣泡基準位置（百分比，相對於畫布） */
  layouts: {
    1: [
      { x: 50, y: 50 },
    ],
    '1-mobile': [
      { x: 50, y: 50 },
    ],
    2: [
      { x: 28, y: 48 },
      { x: 72, y: 48 },
    ],
    '2-mobile': [
      { x: 50, y: 28 },
      { x: 50, y: 72 },
    ],
    3: [
      { x: 18, y: 58 },
      { x: 50, y: 32 },
      { x: 82, y: 62 },
    ],
    '3-mobile': [
      { x: 50, y: 18 },
      { x: 50, y: 50 },
      { x: 50, y: 82 },
    ],
  },
};

function getGoalsByCharacter(characterId) {
  const goals = GOALS_DB.goals[characterId];
  if (!goals) return [];
  return [...goals].sort((a, b) => a.order - b.order);
}

function getGoalLayout(count) {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile && GOALS_DB.layouts[`${count}-mobile`]) {
    return GOALS_DB.layouts[`${count}-mobile`];
  }
  return GOALS_DB.layouts[count] || GOALS_DB.layouts[3];
}
