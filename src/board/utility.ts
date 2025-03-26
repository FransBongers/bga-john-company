const createFamilyMember = (familyId: string, familyMemberId: number | string, extraClasses?: string[]): HTMLElement => {
  const elt = document.createElement('div');
  const familyMemberNumber = typeof familyMemberId === 'number' ? familyMemberId : Number(familyMemberId.split('_')[2]) % 18;

  elt.classList.add('joco-family-member');
  elt.insertAdjacentHTML(
    'afterbegin',
    familyMemberSvgs[familyMemberNumber] ?? familyMemberSvgs[1]
  );

  (extraClasses || []).forEach((className) => elt.classList.add(className));
  
  // if (familyId === CROWN) {
  //   console.log('playersManager',PlayerManager.getInstance());

    // const crownColor = PlayerManager.getInstance()
    //   .getPlayer(CROWN_PLAYER_ID)
    //   .getColor();
  //   familyId = COLOR_FAMILY_MAP[HEX_COLOR_COLOR_MAP['c7b4e1']];
  // }
  elt.setAttribute('data-family', familyId);
  elt.setAttribute('data-number', `${familyMemberNumber}`);
  return elt;
}

// TODO: use id to get name
const createShip = ({name, type, fatigued, extraClasses }: {name: string; type: string; fatigued: 0 | 1; extraClasses?: string[]}): HTMLElement => {
  const elt = document.createElement('div');
  
  elt.classList.add('joco-ship');
  (extraClasses || []).forEach((className) => elt.classList.add(className));

  elt.setAttribute('data-type', type);
  elt.setAttribute('data-fatigued', `${fatigued}`);

  return elt;
}

const createRegiment = (extraClasses: string[] = []): HTMLElement => {
  const elt = document.createElement('div');
  elt.classList.add('joco-regiment');
  extraClasses.forEach((className) => elt.classList.add(className));
  return elt;
}