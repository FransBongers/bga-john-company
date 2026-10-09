import {
  AbsolutePosition,
  formatStringRecursive,
  getPlayerName,
} from '../../boilerplate';
import { getPolicyConsequenceTranslation } from '../../icons/templates';
import { GamedatasAlias } from '../../types';
import { PRIME_MINISTER_DIAL, PrimeMinisterDialItem } from './config';

export interface PrimeMinisterDialProps {
  parent: HTMLElement;
  gamedatas: GamedatasAlias;
}

export class PrimeMinisterDial {
  private ui: {
    dial: HTMLElement;
    arm: HTMLElement;
    armLeft: HTMLElement;
    armRight: HTMLElement;
    playerName: HTMLElement;
  };
  private armRotation?: number;
  private leftArmRotation?: number;
  private rightArmRotation?: number;

  constructor(private props: PrimeMinisterDialProps) {
    this.setup(this.props.gamedatas);
  }

  private setupText() {
    PRIME_MINISTER_DIAL.forEach((item, index) => {
      this.ui.dial.insertAdjacentHTML('beforeend', this.tplText(item));
    });
  }

  private setup(gamedatas: GamedatasAlias) {
    this.props.parent.insertAdjacentHTML(
      'beforeend',
      this.tplPrimeMinisterDial(),
    );

    this.ui = {
      dial: document.getElementById('joco-prime-minister-dial'),
      arm: document.getElementById('joco-prime-minister-arm'),
      armLeft: document.getElementById('joco-prime-minister-left'),
      armRight: document.getElementById('joco-prime-minister-right'),
      playerName: document.getElementById('joco-prime-minister-player-name'),
    };

    this.setupText();
    // this.setupSupportCounter(gamedatas);

    this.updateArmPosition(gamedatas.parliament.dial);
    this.updatePlayerName(gamedatas.parliament.primeMinister.playerId);
  }

  private tplPrimeMinisterDial(): string {
    return `
      <div id="joco-prime-minister-dial" class="prime-minister-dial">
        <div class="joco-prime-minister-title bga-autofit">
          <span class="fb-font-parisienne fb-font-20">${_('Prime Minister')}</span>
        </div>
        <div class="joco-prime-minister-player-name bga-autofit">
          <span id="joco-prime-minister-player-name" class="fb-font-12"></span>
        </div>
        <div id="joco-prime-minister-left" class="prime-minister-arm hidden"></div>
        <div id="joco-prime-minister-arm" class="prime-minister-arm"></div>
        <div id="joco-prime-minister-right" class="prime-minister-arm hidden"></div>
        
      </div>
    `;
  }

  private tplText({
    consequence,
    position,
    rotation,
    windowTax,
  }: PrimeMinisterDialItem): string {
    return `
      <div class="joco-prime-minister-dial-text" style="transform: rotate(${rotation}deg); left: ${position.left}px; top: ${position.top}px;">
        <div class="joco-consequence bga-autofit">
          <span class="fb-font-baskerville fb-font-16">${getPolicyConsequenceTranslation(consequence).toLocaleUpperCase()}</span>
          ${windowTax ? `<span class="fb-font-baskerville fb-font-16">&</span>` : ''}
        </div>
        ${
          windowTax
            ? `<div class="joco-window-tax bga-autofit">
                <span class="fb-font-baskerville fb-font-8">${_('Window Tax').toLocaleUpperCase()}</span>
              </div>`
            : ''
        }
    
      </div>
    `;
  }

  private updatePlayerName(playerId: number) {
    this.ui.playerName.replaceChildren();
    this.ui.playerName.insertAdjacentHTML(
      'beforeend',
      formatStringRecursive('${tkn_playerName}', {
        tkn_playerName: getPlayerName(playerId),
      }),
    );
  }

  private getRotationForPosition(
    position: number,
    currentRotation?: number,
  ): number {
    const targetRotation = 11 + position * (360 / 14);
    if (currentRotation === undefined) {
      return targetRotation;
    }

    return (
      targetRotation +
      360 * Math.round((currentRotation - targetRotation) / 360)
    );
  }

  private setRotation(elt: HTMLElement, degrees: number) {
    elt.style.transform = `translate(-50%, -50%) rotate(${degrees}deg)`;
  }

  public updateArmPosition(position: number) {
    this.armRotation = this.getRotationForPosition(position, this.armRotation);
    this.setRotation(this.ui.arm, this.armRotation);
  }

  public updateRightArmPosition(position: number) {
    this.rightArmRotation = this.getRotationForPosition(
      position,
      this.rightArmRotation,
    );
    this.setRotation(this.ui.armRight, this.rightArmRotation);
  }

  public updateLeftArmPosition(position: number) {
    this.leftArmRotation = this.getRotationForPosition(
      position,
      this.leftArmRotation,
    );
    this.setRotation(this.ui.armLeft, this.leftArmRotation);
  }

  public showConsequenceOptions(show: boolean) {
    if (show) {
      this.ui.armLeft.classList.remove('hidden');
      this.ui.armRight.classList.remove('hidden');
    } else {
      this.ui.armLeft.classList.add('hidden');
      this.ui.armRight.classList.add('hidden');
    }
  }
}
