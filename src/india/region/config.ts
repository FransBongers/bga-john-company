import { AbsolutePosition } from '../../boilerplate';
import {
  BENGAL,
  BOMBAY,
  DELHI,
  HYDERABAD,
  MADRAS,
  MARATHA,
  MYSORE,
  PUNJAB,
} from '../../constants';

export const TOWER_CONFIG: Record<string, { bottom: number; left: number }> = {
  [BENGAL]: { bottom: 697, left: 849 },
  [BOMBAY]: { bottom: 409, left: 245 },
  [DELHI]: { bottom: 838, left: 609 },
  [HYDERABAD]: { bottom: 396, left: 378 },
  [MADRAS]: { bottom: 82, left: 489 },
  [MARATHA]: { bottom: 697, left: 466 },
  [MYSORE]: { bottom: 207, left: 290 },
  [PUNJAB]: { bottom: 815, left: 84 },
};

export const CONTROL_TOKEN_STOCK_CONFIG: Record<string, AbsolutePosition> = {
  [BENGAL]: { top: 110, left: 829 },
  [BOMBAY]: { top: 366, left: 298 },
  [DELHI]: { top: 6, left: 507 },
  [HYDERABAD]: { top: 459, left: 493 },
  [MADRAS]: { top: 600, left: 505 },
  [MARATHA]: { top: 273, left: 513 },
  [MYSORE]: { top: 754, left: 399 },
  [PUNJAB]: { top: 50, left: 173 },
};
