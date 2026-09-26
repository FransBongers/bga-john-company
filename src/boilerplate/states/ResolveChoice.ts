import { SECONDARY } from '../constants';
import { GameAlias } from '../../types';
import { Interaction } from '../interaction';
import { CommonStateArgs, GameState } from '../types';
import {
  addPrimaryActionButton,
  addSecondaryActionButton,
  addUndoButtons,
  debug,
  updatePageTitle,
} from '../utility';
import { Log } from '../notification-manager/types';

interface ChoiceArgs {
  id: number;
  args: {
    action: string;
    optionalAction: boolean;
  };
  description: string | Log;
  descriptionmyturn: string | Log;
  optionalAction: boolean;
  source: unknown | null;
  sourceId: string | null;
}

interface OnEnteringResolveChoiceArgs extends CommonStateArgs {
  allChoices: Record<number, ChoiceArgs>;
  choices: Record<number, ChoiceArgs>;
  descSuffix: 'xor'; // Can be removed
  buttonType: 'primary' | 'secondary';
  description?: string;
}

export class ResolveChoice implements GameState<OnEnteringResolveChoiceArgs> {
  private static instance: ResolveChoice;
  private args!: OnEnteringResolveChoiceArgs;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    ResolveChoice.instance = new ResolveChoice(game);
  }

  public static getInstance() {
    return ResolveChoice.instance;
  }

  onEnteringState(args: OnEnteringResolveChoiceArgs) {
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving ResolveChoiceState');
  }

  setDescription(activePlayerId: number, args: OnEnteringResolveChoiceArgs) {
    this.args = args;
    if (this.args.description && typeof this.args.description === 'string') {
      updatePageTitle(_(this.args.description));
    } else if (
      this.args.description &&
      typeof this.args.description === 'object'
    ) {
      // @ts-expect-error
      updatePageTitle(_(this.args.description.log), this.args.description.args);
    }
    // this.game.clientUpdatePageTitle({
    //   text: _("${player_name} must confirm or restart their turn"),
    //   args: {
    //     player_name: this.game.playerManager.getPlayer({playerId: activePlayerId}).getName()
    //   },
    //   nonActivePlayers: true,
    // });
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

    if (this.args.description && typeof this.args.description === 'string') {
      updatePageTitle(_(this.args.description));
    } else if (
      this.args.description &&
      typeof this.args.description === 'object'
    ) {
      // @ts-expect-error
      updatePageTitle(_(this.args.description.log), this.args.description.args);
    } else {
      updatePageTitle(
        this.args.optionalAction
          ? _('${you} may choose')
          : _('${you} must choose'),
      );
    }

    Object.values(this.args.choices).forEach((choice) => {
      this.addChoiceActionButton(choice);
    });
    Object.values(this.args.allChoices).forEach((choice) => {
      this.addChoiceActionButton(choice, true);
    });
    // addConfirmButton(() =>
    //   this.game.framework().bgaPerformAction('actResolveChoice')
    // );
    addUndoButtons(this.args);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private addChoiceActionButton(choice: ChoiceArgs, disabled = false) {
    const eltId = `choice_btn_${choice.id}`;

    if (document.getElementById(eltId)) {
      return;
    }

    const button =
      this.args.buttonType === SECONDARY || choice.id === 99 // 99 is pass
        ? addSecondaryActionButton
        : addPrimaryActionButton;

    button({
      id: eltId,
      text:
        typeof choice.description === 'string'
          ? _(choice.description)
          : Interaction.use().formatStringRecursive(
              _(choice.description.log),
              choice.description.args,
            ),
      extraClasses: disabled ? 'disabled' : '',
      callback: () => {
        const choiceId = choice.id;
        this.game.bga.actions.performAction('actChooseAction', {
          choiceId: choice.id,
        });
      },
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
