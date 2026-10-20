export const tplSeaZone = (id: string, tradeInChina = false) => `
  <div class="joco-sea-zone" data-zone="${id}">
    <div id="joco-ship-stock-${id}" class="joco-ship-stock"></div>  
    <div class="joco-ship-count">
      <span id="joco-ship-count-${id}" class="fb-font-baskerville ${tradeInChina ? '' : 'fb-font-bold'} fb-font-12"></span>
    </div>
  </div>
`;
