import {
  CHAIRMAN,
  STOCK_EXCHANGE_2,
  STOCK_EXCHANGE_3_LEFT,
  STOCK_EXCHANGE_3_RIGHT,
  STOCK_EXCHANGE_4,
  STOCK_EXCHANGE_5,
} from '../constants';
import { getPhaseName } from '../phase-tracker/translations';
import { tplAmount, tplFamilyMemberSpot } from '../templates';

export const STOCK_EXCHANGE_CONFIG: Array<{ id: string; value: number }> = [
  { id: STOCK_EXCHANGE_2, value: 2 },
  { id: STOCK_EXCHANGE_3_LEFT, value: 3 },
  { id: STOCK_EXCHANGE_3_RIGHT, value: 3 },
  { id: STOCK_EXCHANGE_4, value: 4 },
  { id: STOCK_EXCHANGE_5, value: 5 },
];

export const tplOfficeHeader = (familyMemberLocation: string, name: string) => `
  <div class="joco-header joco-office-header">${tplFamilyMemberSpot(familyMemberLocation)}<span class="fb-font-baskerville fb-font-16">${name.toLocaleUpperCase()}</span></div>
`

export const tplOffice = (
  id: string,
  familyMemberLocation: string,
  name: string,
) => {
  return `
      <div id="${id}Office" class="joco-office joco-container">
        ${tplOfficeHeader(familyMemberLocation, name)}
        <div class="joco-treasury-container">
          <div><span class="fb-font-baskerville fb-font-12">${_('Treasury').toLocaleUpperCase()}</span></div>
          <div class="joco-treasury-counter-container">
            <span class="fb-font-baskerville fb-font-12">£</span><span id="${id}-treasury" class="fb-font-baskerville fb-font-20"></span>
          </div>
        </div>
      </div>
    `;
};

export const tplCourtOfDirectors = () => `
  <div class="joco-court-of-directors-container joco-container">
    <div id="joco-stock-exchange">
      <div class="fb-font-baskerville fb-font-12"><span>${_('Stock Exchange').toLocaleUpperCase()}</span></div>
      <div class="stock-exchange-track">
        ${STOCK_EXCHANGE_CONFIG.map((item) => `${tplFamilyMemberSpot(item.id, `<div class="joco-family-member-spot-background-elt"><span>£${item.value}</span></div>`)}`).join('')}
      </div>
    </div>
    <div id="joco-court-of-directors">
      <div class="joco-header fb-font-baskerville fb-font-12"><span>${_('Court of Directors').toLocaleUpperCase()}</span></div>
      <div id="CourtOfDirectors" class="joco-court-of-directors-family-members"></div>
    </div>
    ${tplOfficeHeader(CHAIRMAN, getPhaseName(CHAIRMAN))}
  </div>
`;

export const tplCompanyBalance = () => `
  <div id="joco-company-balance" class="joco-container">
    <div><span class="fb-font-baskerville fb-font-16 fb-font-bold">${_('BALANCE').toLocaleUpperCase()}</span></div>
    <div class="joco-treasury-counter-container">
      <span class="fb-font-baskerville fb-font-16">£</span><span id="joco-balance" class="fb-font-baskerville fb-font-24"></span>
    </div>
  </div>
`;

export const COMPANY_DEBT_CONFIG: Array<{
  id: string;
  icon: string;
  label: number;
}> = [
  {
    id: 'company-debt-0',
    icon: 'empty',
    label: 0,
  },
  {
    id: 'company-debt-1',
    icon: 'empty',
    label: 1,
  },
  {
    id: 'company-debt-2',
    icon: 'empty',
    label: 2,
  },
  {
    id: 'company-debt-3',
    icon: 'empty',
    label: 3,
  },
  {
    id: 'company-debt-4',
    icon: 'striped',
    label: 4,
  },
  {
    id: 'company-debt-5',
    icon: 'striped',
    label: 5,
  },
  {
    id: 'company-debt-6',
    icon: 'striped',
    label: 6,
  },
  {
    id: 'company-debt-7',
    icon: 'striped',
    label: 7,
  },
  {
    id: 'company-debt-8',
    icon: 'star',
    label: 8,
  },
];

export const tplCompanySpotIcon = (icon: string) => {
  switch (icon) {
    case 'failed':
      return tplCompanySpotFailed;
    case 'star':
      return tplCompanySpotStar;
    case 'striped':
      return tplCompanySpotStriped;
    case 'empty':
      return tplCompanySpotEmpty;
    default:
      return () => '';
  }
};

export const tplCompanyDebt = () => `
  <div id="joco-company-debt" class="joco-container">
    <div class="joco-header"><span class="fb-font-baskerville fb-font-16 fb-font-bold">${_('Debt').toLocaleUpperCase()}</span></div>
    <div class="joco-company-spots">
      ${COMPANY_DEBT_CONFIG.map((item) => {
        return `
          <div class="joco-column">
            ${tplCompanySpotIcon(item.icon)(item.id)}
            <span class="fb-font-baskerville fb-font-semi-bold fb-font-12">${item.label}</span>
          </div>
        `;
      }).join('')}
    </div>
  </div>
`;

export const COMPANY_STANDING_CONFIG: Array<{
  id: string;
  icon: string;
  text?: string;
  amount?: number;
}> = [
  {
    id: 'company-standing-fail',
    icon: 'failed',
    text: _('EXPECTATIONS:'),
  },
  {
    id: 'company-standing-4',
    icon: 'star',
    amount: 4,
  },
  {
    id: 'company-standing-6',
    icon: 'striped',
    amount: 6,
  },
  {
    id: 'company-standing-8',
    icon: 'striped',
    amount: 8,
  },
  {
    id: 'company-standing-10',
    icon: 'empty',
    amount: 10,
  },
  {
    id: 'company-standing-12',
    icon: 'empty',
    amount: 12,
  },
  {
    id: 'company-standing-14',
    icon: 'empty',
    amount: 14,
  },
  {
    id: 'company-standing-16',
    icon: 'empty',
    amount: 16,
  },
];

export const tplCompanyStanding = () => `
  <div id="joco-company-standing" class="joco-container">
    <div class="joco-header"><span class="fb-font-baskerville fb-font-16 fb-font-bold">${_('Standing').toLocaleUpperCase()}</span></div>
    <div class="joco-company-spots">
      ${COMPANY_STANDING_CONFIG.map((item) => {
        return `
        <div class="joco-column">
          ${tplCompanySpotIcon(item.icon)(item.id)}
          ${item.amount ? tplAmount(item.amount, true) : `<span class="fb-font-baskerville fb-font-semi-bold fb-font-8" style="margin-top: 4px;">${item.text ?? ''}</span>`}
        </div>`;
      }).join('')}
    </div>
  </div>
`;

export const tplCompanySpotEmpty = (id: string) => `
  <div id="${id}" class="joco-company-spot" data-style="empty">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49.05 49.05">
      <g>
        <path d="M24.52,46.2c11.96,0,21.67-9.71,21.67-21.67S36.48,2.86,24.52,2.86,2.85,12.57,2.85,24.52s9.71,21.67,21.67,21.67Z"/>
        <path d="M24.52,48.62c13.3,0,24.1-10.8,24.1-24.1S37.83.43,24.52.43.43,11.22.43,24.52s10.8,24.1,24.1,24.1Z"/>
      </g>
    </svg>
  </div>
`;

export const tplCompanySpotStar = (id: string) => `
  <div id="${id}" class="joco-company-spot" data-style="star">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 49.06 52.63">
      <defs>
        <clipPath id="clippath">
          <path class="cls-1" d="M2.86,26.2c0,11.96,9.7,21.67,21.66,21.67s21.67-9.71,21.67-21.67S36.48,4.54,24.52,4.54,2.86,14.25,2.86,26.2"/>
        </clipPath>
      </defs>
      <g>
        <path class="cls-2" d="M24.52,50.31c13.31,0,24.11-10.8,24.11-24.1S37.84,2.1,24.52,2.1.43,12.9.43,26.2s10.8,24.1,24.1,24.1Z"/>
        <g class="cls-4">
          <path class="cls-3" d="M24.89,16.73V0h-.85v16.87l.46-1.01.39.86ZM32.77,23.49V0h-.85v23.39l.85.1ZM17.01,23.4V0h-.85v23.49l.85-.1ZM8.28,52.63h.85V0h-.85v52.63ZM24.89,33.01l-.39-.22-.46.26v19.58h.85v-19.62ZM47.69,52.63h.85V0h-.85v52.63ZM16.16,26.13v26.49h.85v-25.72l-.85-.78ZM.39,52.63h.85V0H.39v52.63ZM32.77,26.19l-.85.78v25.66h.85v-26.44ZM39.81,52.63h.85V0h-.85v52.63Z"/>
          <path class="cls-3" d="M24.5,17.91l2.63,5.79,6.32.72-4.69,4.29,1.27,6.23-5.53-3.13-5.53,3.13,1.27-6.23-4.69-4.29,6.31-.72,2.64-5.79ZM24.89,16.71l-.39-.85-3.21,7.05-7.7.87,5.72,5.23-1.55,7.59,6.74-3.82,6.74,3.82-1.55-7.59,5.71-5.23-7.69-.87-2.82-6.2Z"/>
        </g>
        <path class="cls-2" d="M24.52,47.87c11.96,0,21.67-9.71,21.67-21.67S36.48,4.54,24.52,4.54,2.87,14.24,2.87,26.2s9.7,21.67,21.66,21.67Z"/>
      </g>
    </svg>
  </div>
`;

export const tplCompanySpotStriped = (id: string) => `
  <div id="${id}" class="joco-company-spot" data-style="striped">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 49.06 52.62">
      <defs>
        <clipPath id="clippath">
          <path class="cls-1" d="M2.86,26.37c0,11.96,9.71,21.67,21.67,21.67s21.67-9.71,21.67-21.67S36.49,4.69,24.53,4.69,2.86,14.4,2.86,26.37"/>
        </clipPath>
      </defs>
      <g>
        <g class="cls-4">
          <line class="cls-3" x1=".77" y1=".43" x2=".77" y2="52.2"/>
          <line class="cls-3" x1="8.65" y1=".43" x2="8.65" y2="52.2"/>
          <line class="cls-3" x1="16.53" y1=".43" x2="16.53" y2="52.2"/>
          <line class="cls-3" x1="24.42" y1=".43" x2="24.42" y2="52.2"/>
          <line class="cls-3" x1="40.18" y1=".43" x2="40.18" y2="52.2"/>
          <line class="cls-3" x1="32.3" y1=".43" x2="32.3" y2="52.2"/>
          <line class="cls-3" x1="48.06" y1=".43" x2="48.06" y2="52.2"/>
        </g>
        <path class="cls-2" d="M2.86,26.37c0,11.96,9.71,21.67,21.67,21.67s21.67-9.71,21.67-21.67S36.49,4.7,24.53,4.7,2.86,14.41,2.86,26.37Z"/>
        <path class="cls-2" d="M24.53,50.47c13.3,0,24.1-10.8,24.1-24.1S37.83,2.27,24.53,2.27.43,13.07.43,26.37s10.8,24.1,24.1,24.1Z"/>
      </g>
    </svg>
  </div>
`;

export const tplCompanySpotFailed = (id: string) => `
<div id="${id}" class="joco-company-spot" data-style="failed">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49.06 49.05">
    <defs>
      <style>

      </style>
    </defs>
    <g>
      <path class="cls-1" d="M24.53,48.62c13.3,0,24.1-10.8,24.1-24.1S37.83.43,24.53.43.43,11.22.43,24.52s10.8,24.1,24.1,24.1"/>
      <path class="cls-2" d="M24.53,48.62c13.3,0,24.1-10.8,24.1-24.1S37.83.43,24.53.43.43,11.22.43,24.52s10.8,24.1,24.1,24.1Z"/>
      <path class="cls-4" d="M26.3,26.5h.13l-.1.03-.03-.03ZM23.09,27.97l-.23.06.17-.06h.07ZM26.37,26.03l-.1-.04.07-.03.03.07ZM21.15,31.04l.03.2-.07-.13.03-.07ZM25.03,25.12h.07v.07h-.07v-.07ZM22.76,26.26l-.03.03v-.16l.03.03v.1ZM10.62,32.15l.03-.04v.2l-.03-.06v-.1ZM25.6,24.89l.13.1-.07.03-.07-.06v-.07ZM25.83,22.46l.03-.14h.07l-.03.14h-.07ZM26.37,21.69l.07.03v.14l-.1-.1.03-.07ZM25.1,26.76v-.1h.13l-.07.1h-.07ZM26.8,25.53l.1.1-.17.03.07-.13ZM24.73,24.15l-.03.1-.13.07v-.07l.1-.06.07-.04ZM10.55,32.38l-.03.03-.1-.26.1.03v.17l.03.03ZM25.7,23.46v.07l-.13.03v-.1l.07-.03.07.03ZM21.95,26.73l.1.23h-.17l.07-.16v-.07ZM25.8,24.72v-.13l.13.03.03.1h-.17ZM28.88,14.36v-.17l.07.1.07-.1.03.17h-.17ZM19.55,31.61l-.13-.03-.03-.1h.27l-.1.07v.06ZM27.17,25.2l-.07.13-.13.04.03-.14.1-.06.07.03ZM26.2,24.47l-.13.03-.1-.07.07-.1.17.07v.07ZM27.27,26.63l.1.1-.03.23-.1-.1.03-.16v-.07ZM24.53,26.34l.17.06-.03.17h-.17v-.17l.03-.06ZM23.22,26.81v-.24h.23l-.13.24h-.1ZM22.56,29.14h-.17l.03-.07-.1-.07.07-.13.17.07v.2ZM25.53,23.06l-.07.23-.13.04-.07-.1.2-.2.07.03ZM23.09,28.4l-.1-.17-.03.07-.03-.13-.07-.04.07-.06h.2l-.03.23v.1ZM24.93,26.5l.07-.34.2.23-.17.11h-.1ZM25.97,23.28l.07-.2h.17l.1.17h-.17l-.1.1-.07-.07ZM27.27,21.75l-.13.06-.13-.06.03-.17.17-.03.07.13v.07ZM21.75,15.63h-.27v-.2h.27v.2ZM25.6,26.36l.27.1.03-.07-.07-.23-.13.03-.07.1-.03.07ZM25.03,25.6l-.07-.13.07-.2.2.06-.07.24h-.07l-.07.03ZM25.4,23.85l.47-.16v.23l-.43-.03-.03-.04ZM25.67,22.59l.03.2.23.17v.13l-.2-.1-.03-.13-.17-.1.07-.17h.07ZM25.26,23.79l-.1.43-.13-.07-.07-.13.2-.23h.1ZM21.59,27.5l.13-.2.13-.04.07.14-.07.23-.13-.03-.07-.1h-.07ZM24.43,26.94v-.17l.1-.16.13.16.03-.03.07.07-.13.16h-.13l-.07-.03ZM22.02,30.01l-.23-.1-.1-.17.07.07.2-.14.07.04v-.14l.07.04-.03.33-.03.07ZM26.53,14.22v-.37l.27.04.03.1-.07.13-.17.1h-.07ZM19.75,31.75l-.07-.54.2.13.13.41-.17.03-.1-.03ZM24.73,23.39l.13.06.17.27-.1.07h-.27l.07.2-.23-.3.2-.24.03-.06ZM26.8,27.1h-.33l-.13-.34.37-.2.1.47v.07ZM24.09,26.63l-.3-.03-.3-.21-.03-.2.27.04.17.1.2-.04v.34ZM25.1,24.99l-.2-.13-.1.1-.07.23.1.13-.13.14-.1-.03.03-.24-.03.03v-.43l.07.07.4-.3.1.03v-.03l.2.26v.07l-.2.03-.07.07ZM40.25,14.1l-.54-.07-.5.03v-.1l-1.04.07-1.1.1-1.07.1-1.04-.1-.53.03v-.13l-.23.07-1.1-.17-4.15-.4-1.07.03-.2-.1-1.14.14-1.04.06-.54.1-.47-.06-.17.13-1.04.2-.47.1-.1.1-1.04.34-.97.36-.97.4-.4.14-.1.2-1.67,1.2-.9.91-.2.03-.07.23-.1.1h-.1l-.33.41-.53.93-.27.3v.24l-.27.13-.03.34-.1.06-.17.47-.07.6-.1.04.07.43-.07.17.13.63.27.37.07.24h.1l.03.2.74.5.9.16h.5l.53-.13.64-.07.8-.26.67-.17.1-.23.4-.1.03-.11.17-.1.27-.03.84-.57.67-.47h.13l.07-.13.64-.5.07-.2.23-.07.07-.27.6-.77h.13l-.03-.23.33-.4.27-.9.23-.24.1-1,.1-.5v-.5l-.1-.64-.2.03-.17.17-.2.44-.07.3.03.2-.1.03.03.23-.37.44v.13l-.13.27-.2.17-.13.5-.4.67-.4.33-.1.27-.24.1-.07.23-.4.41-.33.53-.23.03-.07.24-.23.07-.07.23-.23.07-.03.16-.43.24-.8.6-.1.03-.13.17-.94.4-1.24.34-.5.03-.37-.13-.23.03-.23-.13-.54-.71-.1-.77.03-.13.07-.03.03-.54.13-.43.6-.91.1-.23.3-.17-.03-.23.07-.1.47-.27v-.17l.3-.1.3-.4.9-.7.77-.54.07-.1.4-.06.2-.27.5-.23.37-.31.4-.03.17-.23.23-.1h.27l.8-.4.13.1.1-.14,1.04-.33.44-.2,1.07-.07,1.2-.2.94-.03.3.03.03.1.37-.1.5.07.03.1.53.06.97.24.1.2h1.07l1.1.17.37-.04.1.07.23-.07,1.04.14h1.1l.37-.04.13.1.47-.2.27.07,1.14-.2,1.04-.27.84-.33.5-.17.17-.17v-.23ZM30.38,17.53l.3-.43.4-.34v-.13l.6-.5.03-.14-.07-.2-.3.07-.84.54-.13.2-.43.36v.07l-.47.23v.17l-.3.14-.13.33-.23.07v.13l-.4.4-.27.47-.23.03-.17.37-.2.04-.1.26-.74.54-.23.5-.64.87-.27.47-.13.06-.2.51-.57.53-.03.27-.47.63-.07.24-.23.03-.64.9-.1.21-.23.16-1,.34-.57.06-.1-.03-.23.1-.03.07-.13.03-.03.1-.74.27-.5.17-.3.23-.5.17-.4.23-.07.1h-.13l-.07.14-.87.66-.2.14-.03.1-.43.17.03.13-.23.03-.07.24-.37.16-.3.44-.37.37-.1.23.03.27h.5l.34-.17.13-.23.47-.24.13-.23.84-.67.87-.57.13-.13.13-.04.03-.1.53-.2.6-.13.3.07.97-.61.2.04.1.1v.43l-.57.84-.57.9-.07.27-.1-.03-.67.83-.74.77-.67.77-.8.74-.84.67-.9.6-.94.47-1,.3-.27.13-.53.1-.5-.07-.1-.06-.13.13-.23-.13h-1l-.3-.04-.13-.2-.64-.4-.4-.47-.13-.03-.07-.1.27-.37v-.27l.07-.1v-.16l-.07-.1.23-.04.17-.1.47.1.53.27.57.13.13-.03.47-.53-.13-.51-.27-.36v.03l-.13-.03.07-.1-.17-.2-1-.14-.5.03-.43.11-.1.23-.23.13-.23.94-.03.57.2.83.2.2.24.51.43.13v.17l.3-.04.33.14.17-.04.13.2.33.04.07.13,1.1-.03.1.03.37-.06.13.06h.37l.97-.23.77-.04.03-.1.3-.13.17.03.03-.13.53-.13.54-.27.13-.13.5-.17.9-.5.74-.34.2-.23.17-.07.03-.1.47-.17.1-.23.43-.27.37-.13.57-.64h-.1l.07-.06.1.03.84-.67.34-.47.2-.1.3-.43.4-.34.5-.73.23-.14.13-.3h-.17v-.2h-.17l-.03.27-.13-.03-.17-.21h-.07v-.3l.07.07.1-.03.1-.3-.07-.14.2-.03-.07.07.03.23.47.43.17-.2-.2-.16.23-.27.03-.13.13.16-.07.2.03.04.53-.64.23-.13v-.2l.17-.14-.27-.3.4-.5.13.2.13.07.23-.1.03-.07.07.2-.13.03-.43.44v.13l-.1.1h-.1l.07.17-.1.23-.17.17-.03.14.1.36h1.1l.47-.13.4-.33.54-.94.27-.27.07-.3-.1.03-.3-.26v-.07l.13-.07.37.1.2-.47.4-.33,1.04-.37.43-.27.8-.7.3-.37.1-.23-.07-.74-.7-.23-.03.13-.33.07-.6.27-.1.1-.23.03.03.14-.23.03.03.1-.23.03-.13.17h-.17l-.6.84-.23.3.1.17-.2.06v.2h-.07l-.1-.16-.47.16-.47-.16.03-.64.17-.2v-.37l.07-.1h.1l-.07-.07-.34.17-.13-.07.03-.13.3-.13.03-.2.27.06.1-.06.13-.51.2-.16.43-.97.57-.97.1-.47.67-.94.23-.26v-.27l.33-.24.07-.36.13-.1.07-.04Z"/>
      <path class="cls-3" d="M24.53,46.2c11.96,0,21.67-9.71,21.67-21.67S36.49,2.86,24.53,2.86,2.86,12.57,2.86,24.52s9.71,21.67,21.67,21.67Z"/>
    </g>
  </svg>
</div>
`;
