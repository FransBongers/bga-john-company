import { AbsolutePosition } from '../boilerplate/utility';
import { tplOfficeHeader } from '../company/templates';
import { MILITARY_AFFAIRS, OFFICER_IN_TRAINING } from '../constants';
import { getPhaseName } from '../phase-tracker/translations';
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

export const tplMilitaryAffairs = () => `
      <div id="${MILITARY_AFFAIRS}Office" class="joco-office joco-container">
        ${tplOfficeHeader(MILITARY_AFFAIRS, getPhaseName(MILITARY_AFFAIRS))}
        <div class="joco-inner-container">
          <div id="${OFFICER_IN_TRAINING}" class="joco-family-members-stock">
          </div>
          <div>
            <span class="fb-font-baskerville fb-font-12">${_('Officers in training').toLocaleUpperCase()}</span>
          </div>
        </div>
      </div>
`;
