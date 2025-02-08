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
