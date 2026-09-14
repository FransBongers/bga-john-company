import {
  STOCK_EXCHANGE_2,
  STOCK_EXCHANGE_3_LEFT,
  STOCK_EXCHANGE_3_RIGHT,
  STOCK_EXCHANGE_4,
  STOCK_EXCHANGE_5,
} from '../constants';
import { tplFamilyMemberSpot } from '../templates';

export const STOCK_EXCHANGE_CONFIG: Array<{ id: string; value: number }> = [
  { id: STOCK_EXCHANGE_2, value: 2 },
  { id: STOCK_EXCHANGE_3_LEFT, value: 3 },
  { id: STOCK_EXCHANGE_3_RIGHT, value: 3 },
  { id: STOCK_EXCHANGE_4, value: 4 },
  { id: STOCK_EXCHANGE_5, value: 5 },
];

export const tplCourtOfDirectors = () => `
  <div class="joco-court-of-directors-container joco-container">
    <div id="joco-stock-exchange">
      <div class="joco-header"><span>${'Stock Exchange'}</span></div>
      <div class="stock-exchange-track">
        ${STOCK_EXCHANGE_CONFIG.map((item) => `${tplFamilyMemberSpot(item.id, `<span>£${item.value}</span>`)}`).join('')}
      </div>
    </div>
    <div id="joco-court-of-directors">
      <div class="joco-header"><span>${'Court of Directors'}</span></div>
      <div id="CourtOfDirectors" class="joco-court-of-directors-family-members"></div>
    </div>
  </div>
`;
