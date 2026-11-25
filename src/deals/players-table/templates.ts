import { tplDealsTableFamilyItem } from '../templates';

export const tplDealsPlayersTable = () => {
  return `
  <div id="joco-players-table">

  </div>`;
};

export const tplPlayerRow = ({
  currentPlayerId,
  playerId,
}: {
  currentPlayerId: number | 'Spectator';
  playerId: number;
}) => {
  const isCurrentPlayer = playerId === currentPlayerId;
  const canCreateDeal = currentPlayerId !== 'Spectator' && !isCurrentPlayer;
  return `
    <div class="joco-players-table-row">
      ${tplDealsTableFamilyItem(playerId)}
      <div>
        ${canCreateDeal ? `<div id="joco-new-offer-${playerId}" class="bgabutton bgabutton_blue">${_('New Deal')}</div>` : '<div></div>'}
        <div class="joco-trade-status"></div>
      </div>
    </div>
`;
};
