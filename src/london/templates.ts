import { formatStringRecursive } from '../boilerplate';
import { PlayerManager } from '../player-manager';
import { tplAmount } from '../templates';
import { GamedatasAlias, JocoPrize } from '../types';

export const tplLondonSeasonOrder = ({
  order,
  cashSpent,
}: GamedatasAlias['londonSeason']) => {
  const playerManager = PlayerManager.getInstance();
  let playerLog = '';
  let playerArgs = {};
  order.forEach((playerId, index) => {
    playerLog +=
      '${tkn_playerName_' +
      index +
      '}' +
      ' (${tkn_boldText_amount_' +
      index +
      '})' + (index === order.length - 1 ? '' : ', ');
    playerArgs['tkn_playerName_' + index] = playerManager
      .getPlayer(playerId)
      .getName();
    playerArgs['tkn_boldText_amount_' + index] = '£' + cashSpent[playerId];
  });

  return `
    <span class="fb-font-baskerville fb-font-12">
      ${formatStringRecursive(
        _('Order for choosing cards from the London Season Display: ${playerLog}'),
        {
          playerLog: {
            log: playerLog,
            args: playerArgs,
          },
        },
      )}
    </span>
  `;
};

export const tplPrize = (prize: JocoPrize) => {
  return `
    <div id="${prize.id}-container" class="joco-container joco-column joco-prize">
      <div class="joco-row">
        <div class="joco-upkeep-container">
          <div class="joco-icon" data-icon="CircleDark">
            ${tplAmount(prize.cost)}
          </div>
          ${
            prize.upkeep
              ? `<div class="joco-upkeep">
            ${tplAmount(prize.upkeep, true)}
          </div>`
              : ''
          }
        </div>
        <div class="joco-windows-container">
          ${Array.from({ length: prize.windows })
            .map(() => `<div class="joco-icon" data-icon="Window"></div>`)
            .join('')}
        </div>
        <div class="joco-icon" data-icon="VictoryPoints">
          <span class="fb-font-baskerville fb-font-semi-bold fb-font-20">${prize.VictoryPoints}</span>
        </div>
      </div>
      <div id="${prize.id}" class="joco-family-members-stock"></div>
      <div class="joco-prize-description">
        <span class="fb-font-baskerville fb-font-12">${_('Prize').toLocaleUpperCase()}</span>
      </div>
    </div>
  `;
};
