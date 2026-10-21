import { JocoPlayer } from '../player-manager/player';

export const tplFamilies = () => `<div id="joco-families">
</div>`;

export const tplPlayerArea = (player: JocoPlayer) => {
  return `
      <div id="joco-family-area-${player.familyId}" class="joco-family-area">
        <div class="joco-family-area-content">
          <div id="joco-counters-${player.familyId}" class="joco-family-area-counters">
          </div>
          <div class="joco-row">
            <div class="joco-container joco-column">
              <span class="joco-header fb-font-baskerville fb-font-16 fb-font-bold">${_('Offices').toLocaleUpperCase()}</span>
              <div id="FamilyOffices_${player.familyId}" class="joco-family-offices"></div>
            </div>
            <div class="joco-column" style="flex-grow: 1;">
              <div class="joco-container">
                <span class="joco-header fb-font-baskerville fb-font-16 fb-font-bold">${_('Enterprises').toLocaleUpperCase()}</span>
                <div id="joco-enterprises-${player.familyId}" class="joco-enterprises"></div>
              </div>
              <div class="joco-container">
                <span class="joco-header fb-font-baskerville fb-font-16 fb-font-bold">${_('Prestige & Blackmail cards').toLocaleUpperCase()}</span>
                <div id="joco-prestige-blackmail-${player.familyId}" class="joco-prestige-blackmail"></div>
              </div>
              <div class="joco-container">
                <span class="joco-header fb-font-baskerville fb-font-16 fb-font-bold">${_('Promise cards').toLocaleUpperCase()}</span>
                <div id="joco-promise-cards-${player.familyId}" class="joco-promise-cards"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
};
