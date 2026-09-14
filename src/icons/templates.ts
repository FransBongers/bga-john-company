import { DISCOUNT, POWER, BONUS, TAX, VICTORY_POINTS } from '../constants';

export const tplIcon = (type: string, extraClasses: string = '') =>
  `<div class="joco-icon ${extraClasses ?? ''}" data-icon="${type}"></div>`;

const getPolicyConsequenceTranslation = (consequence: string) => {
  switch (consequence) {
    case BONUS:
      return _('Bonus');
    case POWER:
      return _('Power');
    case TAX:
      return _('Tax');
    default:
      return '';
  }
};

export const tplPolicyIcon = (type: string, extraClasses: string = '') =>
  `<div class="joco-policy-icon ${extraClasses ?? ''}" data-policy-icon="${type}">
    ${[BONUS, POWER, TAX].includes(type) ? `<div class="fb-font-baskerville fb-font-16 bga-autofit">${getPolicyConsequenceTranslation(type).toLocaleUpperCase()}</div>` : ''}
  </div>`;

export const tplPowerIcon = (
  value: string | number,
  extraClasses: string = '',
) =>
  `<div class="joco-icon ${extraClasses ?? ''}" data-icon="${POWER}${value}"></div>`;

export const tplVictoryPointsIcon = (
  value: string | number,
  extraClasses: string = '',
) =>
  `<div class="joco-icon ${extraClasses ?? ''}" data-icon="${VICTORY_POINTS}${value}"></div>`;

export const tplDiscountIcon = (
  value: string | number,
  extraClasses: string = '',
) =>
  `<div class="joco-icon ${extraClasses ?? ''}" data-icon="${DISCOUNT}${value}"></div>`;
