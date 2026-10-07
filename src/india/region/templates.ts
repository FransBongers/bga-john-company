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

export const tplUnrestContainer = (regionId: string) => `
<div id="joco-unrest-${regionId}" class="joco-unrest-container" data-region="${regionId}"></div>`;

export const tplGovernorOverlay = (regionId: string) => `
  <div id="joco-governor-overlay-${regionId}" class="joco-governor-overlay-container" data-region="${regionId}">
    <div class="joco-governor-overlay">
      <div class="joco-family-member-spot-wrapper">
        <div id="GovernorOf${regionId}" class="joco-family-member-spot">
          <div class="joco-family-member-spot-background">
            <div class="joco-region-icon" data-region="${regionId}"></div>
            <div class="joco-presidency-icon"></div>
          </div>
        </div>
      </div>
    </div>
    <div id="shipConstruction_${regionId}" class="joco-governor-company-ship">
    </div>
  </div>
`;
