// Array with top, left coords for each order
const ORDERS_CONFIG: Record<string, AbsolutePosition> = {
  [ORDER_PUNJAB_1]: {top: 22.5, left: 933},
  [ORDER_DELHI_1]: {top: 15, left: 1069},
  [ORDER_DELHI_2]: {top: 47, left: 1158.5},
  [ORDER_DELHI_3]: {top: 62, left: 1038},
  [ORDER_BENGAL_1]: {top: 113, left: 1276},
  [ORDER_BENGAL_2]: {top: 171, left: 1373},
  [ORDER_BOMBAY_1]: {top: 89.5, left: 955},
  [ORDER_BOMBAY_2]: {top: 173, left: 996.5},
  [ORDER_BOMBAY_3]: {top: 233, left: 941},
  [ORDER_MARATHA_1]: {top: 109.5, left: 1171},
  [ORDER_MARATHA_2]: {top: 176.5, left: 1072.5},
  [ORDER_MARATHA_3]: {top: 219.5, left: 1222},
  [ORDER_HYDERABAD_1]: {top: 300.5, left: 1133},
  [ORDER_MYSORE_1]: {top: 344, left: 1017.5},
  [ORDER_MYSORE_2]: {top: 400.5, left: 1055},
  [ORDER_MADRAS_1]: {top: 398, left: 1148.5},
  [ORDER_MADRAS_2]: {top: 447.5, left: 1118.5},
};
const getCompanyBalanceConfig = (balance: number): AbsolutePosition => {
  const left = 24 + 34.5 * balance;
  return {top: 702, left};
}

const COMPANY_DEBT_CONFIG: AbsolutePosition[] = [
  {top: 149, left: 370},
  {top: 149, left: 404.5},
  {top: 149, left: 439},
  {top: 149, left: 473.5},
  {top: 149, left: 508},
  {top: 149, left: 542},
  {top: 149, left: 576},
  {top: 149, left: 611},
  {top: 149, left: 644.5},
]
const getCompanyDebtConfig = (debt: number): AbsolutePosition => {return  COMPANY_DEBT_CONFIG[debt]};

const COMPANY_STANDING_CONFIG: Record<string, AbsolutePosition> = {
  fail: {top: 63, left: 370},
  4: {top: 63, left: 409},
  6: {top: 63, left: 448},
  8: {top: 63, left: 487},
  10: {top: 63, left: 526},
  12: {top: 63, left: 565},
  14: {top: 63, left: 604},
  16: {top: 63, left: 643},
};
const getCompanyStandingConfig = (standing: 'fail' | number) => COMPANY_STANDING_CONFIG[standing];

const PHASE_CONFIG: Record<string, AbsolutePosition> = {
  [LONDON_SEASON]: {top: 400, left: 226},
  [FAMILY]: {top: 466, left: 226},
  [FIRMS]: {top: 534, left: 223},
  [HIRING]: {top: 592, left: 223},
}

const TURN_CONFIG: Record<string | number, AbsolutePosition> = {
  1: {top: 138, left: 199.5},
  2: {top: 169, left: 199.5},
  3: {top: 201, left: 199.5},
  4: {top: 231, left: 199.5},
  5: {top: 263, left: 199.5},
  6: {top: 293, left: 199.5},
  7: {top: 324, left: 199.5},
  8: {top: 355, left: 199.5},
  endGameScoring: {top: 138, left: 199.5},
}