/**
 * 角色資料庫
 * ─────────────────────────────────────────
 * id   : 唯一識別碼
 * name : 角色名稱
 */

const CHARACTERS_DB = {
  characters: [
    {
      id: 'alaya',
      name: '艾萊亞',
      profilePage: 'html/character-profile-alaya.html',
      icon: 'images/Alaya_Icon.png',
    },
    {
      id: 'cae',
      name: 'CAE',
      profilePage: 'html/character-profile-CAE.html',
      icon: 'images/CAE_ICON.png',
    },
    {
      id: 'jessica',
      name: '潔西卡',
      profilePage: 'html/character-profile-Jessica.html',
      icon: 'images/Jessica_ICON.png',
    },
    {
      id: '42',
      name: '42',
      profilePage: 'html/character-profile-42.html',
      icon: 'images/profile_icon/42_profile_ICON.png',
    },
    {
      id: 'lily',
      name: '莉莉．莫里斯',
      profilePage: 'html/character-profile-lily.html',
      icon: 'images/Lily_Head.jpg',
    },
    {
      id: 'miriam',
      name: '米利暗',
      profilePage: 'html/character-profile-miriam.html',
      icon: 'images/force_CTA.png',
    },
    // 新增角色時在此加入一筆
  ],
};

function getCharacterById(id) {
  return CHARACTERS_DB.characters.find((character) => character.id === id) || null;
}

function getCharacterProfilePage(characterId) {
  const character = getCharacterById(characterId);
  return character?.profilePage || null;
}

function getCharacterProfileHref(characterId, hash = '') {
  const page = getCharacterProfilePage(characterId);
  if (!page) return 'index.html#characters';
  const cleanHash = hash ? String(hash).replace(/^#/, '') : '';
  return cleanHash ? `${page}#${cleanHash}` : page;
}

function getCharacterIcon(characterId) {
  return getCharacterById(characterId)?.icon || null;
}

/** Prefer referrer character page; otherwise first known id in candidates. */
function resolveProfileCharacterId(candidateIds = []) {
  const ref = document.referrer || '';
  for (const character of CHARACTERS_DB.characters) {
    if (!character.profilePage) continue;
    const fileName = character.profilePage.split('/').pop();
    if (fileName && ref.includes(fileName)) return character.id;
  }

  for (const id of candidateIds) {
    if (getCharacterProfilePage(id)) return id;
  }

  return candidateIds[0] || null;
}
