import { formatStringRecursive, getPlayerName } from '../boilerplate';
import { GamedatasAlias } from '../types';

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

export const tplOppositionContent = (
  opposition: GamedatasAlias['parliament']['opposition'],
) => {
  const order = Object.entries(opposition.votes)
    .map(([playerId, votes]) => ({
      playerId: parseInt(playerId, 10),
      playerName: getPlayerName(parseInt(playerId, 10)),
      votes,
    }))
    .sort((a, b) => {
      if (a.playerId === opposition.leader) {
        return -1;
      }
      if (b.playerId === opposition.leader) {
        return 1;
      }
      const difference = b.votes - a.votes;
      return difference;
    });

  let playerLog = '';
  let playerArgs = {};
  order.forEach(({ playerName, votes }, index) => {
    playerLog +=
      `\${tkn_playerName_${index}}: \${tkn_boldText_votes_${index}} vote(s)` +
      (index === order.length - 1 ? '' : ', ');
    playerArgs['tkn_playerName_' + index] = playerName;
    playerArgs['tkn_boldText_votes_' + index] = '' + votes;
  });

  return `
        ${
          opposition.leader !== null
            ? tplLeaderOfTheOpposition(getPlayerName(opposition.leader))
            : ''
        }
        <span class="fb-font-baskerville fb-font-16">
          ${formatStringRecursive('${playerLog}', {
            playerLog: {
              log: playerLog,
              args: playerArgs,
            },
          })}
        </span>
      `;
};

export const tplParliament = () => `
  <div id="joco-parliament" class="joco-tab">
    <div id="joco-parliament-revealed-laws-container" class="joco-container hidden">
      <div class="joco-header"><span class="fb-font-baskerville fb-font-16 fb-font-bold">${_('Revealed Laws').toLocaleUpperCase()}</span></div>
      <div id="joco-parliament-revealed-laws">
          
      </div>
    </div>
    <div class="joco-row">
      <div id="joco-power-markers-container">

      </div>
      <div class="joco-container" style="flex-grow: 1;">
        <div class="joco-header"><span class="fb-font-baskerville fb-font-16 fb-font-bold">${_('Voting').toLocaleUpperCase()}</span></div>
        <div class="joco-row" style="margin-bottom: 12px;">
          <div class="joco-column joco-support-container">
            <span class="fb-font-baskerville fb-font-12 fb-font-bold">${_('Support').toLocaleUpperCase()}</span>
            <span id="joco-support-counter" class="fb-font-baskerville fb-font-20 fb-font-bold"></span>
          </div>
          <div class="joco-column joco-opposition-container">
            <span class="fb-font-baskerville fb-font-12">${_('Opposition').toLocaleUpperCase()}</span>
            <div id="joco-parliament-opposition"></div>
            
          </div>
        </div>
        <div class="joco-voting">
          <div class="joco-column">
            <div id="joco-parliament-selected-policy"></div>
            <span class="fb-font-baskerville fb-font-12">${_('Policy').toLocaleUpperCase()}</span>
          </div>
          <div class="joco-column" style="flex-grow: 1;">
            <div id="joco-parliament-selected-law"></div>
            <span class="fb-font-baskerville fb-font-12">${_('Law').toLocaleUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
`;


