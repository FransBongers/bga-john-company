import { formatStringRecursive, getPlayer } from './boilerplate';
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
  LAW_CARD,
  PROMISE_CARD,
  BLACKMAIL_CARD,
  AFTER_OFFICE_FINISHED_ACTING,
  BEFORE_OFFICE_ACTS,
  END_OF_PHASE,
  START_OF_PHASE,
  BEFORE_ANY_VOTES_ARE_CAST,
  SHIPYARD,
  WORKSHOP,
  LUXURY,
  WHEN_RETIRING,
  START_OF_LONDON_SEASON_CHOOSE_CARD,
  AFTER_COMMANDER_DEPLOY_CHECK,
  BLACKMAIL,
  CHAIRMAN,
  PRIME_MINISTER,
  LEADER_OF_THE_OPPOSITION,
  OPPOSITION,
} from './constants';
import { tknShipValue } from './logs/templates';
import { getPhaseName } from './phase-tracker/translations';
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
  JocoSetupCard,
  JocoSetupCardBase,
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

export const getCardTypeText = (cardType: string) => {
  switch (cardType) {
    case LAW_CARD:
      return _('Law');
    case BLACKMAIL_CARD:
      return _('Blackmail card');
    case PROMISE_CARD:
      return _('Promise Card');
    default:
      return '';
  }
};

export const getFamilyNameForPlayerId = (playerId: number) => {
  const familyId = PlayerManager.getInstance()
    .getPlayer(playerId)
    .getFamilyId();
  return getFamilyName(familyId);
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

export const getSetupCard = (card: JocoSetupCardBase): JocoSetupCard => {
  const staticData = StaticData.get();
  const cardStatic = staticData.setupCard(card.id);
  return {
    ...card,
    ...cardStatic,
  };
};

export const getTimingWindowText = (
  kind: string,
  itemId: string | number | null,
) => {
  switch (kind) {
    case AFTER_OFFICE_FINISHED_ACTING:
      return formatStringRecursive(_('After ${officeTitle} finished acting'), {
        officeTitle: StaticData.get().office(itemId as string).title,
      });
    case BEFORE_OFFICE_ACTS:
      return formatStringRecursive(_('Before ${officeTitle} acts'), {
        officeTitle: StaticData.get().office(itemId as string).title,
      });
    case END_OF_PHASE:
      return formatStringRecursive(_('End of ${phaseName}'), {
        phaseName: getPhaseName(itemId as string),
      });
    case START_OF_PHASE:
      return formatStringRecursive(_('Start of ${phaseName}'), {
        phaseName: getPhaseName(itemId as string),
      });
    case BEFORE_ANY_VOTES_ARE_CAST:
      return _('Before any votes are cast');
    case WHEN_RETIRING:
      return _('When retiring');
    case START_OF_LONDON_SEASON_CHOOSE_CARD:
      return formatStringRecursive(
        _(
          "When it's ${player_name}'s turn to take a card from the London Season Display",
        ),
        {
          player_name: getPlayer(itemId as number).getName(),
        },
      );
    case AFTER_COMMANDER_DEPLOY_CHECK:
      return _('After Commander Deploy roll');
    default:
      throw new Error(`Unknown timing window kind: ${kind}`);
  }
};

export const getCardPrefix = (cardId: string) => {
  if (cardId.startsWith('PC')) {
    return 'promise-card-';
  }
  if (
    cardId.startsWith(SHIPYARD) ||
    cardId.startsWith(WORKSHOP) ||
    cardId.startsWith(LUXURY)
  ) {
    return 'enterprise-card-';
  }
  if (cardId.startsWith('LawCard')) {
    return 'law-card-';
  }
  return 'game-card-';
};

export const getIdWithPrefix = (itemId: string) => {
  if (itemId.startsWith('familyMember')) {
    return itemId;
  }
  return getCardPrefix(itemId) + itemId;
};

export const getCardText = (
  card: JocoLondonSeasonCardBase | JocoLawCardBase | JocoPromiseCardBase,
) => {
  if (card.id.startsWith('PC')) {
    return formatStringRecursive('${tkn_promiseCard}', {
      tkn_promiseCard: card.id,
    });
  }
  const text = '"${cardTitle}"';

  const cardId =
    card['type'] === BLACKMAIL && 'hiddenId' in card ? card.hiddenId : card.id;
  return formatStringRecursive(text, {
    cardTitle: _(StaticData.get().cardTitle(cardId)),
  });
};

// TODO: Add more roles as needed and use consistenly
export const getRoleName = (role: string) => {
  switch (role) {
    case CHAIRMAN:
      return _('Chairman');
    case PRIME_MINISTER:
      return _('Prime Minister');
    case LEADER_OF_THE_OPPOSITION:
      return _('Leader of the Opposition');
    case OPPOSITION:
      return _('Opposition');
    default:
      throw new Error(`Unknown role: ${role}`);
  }
};
