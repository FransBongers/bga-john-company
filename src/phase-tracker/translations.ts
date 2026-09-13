import {
  LONDON_SEASON,
  FAMILY,
  HIRING,
  CHAIRMAN,
  DIRECTOR_OF_TRADE,
  MANAGER_OF_SHIPPING,
  MILITARY_AFFAIRS,
  BOMBAY_PRESIDENCY,
  MADRAS_PRESIDENCY,
  BENGAL_PRESIDENCY,
  SUPERINTENDENT_OF_TRADE_IN_CHINA,
  BONUSES,
  REVENUE,
  EVENTS_IN_INDIA,
  PARLIAMENT_MEETS,
  UPKEEP_AND_REFRESH,
} from '../constants';

export const getPhaseName = (phase: string) => {
  switch (phase) {
    case LONDON_SEASON:
      return _('London Season');
    case FAMILY:
      return _('Family');
    case HIRING:
      return _('Hiring');
    case CHAIRMAN:
      return _('Chairman');
    case DIRECTOR_OF_TRADE:
      return _('Director of Trade');
    case MANAGER_OF_SHIPPING:
      return _('Manager of Shipping');
    case MILITARY_AFFAIRS:
      return _('Military Affairs');
    case BOMBAY_PRESIDENCY:
      return _('Bombay Presidency');
    case MADRAS_PRESIDENCY:
      return _('Madras Presidency');
    case BENGAL_PRESIDENCY:
      return _('Bengal Presidency');
    case SUPERINTENDENT_OF_TRADE_IN_CHINA:
      return _('Superintendent of Trade in China');
    case BONUSES:
      return _('Bonuses');
    case REVENUE:
      return _('Revenue');
    case EVENTS_IN_INDIA:
      return _('Events in India');
    case PARLIAMENT_MEETS:
      return _('Parliament Meets');
    case UPKEEP_AND_REFRESH:
      return _('Upkeep & Refresh');
    default:
      return phase;
  }
};
