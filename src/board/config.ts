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
  const left = 24 + 34.5 * balance;
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
  fail: { top: 63, left: 370 },
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

const getCourtOfDirectorsPosition = (index: number) =>
  getGroupPosition(555, 243, index);
const getWriterPosition = (
  presidency: string,
  index: number
): AbsolutePosition => {
  switch (presidency) {
    case BOMBAY:
      return getGroupPosition(602, 831, index);
    case BENGAL:
      return getGroupPosition(602, 1210, index);
    case MADRAS:
      return getGroupPosition(602, 1021, index);
    default:
      return { top: 0, left: 0 };
  }
};

const getGroupPosition = (
  top: number,
  left: number,
  index: number
): AbsolutePosition => {
  const row = Math.floor(index / 4);
  const column = index % 4;
  return {
    top: top + 46 * row,
    left: left + 39 * column,
  };
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
  [SUPERINTENDENT_OF_TRADE_IN_CHINE]: { top: 662, left: 1400 },
  [GOVERNOR_OF_BOMBAY]: { top: 289, left: 964 },
  [GOVERNOR_OF_MADRAS]: { top: 500, left: 1119 },
  [GOVERNOR_OF_BENGAL]: { top: 107, left: 1349 },
  [GOVERNOR_OF_PUNJAB]: { top: 31, left: 861 },
  [GOVERNOR_OF_DELHI]: { top: 16, left: 1196 },
  [GOVERNOR_OF_MARATHA]: { top: 105, left: 1105 },
  [GOVERNOR_OF_HYDERABAD]: { top: 298, left: 1049 },
  [GOVERNOR_OF_MYSORE]: { top: 420, left: 993 },
  commander_Bengal: { top: 471, left: 695 },
  commander_Bombay: { top: 278, left: 695 },
  commander_Madras: { top: 84, left: 695 },
};
