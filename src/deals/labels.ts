import { JocoDealAssets } from '../types';
import { StaticData } from '../static-data';

type CardAssetType = 'enterprise' | 'promiseCard' | 'prestige';

const CARD_TYPES: CardAssetType[] = ['enterprise', 'promiseCard', 'prestige'];

export const getStaticCardLabel = (type: CardAssetType, id: string) => {
  const staticData = StaticData.get();
  switch (type) {
    case 'enterprise':
      return staticData.enterpriseCard(id).name;
    case 'promiseCard':
      return staticData.promiseCard(id).title;
    case 'prestige':
      return staticData.londonSeasonCard(id).title;
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
