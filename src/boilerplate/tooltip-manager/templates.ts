import { PRESTIGE } from '../../constants';
import {
  tplLondonSeasonCardContent,
  tplBlackmailCardContent,
} from '../../cards/london-season-cards/templates';
import { JocoLawCardStatic, JocoLondonSeasonCardStatic } from '../../types';
import { tplLawCardContent } from '../../cards/law-cards/templates';

export const tplLawCardTooltip = (
  data: JocoLawCardStatic & { id: string },
) => `
  <div class="joco-law-card tooltip" data-background="${data.background}">
    ${tplLawCardContent(data)}
  </div>
`;

export const tplLondonSeasonCardTooltip = (
  data: JocoLondonSeasonCardStatic & { id: string },
) => {
  const subtype = data.type === PRESTIGE ? data.subtype : '';
  const hasTextNote = data.textNote ? 'true' : 'false';
  return `
  <div class="joco-card tooltip" data-background="${data.background}" data-card-id="${data.id}" data-has-text-note="${hasTextNote}"${subtype ? ` data-subtype="${subtype}"` : ''}>
    ${data.type === PRESTIGE ? tplLondonSeasonCardContent(data) : tplBlackmailCardContent(data)}
  </div>
`};
