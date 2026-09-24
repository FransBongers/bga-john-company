// export const tplTreasury = (office: string) => `
// <div id="joco-treasury-${office}" class="joco-treasury">
//   <div><span class="fb-font-baskerville fb-font-12">${_('Treasury').toLocaleUpperCase()}</span></div>
//   <div class="joco-treasury-counter-container">
//     <div id="joco-treasury-${office}-minus-btn" class="joco-button" data-type="minus"><i class="fa6 fa6-minus"></i></div>
//     <div class="joco-treasury-container">
//       <span class="fb-font-baskerville fb-font-12">${_('£')}</span>
//       <span class="fb-font-baskerville fb-font-20" id="joco-treasury-${office}-counter"></span>
//     </div>
//     <div id="joco-treasury-${office}-plus-btn" class="joco-button" data-type="plus"><i class="fa6 fa6-plus"></i></div>
//   </div>
// </div>`;


export const tplTreasury = (officeId: string) => `
<div id="joco-treasury-${officeId}" class="joco-treasury-container" data-active="false">
  <div><span class="fb-font-baskerville fb-font-12">TREASURY</span></div>
  <div class="joco-row">
    <div id="joco-treasury-${officeId}-minus-btn" class="joco-button" data-type="minus"><i class="fa6 fa6-minus"></i></div>
    <div class="joco-treasury-counter-container">
      <span class="fb-font-baskerville fb-font-12">£</span><span id="joco-treasury-${officeId}-counter" class="fb-font-baskerville fb-font-20"></span>
    </div>
    <div id="joco-treasury-${officeId}-plus-btn" class="joco-button" data-type="plus"><i class="fa6 fa6-plus"></i></div>
  </div>
</div>`;