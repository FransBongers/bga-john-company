import { SHIPYARD, WORKSHOP } from '../../constants';
import { StaticData } from '../../static-data';
import { JocoEnterpriseCard } from '../../types';

export const tplEnterpriseCardContent = (card: JocoEnterpriseCard) => {
  let shipName = null;
  if (card.type === SHIPYARD) {
    shipName = StaticData.get().ship(card.shipId).name;
  }

  return `
  <div class="joco-title fb-font-baskerville  fb-font-12 bga-autofit">${card.type === WORKSHOP && card.invested ? _('Invested Workshop').toLocaleUpperCase() : _(card.name).toLocaleUpperCase()}</div>
  ${shipName !== null ? `<div class="joco-ship-first-letter fb-font-baskerville fb-font-24 fb-font-italic bga-autofit">${_(shipName).charAt(0)}</div><div class="joco-ship-name fb-font-baskerville fb-font-8 bga-autofit">${_(shipName)}</div>` : ''}  
`;
};
