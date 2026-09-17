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
