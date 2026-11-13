import { CommonStateArgs, GameState, updatePageTitle } from '../boilerplate';
import { GameAlias } from '../types';

export class WaitForOffer implements GameState<CommonStateArgs> {
  private static instance: WaitForOffer;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    WaitForOffer.instance = new WaitForOffer(game);
  }

  public static getInstance() {
    return WaitForOffer.instance;
  }

  onEnteringState() {
    updatePageTitle(_('${you} may respond to offers'), {});
  }

  onLeavingState() {}

  setDescription() {
    updatePageTitle(_('Players are considering offers'), {});
  }
}