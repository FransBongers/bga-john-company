const getSeaName = (seaId: string) => {
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

const getCrownPlayerName = () =>
  PlayerManager.getInstance().getPlayer(CROWN_PLAYER_ID).getName();

const getShipsLog = (ships: JocoShipBase[]) => {
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
