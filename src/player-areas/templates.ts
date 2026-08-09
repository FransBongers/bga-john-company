import { JohnCompanyPlayerData } from "../types"

export const tplPlayerAreas = () => `<div id="joco-player-areas">
</div>`

export const tplPlayerArea = (player: JohnCompanyPlayerData) => `
  <div class="joco-player-area">
    <span style="color:#${player.color}; align-self: center;" class="playername">${player.name}</span>
  </div>
`