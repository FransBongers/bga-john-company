//  .##....##..#######..########.####.########
//  .###...##.##.....##....##.....##..##......
//  .####..##.##.....##....##.....##..##......
//  .##.##.##.##.....##....##.....##..######..
//  .##..####.##.....##....##.....##..##......
//  .##...###.##.....##....##.....##..##......
//  .##....##..#######.....##....####.##......

//  .##.....##....###....##....##....###.....######...########.########.
//  .###...###...##.##...###...##...##.##...##....##..##.......##.....##
//  .####.####..##...##..####..##..##...##..##........##.......##.....##
//  .##.###.##.##.....##.##.##.##.##.....##.##...####.######...########.
//  .##.....##.#########.##..####.#########.##....##..##.......##...##..
//  .##.....##.##.....##.##...###.##.....##.##....##..##.......##....##.
//  .##.....##.##.....##.##....##.##.....##..######...########.##.....##

const MIN_NOTIFICATION_MS = 1200;

class NotificationManager {
  private static instance: NotificationManager;
  private game: GameAlias;
  private subscriptions: unknown[];
  private id: string;

  constructor(game: GameAlias) {
    this.game = game;
    this.subscriptions = [];
  }

  public static create(game: GameAlias) {
    NotificationManager.instance = new NotificationManager(game);
  }

  public static getInstance() {
    return NotificationManager.instance;
  }

  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......

  setupNotifications() {
    console.log('notifications subscriptions setup');

    dojo.connect(this.game.framework().notifqueue, 'addToLog', () => {
      this.game.addLogClass();
    });

    /**
     * In general:
     * private is only for owning player
     * all is for both players and spectators
     * public / no suffix is for other player and spectators, not owning player
     */
    const notifs: string[] = [
      // Boilerplate
      'log',
      'message',
      // 'draftCard',
      'draftCardPrivate',
      'draftNewCardsPrivate',
      'nextPhase',
      'setupCash',
      'setupFamilyMembers',
    ];

    // example: https://github.com/thoun/knarr/blob/main/src/knarr.ts
    notifs.forEach((notifName) => {
      this.subscriptions.push(
        dojo.subscribe(notifName, this, (notifDetails: Notif<unknown>) => {
          debug(`notif_${notifName}`, notifDetails); // log notif params (with Tisaac log method, so only studio side)

          const promise = this[`notif_${notifName}`](notifDetails);
          const promises = promise ? [promise] : [];
          let minDuration = 1;

          // Show log messags in page title
          let msg = this.game.format_string_recursive(
            notifDetails.log,
            notifDetails.args as Record<string, unknown>
          );
          // TODO: check if this clearPossible causes any issues?
          // this.game.clearPossible();
          if (msg != '') {
            $('gameaction_status').innerHTML = msg;
            $('pagemaintitletext').innerHTML = msg;
            $('generalactions').innerHTML = '';

            // If there is some text, we let the message some time, to be read
            minDuration = MIN_NOTIFICATION_MS;
          }

          // Promise.all([...promises, sleep(minDuration)]).then(() =>
          //   this.game.framework().notifqueue.onSynchronousNotificationEnd()
          // );
          // tell the UI notification ends, if the function returned a promise.
          if (this.game.animationManager.animationsActive()) {
            Promise.all([...promises, sleep(minDuration)]).then(() =>
              this.game.framework().notifqueue.onSynchronousNotificationEnd()
            );
          } else {
            // TODO: check what this does
            this.game.framework().notifqueue.setSynchronousDuration(0);
          }
        })
      );
      this.game.framework().notifqueue.setSynchronous(notifName, undefined);

      ['draftCard'].forEach((notifId) => {
        this.game
          .framework()
          .notifqueue.setIgnoreNotificationCheck(
            notifId,
            (notif: Notif<{ playerId: number }>) =>
              notif.args.playerId == this.game.getPlayerId()
          );
      });
    });
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  destroy() {
    dojo.forEach(this.subscriptions, dojo.unsubscribe);
  }

  // getPlayer({ playerId }: { playerId: number }): JoCoPlayer {
  //   return this.game.playerManager.getPlayer({ playerId });
  // }

  // .##....##..#######..########.####.########..######.
  // .###...##.##.....##....##.....##..##.......##....##
  // .####..##.##.....##....##.....##..##.......##......
  // .##.##.##.##.....##....##.....##..######....######.
  // .##..####.##.....##....##.....##..##.............##
  // .##...###.##.....##....##.....##..##.......##....##
  // .##....##..#######.....##....####.##........######.

  async notif_log(notif: Notif<unknown>) {
    // this is for debugging php side
    debug('notif_log', notif.args);
  }

  async notif_message(notif: Notif<unknown>) {
    // Only here so messages get displayed in title bar
  }

  async notif_draftCardPrivate(notif: Notif<NotifDraftCardPrivateArgs>) {
    const { cardIds } = notif.args;

    await Promise.all(
      cardIds.map(async (cardId, index) => {
        // await Interaction.use().wait(index * 100);
        await this.game.animationManager.attachWithAnimation(
          new BgaSlideAnimation({ element: document.getElementById(cardId) }),
          document.getElementById('joco_chosen_cards')
        );
      })
    );
  }

  async notif_draftNewCardsPrivate(
    notif: Notif<NotifDraftNewCardsPrivateArgs>
  ) {
    const { cardIds, lastCard } = notif.args;

    SetupArea.getInstance().newCards(cardIds, lastCard);
    // document.getElementById('joco_draft_cards').replaceChildren();
    // const draftCards = newHand.map((id) => tplSetupCard(id));

    // if (newHand.length > 0) {
    //   document
    //     .getElementById('joco_draft_cards')
    //     .insertAdjacentHTML('afterbegin', draftCards.join(''));
    // }

    // this.game.animationManager.attachWithAnimation({}, document.getElementById('joco_setup_cards'))
  }

  async notif_nextPhase(notif: Notif<NotifNextPhase>) {
    const { phase } = notif.args;
    Board.getInstance().movePhasePawn(phase);
  }

  async notif_setupCash(notif: Notif<NotifSetupCash>) {
    const { amount, playerId } = notif.args;

    // let msg = this.game.format_string_recursive(
    //   notif.log,
    //   notif.args as unknown as Record<string, unknown>
    // );

    // $('pagemaintitletext').innerHTML = msg;
    // // // TODO: figure out why it's not possible to get element from pagetitle here
    // // // const logPound: HTMLElement = document.querySelector('#pagemaintitletext > .joco_pound');
    // // const logPound = document.getElementById('generalactions');
    // const logPound: HTMLElement = document.querySelector('#pagemaintitletext .joco_pound');
    // logPound.style.border = '2px solid red';
    // console.log('logPound', logPound);
    // const items = [];
    // for (let i = 0; i < amount; i++) {
    //   items.push(i);
    // }
    // await Promise.all(
    //   items.map(async (index) => {
    //     await this.game.framework().wait(index * 100);
    //     if (logPound) {
    //       console.log('logPound 2',logPound);
    //       const element = document.createElement('div');
    //       element.classList.add('log_token');
    //       element.classList.add('joco_pound');
    //       element.classList.add('animation');
    //       // element.style.position = 'absolute';
          
    //       logPound.insertAdjacentElement('afterbegin', element);
    //       await moveToAnimation({
    //         game: this.game,
    //         element,
    //         toId: `player_board_${playerId}`,
    //         remove: true,
    //       });
    //     }
    //   })
    // );
  }

  async notif_setupFamilyMembers(notif: Notif<NotifSetupFamilyMembers>) {
    const { familyMembers, playerId } = notif.args;
    await Board.getInstance().placeFamilyMembers(
      familyMembers,
      document.getElementById(`player_board_${playerId}`)
    );
  }
}
