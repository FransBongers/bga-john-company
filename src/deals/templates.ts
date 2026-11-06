import { formatStringRecursive } from '../boilerplate';
import { PlayerManager } from '../player-manager';
import { GamedatasAlias, JocoDeal } from '../types';
import { getFamilyName } from '../utility';
import { getAssetLabels, getStaticCardLabel } from './labels';

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
  <div>${_('Family')}</div><div>${_('Description')}</div><div></div><div>${_('Offered By')}</div>
</div>`;

export const tplDealsTableFamilyItem = (familyId: string) => {
  const player = PlayerManager.getInstance().getPlayerForFamily(familyId);
  return `
  <div class="joco-table-family-item">
    <div>${formatStringRecursive('${tkn_playerName}', { tkn_playerName: player.getName() })}</div>
    <div class="fb-font-bold">${getFamilyName(familyId)}</div>
  </div>`;
};

const escapeHtml = (text: string) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const tplDealAssetLines = (deal: JocoDeal, currentFamilyId: string | null) => {
  const assetLabels = [deal.offeredByFamilyId, deal.familyId].map((familyId) => ({
    familyId,
    labels: getAssetLabels(deal.assets?.[familyId] ?? {}, getStaticCardLabel),
  }));
  if (assetLabels.every(({ labels }) => labels.length === 0)) {
    return '';
  }

  const isAgreement = deal.status === 'agreement';
  return assetLabels
    .map(({ familyId, labels }) => {
      const giver =
        familyId === currentFamilyId
          ? formatStringRecursive(
              isAgreement
                ? _('${tkn_boldText_you} gave')
                : _('${tkn_boldText_you} will give'),
              { tkn_boldText_you: _('You') },
            )
          : formatStringRecursive(
              isAgreement
                ? _('${tkn_playerName} gave')
                : _('${tkn_playerName} will give'),
              {
                tkn_playerName: PlayerManager.getInstance()
                  .getPlayerForFamily(familyId)
                  .getName(),
              },
            );
      return `<div class="joco-deal-assets">${giver}: ${labels.length ? labels.join(', ') : _('nothing')}</div>`;
    })
    .join('');
};

const tplDealButtons = (deal: JocoDeal, currentFamilyId: string | null) => {
  if (deal.status === 'agreement') {
    const reports = deal.reports ?? {};
    const report = currentFamilyId ? reports[currentFamilyId] : undefined;
    const participants = [deal.familyId, deal.offeredByFamilyId];
    const reportLine = (familyId: string) => {
      const familyReport = reports[familyId];
      const result = familyReport === 'fulfilled'
        ? _('Fulfilled')
        : familyReport === 'violated'
          ? _('Violated')
          : _('Pending');
      return `<div>${getFamilyName(familyId)}: ${result}</div>`;
    };
    return `<div class="joco-deal-buttons">
      <div>${participants.map(reportLine).join('')}</div>
      ${currentFamilyId && participants.includes(currentFamilyId) && !report ? `<div class="joco-deal-buttons">
        <div class="bgabutton bgabutton_blue" data-deal-action="fulfilled" data-deal-id="${deal.id}">${_('Fulfilled')}</div>
        <div class="bgabutton bgabutton_red" data-deal-action="violated" data-deal-id="${deal.id}">${_('Violated')}</div>
      </div>` : ''}
    </div>`;
  }
  if (deal.status !== 'offer') {
    return '';
  }
  if (currentFamilyId === deal.familyId) {
    return `<div class="joco-deal-buttons">
      <div class="bgabutton bgabutton_blue" data-deal-action="accept" data-deal-id="${deal.id}">${_('Accept')}</div>
      <div class="bgabutton bgabutton_red" data-deal-action="reject" data-deal-id="${deal.id}">${_('Reject')}</div>
    </div>`;
  }
  if (currentFamilyId === deal.offeredByFamilyId) {
    return `<div class="joco-deal-buttons">
      <div class="bgabutton bgabutton_red" data-deal-action="reject" data-deal-id="${deal.id}">${_('Cancel')}</div>
    </div>`;
  }
  return '';
};

const tplDealsTableDescription = (
  deal: JocoDeal,
  currentFamilyId: string | null,
) => `<div class="joco-deal-description">
  <div>${escapeHtml(deal.description)}</div>
  ${tplDealAssetLines(deal, currentFamilyId)}
</div>`;

const tplDealsTableActions = (
  deal: JocoDeal,
  currentFamilyId: string | null,
) => `<div class="joco-deal-actions">${tplDealButtons(deal, currentFamilyId)}</div>`;

export const tplDealsTableRow = (
  deal: JocoDeal,
  currentFamilyId: string | null,
) => `<div id="joco-deal-${deal.id}" class="joco-table-row fb-font-baskerville">
  ${tplDealsTableFamilyItem(deal.familyId)}${tplDealsTableDescription(deal, currentFamilyId)}${tplDealsTableActions(deal, currentFamilyId)}${tplDealsTableFamilyItem(deal.offeredByFamilyId)}
</div>`;

export const tplOffers =
  () => `<div id="joco-offers" class="joco-deals-table-outer">
  <div id="joco-offers-inner" class="joco-deals-table-inner">
  ${tplDealsTableHeader()}
  </div>

  
</div>`;

export const tplAgreements =
  () => `<div id="joco-agreements" class="joco-deals-table-outer">
  <div id="joco-agreements-inner" class="joco-deals-table-inner">
  ${tplDealsTableHeader()}
  </div>
</div>`;
