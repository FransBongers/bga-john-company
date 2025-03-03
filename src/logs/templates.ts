/* ------- DEFAULT LOG TOKENS ------- */

const tlpLogTokenText = ({
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

const tplLogTokenClimate = (climate: string) => `<div class="log_token joco-crown-climate-icon" data-climate="${climate}"></div>`

const tplLogTokenPound = () => `<div class="log_token joco_pound"></div>`;

const tplLogTokenIcon = (type: string) =>
  `<div class="log-token joco-icon" data-icon="${type}"></div>`;

const tplLogTokenSetupCard = (id: string) =>
  `<div class="log-token joco-setup-card" data-card-id="${id}"></div>`;

const tplLogTokenPlayerName = ({
  name,
  color,
}: {
  name: string;
  color: string;
}) => `<span class="playername" style="color:#${color};">${name}</span>`;
