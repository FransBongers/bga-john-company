// Array with top, left coords for each order
const ORDERS_CONFIG: Record<string, AbsolutePosition> = {
  [ORDER_PUNJAB_1]: { top: 22.5, left: 933 },
  [ORDER_DELHI_1]: { top: 15, left: 1069 },
  [ORDER_DELHI_2]: { top: 47, left: 1158.5 },
  [ORDER_DELHI_3]: { top: 62, left: 1038 },
  [ORDER_BENGAL_1]: { top: 113, left: 1276 },
  [ORDER_BENGAL_2]: { top: 171, left: 1373 },
  [ORDER_BOMBAY_1]: { top: 89.5, left: 955 },
  [ORDER_BOMBAY_2]: { top: 173, left: 996.5 },
  [ORDER_BOMBAY_3]: { top: 233, left: 941 },
  [ORDER_MARATHA_1]: { top: 109.5, left: 1171 },
  [ORDER_MARATHA_2]: { top: 176.5, left: 1072.5 },
  [ORDER_MARATHA_3]: { top: 219.5, left: 1222 },
  [ORDER_HYDERABAD_1]: { top: 300.5, left: 1133 },
  [ORDER_MYSORE_1]: { top: 344, left: 1017.5 },
  [ORDER_MYSORE_2]: { top: 400.5, left: 1055 },
  [ORDER_MADRAS_1]: { top: 398, left: 1148.5 },
  [ORDER_MADRAS_2]: { top: 447.5, left: 1118.5 },
};
const getCompanyBalanceConfig = (balance: number): AbsolutePosition => {
  const left = 24 + 34.5 * (balance % 40);
  return { top: 702, left };
};

const COMPANY_DEBT_CONFIG: AbsolutePosition[] = [
  { top: 149, left: 370 },
  { top: 149, left: 404.5 },
  { top: 149, left: 439 },
  { top: 149, left: 473.5 },
  { top: 149, left: 508 },
  { top: 149, left: 542 },
  { top: 149, left: 576 },
  { top: 149, left: 611 },
  { top: 149, left: 644.5 },
];
const getCompanyDebtConfig = (debt: number): AbsolutePosition => {
  return COMPANY_DEBT_CONFIG[debt];
};

const COMPANY_STANDING_CONFIG: Record<string, AbsolutePosition> = {
  0: { top: 63, left: 370 },
  4: { top: 63, left: 409 },
  6: { top: 63, left: 448 },
  8: { top: 63, left: 487 },
  10: { top: 63, left: 526 },
  12: { top: 63, left: 565 },
  14: { top: 63, left: 604 },
  16: { top: 63, left: 643 },
};
const getCompanyStandingConfig = (standing: 'fail' | number) =>
  COMPANY_STANDING_CONFIG[standing];

const PHASE_CONFIG: Record<string, AbsolutePosition> = {
  [SETUP]: { top: 466, left: 226 },
  [LONDON_SEASON]: { top: 400, left: 226 },
  [FAMILY]: { top: 466, left: 226 },
  [FIRMS]: { top: 534, left: 223 },
  [HIRING]: { top: 592, left: 223 },
  [CHAIRMAN]: { top: 658, left: 223 },
  [DIRECTOR_OF_TRADE]: { top: 658, left: 398 },
  [MANAGER_OF_SHIPPING]: { top: 658, left: 536 },
  [MILITARY_AFFAIRS]: { top: 658, left: 671 },
  [BOMBAY_PRESIDENCY]: { top: 658, left: 808 },
  [MADRAS_PRESIDENCY]: { top: 658, left: 998 },
  [BENGAL_PRESIDENCY]: { top: 658, left: 1188 },
  [SUPERINTENDENT_OF_TRADE_IN_CHINA]: { top: 600, left: 1385 },
  [BONUSES]: { top: 540, left: 1380 },
  [REVENUE]: { top: 464, left: 1380 },
  [EVENTS_IN_INDIA]: { top: 399, left: 1384 },
  [PARLIAMENT_MEETS]: { top: 332, left: 1375 },
  [UPKEEP_AND_REFRESH]: { top: 277, left: 1382 },
};

const TURN_CONFIG: Record<string | number, AbsolutePosition> = {
  1: { top: 138, left: 199.5 },
  2: { top: 169, left: 199.5 },
  3: { top: 201, left: 199.5 },
  4: { top: 231, left: 199.5 },
  5: { top: 263, left: 199.5 },
  6: { top: 293, left: 199.5 },
  7: { top: 324, left: 199.5 },
  8: { top: 355, left: 199.5 },
  endGameScoring: { top: 138, left: 199.5 },
};

const getGroupPosition = (
  top: number,
  left: number,
  index: number,
  rowSize: number
): AbsolutePosition => {
  const row = Math.floor(index / rowSize);
  const column = index % 4;
  return {
    top: top + 46 * row,
    left: left + 39 * column,
  };
};

const getRegimentGroupPosition = (
  top: number,
  left: number,
  index: number,
  rowSize: number
): AbsolutePosition => {
  const row = Math.floor(index / rowSize);
  const column = index % 4;
  return {
    top: top + 46 * row,
    left: left + 10 * column,
  };
};

const getOfficerPosition = (army: string, index: number): AbsolutePosition => {
  console.log('getOfficerPosition', army, index);
  switch (army) {
    case BOMBAY_ARMY:
      return getGroupPosition(22, 760, index, 3);
    case BENGAL_ARMY:
      return getGroupPosition(408, 760, index, 3);
    case MADRAS_ARMY:
      return getGroupPosition(215, 760, index, 3);
    default:
      return { top: 0, left: 0 };
  }
};

const getRegimentPosition = (
  location: string,
  index: number,
  exhausted: boolean
): AbsolutePosition => {
  switch (location) {
    case BOMBAY_ARMY:
      return getRegimentGroupPosition(22, 694, index, 4);
    case BENGAL_ARMY:
      return getRegimentGroupPosition(408, 694, index, 4);
    case MADRAS_ARMY:
      return getRegimentGroupPosition(215, 694, index, 4);
    default:
      return { top: 0, left: 0 };
  }
};

const getCourtOfDirectorsPosition = (index: number) =>
  getGroupPosition(555, 243, index, 4);

const getOfficersInTrainingPosition = (index: number) =>
  getGroupPosition(602, 692, index, 3);

const getWriterPosition = (
  location: string,
  index: number
): AbsolutePosition => {
  switch (location) {
    case BOMBAY_WRITERS:
      return getGroupPosition(602, 894, index, 3);
    case BENGAL_WRITERS:
      return getGroupPosition(602, 1273, index, 3);
    case MADRAS_WRITERS:
      return getGroupPosition(602, 1084, index, 3);
    default:
      return { top: 0, left: 0 };
  }
};

const getStockExchangePosition = (position: string): AbsolutePosition => {
  switch (position) {
    case STOCK_EXCHANGE_2:
      return { top: 458, left: 249 };
    case STOCK_EXCHANGE_3_LEFT:
      return { top: 414, left: 275 };
    case STOCK_EXCHANGE_3_RIGHT:
      return { top: 458, left: 301 };
    case STOCK_EXCHANGE_4:
      return { top: 414, left: 327 };
    case STOCK_EXCHANGE_5:
      return { top: 458, left: 353 };
    default:
      return { top: 0, left: 0 };
  }
};

const WEST_INDIAN_POSITIONS: AbsolutePosition[] = [
  {
    top: 445,
    left: 870,
  },
  {
    top: 293,
    left: 880,
  },
];

const SOUTH_INDIAN_POSITIONS: AbsolutePosition[] = [
  {
    top: 391,
    left: 1233,
  },
  {
    top: 491,
    left: 1203,
  },
];

const EAST_INDIAN_POSITIONS: AbsolutePosition[] = [
  {
    top: 332,
    left: 1273,
  },
  {
    top: 365,
    left: 1313,
  },
];

const getShipPosition = (sea: string, index: number): AbsolutePosition => {
  const numberOfPositions = 2;
  // Item in array, depends on array length of positions
  const positionIndex = index % numberOfPositions;

  // Extra offset in case there are more ships than positions
  const offset = Math.floor(index / numberOfPositions);

  let position = { top: 0, left: 0 };
  switch (sea) {
    case WEST_INDIAN:
      position = WEST_INDIAN_POSITIONS[positionIndex];
      break;
    case SOUTH_INDIAN:
      position = SOUTH_INDIAN_POSITIONS[positionIndex];
      break;
    case EAST_INDIAN:
      position = EAST_INDIAN_POSITIONS[positionIndex];
      break;
  }

  position.top = position.top - 20 * offset;
  position.left = position.left + 20 * offset;
  return position;
};

const FAMILY_MEMBER_OFFICE_CONFIG: Record<string, AbsolutePosition> = {
  [CHAIRMAN]: { top: 662, left: 246 },
  [DIRECTOR_OF_TRADE]: { top: 662, left: 420 },
  [MANAGER_OF_SHIPPING]: { top: 662, left: 558 },
  [MILITARY_AFFAIRS]: { top: 662, left: 694 },
  [PRESIDENT_OF_BOMBAY]: { top: 662, left: 831 },
  [PRESIDENT_OF_MADRAS]: { top: 662, left: 1021 },
  [PRESIDENT_OF_BENGAL]: { top: 662, left: 1210 },
  [GOVERNOR_GENERAL]: { top: 662, left: 420 },
  [SUPERINTENDENT_OF_TRADE_IN_CHINA]: { top: 662, left: 1400 },
  [GOVERNOR_OF_BOMBAY]: { top: 289, left: 964 },
  [GOVERNOR_OF_MADRAS]: { top: 500, left: 1119 },
  [GOVERNOR_OF_BENGAL]: { top: 107, left: 1349 },
  [GOVERNOR_OF_PUNJAB]: { top: 31, left: 861 },
  [GOVERNOR_OF_DELHI]: { top: 16, left: 1196 },
  [GOVERNOR_OF_MARATHA]: { top: 105, left: 1105 },
  [GOVERNOR_OF_HYDERABAD]: { top: 298, left: 1049 },
  [GOVERNOR_OF_MYSORE]: { top: 420, left: 993 },
  Commander_Bengal: { top: 471, left: 695 },
  Commander_Bombay: { top: 278, left: 695 },
  Commander_Madras: { top: 84, left: 695 },
};

const towerConfig: Record<string, { bottom: number; left: number }> = {
  [BENGAL]: { bottom: -149, left: 1339 },
  [BOMBAY]: { bottom: -332, left: 954 },
  [DELHI]: { bottom: -60, left: 1186 },
  [HYDERABAD]: { bottom: -341, left: 1038 },
  [MADRAS]: { bottom: -542, left: 1109 },
  [MARATHA]: { bottom: -149, left: 1095 },
  [MYSORE]: { bottom: -462, left: 983 },
  [PUNJAB]: { bottom: -74, left: 851 },
};

const TREASURY_POSITIONS: Record<string, AbsolutePosition> = {
  [DIRECTOR_OF_TRADE]: { top: 618, left: 416 },
  [MANAGER_OF_SHIPPING]: { top: 618, left: 555 },
  [PRESIDENT_OF_BOMBAY]: { top: 618, left: 806 },
  [PRESIDENT_OF_MADRAS]: { top: 618, left: 996 },
  [PRESIDENT_OF_BENGAL]: { top: 618, left: 1185 },
};

const POWER_TOKEN_POSITIONS: AbsolutePosition[] = [
  { top: 72, left: 276 },
  { top: 115, left: 276 },
  { top: 159, left: 251 },
  { top: 159, left: 301 },
];

const ARMY_SELECT_POSITIONS: Record<string, AbsolutePosition> = {
  [BOMBAY_ARMY]: { top: 21, left: 692 },
  [MADRAS_ARMY]: { top: 214, left: 692 },
  [BENGAL_ARMY]: { top: 407, left: 692 },
};

const COMPANY_DEBT_SELECT_POSITIONS: AbsolutePosition[] = [
  { top: 157, left: 365.5 },
  { top: 157, left: 400 },
  { top: 157, left: 434 },
  { top: 157, left: 468.5 },
  { top: 157, left: 503 },
  { top: 157, left: 537 },
  { top: 157, left: 571.5 },
  { top: 157, left: 606 },
  { top: 157, left: 640 },
];

const SEA_ZONE_SELECT_POSITIONS: Record<string, AbsolutePosition> = {
  [WEST_INDIAN]: { top: 377, left: 885 },
  [SOUTH_INDIAN]: { top: 432, left: 1219 },
  [EAST_INDIAN]: { top: 301, left: 1317 },
};
