import { JocoEventTileStatic } from '../../types';
import {
  CRISIS,
  WINDFALL,
  TURMOIL,
  LEADER,
  PEACE,
  SHUFFLE,
  FOREIGN_INVASION,
} from '../../constants';

const getEventTileText = (type: string) => {
  switch (type) {
    case CRISIS:
      return '';
    case WINDFALL:
      return _('Gain for writers here and in adjacent regions.');
    case TURMOIL:
      return _(
        'Close northernmost open order. If all are closed, perform Cascade (close orders in connected regions).',
      );
    case LEADER:
      return '';
    case PEACE:
      return _(
        'If the Elephant is fully in a Company-controlled region, clear unrest and open all orders instead.',
      );
    case SHUFFLE:
      return _(
        'Shuffle this tile in with the deck. Then shuffle the discards and place them on top.',
      );
      case FOREIGN_INVASION:
        return _('Roll storm die and resolve an Invasion in each region linked to a storm. (If none, use top event card.) For each, roll a die to determine strength. If this region falls, close every order there and set its strength to half of the die roll (round down).');
    default:
      return _(type);
  }
};

const tplCrisisContent = () => `
  <div class="joco-event-tile-imperial-ambitions joco-card-text fb-font-baskerville fb-font-12 bga-autofit">${_('Imperial Ambitions?')}</div>
  <div class="joco-event-tile-otherwise joco-card-text fb-font-baskerville fb-font-8 fb-font-italic bga-autofit">${_('Otherwise').toLocaleUpperCase()}</div>
  <div class="joco-event-tile-top-of-stack joco-card-text fb-font-baskerville fb-font-12 bga-autofit">${_('Top of Stack')}</div>
  <div class="joco-event-tile-top-of-stack-sub joco-card-text fb-font-baskerville fb-font-8 fb-font-italic bga-autofit">${_('Invade or Rebel?').toLocaleUpperCase()}</div>
`;

const tplPeaceContent = () => `
  <div class="joco-event-tile-top-of-stack joco-card-text fb-font-baskerville fb-font-12 bga-autofit">${_('Top of Stack')}</div>
  <div class="joco-event-tile-top-of-stack-sub joco-card-text fb-font-baskerville fb-font-8 fb-font-italic bga-autofit">${_('Invade or Rebel?').toLocaleUpperCase()}</div>
`;

const tplLeaderContent = () => `
  <div class="joco-event-tile-leader-left joco-card-text fb-font-baskerville fb-font-12 bga-autofit">${_('Strengthen if sovereign.')}</div>
  <div class="joco-event-tile-leader-right joco-card-text fb-font-baskerville fb-font-12 bga-autofit">${_('Rebellion if dominated.')}</div>
`;

export const tplEventTileContent = (
  card: JocoEventTileStatic & { id: string },
) => {
  const title = card.type === CRISIS ? _('Resolve Crisis') : _(card.title);
  const text = getEventTileText(card.type);

  return `
    <div class="joco-event-tile-title joco-card-text fb-font-baskerville fb-font-28 fb-font-bold bga-autofit">${title.toLocaleUpperCase()}</div>
    ${text ? `<div class="joco-event-tile-text joco-card-text fb-font-baskerville fb-font-12 bga-autofit">${text}</div>` : ''}
    ${card.type === CRISIS ? tplCrisisContent() : ''}
    ${card.type === PEACE ? tplPeaceContent() : ''}
    ${card.type === LEADER ? tplLeaderContent() : ''}
  `;
};
