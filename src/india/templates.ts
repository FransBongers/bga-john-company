import { AbsolutePosition } from '../boilerplate/utility';
import { StaticData } from '../static-data';
import { tplAmount } from '../templates';

export const tplOrder = (orderId: string, { top, left }: AbsolutePosition) => {
  const staticData = StaticData.get().order(orderId);
  return `<div id="${orderId}" class="joco-order" style="top: ${top}px; left: ${left}px;" data-is-home-port="${staticData.homePort !== null}">
          <div class="joco-order-value">${tplAmount(staticData.value)}</div>
          <div class="joco-filled-order-value">${tplAmount(staticData.filledValue, true)}</div>
        </div>`;
};

export const tplOrderToken = (type: 'filled' | 'closed') => `
  <div class="joco-order-token" data-type="${type}">
    <div class="joco-text fb-font-parisienne fb-font-12 bga-autofit"><span>${type === 'filled' ? _('Filled') : _('Closed')}</span></div>
  </div>
`;
