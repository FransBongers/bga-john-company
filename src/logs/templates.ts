/* ------- DEFAULT LOG TOKENS ------- */

import { EXTRA_SHIP, FATIGUED } from '../constants';
import { tplTrophyIcon } from '../icons/templates';
import { tplLocalAlliance } from '../india/army/templates';
import { StaticData } from '../static-data';
import { tplShipContent } from '../token-managers/ship-tokens/templates';
import { JocoShipBase } from '../types';

export const tlpLogTokenText = ({
  text,
  tooltipId,
  italic = false,
  bold = true,
}: {
  text: string;
  tooltipId?: string;
  italic?: boolean;
  bold?: boolean;
}) =>
  `<span ${
    tooltipId ? `id="${tooltipId}" class="log_tooltip"` : ''
  } style="font-weight: ${bold ? '700' : '400'};${italic ? ' font-style: italic;' : ''}">${_(
    text,
  )}</span>`;

/* ------- GAME SPECIFIC LOG TOKENS ------- */

export const tplLogTokenClimate = (climate: string) =>
  `<div class="log-token joco-crown-climate-icon" data-climate="${climate}"></div>`;

export const tplLogTokenElephant = () =>
  '<div class="log-token joco-elephant"></div>';

export const tplLogTokenLocalAlliance = (id: string) => {
  const staticData = StaticData.get().armyPiece(id);
  return tplLocalAlliance({
    extraClasses: 'log-token',
    presidencyId: staticData.presidencyId,
    name: staticData.name,
    strength: staticData.strength,
    cost: staticData.cost,
  });
};

export const tplLogTokenPound = () =>
  `<div class="log-token joco_pound"></div>`;

export const tplLogTokenPromiseCube = () =>
  '<div class="log-token joco-promise-cube"></div>';

export const tplLogTokenStormDie = (side: string) =>
  `<div class="log-token joco-storm-die" data-side="${side}"></div>`;

export const tplLogTokenTrophy = () => tplTrophyIcon('log-token');
// export const tplLogTokenIcon = (type: string) =>
//   `<div class="log-token joco-icon" data-icon="${type}"></div>`;

export const tplLogTokenSetupCard = (id: string) =>
  `<div class="log-token joco-setup-card" data-card-id="${id}"></div>`;

export const tplLogTokenPlayerName = ({
  name,
  color,
}: {
  name: string;
  color: string;
}) => `<span class="playername" style="color:#${color};">${name}</span>`;

export const tplLogTokenShip = ({
  name,
  side,
}: {
  name: string;
  side: string;
}) => `<div class="log-token joco-ship" data-side="${side}">
  ${tplShipContent({ name, side } as JocoShipBase, side === FATIGUED || side === EXTRA_SHIP)}
</div>`;

export const tknPound = () => _('Pounds');

export const tknShipValue = ({
  name,
  side,
}: {
  name: string;
  side: string;
}): string => {
  return [side, name].join(':');
};

export const tknPromiseCubes = () => 'Promise Cube(s)';
