class Interaction {
  private static instance: Interaction;
  private game: GameAlias;
  private subscriptions: unknown[];
  private id: string;

  constructor(game: GameAlias) {
    this.game = game;
    this.subscriptions = [];
  }

  public static create(game: GameAlias) {
    Interaction.instance = new Interaction(game);
  }

  public static use() {
    return Interaction.instance;
  }

  public addPrimaryActionButton({
    id,
    text,
    callback,
    extraClasses,
  }: {
    id: string;
    text: string;
    callback: Function | string;
    extraClasses?: string;
  }) {
    if ($(id)) {
      return;
    }
    this.game
      .framework()
      .addActionButton(id, text, callback, 'customActions', false, 'blue');
    if (extraClasses) {
      dojo.addClass(id, extraClasses);
    }
  }

  addSecondaryActionButton({
    id,
    text,
    callback,
    extraClasses,
  }: {
    id: string;
    text: string;
    callback: Function | string;
    extraClasses?: string;
  }) {
    if ($(id)) {
      return;
    }
    this.game
      .framework()
      .addActionButton(id, text, callback, 'customActions', false, 'gray');
    if (extraClasses) {
      dojo.addClass(id, extraClasses);
    }
  }

  public addCancelButton(callback?: Function) {
    this.game.addCancelButton(callback);
  }

  public addConfirmButton(callback: Function) {
    this.game.addConfirmButton(callback);
  }

  public clearPossible() {
    this.game.clearPossible();
  }

  public clientUpdatePageTitle(
    text: string,
    args: Record<string, string | number | unknown>,
    nonActivePlayers: boolean = false
  ) {
    const title = this.game.format_string_recursive(_(text), args);
    if (nonActivePlayers) {
      this.game.gamedatas.gamestate.description = title;
    } else {
      this.game.gamedatas.gamestate.descriptionmyturn = title;
    }
    this.game.framework().updatePageTitle();
  }

  public formatStringRecursive(log: string, args: Record<string, unknown>): string {
    return this.game.format_string_recursive(log, args);
  }

  public onClick(node: HTMLElement, callback: Function, temporary = true) {
    this.game.onClick(node, callback, temporary);
  }

  public setSelected(node: HTMLElement) {
    if (!node) {
      return;
    }
    node.classList.add(SELECTED);
  }

  public performAction(actionName: string, args: Record<string, unknown>) {
    this.game.framework().bgaPerformAction(
      'actTakeAtomicAction',
      {
        actionName,
        args: JSON.stringify(args),
      }
      //  {lock: true, checkAction: false}
    );
  }

  public async wait(ms: number) {
    return await this.game.framework().wait(ms);
  }
}
