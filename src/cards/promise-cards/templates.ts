import { formatStringRecursive } from '../../boilerplate';
import { JocoPromiseCardStatic } from '../../types';
import { getFamilyName } from '../../utility';

export const tplPromiseCardContent = (
  card: JocoPromiseCardStatic & { id: string; familyId: string },
) => `
  <div class="joco-title joco-card-text fb-font-baskerville fb-font-16 bga-autofit">${card.title}</div>
  <div class="joco-signature joco-card-text fb-font-parisienne fb-font-20 bga-autofit">${formatStringRecursive(
    _('${familyName} Family'),
    {
      familyName: getFamilyName(card.familyId),
    },
  )}</div>
`;
