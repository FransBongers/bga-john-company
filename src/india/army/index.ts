import { parentHasChildWithId } from '../../boilerplate';
import { BENGAL, BOMBAY, MADRAS } from '../../constants';
import { createFamilyMember, tplFamilyMemberSpot } from '../../templates';
import { GameAlias, GamedatasAlias } from '../../types';

import { tplRegiment } from './templates';

export interface ArmyProps {
  parentElement: HTMLElement | string;
  id: string;
  gamedatas: GamedatasAlias;
  game: GameAlias;
}

export class Army {
  protected ui: {
    parent: HTMLElement;
    army: {
      ready: HTMLElement;
      exhausted: HTMLElement;
    };
    commander: HTMLElement;
  };
  private id: string;
  private game: GameAlias;

  constructor(config: ArmyProps) {
    this.id = config.id;
    this.game = config.game;
    this.setup(config);
  }

  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......

  private setup(config: ArmyProps) {
    const parentElement =
      typeof config.parentElement === 'string'
        ? document.getElementById(config.parentElement)
        : config.parentElement;

    if (!parentElement) {
      throw new Error('FE_ARMY_01');
    }

    parentElement.insertAdjacentHTML('beforeend', this.tplArmy());

    this.ui = {
      parent: parentElement,
      army: {
        ready: document.getElementById(
          `joco-army-${this.id.toLocaleLowerCase()}-ready`,
        ) as HTMLElement,
        exhausted: document.getElementById(
          `joco-army-${this.id.toLocaleLowerCase()}-exhausted`,
        ) as HTMLElement,
      },
      commander: document.getElementById(`Commander_${this.id}`) as HTMLElement,
    };

    this.addPieces(config.gamedatas);
    this.updateFamilyMembers(config.gamedatas);
  }

  private tplArmy() {
    return `
      <div id="ArmyOf${this.id}" class="joco-army joco-container">
        <div class="joco-inner-container">
          <div><span class="fb-font-baskerville fb-font-12">${_('Ready pieces').toLocaleUpperCase()}</span></div>
          <div id="joco-army-${this.id.toLocaleLowerCase()}-ready" class="joco-army-stock"></div>
        </div>
        <div class="joco-army-banner joco-background-${this.id.toLocaleLowerCase()}">${tplFamilyMemberSpot(`Commander_${this.id}`)}<span class="fb-font-baskerville fb-font-16">${this.getName().toLocaleUpperCase()}</span></div>
        <div class="joco-inner-container">
          <div id="joco-army-${this.id.toLocaleLowerCase()}-exhausted" class="joco-army-stock"></div>
          <div><span class="fb-font-baskerville fb-font-12">${_('Exhausted pieces').toLocaleUpperCase()}</span></div>
        </div>
      </div>
    `;
  }

  // .##.....##.########..########.....###....########.########....##.....##.####
  // .##.....##.##.....##.##.....##...##.##......##....##..........##.....##..##.
  // .##.....##.##.....##.##.....##..##...##.....##....##..........##.....##..##.
  // .##.....##.########..##.....##.##.....##....##....######......##.....##..##.
  // .##.....##.##........##.....##.#########....##....##..........##.....##..##.
  // .##.....##.##........##.....##.##.....##....##....##..........##.....##..##.
  // ..#######..##........########..##.....##....##....########.....#######..####

  public addPieces(gamedatas: GamedatasAlias) {
    Object.values(gamedatas.armyPieces).forEach((piece) => {
      if (piece.location !== `Army_${this.id}`) {
        return;
      }
      const parent = piece.exhausted
        ? this.ui.army.exhausted
        : this.ui.army.ready;
      parent.insertAdjacentHTML('beforeend', tplRegiment({ id: piece.id }));
    });
  }

  public updateFamilyMembers(gamedatas: GamedatasAlias) {
    // Writers
    Object.values(gamedatas.familyMembers).forEach((member) => {
      if (member.location === `Army_${this.id}`) {
        // Officers
        const officerElement = createFamilyMember(member.familyId, member.id);
        this.ui.army.ready.appendChild(officerElement);
      } else if (member.location === `Commander_${this.id}`) {
        // Commander
        const commanderElement = createFamilyMember(member.familyId, member.id);
        this.ui.commander.appendChild(commanderElement);
      }
    });
  }

  // .##.....##.########.####.##.......####.########.##....##
  // .##.....##....##.....##..##........##.....##.....##..##.
  // .##.....##....##.....##..##........##.....##......####..
  // .##.....##....##.....##..##........##.....##.......##...
  // .##.....##....##.....##..##........##.....##.......##...
  // .##.....##....##.....##..##........##.....##.......##...
  // ..#######.....##....####.########.####....##.......##...

  public getName() {
    switch (this.id) {
      case BENGAL:
        return 'Army of Bengal';
      case BOMBAY:
        return 'Army of Bombay';
      case MADRAS:
        return 'Army of Madras';
      default:
        return '';
    }
  }

  public async addPiece(piece: HTMLElement | string) {
    const element =
      typeof piece === 'string' ? document.getElementById(piece) : piece;
    if (parentHasChildWithId(this.ui.army.ready.id, element.id)) {
      return;
    }
    await this.game.animationManager.slideAndAttach(
      element,
      this.ui.army.ready,
    );
  }
}
