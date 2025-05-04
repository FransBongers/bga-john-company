/**
 * row 1
 * - Family Members
 * - Cash
 * - Blackmail cards
 * - Unfitted ships
 * row 2
 * - Shares
 * - Luxury
 * - Shipyards
 * - Workshops
 */
const tplPlayerCounters = ({
  crownInGame,
  familyId,
  playerId,
}: {
  playerId: number;
  familyId: string;
  crownInGame: boolean;
}) => {
  const elt = createFamilyMember(familyId, Math.floor(Math.random() * 18));
  elt.id = `joco-familyMembers-${playerId}`;

  return `
<div id="joco-counters-${playerId}-row-1" class="joco-counters-row">
  ${elt.outerHTML}
  <div id="joco-cash-${playerId}" class="log_token joco_pound"></div>
  <div id="joco-ships-${playerId}" class="joco-ship" data-type="playerOwnedShip"></div>
  ${
    crownInGame
      ? `<div id="joco-promiseCubes-${playerId}" class="joco-promise-cube"></div>`
      : '<div></div>'
  }
  <div class="joco-counter-container"><span id="joco-familyMembers-counter-${playerId}" class="joco-counter"></span></div>
  <div class="joco-counter-container"><span id="joco-cash-counter-${playerId}" class="joco-counter"></span></div>
  <div class="joco-counter-container"><span id="joco-ships-counter-${playerId}" class="joco-counter"></span></div>
  ${
    crownInGame
      ? `<div class="joco-counter-container"><span id="joco-promiseCubes-counter-${playerId}" class="joco-counter"></span></div>`
      : '<div class="joco-counter-container"></div>'
  }
</div>
<div class="joco-counters-row">
  <div id="joco-shares-${playerId}" class="joco-icon" data-icon="Share"></div>
  <div id="joco-workshops-${playerId}" class="joco-icon" data-icon="Workshop"></div>
  <div id="joco-shipyards-${playerId}" class="joco-icon" data-icon="Shipyard"></div>
  <div id="joco-luxuries-${playerId}" class="joco-icon" data-icon="Luxury"></div>
  <div class="joco-counter-container"><span id="joco-shares-counter-${playerId}" class="joco-counter"></span></div>
  <div class="joco-counter-container"><span id="joco-workshops-counter-${playerId}" class="joco-counter"></span></div>
  <div class="joco-counter-container"><span id="joco-shipyards-counter-${playerId}" class="joco-counter"></span></div>
  <div class="joco-counter-container"><span id="joco-luxuries-counter-${playerId}" class="joco-counter"></span></div>
</div>
`;
};
