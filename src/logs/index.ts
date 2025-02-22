const LOG_TOKEN_BOLD_TEXT = 'boldText';
const LOG_TOKEN_BOLD_ITALIC_TEXT = 'boldItalicText';
// Game specific
const LOG_TOKEN_POUND = 'pound';

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
    case LOG_TOKEN_POUND:
      return tplLogTokenPound();
    default:
      return value;
  }
};
