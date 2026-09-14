/**
 * Var names
 */
export const BOARD_SCALE = 'boardScale';

export const PLUS = 'plus';
export const MINUS = 'minus';

export const DONE = 'done';
export const TRADE = 'trade';

/**
 * Families
 */
export const BENYON = 'Benyon';
export const HASTINGS = 'Hastings';
export const LARKINS = 'Larkins';
export const PAXTON = 'Paxton';
export const SYKES = 'Sykes';
export const WALSH = 'Walsh';

export const CROWN = 'Crown';
export const CROWN_PLAYER_ID = 1;

export const BLACKMAIL = 'Blackmail';
export const PRESTIGE = 'Prestige';
export const ENTERPRISE = 'Enterprise';
export const SPOUSE = 'Spouse';

/**
 * Colors
 */
export const BLUE = 'blue';
export const GRAY = 'gray';
export const GREEN = 'green';
export const PINK = 'pink';
export const PURPLE = 'purple';
export const YELLOW = 'yellow';
export const RED = 'red'; // The crown

export const HEX_COLOR_COLOR_MAP = {
  '99dae9': BLUE,
  dbd9d6: GRAY,
  addb90: GREEN,
  ffb1b9: PINK,
  c7b4e1: PURPLE,
  f9e08d: YELLOW,
  // 'bd1f35': RED,
};

export const COLOR_FAMILY_MAP = {
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
export const SETUP = 'setup'; // Only used during start of game
export const LONDON_SEASON = 'londonSeason';
export const FAMILY = 'family';
export const FIRMS = 'firms';
export const HIRING = 'hiring';
export const BONUSES = 'Bonuses';
export const REVENUE = 'revenue';
export const EVENTS_IN_INDIA = 'eventsInIndia';
export const PARLIAMENT_MEETS = 'ParliamentMeets';
export const UPKEEP_AND_REFRESH = 'upkeepAndRefresh';

/**
 * Setup
 */
export const OFFICE = 'office';
export const COMPANY_SHARE = 'companyShare';
export const CASH = 'cash';
export const PRIME_MINISTER = 'primeMinister';
export const RANDOM_BLACKMAIL_CARD = 'randomBlackmailCard';
export const SHIP = 'ship';
export const LUXURY = 'Luxury';
export const WORKSHOP = 'Workshop';
export const WINDOW = 'Window';

export const CIRCLE = 'Circle';
export const POWER = 'Power';
export const BONUS = 'Bonus';
export const TAX = 'Tax';
export const VICTORY_POINTS = 'VictoryPoints';
export const DISCOUNT = 'Discount';

export const SHIPYARD = 'Shipyard';
export const SHARE = 'Share';

/**
 * Counters
 */
export const FAMILY_MEMBERS_COUNTER = 'familyMembers';
export const CASH_COUNTER = 'cash';
export const SHIPS_COUNTER = 'ships';
export const SHARES_COUNTER = 'shares';
export const WORKSHOPS_COUNTER = 'workshops';
export const SHIPYARDS_COUNTER = 'shipyards';
export const LUXURIES_COUNTER = 'luxuries';
export const PROMISE_CUBES_COUNTER = 'promiseCubes';

export const COUNTERS = [
  FAMILY_MEMBERS_COUNTER,
  CASH_COUNTER,
  SHIPS_COUNTER,
  SHARES_COUNTER,
  WORKSHOPS_COUNTER,
  SHIPYARDS_COUNTER,
  LUXURIES_COUNTER,
];

/**
 * Order status
 */
export const CLOSED = 'closed';
export const FILLED = 'filled';
export const OPEN = 'open';

/**
 * OrderIds
 */
export const ORDER_PUNJAB_1 = 'Order_Punjab_1';
export const ORDER_DELHI_1 = 'Order_Delhi_1';
export const ORDER_DELHI_2 = 'Order_Delhi_2';
export const ORDER_DELHI_3 = 'Order_Delhi_3';
export const ORDER_BENGAL_1 = 'Order_Bengal_1';
export const ORDER_BENGAL_2 = 'Order_Bengal_2';
export const ORDER_BOMBAY_1 = 'Order_Bombay_1';
export const ORDER_BOMBAY_2 = 'Order_Bombay_2';
export const ORDER_BOMBAY_3 = 'Order_Bombay_3';
export const ORDER_MARATHA_1 = 'Order_Maratha_1';
export const ORDER_MARATHA_2 = 'Order_Maratha_2';
export const ORDER_MARATHA_3 = 'Order_Maratha_3';
export const ORDER_HYDERABAD_1 = 'Order_Hyderabad_1';
export const ORDER_MYSORE_1 = 'Order_Mysore_1';
export const ORDER_MYSORE_2 = 'Order_Mysore_2';
export const ORDER_MADRAS_1 = 'Order_Madras_1';
export const ORDER_MADRAS_2 = 'Order_Madras_2';

export const ORDERS = [
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
export const CHAIRMAN = 'Chairman';
export const DIRECTOR_OF_TRADE = 'DirectorOfTrade';
export const MANAGER_OF_SHIPPING = 'ManagerOfShipping';
export const MILITARY_AFFAIRS = 'MilitaryAffairs';
export const PRESIDENT_OF_BOMBAY = 'PresidentOfBombay';
export const PRESIDENT_OF_MADRAS = 'PresidentOfMadras';
export const PRESIDENT_OF_BENGAL = 'PresidentOfBengal';
export const GOVERNOR_GENERAL = 'GovernorGeneral';
export const SUPERINTENDENT_OF_TRADE_IN_CHINA = 'SuperintendentOfTradeInChina';
export const GOVERNOR_OF_BOMBAY = 'GovernorOfBombay';
export const GOVERNOR_OF_MADRAS = 'GovernorOfMadras';
export const GOVERNOR_OF_BENGAL = 'GovernorOfBengal';
export const GOVERNOR_OF_PUNJAB = 'GovernorOfPunjab';
export const GOVERNOR_OF_DELHI = 'GovernorOfDelhi';
export const GOVERNOR_OF_MARATHA = 'GovernorOfMaratha';
export const GOVERNOR_OF_HYDERABAD = 'GovernorOfHyderabad';
export const GOVERNOR_OF_MYSORE = 'GovernorOfMysore';

export const OFFICES_WITH_TREASURY = [
  DIRECTOR_OF_TRADE,
  // GOVERNOR_GENERAL,
  MANAGER_OF_SHIPPING,
  PRESIDENT_OF_BOMBAY,
  PRESIDENT_OF_MADRAS,
  PRESIDENT_OF_BENGAL,
];

/**
 * Family member positions
 */
export const COMMANDER = 'Commander';
export const OFFICER = 'Officer';
export const OFFICER_IN_TRAINING = 'OfficerInTraining';
export const WRITER = 'Writer';

export const COURT_OF_DIRECTORS = 'CourtOfDirectors';

/**
 * Borders
 */
export const BENGAL_DELHI_BORDER = 'Bengal_Delhi_border';
export const BENGAL_MARATHA_BORDER = 'Bengal_Maratha_border';
export const BOMBAY_DELHI_BORDER = 'Bombay_Delhi_border';
export const BOMBAY_HYDERABAD_BORDER = 'Bombay_Hyderabad_border';
export const BOMBAY_MARATHA_BORDER = 'Bombay_Maratha_border';
export const BOMBAY_MYSORE_BORDER = 'Bombay_Mysore_border';
export const BOMBAY_PUNJAB_BORDER = 'Bombay_Punjab_border';
export const DELHI_MARATHA_BORDER = 'Delhi_Maratha_border';
export const DELHI_PUNJAB_BORDER = 'Delhi_Punjab_border';
export const HYDERABAD_MADRAS_BORDER = 'Hyderabad_Madras_border';
export const HYDERABAD_MARATHA_BORDER = 'Hyderabad_Maratha_border';
export const HYDERABAD_MYSORE_BORDER = 'Hyderabad_Mysore_border';
export const MADRAS_MYSORE_BORDER = 'Madras_Mysore_border';

/**
 * RegionIds
 */
export const BENGAL = 'Bengal';
export const BOMBAY = 'Bombay';
export const DELHI = 'Delhi';
export const HYDERABAD = 'Hyderabad';
export const MADRAS = 'Madras';
export const MARATHA = 'Maratha';
export const MYSORE = 'Mysore';
export const PUNJAB = 'Punjab';

/**
 * Presidencies
 */
export const BENGAL_PRESIDENCY = 'BengalPresidency';
export const BOMBAY_PRESIDENCY = 'BombayPresidency';
export const MADRAS_PRESIDENCY = 'MadrasPresidency';

export const PRESIDENCIES = [
  BENGAL_PRESIDENCY,
  BOMBAY_PRESIDENCY,
  MADRAS_PRESIDENCY,
];

export const BENGAL_WRITERS = 'Writers_Bengal';
export const BOMBAY_WRITERS = 'Writers_Bombay';
export const MADRAS_WRITERS = 'Writers_Madras';

export const WRITER_LOCATIONS = [
  BENGAL_WRITERS,
  BOMBAY_WRITERS,
  MADRAS_WRITERS,
];

export const BENGAL_ARMY = 'Army_Bengal';
export const BOMBAY_ARMY = 'Army_Bombay';
export const MADRAS_ARMY = 'Army_Madras';

export const ARMIES = [BENGAL_ARMY, BOMBAY_ARMY, MADRAS_ARMY];

export const ARMY_REGION_MAP = {
  [BENGAL_ARMY]: BENGAL,
  [BOMBAY_ARMY]: BOMBAY,
  [MADRAS_ARMY]: MADRAS,
};

/**
 * Ship locations
 */
export const WEST_INDIAN = 'westIndian';
export const EAST_INDIAN = 'eastIndian';
export const SOUTH_INDIAN = 'southIndian';
export const CHINA = 'china';
export const UNFITTED = 'unfitted';

export const SEA_ZONES = [WEST_INDIAN, EAST_INDIAN, SOUTH_INDIAN];

/**
 * Ship types
 */
export const COMPANY_SHIP = 'CompanyShip';
export const EXTRA_SHIP = 'ExtraShip';

/**
 * Power tokens
 */
export const POWER_TOKEN_COMPANY_SHARE = 'companyShare';
export const POWER_TOKEN_MANUFACTURING = 'manufacturing';
export const POWER_TOKEN_SHIPPING = 'shipping';
export const POWER_TOKEN_SOCIAL = 'social';

export const SHARE_VICTORY_POINTS_TOKEN = 'shareVictoryPoints';

export const POWER_TOKENS = [
  POWER_TOKEN_COMPANY_SHARE,
  POWER_TOKEN_MANUFACTURING,
  POWER_TOKEN_SHIPPING,
  POWER_TOKEN_SOCIAL,
];

export const POWER_TOKEN_ICON_MAP = {
  [POWER_TOKEN_COMPANY_SHARE]: SHARE,
  [POWER_TOKEN_MANUFACTURING]: WORKSHOP,
  [POWER_TOKEN_SHIPPING]: SHIPYARD,
  [POWER_TOKEN_SOCIAL]: LUXURY,
};

/**
 * Family Actions
 */
export const ENLIST_WRITER = 'EnlistWriter';
export const ENLIST_OFFICER = 'EnlistOfficer';
export const PURCHASE_LUXURY = 'PurchaseLuxury';
export const PURCHASE_SHIPYARD = 'PurchaseShipyard';
export const PURCHASE_WORKSHOP = 'PurchaseWorkshop';
export const SEEK_SHARE = 'SeekShare';
export const PURCHASE_ENTERPRISE = 'PurchaseEnterprise';

/**
 * Stock Exchange locations
 */
export const STOCK_EXCHANGE_2 = 'StockExchange_2';
export const STOCK_EXCHANGE_3_LEFT = 'StockExchange_3_Left';
export const STOCK_EXCHANGE_3_RIGHT = 'StockExchange_3_Right';
export const STOCK_EXCHANGE_4 = 'StockExchange_4';
export const STOCK_EXCHANGE_5 = 'StockExchange_5';

export const STOCK_EXCHANGE_POSITIONS = [
  STOCK_EXCHANGE_2,
  STOCK_EXCHANGE_3_LEFT,
  STOCK_EXCHANGE_3_RIGHT,
  STOCK_EXCHANGE_4,
  STOCK_EXCHANGE_5,
];

/**
 * Crown climates
 */
export const BULL = 'Bull';
export const STAG = 'Stag';
export const LION = 'Lion';
export const BEAR = 'Bear';
export const PEACOCK = 'Peacock';

export const CROWN_CLIMATE = [BULL, STAG, LION, BEAR, PEACOCK];

export const BUY_COMPANY_SHIP = 'BUY_COMPANY_SHIP';
export const DO_NOT_BUY_COMPANY_SHIP = 'BUY_COMPANY_SHIP';
export const BUY_AS_MANY_SHIPS_AS_YOU_WISH = 'BUY_AS_MANY_SHIPS_AS_YOU_WISH';
