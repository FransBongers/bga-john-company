export const tplPowerMarkersContainer = () => `
  <div class="joco-container joco-power-markers-container">
    <div class="joco-header"><span class="fb-font-baskerville fb-font-16 fb-font-bold">${_('Power Markers').toLocaleUpperCase()}</span></div>  
    <div id="joco-power-markers">
      ${[1,2,3,4].map((n) => `<div id="joco-power-marker-position-${n}" class="joco-power-marker-position" data-position="${n}"></div>`).join('')}
    </div>
  </div>
`;

export const tplPowerMarker = ({id, type, extraClasses = ''} : {id?: string, type: string, extraClasses?: string}) => `
  <div ${id ? `id="${id}"` : ''} class="joco-power-marker ${extraClasses}" data-type="${type}">
    <div class="joco-icon" data-icon="${type}"></div>
  </div>
`;