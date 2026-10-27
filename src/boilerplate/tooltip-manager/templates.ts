import { PRESTIGE } from '../../constants';
import {
  tplLondonSeasonCardContent,
  tplBlackmailCardContent,
} from '../../cards/london-season-cards/templates';
import {
  JocoLawCardStatic,
  JocoLondonSeasonCardStatic,
  JocoEnterpriseCardStatic,
  JocoEnterpriseCardBase,
  JocoEnterpriseCard,
} from '../../types';
import { tplLawCardContent } from '../../cards/law-cards/templates';
import { tplEnterpriseCardContent } from '../../cards/enterprise-cards/templates';

export const tplLawCardTooltip = (data: JocoLawCardStatic & { id: string }) => `
  <div class="joco-law-card tooltip" data-background="${data.background}">
    ${tplLawCardContent(data)}
  </div>
`;

export const tplEnterpriseCardTooltip = (
  data: JocoEnterpriseCardStatic & {
    id: string;
    type: string;
    invested: boolean;
    shipId: string | null;
  },
) => {
  const type = data.id.split('_')[0];
  // div.classList.add('joco-enterprise-card');
  // div.classList.add('joco-small-card-horizontal');
  // div.setAttribute('data-background', card.type);
  return `
  <div class="joco-enterprise-card joco-small-card-horizontal tooltip" data-background="${type}" data-card-id="${data.id}">
    ${ tplEnterpriseCardContent(data as JocoEnterpriseCard, false)}
  </div>
`;
};

export const tplLondonSeasonCardTooltip = (
  data: JocoLondonSeasonCardStatic & { id: string },
) => {
  const subtype = data.type === PRESTIGE ? data.subtype : '';
  const hasTextNote = data.textNote ? 'true' : 'false';
  return `
  <div class="joco-card tooltip" data-background="${data.background}" data-card-id="${data.id}" data-has-text-note="${hasTextNote}"${subtype ? ` data-subtype="${subtype}"` : ''}>
    ${data.type === PRESTIGE ? tplLondonSeasonCardContent(data) : tplBlackmailCardContent(data)}
  </div>
`;
};
