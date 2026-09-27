import { tplAmount } from '../../templates';
import { JocoArmyPiece, JocoArmyPieceBase } from '../../types';
import { getArmyPiece } from '../../utility';

export const tplRegiment = ({
  id,
  extraClasses = '',
}: {
  id?: string;
  extraClasses?: string;
}): string => {
  return `
    <div id="${id ?? ''}" class="joco-regiment ${extraClasses}"></div>
  `;
};

export const tplLocalAlliance = ({
  id,
  extraClasses = '',
  region,
  name,
  strength,
  cost
}: {
  extraClasses?: string;
  id?: string;
} & Pick<JocoArmyPiece, 'region' | 'name' | 'strength' | 'cost'>) => `
  <div id="${id ?? ''}" class="joco-local-alliance ${extraClasses}" data-region='${region}' style="order: ${cost};">
    <div class="joco-local-alliance-strength">
      <div class="joco-strength-icon joco-inverted"></div>
      <span class="fb-font-baskerville">${strength}</span>
      <div class="joco-strength-icon"></div>
    </div>
    <div class="joco-local-alliance-name bga-autofit"><span class="fb-font-baskerville">${_(name)}</span></div>
    <div class="joco-icon" data-icon="CircleDark">${tplAmount(cost, true)}</div>
  </div>
`;

    // 
    // 

export const tplArmyPiece = (piece: JocoArmyPieceBase) => {
  if (piece.id.startsWith('Regiment')) {
    return tplRegiment({ id: piece.id });
  }
  const armyPiece = getArmyPiece(piece);
  return tplLocalAlliance(armyPiece);
};
