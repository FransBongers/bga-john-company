import { DISCOUNT, POWER, VICTORY_POINTS } from '../constants';

export const tplIcon = (type: string, extraClasses: string = '') =>
  `<div class="joco-icon ${extraClasses ?? ''}" data-icon="${type}"></div>`;

export const tplPolicyIcon = (type: string, extraClasses: string = '') =>
  `<div class="joco-policy-icon ${extraClasses ?? ''}" data-policy-icon="${type}"></div>`;

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
