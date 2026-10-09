import { AbsolutePosition, setAbsolutePosition } from '../../boilerplate';
import {
  BONUS,
  LUXURY,
  SHARE,
  POWER,
  TAX,
  WORKSHOP,
  SHIPYARD,
} from '../../constants';

export interface PrimeMinisterDialItem {
  position: AbsolutePosition;
  rotation: number;
  consequence: string;
  target: string;
  startScenario?: number;
  windowTax?: boolean;
}

export const PRIME_MINISTER_DIAL: Array<PrimeMinisterDialItem> = [
  {
    position: {
      left: 6,
      top: 195,
    },
    rotation: -78,
    consequence: POWER,
    target: WORKSHOP,
    startScenario: 1710,
  },
  {
    position: {
      left: 45,
      top: 110,
    },
    rotation: -54,
    consequence: TAX,
    target: SHARE,
  },
  {
    position: {
      left: 119,
      top: 49,
    },
    rotation: -26,
    consequence: POWER,
    target: SHIPYARD,
  },
  {
    position: {
      left: 210,
      top: 29,
    },
    rotation: 0,
    consequence: TAX,
    target: LUXURY,
    windowTax: true,
  },
  {
    position: {
      left: 300,
      top: 49,
    },
    rotation: 26,
    consequence: POWER,
    target: SHARE,
  },
  {
    position: {
      left: 373,
      top: 107,
    },
    rotation: 51,
    consequence: BONUS,
    target: WORKSHOP,
  },
  {
    position: {
      left: 413,
      top: 191,
    },
    rotation: 77,
    consequence: POWER,
    target: SHIPYARD,
    startScenario: 1758,
  },
  {
    position: {
      left: 414,
      top: 283,
    },
    rotation: 103,
    consequence: POWER,
    target: LUXURY,
  },
  {
    position: {
      left: 371,
      top: 363,
    },
    rotation: 130,
    consequence: TAX,
    target: SHIPYARD,
    windowTax: true,
  },
  {
    position: {
      left: 302,
      top: 425,
    },
    rotation: 154,
    consequence: BONUS,
    target: SHARE,
  },
  {
    position: {
      left: 212,
      top: 446,
    },
    rotation: 179,
    consequence: TAX,
    target: WORKSHOP,
    startScenario: 1813,
  },
  {
    position: {
      left: 121,
      top: 426,
    },
    rotation: 205,
    consequence: BONUS,
    target: WORKSHOP,
  },
  {
    position: {
      left: 49,
      top: 362,
    },
    rotation: 231,
    consequence: TAX,
    target: LUXURY,
    windowTax: true,
  },
  {
    position: {
      left: 7,
      top: 286,
    },
    rotation: 256,
    consequence: TAX,
    target: SHIPYARD,
  },
];
