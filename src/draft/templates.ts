export const tplDraft = () => `
<div id="joco-draft">
  <div class="joco-container">
    <div class="joco-header"><span class="fb-font-baskerville fb-font-16 fb-font-bold">${_('Current Hand').toLocaleUpperCase()}</span></div>
    <div id="joco-setup-hand"></div>
  </div>
  <div class="joco-container">
    <div class="joco-header"><span class="fb-font-baskerville fb-font-16 fb-font-bold">${_('Your chosen setup cards').toLocaleUpperCase()}</span></div>
    <div id="joco-chosen-setup-cards"></div>
  </div>
</div`;
