/* ------- DEFAULT LOG TOKENS ------- */

export const tlpLogTokenText = ({
  text,
  tooltipId,
  italic = false,
}: {
  text: string;
  tooltipId?: string;
  italic?: boolean;
}) =>
  `<span ${
    tooltipId ? `id="${tooltipId}" class="log_tooltip"` : ''
  } style="font-weight: 700;${italic ? ' font-style: italic;' : ''}">${_(
    text
  )}</span>`;

/* ------- GAME SPECIFIC LOG TOKENS ------- */

export const tplLogTokenClimate = (climate: string) =>
  `<div class="log_token joco-crown-climate-icon" data-climate="${climate}"></div>`;

export const tplLogTokenElephant = () => '<div class="log_token joco_elephant"></div>';

export const tplLogTokenPound = () => `<div class="log_token joco_pound"></div>`;

export const tplLogTokenPromiseCube = () => '<div class="log_token joco-promise-cube"></div>'

export const tplLogTokenStormDie = (side: string) =>
  `<div class="log_token joco-storm-die" data-side="${side}"></div>`;

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

export const tknPound = () => _('Pounds');

export const tknShipValue = ({
  name,
  type,
  fatigued,
}: {
  name: string;
  type: string;
  fatigued: 0 | 1;
}): string => {
  return [type, name, fatigued].join(':');
};

export const tknPromiseCubes = () => 'Promise Cube(s)';
