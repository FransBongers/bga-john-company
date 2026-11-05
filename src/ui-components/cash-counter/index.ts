import { DISABLED } from '../../boilerplate/constants';

import { PLUS } from '../../constants';
import { tplCashCounter } from './templates';

export interface CashCounterProps {
  parent: HTMLElement;
  initialValue: number
  id: string;
  label?: string;
  buttonStyle?: 'blue' | 'gray';
}

export class CashCounter {
  private counter: Counter;

  private element: HTMLElement;
  private minusButton: HTMLElement;
  private plusButton: HTMLElement;
  private active: boolean;

  constructor(props: CashCounterProps) {
    this.setup(props);
  }

  private setup({ parent, initialValue, id, label, buttonStyle = 'blue' }: CashCounterProps) {
    parent.insertAdjacentHTML('beforeend', tplCashCounter({id, label, buttonStyle}));

    this.element = document.getElementById(`joco-cash-counter-${id}`);
    this.minusButton = document.getElementById(
      `joco-cash-counter-${id}-minus-btn`,
    );
    this.plusButton = document.getElementById(
      `joco-cash-counter-${id}-plus-btn`,
    );

    this.counter = new ebg.counter();
    this.counter.create(`joco-cash-counter-${id}-counter`);
    this.counter.setValue(initialValue);

    // // this.element.addEventListener('click', (event: PointerEvent) => this.handleClick(event));
    // this.setInactive();
    // // this.element.removeEventListener('click', (event: PointerEvent) => this.handleClick(event));
  }

  public getButtonElement(type: 'plus' | 'minus'): HTMLElement {
    return type === PLUS ? this.plusButton : this.minusButton;
  }
  public setActive() {
    this.element.setAttribute('data-active', 'true');
    this.active = true;
  }

  public setInactive() {
    this.element.setAttribute('data-active', 'false');
    this.active = false;
  }

  // private handleClick(event: PointerEvent) {
  //   event.stopPropagation();
  //   event.preventDefault();
  //   if (!this.active) {
  //     return;
  //   }

  //   const target = event.target as HTMLElement;
  //   if (!target.classList.contains('joco-button')) {
  //     return;
  //   }

  //   const action = target.getAttribute('data-type');
  //   if (action === 'plus') {
  //     this.plus();
  //   } else if (action === 'minus') {
  //     this.minus();
  //   }
  // }

  public getValue() {
    return this.counter.getValue();
  }

  public toValue(value: number) {
    return this.counter.toValue(value);
  }

  public incValue(value: number) {
    return this.counter.incValue(value);
  }

  public plus() {
    this.counter.incValue(1);
  }

  public minus() {
    this.counter.incValue(-1);
  }

  public disableButton(type: 'minus' | 'plus') {
    const elt = type === 'minus' ? this.minusButton : this.plusButton;
    elt.classList.add(DISABLED);
  }

  public enableButton(type: 'minus' | 'plus') {
    const elt = type === 'minus' ? this.minusButton : this.plusButton;
    elt.classList.remove(DISABLED);
  }
}
