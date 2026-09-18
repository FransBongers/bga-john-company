export const tplSeaZone = (id: string) => `
  <div class="joco-sea-zone" data-zone="${id}">
    <div id="joco-ship-stock-${id}" class="joco-ship-stock"></div>  
    <div class="joco-ship-count">
      <span id="joco-ship-count-${id}" class="fb-font-baskerville fb-font-bold fb-font-12"></span>
    </div>
  </div>
`;
