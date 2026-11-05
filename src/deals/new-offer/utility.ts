import { createHtmlElement, getPlayer } from '../../boilerplate';
import {
  tplEnterpriseCardTooltip,
  tplLondonSeasonCardTooltip,
  tplPromiseCard,
} from '../../boilerplate/tooltip-manager';
import { CASH_COUNTER, SPOUSE } from '../../constants';
import { Families } from '../../families';
import { createFamilyMember } from '../../templates';
import { AssetOption, AvailableAssets } from './types';

const getCompanyShares = (familyId: string): AssetOption[] => {
  const result: AssetOption[] = [];
  const courtOfDirectors = document.getElementById('CourtOfDirectors');
  courtOfDirectors?.childNodes.forEach((child) => {
    const id = (child as HTMLElement).id;
    if (id && id.includes(familyId)) {
      result.push({
        id,
        label: `${_('Company share')} ${result.length + 1}`,
        element: createFamilyMember(familyId, `${id}_asset`),
      });
    }
  });
  return result;
};

export const getAvailableAssets = (playerId: number): AvailableAssets => {
  const player = getPlayer(playerId);
  const familyId = player.familyId;
  const family = Families.getInstance().getFamily(familyId);

  return {
    cash: player.counters[CASH_COUNTER].getValue(),
    options: {
      share: getCompanyShares(familyId),
      enterprise: family.getEnterprises().map((card) => ({
        id: card.id,
        label: card.name,
        element: createHtmlElement(tplEnterpriseCardTooltip(card)),
      })),
      promiseCard: family.getPromiseCards().map((card) => ({
        id: card.id,
        label: card.title,
        element: createHtmlElement(tplPromiseCard(card)),
      })),
      prestige: family
        .getPrestigeCards()
        .filter((card) => card.subtype !== SPOUSE)
        .map((card) => ({
        id: card.id,
        label: card.title,
        element: createHtmlElement(tplLondonSeasonCardTooltip(card)),
      })),
    },
  };
};
