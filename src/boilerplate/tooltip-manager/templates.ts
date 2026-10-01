import { PRESTIGE } from '../../constants';
import {
  tplLondonSeasonCardContent,
  tplBlackmailCardContent,
} from '../../cards/london-season-cards/templates';
import { JocoLondonSeasonCardStatic } from '../../types';

export const tplLondonSeasonCardTooltip = (
  data: JocoLondonSeasonCardStatic,
) => `
  <div class="joco-card" data-background="${data.background}">
    ${data.type === PRESTIGE ? tplLondonSeasonCardContent(data) : tplBlackmailCardContent(data)}
  </div>
`;
