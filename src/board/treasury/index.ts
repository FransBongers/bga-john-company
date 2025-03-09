class Treasury {
  private counter: Counter;

  private element: HTMLElement;
  private minusButton: HTMLElement;
  private plusButton: HTMLElement;
  private active: boolean;

  constructor(props: {
    container: HTMLElement;
    gamedatas: GamedatasAlias;
    office: string;
    position: AbsolutePosition;
  }) {
    this.setup(props);
  }

  private setup({
    container,
    gamedatas,
    office,
    position,
  }: {
    container: HTMLElement;
    gamedatas: GamedatasAlias;
    office: string;
    position: AbsolutePosition;
  }) {
    container.insertAdjacentHTML('afterbegin', tplTreasury(office, position));

    this.element = document.getElementById(`joco-treasury-${office}`);
    this.minusButton = document.getElementById(
      `joco-treasury-${office}-minus-btn`
    );
    this.plusButton = document.getElementById(
      `joco-treasury-${office}-plus-btn`
    );

    this.counter = new ebg.counter();
    this.counter.create(`joco_${office}_treasury`);
    this.counter.setValue(gamedatas.offices[office].treasury);

    // this.element.addEventListener('click', (event: PointerEvent) => this.handleClick(event));
    this.setInactive();
    // this.element.removeEventListener('click', (event: PointerEvent) => this.handleClick(event));
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

  private handleClick(event: PointerEvent) {
    event.stopPropagation();
    event.preventDefault();
    if (!this.active) {
      return;
    }

    const target = event.target as HTMLElement;
    if (!target.classList.contains('joco-button')) {
      return;
    }

    const action = target.getAttribute('data-type');
    if (action === 'plus') {
      this.plus();
    } else if (action === 'minus') {
      this.minus();
    }
  }

  public getValue() {
    return this.counter.getValue();
  }

  public toValue(value: number) {
    return this.counter.toValue(value);
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
