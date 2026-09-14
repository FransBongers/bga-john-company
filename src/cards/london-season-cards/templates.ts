import { Log } from '../../boilerplate/notification-manager/types';
import { formatStringRecursive } from '../../boilerplate/utility';
import {
  ENTERPRISE,
  PRESTIGE,
  SPOUSE,
  WINDOW,
} from '../../constants';
import {
  tplDiscountIcon,
  tplIcon,
  tplPowerIcon,
  tplVictoryPointsIcon,
} from '../../icons/templates';
import { JocoLondonSeasonCard } from '../../types';
import { tplCardText } from '../utility';

export const tplSpouse = (card: JocoLondonSeasonCard) => `
  <div class="joco-card-title fb-font-16 fb-font-baskerville bga-autofit">${_('SPOUSE')}</div>
  <div class="joco-card-subtitle fb-font-12 fb-font-italic fb-font-baskerville bga-autofit">${_('You cannot transfer this card')}</div>
  <div class="joco-card-name fb-font-24 fb-font-parisienne fb-font-bold bga-autofit">${_(card.title)}</div>
  ${tplCardText(card.text, {})}
  ${
    card.textNote
      ? tplCardText([card.textNote], {
          containerClass: 'fb-card-text-note',
          textClass: 'fb-font-12 fb-font-baskerville fb-font-italic',
        })
      : ''
  }
  ${card.victoryPoints !== null ? tplVictoryPointsIcon(card.victoryPoints) : ''}
  ${card.power !== null ? tplPowerIcon(card.power) : ''}
  ${card.discount !== null ? tplDiscountIcon(card.discount) : ''}
`;

export const tplEnterprise = (card: JocoLondonSeasonCard) => `
  <div class="joco-card-name fb-font-16 fb-font-baskerville bga-autofit">${_(card.title).toLocaleUpperCase()}</div>
  <div class="joco-enterprise-icon">${tplIcon(card.enterpriseType)}</div>
  ${tplCardText(card.text, {})}
`;

export const tplScottishCastle = (card: JocoLondonSeasonCard) => `
  <div class="joco-card-name fb-font-16 fb-font-baskerville bga-autofit">${_(card.title).toLocaleUpperCase()}</div>
  <div class="joco-enterprise-icon">${tplIcon(card.enterpriseType)}</div>
    ${tplPowerIcon('3')}
    ${tplIcon(WINDOW, 'joco-window-1')}
    ${tplIcon(WINDOW, 'joco-window-2')}
`;
export const tplLondonSeasonCardContent = (
  card: JocoLondonSeasonCard,
): string | null => {
  if (card.background === 'ScottishCastle') {
    return tplScottishCastle(card);
  }
  if (card.type === PRESTIGE && card.subtype === SPOUSE) {
    return tplSpouse(card);
  } else if (card.type === PRESTIGE && card.subtype === ENTERPRISE) {
    return tplEnterprise(card);
  }
  return null;
};
