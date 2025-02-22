const tplBoard = (gamedatas: GamedatasAlias ) => `<div id="joco_board">
  <div id="joco_family_members"></div>
  <div id="joco_orders"></div>
  <div id="joco_ships"></div>
  <div id="joco_towers"></div>
  <div id="joco_treasuries"></div>
</div>`

const tplTreasury = (office: string, {top, left}: AbsolutePosition) => `
<div class="joco_treasury" style="top: calc(var(--boardScale) * ${top}px); left: calc(var(--boardScale) * ${left}px);">
  <span>${_('£')}</span>
  <span class="joco_treasury_counter" id="joco_${office}_treasury"></span>
</div>`

// <div class="joco_tower" style="bottom: calc(var(--boardScale) * -149px); left: calc(var(--boardScale) * 1095px);">
// <div class="joco_tower_top" style="z-index: 2;"></div>
// <div class="joco_tower_level" style="z-index: 1;"></div>
// <div class="joco_tower_level"></div>
// </div>
// <div class="joco_tower" style="bottom: calc(var(--boardScale) * -60px); left: calc(var(--boardScale) * 1186px);">
// <div class="joco_tower_top" style="z-index: 2;"></div>
// <div class="joco_tower_level"></div>
// </div>
// <div class="joco_tower" style="bottom: calc(var(--boardScale) * -74px); left: calc(var(--boardScale) * 851px);">
// <div class="joco_tower_top" style="z-index: 2;"></div>
// </div>


