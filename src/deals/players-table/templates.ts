import { tplDealsTableFamilyItem } from '../templates';

export const tplDealsPlayersTable = () => {
  return `
  <div id="joco-players-table">

  </div>`;
};

export const tplPlayerRow = ({
  currentPlayerId,
  playerId,
  familyId,
}: {
  currentPlayerId: number | 'Spectator';
  playerId: number;
  familyId: string;
}) => {
  const isCurrentPlayer = playerId === currentPlayerId;
  return `
    <div class="joco-players-table-row">
      ${tplDealsTableFamilyItem(familyId)}
      <div>
        ${isCurrentPlayer ? '<div></div>' : `<div id="joco-new-offer-${playerId}" class="bgabutton bgabutton_blue">${_('New Deal')}</div>`}
        <div class="joco-trade-status"></div>
      </div>
    </div>
`;
};
