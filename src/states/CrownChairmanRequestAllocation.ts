import { Board } from '../board';
import {
  addCancelButton,
  addConfirmButton,
  addSecondaryActionButton,
  clearPossible,
  debug,
  formatStringRecursive,
  onClick,
  performAction,
  updatePageTitle,
} from '../boilerplate/utility';
import { OFFICES_WITH_TREASURY } from '../constants';
import { tknPromiseCubes, tknPound } from '../logs/templates';
import { PlayerManager } from '../player-manager';
import { StaticData } from '../static-data';
import { CommonStateArgs, GameAlias, GameState, JocoShipBase } from '../types';
import { getCrownPlayerName } from '../utility';

interface OnEnteringCrownChairmanRequestAllocationArgs extends CommonStateArgs {
  maxAmount: number;
}

export class CrownChairmanRequestAllocation implements GameState<OnEnteringCrownChairmanRequestAllocationArgs> {
  private static instance: CrownChairmanRequestAllocation;
  private args: OnEnteringCrownChairmanRequestAllocationArgs;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    CrownChairmanRequestAllocation.instance =
      new CrownChairmanRequestAllocation(game);
  }

  public static getInstance() {
    return CrownChairmanRequestAllocation.instance;
  }

  onEnteringState(args: OnEnteringCrownChairmanRequestAllocationArgs) {
    debug('Entering CrownChairmanRequestAllocation state');
    this.args = args;

    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving CrownChairmanRequestAllocation state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringCrownChairmanRequestAllocationArgs,
  ) {
    updatePageTitle(
      _('${tkn_playerName} may fit ships'),
      {
        tkn_playerName: getCrownPlayerName(),
      },
      true,
    );
  }

  //  .####.##....##.########.########.########..########....###.....######..########
  //  ..##..###...##....##....##.......##.....##.##.........##.##...##....##.##......
  //  ..##..####..##....##....##.......##.....##.##........##...##..##.......##......
  //  ..##..##.##.##....##....######...########..######...##.....##.##.......######..
  //  ..##..##..####....##....##.......##...##...##.......#########.##.......##......
  //  ..##..##...###....##....##.......##....##..##.......##.....##.##....##.##......
  //  .####.##....##....##....########.##.....##.##.......##.....##..######..########

  // ..######..########.########.########...######.
  // .##....##....##....##.......##.....##.##....##
  // .##..........##....##.......##.....##.##......
  // ..######.....##....######...########...######.
  // .......##....##....##.......##..............##
  // .##....##....##....##.......##........##....##
  // ..######.....##....########.##.........######.

  private updateInterfaceInitialStep() {
    this.game.clearPossible();

    const playerId = PlayerManager.getInstance().getCurrentPlayerId();

    updatePageTitle(
      _(
        '${you} may pay 1 ${tkn_promiseCube} to request to allocate up to 3 ${tkn_pound} to a specific office',
      ),
      {
        tkn_playerName: getCrownPlayerName(),
        tkn_promiseCube: tknPromiseCubes(),
        tkn_pound: tknPound(),
      },
    );

    this.setOfficesSelectable();

    addSecondaryActionButton({
      id: 'pay_btn',
      text: formatStringRecursive(_('Pay 1 ${tkn_promiseCube}'), {
        tkn_promiseCube: tknPromiseCubes(),
      }),
      callback: () => this.updateInterfaceSelectOffice(),
    });

    addSecondaryActionButton({
      id: 'skip_btn',
      text: _('Skip'),
      callback: () =>
        performAction('actCrownChairmanRequestAllocation', {
          continue: true,
        }),
    });
  }

  private updateInterfaceSelectOffice() {
    clearPossible();
    updatePageTitle(_('${you} must select an office'));

    this.setOfficesSelectable();

    addCancelButton();
  }

  private updateInterfaceSelectAmount(officeId: string) {
    clearPossible();
    updatePageTitle(_('${you} must select the amount to request'));

    for (let i = 1; i <= this.args.maxAmount; i++) {
      addSecondaryActionButton({
        id: `amount_${i}_btn`,
        text: formatStringRecursive(_('${amount} ${tkn_pound}'), {
          amount: i,
          tkn_pound: tknPound(),
        }),
        callback: () => this.updateInterfaceConfirm(officeId, i),
      });
    }

    addCancelButton();
  }

  private updateInterfaceConfirm(officeId: string, amount: number) {
    clearPossible();

    updatePageTitle(
      _(
        'Pay 1 ${tkn_promiseCube} to allocate ${amount} ${tkn_pound} to the ${office}?',
      ),
      {
        tkn_promiseCube: tknPromiseCubes(),
        tkn_pound: tknPound(),
        amount,
        office: _(StaticData.get().office(officeId).title),
      },
    );

    addConfirmButton(() => {
      performAction('actCrownChairmanRequestAllocation', {
        officeId,
        amount,
      });
    });
    addCancelButton();
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private setOfficesSelectable() {
    const board = Board.getInstance();
    OFFICES_WITH_TREASURY.forEach((office) => {
      const box = board.ui.selectBoxes[office];
      onClick(box, () => this.updateInterfaceSelectAmount(office));
    });
  }

  //  ..######..##.......####..######..##....##
  //  .##....##.##........##..##....##.##...##.
  //  .##.......##........##..##.......##..##..
  //  .##.......##........##..##.......#####...
  //  .##.......##........##..##.......##..##..
  //  .##....##.##........##..##....##.##...##.
  //  ..######..########.####..######..##....##

  // .##.....##....###....##....##.########..##.......########..######.
  // .##.....##...##.##...###...##.##.....##.##.......##.......##....##
  // .##.....##..##...##..####..##.##.....##.##.......##.......##......
  // .#########.##.....##.##.##.##.##.....##.##.......######....######.
  // .##.....##.#########.##..####.##.....##.##.......##.............##
  // .##.....##.##.....##.##...###.##.....##.##.......##.......##....##
  // .##.....##.##.....##.##....##.########..########.########..######.
}
