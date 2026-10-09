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
  data: JocoLondonSeasonCardStatic,
) => `
  <div class="joco-card" data-background="${data.background}">
    ${data.type === PRESTIGE ? tplLondonSeasonCardContent(data) : tplBlackmailCardContent(data)}
  </div>
`;
