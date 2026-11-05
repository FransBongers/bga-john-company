import { formatStringRecursive } from '../boilerplate';
import { PlayerManager } from '../player-manager';
import { GamedatasAlias, JocoDeal } from '../types';
import { getFamilyName } from '../utility';

const tplIconButton = (icon: string, label: string, playerId: number) => ``;

export const tplDeals = () => `<div id="joco-deals">
</div>`;

export const tplDealsPlayers = (
  gamedatas: GamedatasAlias,
  playerOrder: number[],
) => {
  return `
  <div id="joco-deals-players">

  </div>`;
};

export const tplDealsTableHeader =
  () => `<div class="joco-table-header joco-table-row fb-font-bold fb-font-baskerville fb-font24">
  <div>${_('Family')}</div><div>${_('Description')}</div><div>${_('Offered By')}</div>
</div>`;

export const tplDealsTableFamilyItem = (familyId: string) => {
  const player = PlayerManager.getInstance().getPlayerForFamily(familyId);
  return `
  <div class="joco-table-family-item">
    <div>${formatStringRecursive('${tkn_playerName}', { tkn_playerName: player.getName() })}</div>
    <div class="fb-font-bold">${getFamilyName(familyId)}</div>
  </div>`;
};

export const tplDealsTableRow = (
  deal: JocoDeal,
) => `<div class="joco-table-row fb-font-baskerville">
  ${tplDealsTableFamilyItem(deal.familyId)}<div>${deal.description}</div>${tplDealsTableFamilyItem(deal.offeredByFamilyId)}
</div>`;

export const tplOffers =
  () => `<div id="joco-offers" class="joco-deals-table-outer">
  <div id="joco-offers-inner" class="joco-deals-table-inner">
  ${tplDealsTableHeader()}
  </div>

  
</div>`;

export const tplAgreements =
  () => `<div id="joco-agreements" class="joco-deals-table-outer">
  <div id="joco-offers-inner" class="joco-deals-table-inner">
  ${tplDealsTableHeader()}
  </div>
</div>`;
