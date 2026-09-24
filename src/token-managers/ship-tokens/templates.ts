import { PLAYER_OWNED_SHIP } from '../../constants';
import { JocoShipBase } from '../../types';

export const tplShipContent = (ship: JocoShipBase, back: boolean = false) => `
  <div class="joco-ship-name bga-autofit"><span class="fb-font-baskerville">${back && ship.type !== PLAYER_OWNED_SHIP ? _('Extra Ship') : _(ship.name)}</span></div>
  ${back ? `<div class="joco-ship-fatigued fb-font-baskerville bga-autofit">${_('F')}</div>` : ''}
`;
