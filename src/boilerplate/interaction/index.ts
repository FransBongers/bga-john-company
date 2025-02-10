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

  addPrimaryActionButton({
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
    Interaction.use().addPrimaryActionButton;

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

  clientUpdatePageTitle(
    text: string,
    args: Record<string, string | number>,
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
}
