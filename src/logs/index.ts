const LOG_TOKEN_BOLD_TEXT = 'boldText';
const LOG_TOKEN_BOLD_ITALIC_TEXT = 'boldItalicText';
const LOG_TOKEN_NEW_LINE = 'newLine';
const LOG_TOKEN_PLAYER_NAME = 'playerName';
// Game specific
const LOG_TOKEN_POUND = 'pound';
const LOG_TOKEN_ENTERPRISE_ICON = 'enterpriseIcon';
const LOG_TOKEN_ICON = 'icon';
const LOG_TOKEN_SETUP_CARD = 'setupCard';

let tooltipIdCounter = 0;

const getTokenDiv = ({
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
    case LOG_TOKEN_ICON:
    case LOG_TOKEN_ENTERPRISE_ICON:
      return tplLogTokenIcon(value);
    case LOG_TOKEN_POUND:
      return tplLogTokenPound();
    case LOG_TOKEN_SETUP_CARD:
      return tplLogTokenSetupCard(value);
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
    default:
      return value;
  }
};
