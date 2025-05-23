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
      'changeOrderStatus',
      'companyOperationChairman',
      'draftCardPrivate',
      'draftNewCardsPrivate',
      'elephantMarch',
      'enlistFamilyMember',
      'fillOrder',
      'gainCash',
      'gainEnterprise',
      'makeCheck',
      'moveCompanyBalance',
      'moveCompanyDebt',
      'moveCompanyStanding',
      'moveFamilyMember',
      'moveFamilyMembers',
      'moveRegiment',
      'moveShip',
      'newCompanyShare',
      'nextPhase',
      'payFromTreasury',
      'placeShip',
      'purchaseEnterprise',
      'returnFamilyMemberToSupply',
      'seekShare',
      'setCrownClimate',
      'setupDone',
      'setupFamilyMembers',
      'transferPromiseCubes',
      'updateRegion',
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

  getPlayer(playerId: number): JocoPlayer {
    return PlayerManager.getInstance().getPlayer(playerId);
  }

  // getPlayer({ playerId }: { playerId: number }): JoCoPlayer {
  //   return this.game.playerManager.getPlayer({ playerId });
  // }

  getEnterpriseCounter(type: string) {
    const typeCounterMap = {
      [LUXURY]: LUXURIES_COUNTER,
      [SHIPYARD]: SHIPYARDS_COUNTER,
      [WORKSHOP]: WORKSHOPS_COUNTER,
    };
    return typeCounterMap[type];
  }

  async pay(playerId: number, amount: number) {
    await this.game.framework().wait(1);

    const logPound: HTMLElement = document.querySelector(
      '#pagemaintitletext .joco_pound'
    );

    const fromRect = document
      .getElementById(`joco-cash-${playerId}`)
      .getBoundingClientRect();

    const player = PlayerManager.getInstance().getPlayer(playerId);

    const promises = Array.from(Array(amount).keys()).map(async (_, index) => {
      await this.game.framework().wait(index * 150);
      player.counters[CASH_COUNTER].incValue(-1);
      const element = document.createElement('div');
      element.classList.add('log_token');
      element.classList.add('joco_pound');
      element.classList.add('animation');
      // document
      //   .getElementById(`joco-cash-${playerId}`)
      //   .insertAdjacentElement('afterbegin', element);
      logPound.insertAdjacentElement('afterbegin', element);
      await this.game.animationManager.play(
        new BgaSlideAnimation({
          element,
          transitionTimingFunction: 'ease-in-out',
          fromRect,
        })
      );
      element.remove();
    });

    await Promise.all(promises);
  }

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

  async notif_changeOrderStatus(notif: Notif<NotifChangeOrderStatus>) {
    const { order } = notif.args;
    Board.getInstance().ui.orders[order.id].setAttribute(
      'data-status',
      order.status
    );
  }

  async notif_companyOperationChairman(
    notif: Notif<NotifCompanyOperationChairman>
  ) {
    const { debtIncreased, companyDebt, treasuries, companyBalance } =
      notif.args;
    const board = Board.getInstance();
    Object.entries(treasuries).forEach(([officeId, value]) => {
      board.treasuries[officeId].toValue(value);
    });

    await Promise.all([
      board.movePawn('debt', companyDebt),
      board.movePawn('balance', companyBalance),
    ]);
  }

  async notif_draftNewCardsPrivate(
    notif: Notif<NotifDraftNewCardsPrivateArgs>
  ) {
    const { cardIds, lastCard } = notif.args;

    SetupArea.getInstance().newCards(cardIds, lastCard);
  }

  async notif_elephantMarch(notif: Notif<NotifElephantMarch>) {
    const board = Board.getInstance();
    board.updateElephant(notif.args);
    await Interaction.use().wait(500);
  }

  async notif_enlistFamilyMember(notif: Notif<NotifEnlistFamilyMember>) {
    const { familyMember, playerId } = notif.args;
    await Board.getInstance().placeFamilyMembers(
      [familyMember],
      this.getPlayer(playerId).ui[FAMILY_MEMBERS_COUNTER]
    );
  }

  async notif_fillOrder(notif: Notif<NotifFillOrder>) {
    const { familyMember, order, from } = notif.args;
    const promises: Promise<void>[] = [];
    const board = Board.getInstance();
    if (familyMember) {
      const to = familyMember.location;
      familyMember.location = from;
      promises.push(board.moveFamilyMemberBetweenLocations(familyMember, to));
    } else {
      board.ui.orders[order.id].setAttribute('data-status', FILLED);
    }
    await Promise.all(promises);
  }

  async notif_gainEnterprise(notif: Notif<NotifGainEnterprise>) {
    const { playerId, type } = notif.args;

    const player = this.getPlayer(playerId);
    player.counters[this.getEnterpriseCounter(type)].incValue(1);
    if (type === SHIPYARD) {
      player.counters[SHIPS_COUNTER].incValue(1);
    }
  }

  async notif_gainCash(notif: Notif<NotifGainCash>) {
    const { amount, playerId } = notif.args;

    // Need to wait, otherwise the token in pagemaintitletext cannot be found
    await this.game.framework().wait(1);
    // let msg = this.game.format_string_recursive(
    //   notif.log,
    //   notif.args as unknown as Record<string, unknown>
    // );
    // $('pagemaintitletext').innerHTML = msg;
    const logPound: HTMLElement = document.querySelector(
      '#pagemaintitletext .joco_pound'
    );

    const fromRect = logPound.getBoundingClientRect();

    const promises = Array.from(Array(amount).keys()).map(async (_, index) => {
      await this.game.framework().wait(index * 100);
      const element = document.createElement('div');
      element.classList.add('log_token');
      element.classList.add('joco_pound');
      element.classList.add('animation');
      document
        .getElementById(`joco-cash-${playerId}`)
        .insertAdjacentElement('afterbegin', element);
      await this.game.animationManager.play(
        new BgaSlideAnimation({
          element,
          transitionTimingFunction: 'ease-in-out',
          fromRect,
        })
      );
      element.remove();
      PlayerManager.getInstance()
        .getPlayer(playerId)
        .counters[CASH_COUNTER].incValue(1);
    });

    await Promise.all(promises);
  }

  async notif_makeCheck(notif: Notif<NotifMakeCheck>) {
    // TODO: animation
  }

  async notif_moveCompanyBalance(notif: Notif<NotifMoveCompanyBalance>) {
    const { companyBalance } = notif.args;
    const board = Board.getInstance();

    await board.movePawn('balance', companyBalance);
  }

  async notif_moveCompanyDebt(notif: Notif<NotifMoveCompanyDebt>) {
    const { companyBalance, companyDebt } = notif.args;
    const board = Board.getInstance();
    const promises = [board.movePawn('debt', companyDebt)];
    if (companyBalance) {
      promises.push(board.movePawn('balance', companyBalance));
    }

    await Promise.all(promises);
  }

  async notif_moveCompanyStanding(notif: Notif<NotifMoveCompanyStanding>) {
    const { companyStanding } = notif.args;
    const board = Board.getInstance();

    await board.movePawn('standing', companyStanding);
  }

  async notif_moveFamilyMember(notif: Notif<NotifMoveFamilyMember>) {
    const { familyMember, to } = notif.args;
    const board = Board.getInstance();

    await board.moveFamilyMemberBetweenLocations(familyMember, to);
  }

  async notif_moveFamilyMembers(notif: Notif<NotifMoveFamilyMembers>) {
    const { familyMembers } = notif.args;
    const board = Board.getInstance();
    await Promise.all(
      familyMembers.map(async (familyMember, index) =>
        board.moveFamilyMember({ familyMember, index })
      )
    );
    board.updateFamilyMembers(familyMembers);
  }

  async notif_moveRegiment(notif: Notif<NotifMoveRegiment>) {
    const { from, regiment } = notif.args;
    await Board.getInstance().moveRegimentBetweenArmies(regiment, from);
  }

  async notif_moveShip(notif: Notif<NotifMoveShipArgs>) {
    const { from, ship } = notif.args;
    await Board.getInstance().moveShip({ ship, from });
  }

  async notif_newCompanyShare(notif: Notif<NotifNewCompanyShare>) {
    const { playerId, familyMember, debt } = notif.args;

    const player = this.getPlayer(playerId);

    const board = Board.getInstance();

    await Promise.all([
      board.moveFamilyMember({ familyMember }),
      board.movePawn('debt', debt),
    ]);
    player.counters[SHARES_COUNTER].incValue(1);
  }

  async notif_nextPhase(notif: Notif<NotifNextPhase>) {
    const { phase } = notif.args;
    await Board.getInstance().movePawn('phase', phase);
  }

  async notif_payFromTreasury(notif: Notif<NotifPayFromTreasury>) {
    const { treasury, officeId } = notif.args;
    Board.getInstance().treasuries[officeId].toValue(treasury);
  }

  async notif_placeShip(notif: Notif<NotifPlaceShip>) {
    const { playerId, ship } = notif.args;
    let placedShip = ship;

    const isOtherShip = [EXTRA_SHIP, COMPANY_SHIP].includes(ship.type);

    const player = this.getPlayer(playerId);

    const board = Board.getInstance();
    if (isOtherShip) {
      placedShip = board.updateOtherShip(ship, ship.type as OtherShipType);
    } else if (!board.shipAlreadyInZone(ship.id, ship.location)) {
      player.counters[SHIPS_COUNTER].incValue(-1);
    }
    await board.placeShip(placedShip, player.ui[SHIPS_COUNTER]);
  }

  async notif_purchaseEnterprise(notif: Notif<NotifPurchaseEnterprise>) {
    const { playerId, type, amount } = notif.args;

    await this.pay(playerId, amount);

    const player = this.getPlayer(playerId);
    player.counters[this.getEnterpriseCounter(type)].incValue(1);
    if (type === SHIPYARD) {
      player.counters[SHIPS_COUNTER].incValue(1);
    }
  }

  async notif_returnFamilyMemberToSupply(
    notif: Notif<NotifReturnFamilyMemberToSupply>
  ) {
    const { familyMember, playerId } = notif.args;
    const element = Board.getInstance().ui.familyMembers[familyMember.id];
    await moveToAnimation({
      game: this.game,
      element,
      toId: `joco-familyMembers-${playerId}`,
      remove: true,
    });
    this.getPlayer(playerId).counters[FAMILY_MEMBERS_COUNTER].incValue(1);
  }

  async notif_seekShare(notif: Notif<NotifSeekShare>) {
    const { playerId, familyMember, amount } = notif.args;
    await this.pay(playerId, amount);

    await Board.getInstance().placeFamilyMembers(
      [familyMember],
      this.getPlayer(playerId).ui[FAMILY_MEMBERS_COUNTER]
    );
  }

  async notif_setCrownClimate(notif: Notif<NotifSetCrownClimate>) {
    const { climate } = notif.args;
    CrownClimate.getInstance().updateClimate(climate);
  }

  async notif_setupDone(notif: Notif<unknown>) {
    SetupArea.getInstance().hide();
  }

  async notif_setupFamilyMembers(notif: Notif<NotifSetupFamilyMembers>) {
    const { familyMembers, playerId } = notif.args;
    await Board.getInstance().placeFamilyMembers(
      familyMembers,
      this.getPlayer(playerId).ui[FAMILY_MEMBERS_COUNTER]
    );
  }

  async notif_transferPromiseCubes(notif: Notif<NotifTransferPromiseCubes>) {
    const { playerId, amount } = notif.args;
    // Player pays to crown

    const fromElement =
      amount < 0
        ? document.getElementById(`joco-promiseCubes-${playerId}`)
        : document.getElementById(`joco-promiseCubes-${CROWN_PLAYER_ID}`);
    const fromRect = fromElement.getBoundingClientRect();
    const toElement =
      amount < 0
        ? document.getElementById(`joco-promiseCubes-${CROWN_PLAYER_ID}`)
        : document.getElementById(`joco-promiseCubes-${playerId}`);

    const fromPlayer = amount < 0 ? this.getPlayer(playerId) : this.getPlayer(CROWN_PLAYER_ID);
    const toPlayer = amount < 0 ? this.getPlayer(CROWN_PLAYER_ID) : this.getPlayer(playerId);

    const promises = Array.from(Array(Math.abs(amount)).keys()).map(
      async (_, index) => {
        await this.game.framework().wait(index * 250);
        fromPlayer.counters[PROMISE_CUBES_COUNTER].incValue(-1);
        const element = document.createElement('div');
        element.classList.add('log_token');
        element.classList.add('joco-promise-cube');
        element.classList.add('animation');
        toElement.insertAdjacentElement('afterbegin', element);

        await this.game.animationManager.play(
          new BgaSlideAnimation({
            element,
            transitionTimingFunction: 'ease-in-out',
            fromRect,
          })
        );
        element.remove();
        toPlayer.counters[PROMISE_CUBES_COUNTER].incValue(1);
      }
    );

    await Promise.all(promises);
  }

  async notif_updateRegion(notif: Notif<NotifUpdateRegion>) {
    const { region } = notif.args;
    Board.getInstance().regions[region.id].update(region);
  }
}
