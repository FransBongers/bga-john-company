import {
  BENGAL_PRESIDENCY,
  BOMBAY_PRESIDENCY,
  CASH,
  CHAIRMAN,
  COMMANDER,
  COMPANY_SHARE,
  DIRECTOR_OF_TRADE,
  EAST_INDIAN,
  GOVERNOR_GENERAL,
  LUXURY,
  MADRAS_PRESIDENCY,
  MANAGER_OF_SHIPPING,
  MILITARY_AFFAIRS,
  OFFICE,
  OFFICER_IN_TRAINING,
  PRESIDENT_OF_BENGAL,
  PRESIDENT_OF_BOMBAY,
  PRESIDENT_OF_MADRAS,
  PRIME_MINISTER,
  RANDOM_BLACKMAIL_CARD,
  SHARE,
  SHIPYARD,
  SOUTH_INDIAN,
  UNFITTED,
  WEST_INDIAN,
  WRITER,
} from '../../constants';
import { tplIcon, tplMoneyIcon } from '../../icons/templates';
import { JocoSetupCardItem, JocoSetupCardStatic } from '../../types';

const tplSetupCardItemContainer = (htmnl: string, index: number) => `
  <div class="setup-card-item" data-index="${index}">${htmnl}</div>
`;

const tplIconWithText = (iconHtml: string, text: string, extraClass = '') => `
  <div class="joco-icon-with-text ${extraClass}">
    ${iconHtml}
    <div class="joco-text fb-font-baskerville fb-font-italic fb-font-12 bga-autofit">${text}</div>
  </div>`;

const tplOfficeIcon = (officeId: string) => {
  switch (officeId) {
    case CHAIRMAN:
    case DIRECTOR_OF_TRADE:
    case MANAGER_OF_SHIPPING:
    case MILITARY_AFFAIRS:
      return `<div class="joco-office-icon" data-office-icon="${officeId}"></div>`;
    case PRESIDENT_OF_BOMBAY:
    case PRESIDENT_OF_MADRAS:
    case PRESIDENT_OF_BENGAL:
      return `<div class="joco-office-icon" data-office-icon="Crown"></div><div class="joco-region-icon" data-region='${officeId.replace('PresidentOf', '')}'></div>`;
    default:
      return '';
  }
};

const tplOfficeIconWrapper = (officeId: string) => `
  <div class="joco-office-icon-wrapper">
    <div class="joco-office-icon-wrapper-inner">
      ${tplOfficeIcon(officeId)}
    </div>
  </div>`;

const tplWriter = (presidency: string) => {
  switch (presidency) {
    case BENGAL_PRESIDENCY:
      return tplIconWithText(tplIcon(WRITER), _('in Bengal Presidency'));
    case BOMBAY_PRESIDENCY:
      return tplIconWithText(tplIcon(WRITER), _('in Bombay Presidency'));
    case MADRAS_PRESIDENCY:
      return tplIconWithText(tplIcon(WRITER), _('in Madras Presidency'));
  }
};

const tplCommander = (presidency: string) => {
  switch (presidency) {
    case BENGAL_PRESIDENCY:
      return tplIconWithText('<div class="joco-office-icon" data-office-icon="Commander"></div>', _('Commander of the Army of Bengal'));
    case BOMBAY_PRESIDENCY:
      return tplIconWithText('<div class="joco-office-icon" data-office-icon="Commander"></div>', _('Commander of the Army of Bombay'));
    case MADRAS_PRESIDENCY:
      return tplIconWithText('<div class="joco-office-icon" data-office-icon="Commander"></div>', _('Commander of the Army of Madras'));
  }
};

const tplShipyard = (seaZone: string) => {
  switch (seaZone) {
    case WEST_INDIAN:
      return tplIconWithText(
        tplIcon(SHIPYARD),
        _('& place ship in West Indian'),
      );
    case SOUTH_INDIAN:
      return tplIconWithText(
        tplIcon(SHIPYARD),
        _('& place ship in South Indian'),
      );
    case EAST_INDIAN:
      return tplIconWithText(
        tplIcon(SHIPYARD),
        _('& place ship in East Indian'),
      );
    case UNFITTED:
      return tplIcon(SHIPYARD);
  }
};

const tplOffice = (officeId: string) => {
  switch (officeId) {
    case CHAIRMAN:
      return tplIconWithText(
        tplOfficeIconWrapper(CHAIRMAN),
        _('Chairman').toLocaleUpperCase(),
        'joco-setup-office',
      );
    case DIRECTOR_OF_TRADE:
      return tplIconWithText(
        tplOfficeIconWrapper(DIRECTOR_OF_TRADE),
        _('Director of Trade').toLocaleUpperCase(),
        'joco-setup-office',
      );
    case MANAGER_OF_SHIPPING:
      return tplIconWithText(
        tplOfficeIconWrapper(MANAGER_OF_SHIPPING),
        _('Manager of Shipping').toLocaleUpperCase(),
        'joco-setup-office',
      );
    case MILITARY_AFFAIRS:
      return tplIconWithText(
        tplOfficeIconWrapper(MILITARY_AFFAIRS),
        _('Military Affairs').toLocaleUpperCase(),
        'joco-setup-office',
      );
    case PRESIDENT_OF_BOMBAY:
      return tplIconWithText(
        tplOfficeIconWrapper(PRESIDENT_OF_BOMBAY),
        _('President of Bombay').toLocaleUpperCase(),
        'joco-setup-office',
      );
    case PRESIDENT_OF_MADRAS:
      return tplIconWithText(
        tplOfficeIconWrapper(PRESIDENT_OF_MADRAS),
        _('President of Madras').toLocaleUpperCase(),
        'joco-setup-office',
      );
    case PRESIDENT_OF_BENGAL:
      return tplIconWithText(
        tplOfficeIconWrapper(PRESIDENT_OF_BENGAL),
        _('President of Bengal').toLocaleUpperCase(),
        'joco-setup-office',
      );
    case GOVERNOR_GENERAL:
      return tplIconWithText(
        tplOfficeIconWrapper(GOVERNOR_GENERAL),
        _('Governor General').toLocaleUpperCase(),
        'joco-setup-office',
      );
  }
};

const tplSetupCardItem = ({ type, value }: JocoSetupCardItem) => {
  switch (type) {
    case CASH:
      return tplMoneyIcon(value);
    case OFFICE:
      return tplOffice(value);
    case COMMANDER:
      return tplCommander(value);
    case COMPANY_SHARE: // replace 'someType' with actual type
      return tplIcon(SHARE);
    case LUXURY:
      return tplIcon(LUXURY);
    case OFFICER_IN_TRAINING:
      return tplIcon(OFFICER_IN_TRAINING);
    case PRIME_MINISTER:
      return `<div class="joco-text fb-font-baskerville fb-font-12 bga-autofit">${_('Prime Minister').toLocaleUpperCase()}</div>`;
    case RANDOM_BLACKMAIL_CARD:
      return `<div class="joco-text fb-font-baskerville fb-font-12 bga-autofit">${_('Random Blackmail Card').toLocaleUpperCase()}</div>`;
    case SHIPYARD:
      return tplShipyard(value);
    case WRITER:
      return tplWriter(value);
    default:
      return ``;
  }
};

const getSetupCardSubtitle = (year: number) => {
  switch (year) {
    case 1710:
      return _('Early Company').toLocaleUpperCase();
    case 1758:
      return _('Company Under Siege').toLocaleUpperCase();
    case 1813:
      return _('Post Monopoly').toLocaleUpperCase();
    default:
      return '';
  }
}

export const tplSetupCardContent = (
  card: JocoSetupCardStatic & { id: string },
) =>
  `<div class="joco-setup-card-subtitle bga-autofit fb-font-baskerville fb-font-italic fb-font-8">${getSetupCardSubtitle(card.scenarioSetup)}</div>
  ${card.extra ? `<div class="joco-setup-card-extra bga-autofit fb-font-baskerville fb-font-italic fb-font-8">${_('Extra')}</div>` : ''}
  ${  card.items
    .map((item, index) =>
      tplSetupCardItemContainer(tplSetupCardItem(item), index),
    )
    .join('')}
    ${card.id === 'Setup1710_14' ? `<div class="joco-setup-card-unfitted bga-autofit fb-font-baskerville fb-font-italic fb-font-8">${_('(both unfitted)')}</div>` : ''}
  `

