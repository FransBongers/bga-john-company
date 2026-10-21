import {
  EAST_INDIAN,
  SOUTH_INDIAN,
  WEST_INDIAN,
  CHINA,
  CROWN_PLAYER_ID,
  MADRAS_PRESIDENCY,
  BENGAL,
  BOMBAY,
  DELHI,
  HYDERABAD,
  MADRAS,
  MARATHA,
  MYSORE,
  PUNJAB,
  FATIGUED,
  BENGAL_PRESIDENCY,
  BOMBAY_PRESIDENCY,
  SUPERINTENDENT_OF_TRADE_IN_CHINA,
  LARKINS,
  BENYON,
  HASTINGS,
  PAXTON,
  SYKES,
  WALSH,
  CROWN,
} from './constants';
import { tknShipValue } from './logs/templates';
import { PlayerManager } from './player-manager';
import { StaticData } from './static-data';
import {
  JocoArmyPieceBase,
  JocoControlToken,
  JocoEnterpriseCard,
  JocoEnterpriseCardBase,
  JocoEventTile,
  JocoEventTileBase,
  JocoLawCard,
  JocoLawCardBase,
  JocoLondonSeasonCard,
  JocoLondonSeasonCardBase,
  JocoOffice,
  JocoOfficeBase,
  JocoPromiseCard,
  JocoPromiseCardBase,
  JocoRegionBase,
  JocoShipBase,
} from './types';

export const getArmyNameForPresidency = (presidencyId: string) => {
  switch (presidencyId) {
    case BENGAL_PRESIDENCY:
      return _('Army of Bengal');
    case BOMBAY_PRESIDENCY:
      return _('Army of Bombay');
    case MADRAS_PRESIDENCY:
      return _('Army of Madras');
    default:
      return '';
  }
};

export const getFamilyName = (familyId: string) => {
  switch (familyId) {
    case BENYON:
      return _('Benyon');
    case HASTINGS:
      return _('Hastings');
    case LARKINS:
      return _('Larkins');
    case PAXTON:
      return _('Paxton');
    case SYKES:
      return _('Sykes');
    case WALSH:
      return _('Walsh');
    case CROWN:
      return _('Crown');
    default:
      return '';
  }
};

export const getSeaName = (seaId: string) => {
  switch (seaId) {
    case EAST_INDIAN:
      return _('East Indian');
    case SOUTH_INDIAN:
      return _('South Indian');
    case WEST_INDIAN:
      return _('West Indian');
    case SUPERINTENDENT_OF_TRADE_IN_CHINA:
      return _('China');
    default:
      return '';
  }
};

export const getRegionName = (regionId: string) => {
  switch (regionId) {
    case BENGAL:
      return _('Bengal');
    case BOMBAY:
      return _('Bombay');
    case DELHI:
      return _('Delhi');
    case HYDERABAD:
      return _('Hyderabad');
    case MADRAS:
      return _('Madras');
    case MARATHA:
      return _('Maratha');
    case MYSORE:
      return _('Mysore');
    case PUNJAB:
      return _('Punjab');
    default:
      return '';
  }
};

export const getCrownPlayerName = () =>
  PlayerManager.getInstance().getPlayer(CROWN_PLAYER_ID).getName();

export const getShipsLog = (ships: JocoShipBase[]) => {
  const shipsLog = {
    log: '',
    args: {},
  };

  ships.forEach((ship, index) => {
    const key = `tkn_ship_${index}`;
    shipsLog.log += `\${${key}}`;
    shipsLog.args[key] = tknShipValue({
      name: ship.name,
      side: ship.side,
    });
  });

  return shipsLog;
};

export const getArmyPiece = (piece: JocoArmyPieceBase) => {
  const staticData = StaticData.get();
  const cardStatic = staticData.armyPiece(piece.id);
  return {
    ...piece,
    ...cardStatic,
  };
};

export const getEnterpriseCard = (
  card: JocoEnterpriseCardBase,
): JocoEnterpriseCard => {
  const staticData = StaticData.get();
  const cardStatic = staticData.enterpriseCard(card.id);
  return {
    ...card,
    ...cardStatic,
  };
};

export const getEventTile = (tile: JocoEventTileBase): JocoEventTile => {
  const staticData = StaticData.get();
  const tileStatic = staticData.eventTile(tile.id);
  return {
    ...tile,
    ...tileStatic,
  };
};

export const getLawCard = (card: JocoLawCardBase): JocoLawCard => {
  const staticData = StaticData.get();
  const cardStatic = staticData.lawCard(card.id);
  return {
    ...card,
    ...cardStatic,
  };
};

export const getLondonSeasonCard = (
  card: JocoLondonSeasonCardBase,
): JocoLondonSeasonCard => {
  const staticData = StaticData.get();
  const cardStatic = card.hiddenId
    ? staticData.londonSeasonCard(card.hiddenId)
    : staticData.londonSeasonCard(card.id);
  return {
    ...card,
    ...cardStatic,
  };
};

export const getOffice = (office: JocoOfficeBase): JocoOffice => {
  const staticData = StaticData.get();
  const officeStatic = staticData.office(office.id);
  return {
    ...office,
    ...officeStatic,
  };
};

export const getPromiseCard = (card: JocoPromiseCardBase): JocoPromiseCard => {
  const staticData = StaticData.get();
  const cardStatic = staticData.promiseCard(card.id);
  return {
    ...card,
    ...cardStatic,
  };
};
