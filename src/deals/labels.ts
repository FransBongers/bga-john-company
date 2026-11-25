import { JocoDealAssets, JocoEnterpriseCardBase } from '../types';
import { StaticData } from '../static-data';
import { formatStringRecursive } from '../boilerplate';

type CardAssetType = 'enterprise' | 'promiseCard' | 'prestige';

const CARD_TYPES: CardAssetType[] = ['enterprise', 'promiseCard', 'prestige'];

export const getEnterpriseLabel = (
  name: string,
  enterprise?: Pick<JocoEnterpriseCardBase, 'shipId'>,
) => {
  const shipId = enterprise?.shipId;
  return shipId ? `${_(name)} (${_(StaticData.get().ship(shipId).name)})` : _(name);
};

export const getStaticCardLabel = (type: CardAssetType, id: string) => {
  const staticData = StaticData.get();
  switch (type) {
    case 'enterprise':
      return getEnterpriseLabel(staticData.enterpriseCard(id).name, staticData.enterprise(id));
    case 'promiseCard':
      return formatStringRecursive('${tkn_promiseCard}', { tkn_promiseCard: id });
    case 'prestige':
      return _(staticData.londonSeasonCard(id).title);
  }
};

/** Labels for the assets of one side of a deal. */
export const getAssetLabels = (
  assets: JocoDealAssets,
  getCardLabel: (type: CardAssetType, id: string) => string | undefined,
): string[] => {
  const labels: string[] = [];
  if ((assets.cash ?? 0) > 0) {
    labels.push(`£${assets.cash}`);
  }
  const shareCount = assets.share?.length ?? 0;
  if (shareCount > 0) {
    labels.push(`${shareCount} ${_('Company Share(s)')}`);
  }
  CARD_TYPES.forEach((type) => {
    (assets[type] ?? []).forEach((id) => {
      const label = getCardLabel(type, id);
      if (label) {
        labels.push(label);
      }
    });
  });
  return labels;
};
