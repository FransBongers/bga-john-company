import { AbsolutePosition } from '../../boilerplate';

export const tplTowerLevel = () => `
<div class="joco-tower-level"></div>`;

export const tplTowerTop = () => `
<div class="joco-tower-top">
  <div class="joco-tower-flag">
    <span>*</span>
  </div>
</div>`;

export const tplControlTokenStock = (
  regionId: string,
  position: AbsolutePosition,
) => `
<div id="joco-control-token-stock-${regionId}" class="joco-control-token-stock" style="top: ${position.top}px; left: ${position.left}px;"></div>`;
