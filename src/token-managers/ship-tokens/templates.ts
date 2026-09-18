import { JocoShipBase } from '../../types';

export const tplShipContent = (ship: JocoShipBase, fatiguedSide: boolean = false) => `
  <div class="joco-ship-name bga-autofit"><span class="fb-font-baskerville">${_(ship.name)}</span></div>
  ${fatiguedSide ? `<div class="joco-ship-fatigued fb-font-baskerville bga-autofit">${_('F')}</div>` : ''}
`;
