class Bar {
  private static instance: Bar;
  private game: GameAlias;

  private ui: {
    tabs: Record<string, HTMLElement>;
    barButtons: HTMLElement[];
  } = {
    tabs: {},
    barButtons: [],
  };
  private active: number = 0;

  private config = [
    {
      id: 'joco-board',
      text: _('Board'),
    },
    {
      id: 'joco-player-areas',
      text: _('Player Areas'),
    },
    {
      id: 'joco-negotiation',
      text: _('Negotiation'),
    },
  ];

  constructor(game: GameAlias) {
    this.game = game;
    this.setup(game.gamedatas);
  }

  public static create(game: GameAlias) {
    Bar.instance = new Bar(game);
  }

  public static getInstance() {
    return Bar.instance;
  }

  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......

  // Setup functions
  setup(gamedatas: GamedatasAlias) {
    const bar = document.getElementById('joco-bar');
    console.log('active', this.active);
    this.config.forEach(({ id, text }, index) => {
      bar.insertAdjacentHTML('beforeend', tplTabButton(text, index));
      this.ui.barButtons.push(document.getElementById(`joco-bar-item-${index}`));
      this.ui.tabs[id] = document.getElementById(id);
      console.log('id', id);
      if (index === this.active) {
        this.ui.barButtons[index].classList.add('joco-bar-item-active');
        this.ui.tabs[id].classList.add('joco-tab-visible');
      } else {
        this.ui.tabs[id].classList.add('joco-tab-hidden');
      }
    });

    bar.addEventListener('click', (event: PointerEvent) => this.onIconClick(event))
  }

  // .##.....##.########..########.....###....########.########....##.....##.####
  // .##.....##.##.....##.##.....##...##.##......##....##..........##.....##..##.
  // .##.....##.##.....##.##.....##..##...##.....##....##..........##.....##..##.
  // .##.....##.########..##.....##.##.....##....##....######......##.....##..##.
  // .##.....##.##........##.....##.#########....##....##..........##.....##..##.
  // .##.....##.##........##.....##.##.....##....##....##..........##.....##..##.
  // ..#######..##........########..##.....##....##....########.....#######..####

  private onIconClick(event: PointerEvent) {
    const target = event.target as HTMLElement;
    if (!target.classList.contains('joco-bar-item')) {
      return;
    }

    const index = Number(target.id.split('-')[3]);
    this.updateActive();
    this.active = index;
    this.updateActive();
  }

  private updateActive() {
    const tab = this.ui.tabs[this.config[this.active].id];
    tab.classList.toggle('joco-tab-visible');
    tab.classList.toggle('joco-tab-hidden');
    this.ui.barButtons[this.active].classList.toggle('joco-bar-item-active');
  }
}
