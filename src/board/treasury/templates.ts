const tplTreasury = (office: string, { top, left }: AbsolutePosition) => `
<div id="joco-treasury-${office}" class="joco-treasury" style="top: calc(var(--boardScale) * ${top}px); left: calc(var(--boardScale) * ${left}px);">
  <div id="joco-treasury-${office}-minus-btn" class="joco-button" data-type="minus"><i class="fa6 fa6-minus"></i></div>
  <div class="joco-container">
    <span>${_('£')}</span>
    <span class="joco_treasury_counter" id="joco_${office}_treasury"></span>
  </div>
  <div id="joco-treasury-${office}-plus-btn" class="joco-button" data-type="plus"><i class="fa6 fa6-plus"></i></div>
</div>`;
