import { GamedatasAlias, GameAlias, JocoDealAssets } from '../../types';
import { formatStringRecursive, getPlayer } from '../../boilerplate';
import { TabContainer } from '../../boilerplate/ui-components/tab-container';
import { AssetSelector } from './asset-selector';
import {
  NEW_OFFER_DESCRIPTION_MAX_LENGTH,
  tplAssetSelector,
  tplNewOffer,
} from './templates';

type Side = 'self' | 'opponent';

const SIDES: Side[] = ['self', 'opponent'];
const sideId = (side: Side) => `joco-new-offer-${side}`;

export class NewOffer {
  private description = '';
  private opponentId: number | null = null;
  private selectors = {} as Record<Side, AssetSelector>;

  private ui: {
    wrapper: HTMLElement;
    description: HTMLInputElement;
    descriptionCounter: HTMLElement;
  };

  constructor(private game: GameAlias) {
    this.setup(game.gamedatas);
  }

  private setup(gamedatas: GamedatasAlias) {
    document
      .getElementById('joco-deals-players')
      .insertAdjacentHTML('afterbegin', tplNewOffer());

    new TabContainer({
      id: 'joco-new-offer-tab-container',
      parentElement: 'joco-new-offer-tabs',
      gameName: this.game.gameName,
      tabs: SIDES.map((side) => ({
        id: sideId(side),
        title: '',
        content: tplAssetSelector(sideId(side)),
      })),
      initialActiveTabId: sideId('self'),
    });

    SIDES.forEach((side) => {
      this.selectors[side] = new AssetSelector(sideId(side), () =>
        this.updateSummary(),
      );
    });

    this.ui = {
      wrapper: document.querySelector('.joco-new-offer-wrapper') as HTMLElement,
      description: document.getElementById(
        'joco-new-offer-description',
      ) as HTMLInputElement,
      descriptionCounter: document.getElementById(
        'joco-new-offer-description-counter',
      ),
    };

    this.ui.description.addEventListener('input', () => {
      this.description = this.ui.description.value;
      this.ui.descriptionCounter.innerHTML = `${this.description.length} / ${NEW_OFFER_DESCRIPTION_MAX_LENGTH}`;
    });
    document
      .getElementById('joco-new-offer-submit')
      .addEventListener('click', () => this.onSubmit());
    document
      .getElementById('cancel-new-offer')
      .addEventListener('click', () => this.cancelNewOffer());
  }

  private getPlayerId(side: Side) {
    return side === 'self' ? this.game.getPlayerId() : this.opponentId;
  }

  private getSideName(side: Side) {
    const player = getPlayer(this.getPlayerId(side));
    return formatStringRecursive('${tkn_playerName}', {
      tkn_playerName: player.getName(),
    });
  }

  private updateTabTitles() {
    SIDES.forEach((side) => {
      document.querySelector(`#${sideId(side)}-tab span`).innerHTML =
        side === 'self' ? _('You') : this.getSideName(side);
    });
  }

  private updateSummary() {
    if (this.opponentId === null) {
      return;
    }
    SIDES.forEach((side) => {
      const labels = this.selectors[side].getLabels();
      document.getElementById(`${sideId(side)}-summary`).innerHTML =
        `${this.getSummaryHeading(side)}: ${labels.length ? labels.join(', ') : _('nothing')}`;
    });
  }

  private getSummaryHeading(side: Side) {
    return side === 'self'
      ? formatStringRecursive(_('${tkn_boldText_you} will give'), {
          tkn_boldText_you: _('You'),
        })
      : formatStringRecursive(_('${tkn_playerName} will give'), {
          tkn_playerName: this.getSideName(side),
        });
  }

  public startNewOffer(opponentId: number) {
    this.opponentId = opponentId;
    this.description = '';
    this.ui.description.value = '';
    this.ui.descriptionCounter.innerHTML = `0 / ${NEW_OFFER_DESCRIPTION_MAX_LENGTH}`;

    SIDES.forEach((side) => this.selectors[side].load(this.getPlayerId(side)));
    this.updateTabTitles();
    this.updateSummary();

    this.ui.wrapper.classList.add('active');
  }

  public cancelNewOffer() {
    this.ui.wrapper.classList.remove('active');
  }

  /** Ids of the items each player gives, keyed by player id. */
  public getOfferAssets(): Record<number, JocoDealAssets> {
    return {
      [this.getPlayerId('self')]: this.selectors.self.getAssets(),
      [this.getPlayerId('opponent')]: this.selectors.opponent.getAssets(),
    };
  }

  private onSubmit() {
    const description = this.description
      .trim()
      .slice(0, NEW_OFFER_DESCRIPTION_MAX_LENGTH);
    if (description.length === 0) {
      return;
    }
    console.log('Submitting new offer with assets:', this.getOfferAssets());
    this.game.bga.actions.performAction(
      'actNewOffer',
      {
        description,
        opponentId: this.opponentId,
        assets: JSON.stringify(this.getOfferAssets()),
      },
      { checkAction: false, checkPossibleActions: false },
    );
    this.cancelNewOffer();
  }
}
