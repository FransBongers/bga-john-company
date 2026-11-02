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
  [BENGAL]: { bottom: 708, left: 839 },
  [BOMBAY]: { bottom: 417, left: 228 },
  [DELHI]: { bottom: 850, left: 596 },
  [HYDERABAD]: { bottom: 402, left: 362 },
  [MADRAS]: { bottom: 83, left: 474 },
  [MARATHA]: { bottom: 709, left: 452 },
  [MYSORE]: { bottom: 211, left: 274 },
  [PUNJAB]: { bottom: 827, left: 64 },
};

export const CONTROL_TOKEN_STOCK_CONFIG: Record<string, AbsolutePosition> = {
  [BENGAL]: { top: 110, left: 793 },
  [BOMBAY]: { top: 366, left: 287 },
  [DELHI]: { top: 6, left: 482 },
  [HYDERABAD]: { top: 467, left: 478 },
  [MADRAS]: { top: 600, left: 505 },
  [MARATHA]: { top: 273, left: 490 },
  [MYSORE]: { top: 754, left: 389 },
  [PUNJAB]: { top: 69, left: 154 },
};
