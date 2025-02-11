<?php
require_once 'gameoptions.inc.php';

/**
 * Company
 */
const BALANCE = 'balance';
const DEBT = 'debt';
const STANDING = 'standing';

/**
 * Phases
 */
const LONDON_SEASON = 'londonSeason';
const FAMILY = 'family';
const FIRMS = 'firms';
const HIRING = 'hiring';

/**
 * Families
 */
const BENYON = 'Benyon';
const HASTINGS = 'Hastings';
const LARKINS = 'Larkins';
const PAXTON = 'Paxton';
const SYKES = 'Sykes';
const WALSH = 'Walsh';

const FAMILIES = [
  BENYON,
  HASTINGS,
  LARKINS,
  PAXTON,
  SYKES,
  WALSH,
];

/**
 * Colors
 */
const BLUE = 'blue';
const GRAY = 'gray';
const GREEN = 'green';
const PINK = 'pink';
const PURPLE = 'purple';
const YELLOW = 'yellow';

const HEX_COLOR_COLOR_MAP = [
  '99dae9' => BLUE,
  'dbd9d6' => GRAY,
  'addb90' => GREEN,
  'ffb1b9' => PINK,
  'c7b4e1' => PURPLE,
  'f9e08d' => YELLOW,
];

const COLOR_FAMILY_MAP = [
  PINK => BENYON,
  BLUE => HASTINGS,
  YELLOW => LARKINS,
  GRAY => PAXTON,
  PURPLE => SYKES,
  GREEN => WALSH,
];

const FAMILY_COLOR_MAP = [
  BENYON => PINK,
  HASTINGS => BLUE,
  LARKINS => YELLOW,
  PAXTON => GRAY,
  SYKES => PURPLE,
  WALSH => GREEN,
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

const OFFICES = [
  CHAIRMAN,
  DIRECTOR_OF_TRADE,
  MANAGER_OF_SHIPPING,
  MILITARY_AFFAIRS,
  PRESIDENT_OF_BOMBAY,
  PRESIDENT_OF_MADRAS,
  PRESIDENT_OF_BENGAL,
  GOVERNOR_GENERAL,
  SUPERINTENDENT_OF_TRADE_IN_CHINE,
  GOVERNOR_OF_BOMBAY,
  GOVERNOR_OF_MADRAS,
  GOVERNOR_OF_BENGAL,
  GOVERNOR_OF_PUNJAB,
  GOVERNOR_OF_DELHI,
  GOVERNOR_OF_MARATHA,
  GOVERNOR_OF_HYDERABAD,
  GOVERNOR_OF_MYSORE,
];

/**
 * ScenarioIds
 */
const THE_1710_SCENARIO = 'The1710Scenario';
const THE_1758_SCENARIO = 'The1758Scenario';
const THE_1813_SCENARIO = 'The1813Scenario';
const THE_LONG_1710_SCENARIO = 'TheLong1710Scenario';

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
 * Order status
 */
const CLOSED = 'closed';
const FILLED = 'filled';
const OPEN = 'open';
