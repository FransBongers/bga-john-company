export const NEW_OFFER_DESCRIPTION_MAX_LENGTH = 500;

export const tplAssetSelector = (id: string) => `
<div id="${id}">
  <div class="joco-row joco-asset-selector-footer">
    <div id="${id}-cash"></div>
    <div id="${id}-reset" class="bgabutton bgabutton_blue">${_('Reset')}</div>
  </div>
  <div id="${id}-assets" class="joco-assets-container"></div>
</div>
`;

export const tplNewOffer = () => `
<div class="joco-new-offer-wrapper">
  <div class="joco-row">
    <div class="joco-new-offer-header">
      <span>${_('New Deal')}</span>
      <i id="cancel-new-offer" class="fa fa-close"></i>
    </div>
  </div>
  <div class="joco-new-offer">
    <div class="joco-new-order-form joco-new-offer-block">
      <label for="joco-new-offer-description">${_('Description')}</label>
      <input type="text" id="joco-new-offer-description" maxlength="${NEW_OFFER_DESCRIPTION_MAX_LENGTH}" autocomplete="off" />
      <div id="joco-new-offer-description-counter">0 / ${NEW_OFFER_DESCRIPTION_MAX_LENGTH}</div>
      <div class="joco-row joco-new-offer-buttons">
        <div id="joco-new-offer-submit" class="bgabutton bgabutton_blue">${_('Submit')}</div>
        <div id="joco-new-offer-submit-wake" class="bgabutton bgabutton_blue">${_('Submit and wake')}</div>
      </div>
    </div>
    <div class="joco-new-offer-block">
      <div id="joco-new-offer-self-summary"></div>
      <div id="joco-new-offer-opponent-summary"></div>
    </div>
    <div id="joco-new-offer-tabs"></div>
  </div>
</div>`;
