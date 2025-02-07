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
  `<span ${tooltipId ? `id="${tooltipId}" class="log_tooltip"` : ''} style="font-weight: 700;${
    italic ? ' font-style: italic;' : ''
  }">${_(text)}</span>`;


/* ------- GAME SPECIFIC LOG TOKENS ------- */
