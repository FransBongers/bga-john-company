import { BgaCards } from '../../libs';
import { tplAmount } from '../../templates';
import { GameAlias, JocoControlToken } from '../../types';

export const tplControlTokenContent = (
  token: JocoControlToken,
  back = false,
) => {
  return `
    ${back ? '' : `<div class="joco-presidency-icon joco-inverted"></div>`}
    <div class="joco-region-icon" data-region='${token.regionId}'></div>
    ${back ? '' : `<div class="joco-presidency-icon"></div>`}
    ${back ? tplAmount(token.loot, true) : ''}
  `;
};

export class ControlTokensManager extends BgaCards.Manager<JocoControlToken> {
  private static instance: ControlTokensManager;

  public static create(game: GameAlias) {
    ControlTokensManager.instance = new ControlTokensManager(game);
  }

  public static getInstance() {
    return ControlTokensManager.instance;
  }

  constructor(public game: GameAlias) {
    super({
      getId: (card) => card.id,
      setupDiv: (card, div) => this.setupDiv(card, div),
      setupFrontDiv: (card, div: HTMLElement) => this.setupFrontDiv(card, div),
      setupBackDiv: (card, div: HTMLElement) => this.setupBackDiv(card, div),
      isCardVisible: (card) => this.isCardVisible(card),
      animationManager: game.animationManager,
      cardWidth: 30,
      cardHeight: 50,
      type: 'control-token',
      cardBorderRadius: '10px',
    });
  }

  clearInterface() {}

  setupDiv(card: JocoControlToken, div: HTMLElement) {
    div.classList.add('joco-control-token-container');
  }

  setupFrontDiv(card: JocoControlToken, div: HTMLElement) {
    div.classList.add('joco-control-token');
    div.setAttribute('data-region', card.regionId);

    if (div.children.length) {
      return;
    }
    div.insertAdjacentHTML('beforeend', tplControlTokenContent(card));
  }

  setupBackDiv(card: JocoControlToken, div: HTMLElement) {
    div.classList.add('joco-control-token');
    div.setAttribute('data-region', card.regionId);

    if (div.children.length) {
      return;
    }
    div.insertAdjacentHTML('beforeend', tplControlTokenContent(card, true));
  }

  isCardVisible(card: JocoControlToken) {
    return card.side === 'control';
  }
}
