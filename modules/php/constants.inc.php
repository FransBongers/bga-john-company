<?php
require_once 'gameoptions.inc.php';

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
const PRESIDENT_OF_Bengal = 'PresidentOfBengal';
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