/**
 * Var names
 */
const BOARD_SCALE = 'boardScale';

/**
 * Families
 */
const BENYON = 'Benyon';
const HASTINGS = 'Hastings';
const LARKINS = 'Larkins';
const PAXTON = 'Paxton';
const SYKES = 'Sykes';
const WALSH = 'Walsh';

const CROWN = 'Crown';
const CROWN_PLAYER_ID = 1;

/**
 * Colors
 */
const BLUE = 'blue';
const GRAY = 'gray';
const GREEN = 'green';
const PINK = 'pink';
const PURPLE = 'purple';
const YELLOW = 'yellow';
const RED = 'red'; // The crown

const HEX_COLOR_COLOR_MAP = {
  '99dae9': BLUE,
  dbd9d6: GRAY,
  addb90: GREEN,
  ffb1b9: PINK,
  c7b4e1: PURPLE,
  f9e08d: YELLOW,
  // 'bd1f35': RED,
};

const COLOR_FAMILY_MAP = {
  [PINK]: BENYON,
  [BLUE]: HASTINGS,
  [YELLOW]: LARKINS,
  [GRAY]: PAXTON,
  [PURPLE]: SYKES,
  [GREEN]: WALSH,
  // RED: CROWN,
};

/**
 * Phases
 */
const SETUP = 'setup'; // Only used during start of game
const LONDON_SEASON = 'londonSeason';
const FAMILY = 'family';
const FIRMS = 'firms';
const HIRING = 'hiring';

/**
 * Setup
 */
const OFFICE = 'office';
const COMPANY_SHARE = 'companyShare';
const CASH = 'cash';
const PRIME_MINISTER = 'primeMinister';
const RANDOM_BLACKMAIL_CARD = 'randomBlackmailCard';
const SHIP = 'ship';
const LUXURY = 'Luxury';
const WORKSHOP = 'Workshop';

const SHIPYARD = 'Shipyard';

/**
 * Counters
 */
const FAMILY_MEMBERS_COUNTER = 'familyMembers';
const CASH_COUNTER = 'cash';
const SHIPS_COUNTER = 'ships';
const SHARES_COUNTER = 'shares';
const WORKSHOPS_COUNTER = 'workshops';
const SHIPYARDS_COUNTER = 'shipyards';
const LUXURIES_COUNTER = 'luxuries';

const COUNTERS = [
  FAMILY_MEMBERS_COUNTER,
  CASH_COUNTER,
  SHIPS_COUNTER,
  SHARES_COUNTER,
  WORKSHOPS_COUNTER,
  SHIPYARDS_COUNTER,
  LUXURIES_COUNTER,
];

/**
 * OrderIds
 */
const ORDER_PUNJAB_1 = 'Order_Punjab_1';
const ORDER_DELHI_1 = 'Order_Delhi_1';
const ORDER_DELHI_2 = 'Order_Delhi_2';
const ORDER_DELHI_3 = 'Order_Delhi_3';
const ORDER_BENGAL_1 = 'Order_Bengal_1';
const ORDER_BENGAL_2 = 'Order_Bengal_2';
const ORDER_BOMBAY_1 = 'Order_Bombay_1';
const ORDER_BOMBAY_2 = 'Order_Bombay_2';
const ORDER_BOMBAY_3 = 'Order_Bombay_3';
const ORDER_MARATHA_1 = 'Order_Maratha_1';
const ORDER_MARATHA_2 = 'Order_Maratha_2';
const ORDER_MARATHA_3 = 'Order_Maratha_3';
const ORDER_HYDERABAD_1 = 'Order_Hyderabad_1';
const ORDER_MYSORE_1 = 'Order_Mysore_1';
const ORDER_MYSORE_2 = 'Order_Mysore_2';
const ORDER_MADRAS_1 = 'Order_Madras_1';
const ORDER_MADRAS_2 = 'Order_Madras_2';

const ORDERS = [
  ORDER_PUNJAB_1,
  ORDER_DELHI_1,
  ORDER_DELHI_2,
  ORDER_DELHI_3,
  ORDER_BENGAL_1,
  ORDER_BENGAL_2,
  ORDER_BOMBAY_1,
  ORDER_BOMBAY_2,
  ORDER_BOMBAY_3,
  ORDER_MARATHA_1,
  ORDER_MARATHA_2,
  ORDER_MARATHA_3,
  ORDER_HYDERABAD_1,
  ORDER_MYSORE_1,
  ORDER_MYSORE_2,
  ORDER_MADRAS_1,
  ORDER_MADRAS_2,
];

/**
 * Offices
 */
const CHAIRMAN = 'Chairman';
const DIRECTOR_OF_TRADE = 'DirectorOfTrade';
const MANAGER_OF_SHIPPING = 'ManagerOfShipping';
const MILITARY_AFFAIRS = 'MilitaryAffairs';
const PRESIDENT_OF_BOMBAY = 'PresidentOfBombay';
const PRESIDENT_OF_MADRAS = 'PresidentOfMadras';
const PRESIDENT_OF_BENGAL = 'PresidentOfBengal';
const GOVERNOR_GENERAL = 'GovernorGeneral';
const SUPERINTENDENT_OF_TRADE_IN_CHINE = 'SuperintendentOfTradeInChina';
const GOVERNOR_OF_BOMBAY = 'GovernorOfBombay';
const GOVERNOR_OF_MADRAS = 'GovernorOfMadras';
const GOVERNOR_OF_BENGAL = 'GovernorOfBengal';
const GOVERNOR_OF_PUNJAB = 'GovernorOfPunjab';
const GOVERNOR_OF_DELHI = 'GovernorOfDelhi';
const GOVERNOR_OF_MARATHA = 'GovernorOfMaratha';
const GOVERNOR_OF_HYDERABAD = 'GovernorOfHyderabad';
const GOVERNOR_OF_MYSORE = 'GovernorOfMysore';

/**
 * Family member positions
 */
const COMMANDER = 'Commander';
const OFFICER = 'Officer';
const OFFICER_IN_TRAINING = 'OfficerInTraining';
const WRITER = 'Writer';

const COURT_OF_DIRECTORS = 'CourtOfDirectors';

/**
 * RegionIds
 */
const BENGAL = 'Bengal';
const BOMBAY = 'Bombay';
const DELHI = 'Delhi';
const HYDERABAD = 'Hyderabad';
const MADRAS = 'Madras';
const MARATHA = 'Maratha';
const MYSORE = 'Mysore';
const PUNJAB = 'Punjab';

/**
 * Ship locations
 */
const WEST_INDIAN = 'westIndian';
const EAST_INDIAN = 'eastIndian';
const SOUTH_INDIAN = 'southIndian';
const UNFITTED = 'unfitted';

/**
 * Power tokens
 */
const POWER_TOKEN_COMPANY_SHARE = 'companyShare';
const POWER_TOKEN_MANUFACTURING = 'manufacturing';
const POWER_TOKEN_SHIPPING = 'shipping';
const POWER_TOKEN_SOCIAL = 'social';

const SHARE_VICTORY_POINTS_TOKEN = 'shareVictoryPoints';

const POWER_TOKENS = [
  POWER_TOKEN_COMPANY_SHARE,
  POWER_TOKEN_MANUFACTURING,
  POWER_TOKEN_SHIPPING,
  POWER_TOKEN_SOCIAL,
];

const POWER_TOKEN_ICON_MAP = {
  [POWER_TOKEN_COMPANY_SHARE]: 'share',
  [POWER_TOKEN_MANUFACTURING]: WORKSHOP,
  [POWER_TOKEN_SHIPPING]: SHIPYARD,
  [POWER_TOKEN_SOCIAL]: LUXURY,
}

/**
 * Family Actions
 */
const ENLIST_WRITER = 'EnlistWriter';
const ENLIST_OFFICER = 'EnlistOfficer';
const PURCHASE_LUXURY = 'PurchaseLuxury';
const PURCHASE_SHIPYARD = 'PurchaseShipyard';
const PURCHASE_WORKSHOP = 'PurchaseWorkshop';
const SEEK_SHARE = 'SeekShare';