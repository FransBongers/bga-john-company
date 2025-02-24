const tplPlayerAreas = () => `<div id="joco-player-areas">
</div>`

const tplPlayerArea = (player: JohnCompanyPlayerData) => `
  <div class="joco-player-area">
    <span style="color:#${player.color}; align-self: center;" class="playername">${player.name}</span>
  </div>
`