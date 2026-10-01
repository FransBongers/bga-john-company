import {
  createRegiment,
  // createShip,
} from '../board/utility';
import { tplIcon, tplPolicyIcon, tplVictoryPointsIcon } from '../icons/templates';
import { PlayerManager } from '../player-manager';
import { createFamilyMember } from '../templates';
import { GameAlias } from '../types';
import {
  tlpLogTokenText,
  tplLogTokenClimate,
  // tplLogTokenIcon,
  tplLogTokenElephant,
  tplLogTokenPound,
  tplLogTokenPromiseCube,
  tplLogTokenSetupCard,
  tplLogTokenStormDie,
  tplLogTokenPlayerName,
  tplLogTokenShip,
  tplLogTokenLocalAlliance,
  tplLogTokenTrophy,
} from './templates';

const LOG_TOKEN_BOLD_TEXT = 'boldText';
const LOG_TOKEN_BOLD_ITALIC_TEXT = 'boldItalicText';
const LOG_TOKEN_ITALIC_TEXT = 'italicText';
const LOG_TOKEN_NEW_LINE = 'newLine';
const LOG_TOKEN_PLAYER_NAME = 'playerName';
// Game specific
const LOG_TOKEN_CLIMATE = 'climate';
const LOG_TOKEN_POUND = 'pound';
const LOG_TOKEN_ELEPHANT = 'elephant';
const LOG_TOKEN_ENTERPRISE_ICON = 'enterpriseIcon';
const LOG_TOKEN_FAMILY_MEMBER = 'familyMember';
const LOG_TOKEN_ICON = 'icon';
const LOG_TOKEN_LOCAL_ALLIANCE = 'localAlliance';
const LOG_TOKEN_POLICY_ICON = 'policyIcon';
const LOG_TOKEN_REGIMENT = 'regiment';
const LOG_TOKEN_PROMISE_CUBE = 'promiseCube';
const LOG_TOKEN_SETUP_CARD = 'setupCard';
const LOG_TOKEN_SHIP = 'ship';
const LOG_TOKEN_STORM_DIE = 'stormDie';
const LOG_TOKEN_TROPHY = 'trophy';
const LOG_TOKEN_VICTORY_POINTS = 'victoryPoints';

const CLASS_LOG_TOKEN = 'log-token';

let tooltipIdCounter = 0;

export const getTokenDiv = ({
  key,
  value,
  game,
}: {
  key: string;
  value: string;
  game: GameAlias;
}) => {
  const splitKey = key.split('_');
  const type = splitKey[1];
  switch (type) {
    case LOG_TOKEN_BOLD_TEXT:
      return tlpLogTokenText({ text: value });
    case LOG_TOKEN_BOLD_ITALIC_TEXT:
      return tlpLogTokenText({ text: value, italic: true });
    case LOG_TOKEN_ITALIC_TEXT:
      return tlpLogTokenText({ text: value, italic: true, bold: false });
    case LOG_TOKEN_CLIMATE:
      return tplLogTokenClimate(value);
    case LOG_TOKEN_ICON:
    case LOG_TOKEN_ENTERPRISE_ICON:
      return tplIcon(value, 'log-token');
    case LOG_TOKEN_POLICY_ICON:
      return tplPolicyIcon(value, 'log-token');
    case LOG_TOKEN_ELEPHANT:
      return tplLogTokenElephant();
    case LOG_TOKEN_FAMILY_MEMBER:
      const [familyId, number] = value.split(':');
      return createFamilyMember(familyId, Number(number), [CLASS_LOG_TOKEN])
        .outerHTML;
    case LOG_TOKEN_LOCAL_ALLIANCE:
      return tplLogTokenLocalAlliance(value);
    case LOG_TOKEN_POUND:
      return tplLogTokenPound();
    case LOG_TOKEN_PROMISE_CUBE:
      return tplLogTokenPromiseCube();
    case LOG_TOKEN_REGIMENT:
      return createRegiment([CLASS_LOG_TOKEN]).outerHTML;
    case LOG_TOKEN_SETUP_CARD:
      return tplLogTokenSetupCard(value);
    case LOG_TOKEN_SHIP:
      const [side, name] = value.split(':');
      return tplLogTokenShip({
        name,
        side,
      });
    case LOG_TOKEN_STORM_DIE:
      return tplLogTokenStormDie(value);
    case LOG_TOKEN_TROPHY:
      return tplLogTokenTrophy();
    case LOG_TOKEN_NEW_LINE:
      return '<br class="joco-new-line">';
    case LOG_TOKEN_PLAYER_NAME:
      const player = PlayerManager.getInstance()
        .getPlayers()
        .find((player) => player.getName() === value);
      return player
        ? tplLogTokenPlayerName({
            name: player.getName(),
            color: player.getColor(),
          })
        : value;
      case LOG_TOKEN_VICTORY_POINTS:
        return tplVictoryPointsIcon(value, 'log-token');
    default:
      return value;
  }
};
