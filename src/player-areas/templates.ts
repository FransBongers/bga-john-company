import { JohnCompanyPlayerData } from '../types';

export const tplPlayerAreas = () => `<div id="joco-player-areas">
</div>`;

export const tplPlayerArea = (player: JohnCompanyPlayerData) => `
  <div class="joco-player-area joco-container">
    <div class="joco-player-name" style="background-color:#${player.color};"><span class="fb-font-baskerville fb-font-16 fb-font-semi-bold">${player.name}</span></div>
    <div class="joco-player-area-content">
      <div class="joco-inner-container">
        <span class="joco-header">${_('Enterprises')}</span>
        <div id="joco-enterprises-${player.familyId}" class="joco-enterprises"></div>
      </div>
      <div class="joco-inner-container">
        <span class="joco-header">${_('Prestige & Blackmail cards')}</span>
        <div id="joco-prestige-blackmail-${player.familyId}" class="joco-prestige-blackmail"></div>
      </div>
    </div>
  </div>
`;
