import { Bar } from '../bar';
import {
  addCancelButton,
  addConfirmButton,
  addPrimaryActionButton,
  clearPossible,
  CommonStateArgs,
  debug,
  formatStringRecursive,
  GameState,
  getPlayerName,
  onClick,
  performAction,
  setSelected,
  updatePageTitle,
} from '../boilerplate';
import { Parliament } from '../parliament';
import { PrimeMinisterDial } from '../parliament/prime-minister-dial';
import { GameAlias, JocoLawCardBase } from '../types';
import { getLawCard } from '../utility';

interface OnEnteringParliamentMeetsSelectLawArgs extends CommonStateArgs {
  revealedLaws: JocoLawCardBase[];
  dial: number;
  policyOptions: Record<string, { left: number; right: number }>;
}

export class ParliamentMeetsSelectLaw implements GameState<OnEnteringParliamentMeetsSelectLawArgs> {
  private static instance: ParliamentMeetsSelectLaw;
  private args: OnEnteringParliamentMeetsSelectLawArgs;
  private primeMinisterDial: PrimeMinisterDial;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    ParliamentMeetsSelectLaw.instance = new ParliamentMeetsSelectLaw(game);
  }

  public static getInstance() {
    return ParliamentMeetsSelectLaw.instance;
  }

  onEnteringState(args: OnEnteringParliamentMeetsSelectLawArgs) {
    debug('Entering ParliamentMeetsSelectLaw state');
    this.args = args;
    this.primeMinisterDial = Parliament.getInstance().getPrimeMinisterDial();
    this.primeMinisterDial.updateLeftArmPosition(this.args.dial);
    this.primeMinisterDial.updateRightArmPosition(this.args.dial);
    this.primeMinisterDial.showConsequenceOptions(true);
    this.updateInterfaceInitialStep();
    Bar.getInstance().goTo('joco-parliament');
  }

  onLeavingState() {
    this.args.revealedLaws.forEach((law) => {
      const node = document.getElementById(`law-card-${law.id}`);
      if (node) {
        node.onmouseenter = null;
        node.onmouseleave = null;
      }
    });
    this.resetArms();
    this.primeMinisterDial.showConsequenceOptions(false);
    debug('Leaving PrimeMinisterSelectLaw state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringParliamentMeetsSelectLawArgs,
  ) {
    const numberOfRevealedLaws = args.revealedLaws.length;
    const playerName = getPlayerName(activePlayerIds[0]);
    switch (numberOfRevealedLaws) {
      case 0:
        updatePageTitle(_('${tkn_playerName} must draw and reveal a law'), {
          tkn_playerName: playerName,
        });
        break;
      case 3:
        updatePageTitle(_('${tkn_playerName} must select a law'), {
          tkn_playerName: playerName,
        });
        break;
      default:
        updatePageTitle(
          _('${tkn_playerName} must select a law or draw and reveal another'),
          { tkn_playerName: playerName },
        );
        break;
    }
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
    const numberOfRevealedLaws = this.args.revealedLaws.length;
    this.updatePageTitle(numberOfRevealedLaws);

    this.args.revealedLaws.forEach((law) => {
      onClick(`law-card-${law.id}`, () => {
        this.updateInterfaceConfirm('select', law);
      });
      this.addHover(law);
    });

    if (numberOfRevealedLaws < 3) {
      addPrimaryActionButton({
        id: 'draw-btn',
        text: _('Draw and reveal a law'),
        callback: () => this.updateInterfaceConfirm('draw'),
      });
    }
  }

  private addHover(law: JocoLawCardBase) {
    const node = document.getElementById(`law-card-${law.id}`);
    if (!node) {
      return;
    }
    node.onmouseenter = () => {
      const options = this.args.policyOptions[law.id];
      if (!options) {
        return;
      }
      this.primeMinisterDial.updateLeftArmPosition(options.left);
      this.primeMinisterDial.updateRightArmPosition(options.right);
    };
    node.onmouseleave = () => this.resetArms();
  }

  private resetArms() {
    this.primeMinisterDial.updateLeftArmPosition(this.args.dial);
    this.primeMinisterDial.updateRightArmPosition(this.args.dial);
  }

  private updateInterfaceConfirm(
    action: 'draw' | 'select',
    law?: JocoLawCardBase,
  ) {
    clearPossible();

    if (law) {
      setSelected(`law-card-${law.id}`);
    }

    updatePageTitle(
      action === 'draw'
        ? _('Draw and reveal a law?')
        : _('Bring ${lawName} up for a vote?'),
      {
        lawName: law ? _(getLawCard(law).title) : '',
      },
    );

    addConfirmButton(() => {
      performAction('actParliamentMeetsSelectLaw', {
        draw: action === 'draw',
        lawCardId: law?.id,
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

  private updatePageTitle(numberOfRevealedLaws: number) {
    switch (numberOfRevealedLaws) {
      case 0:
        updatePageTitle(_('${you} must draw and reveal a law'), {});
        break;
      case 3:
        updatePageTitle(_('${you} must select a law'), {});
        break;
      default:
        updatePageTitle(
          _('${you} must select a law or draw and reveal another'),
          {},
        );
        break;
    }
  }
}
