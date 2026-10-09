import {
  addCancelButton,
  addConfirmButton,
  addSecondaryActionButton,
  clearPossible,
  CommonStateArgs,
  debug,
  formatStringRecursive,
  GameState,
  getPlayerName,
  performAction,
  updatePageTitle,
} from '../boilerplate';
import { getPolicyConsequenceTranslation } from '../icons/templates';
import { Parliament } from '../parliament';
import { PrimeMinisterDial } from '../parliament/prime-minister-dial';
import {
  PRIME_MINISTER_DIAL,
  PrimeMinisterDialItem,
} from '../parliament/prime-minister-dial/config';
import { GameAlias } from '../types';

interface OnEnteringParliamentMeetsSelectPolicyArgs extends CommonStateArgs {
  left: number;
  right: number;
}

export class ParliamentMeetsSelectPolicy implements GameState<OnEnteringParliamentMeetsSelectPolicyArgs> {
  private static instance: ParliamentMeetsSelectPolicy;
  private args: OnEnteringParliamentMeetsSelectPolicyArgs;
  private primeMinisterDial: PrimeMinisterDial;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    ParliamentMeetsSelectPolicy.instance = new ParliamentMeetsSelectPolicy(
      game,
    );
  }

  public static getInstance() {
    return ParliamentMeetsSelectPolicy.instance;
  }

  onEnteringState(args: OnEnteringParliamentMeetsSelectPolicyArgs) {
    debug('Entering ParliamentMeetsSelectPolicy state');
    this.args = args;
    this.primeMinisterDial = Parliament.getInstance().getPrimeMinisterDial();
    this.primeMinisterDial.updateLeftArmPosition(this.args.left);
    this.primeMinisterDial.updateRightArmPosition(this.args.right);
    this.primeMinisterDial.showConsequenceOptions(true);
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving ParliamentMeetsSelectPolicy state');
  }

  setDescription(
    activePlayerIds: number[],
    args: OnEnteringParliamentMeetsSelectPolicyArgs,
  ) {
    const activePlayerId = activePlayerIds[0];

    updatePageTitle(_('${player_name} must select a policy'), {
      player_name: getPlayerName(activePlayerId),
    });
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
    clearPossible();
    updatePageTitle(_('${you} must select a policy'), {});

    this.addPolicyButton(this.args.left);
    this.addPolicyButton(this.args.right);

    // addConfirmButton(() => {
    //   performAction('actParliamentMeetsSelectPolicy', {});
    // });
  }

  private updateInterfaceConfirmStep(
    dialPosition: number,
    policy: PrimeMinisterDialItem,
  ) {
    clearPossible();
    updatePageTitle(_('Select ${policy}?'), {
      policy: this.getTextForPolicy(policy),
    });

    addConfirmButton(() => {
      performAction('actParliamentMeetsSelectPolicy', {
        dialPosition,
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

  private getTextForPolicy(policy: PrimeMinisterDialItem) {
    return formatStringRecursive(
      policy.windowTax
        ? _('${consequence} ${tkn_icon} & WINDOW TAX')
        : '${consequence} ${tkn_icon}',
      {
        consequence: getPolicyConsequenceTranslation(
          policy.consequence,
        ).toLocaleUpperCase(),
        tkn_icon: policy.target,
      },
    );
  }

  private addPolicyButton(dialPosition: number) {
    const policy = PRIME_MINISTER_DIAL[dialPosition];

    addSecondaryActionButton({
      id: `policy_${dialPosition}`,
      text: this.getTextForPolicy(policy),
      extraClasses: `joco-${policy.consequence}-button joco-consequence-button`,
      callback: () => this.updateInterfaceConfirmStep(dialPosition, policy),
    });
  }
}
