import { JocoPlayer } from '../player-manager/player';
import { createFamilyMember } from '../templates';

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
export const tplPlayerCounters = ({
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
  <div class="joco-player-panel-item">
    <div class="joco-treasury-counter-container">
      <span class="fb-font-baskerville fb-font-16 fb-font-bold">£</span><span id="joco-cash-counter-${playerId}" class="fb-font-baskerville fb-font-bold fb-font-24"></span>
    </div>
  </div>
  <div class="joco-player-panel-item">
    ${elt.outerHTML}
    <span id="joco-familyMembers-counter-${playerId}" class="joco-counter fb-font-baskerville fb-font-bold fb-font-20"></span>
  </div>
  <div class="joco-player-panel-item">
    <div class="joco-icon" data-icon="Power">
      <span id="joco-power-counter-${playerId}" class="fb-font-baskerville fb-font-bold fb-font-20">10</span>
    </div>
  </div>
`;
};

// ${
//   crownInGame
//     ? `<div id="joco-promiseCubes-${playerId}" class="joco-cube" data-type="promise"></div>`
//     : '<div></div>'
// }

//   ${
//   crownInGame
//     ? `<div class="joco-counter-container"><span id="joco-promiseCubes-counter-${playerId}" class="joco-counter"></span></div>`
//     : '<div class="joco-counter-container"></div>'
// }

export const tplPlayerAreas = () => `<div id="joco-player-areas">
</div>`;

export const tplPlayerArea = (player: JocoPlayer) => {
  const playerId = player.getPlayerId();
  return `
      <div id="joco-family-area-${playerId}" class="joco-family-area">
        <div class="joco-family-area-content">
          <div id="joco-counters-${playerId}" class="joco-family-area-counters">
          </div>
          <div class="joco-row">
            <div class="joco-container joco-column">
              <span class="joco-header fb-font-baskerville fb-font-16 fb-font-bold">${_('Offices').toLocaleUpperCase()}</span>
              <div id="FamilyOffices_${playerId}" class="joco-family-offices"></div>
            </div>
            <div class="joco-column" style="flex-grow: 1;">
              <div class="joco-container">
                <span class="joco-header fb-font-baskerville fb-font-16 fb-font-bold">${_('Enterprises').toLocaleUpperCase()}</span>
                <div id="joco-enterprises-${playerId}" class="joco-enterprises"></div>
              </div>
              <div class="joco-container">
                <span class="joco-header fb-font-baskerville fb-font-16 fb-font-bold">${_('Prestige & Blackmail cards').toLocaleUpperCase()}</span>
                <div id="joco-prestige-blackmail-${playerId}" class="joco-prestige-blackmail"></div>
              </div>
              <div class="joco-container">
                <span class="joco-header fb-font-baskerville fb-font-16 fb-font-bold">${_('Promise cards').toLocaleUpperCase()}</span>
                <div id="joco-promise-cards-${playerId}" class="joco-promise-cards"></div>
              </div>
              <div class="joco-container">
                <span class="joco-header fb-font-baskerville fb-font-16 fb-font-bold">${_('Played Blackmail cards').toLocaleUpperCase()}</span>
                <div id="joco-played-blackmail-${playerId}" class="joco-prestige-blackmail"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
};
