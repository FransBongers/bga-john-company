export const tplCashCounter = ({ id, label, buttonStyle = 'blue' }: {id: string, label?: string, buttonStyle: 'blue' | 'gray'}) => `
<div id="joco-cash-counter-${id}" class="joco-cash-counter-container" data-active="false">
  ${label ? `<div class="fb-font-baskerville fb-font-12">${label.toLocaleUpperCase()}</div>` : ''}
  <div class="joco-row">
    <div id="joco-cash-counter-${id}-minus-btn" class="bgabutton bgabutton_${buttonStyle}" data-type="minus"><i class="fa6 fa6-minus"></i></div>
    <div class="joco-cash-counter-counter-container">
      <span class="fb-font-baskerville fb-font-12">£</span><span id="joco-cash-counter-${id}-counter" class="fb-font-baskerville fb-font-20"></span>
    </div>
    <div id="joco-cash-counter-${id}-plus-btn" class="bgabutton bgabutton_${buttonStyle}" data-type="plus"><i class="fa6 fa6-plus"></i></div>
  </div>
</div>`;