import { EAST_INDIAN, SOUTH_INDIAN, WEST_INDIAN, CHINA, CROWN_PLAYER_ID } from "./constants";
import { tknShipValue } from "./logs/templates";
import { PlayerManager } from "./player-manager";
import { JocoShipBase } from "./types";

export const getSeaName = (seaId: string) => {
  switch (seaId) {
    case EAST_INDIAN:
      return _('East Indian');
    case SOUTH_INDIAN:
      return _('South Indian');
    case WEST_INDIAN:
      return _('West Indian');
    case CHINA:
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
    shipsLog.args[key] = tknShipValue(ship);
  });

  return shipsLog;
};
