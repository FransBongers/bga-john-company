import { formatStringRecursive } from "../boilerplate";

export const tplLeaderOfTheOpposition = (leaderName: string) => {
  return `
  <div class="joco-leader-of-the-opposition">
    <span class="fb-font-baskerville fb-font-16 fb-font-bold">Leader:</span>
    <span class="fb-font-baskerville fb-font-16">${formatStringRecursive(
      '${tkn_playerName}',
      {
        tkn_playerName: leaderName,
      },
    )}</span>
  </div>
  `;
};
