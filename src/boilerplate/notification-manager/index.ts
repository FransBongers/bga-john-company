//  .##....##..#######..########.####.########
//  .###...##.##.....##....##.....##..##......
//  .####..##.##.....##....##.....##..##......
//  .##.##.##.##.....##....##.....##..######..
//  .##..####.##.....##....##.....##..##......
//  .##...###.##.....##....##.....##..##......
//  .##....##..#######.....##....####.##......

import { Board } from '../../board';
import { Company } from '../../company';

import {
  LUXURY,
  LUXURIES_COUNTER,
  SHIPYARD,
  SHIPYARDS_COUNTER,
  WORKSHOP,
  WORKSHOPS_COUNTER,
  CASH_COUNTER,
  FAMILY_MEMBERS_COUNTER,
  FILLED,
  SHIPS_COUNTER,
  SHARES_COUNTER,
  EXTRA_SHIP,
  COMPANY_SHIP,
  CROWN_PLAYER_ID,
  PROMISE_CUBES_COUNTER,
  COLOR_FAMILY_MAP,
  CROWN,
  HEX_COLOR_COLOR_MAP,
  COURT_OF_DIRECTORS,
  CHAIRMAN,
} from '../../constants';
import { CrownClimate } from '../../crown/climate';
import { India } from '../../india';
import { PlayerAreas } from '../../player-areas';
import { PlayerManager } from '../../player-manager';
import { JocoPlayer } from '../../player-manager/player';
import { SetupArea } from '../../setup-area';
import { createFamilyMember } from '../../templates';
import { GameAlias, JocoFamilyMember, OtherShipType } from '../../types';
import { getEnterpriseCard } from '../../utility';
import { Interaction } from '../interaction';
import { debug, parentHasChildWithId } from '../utility';
import {
  NotifAllocateBalanceToOffice,
  NotifChangeOrderStatus,
  NotifCompanyOperationChairman,
  NotifDraftCardPrivateArgs,
  NotifDraftNewCardsPrivateArgs,
  NotifElephantMarch,
  NotifEnlistFamilyMember,
  NotifFillOrder,
  NotifGainCash,
  NotifGainEnterprise,
  NotifMakeCheck,
  NotifMoveCompanyBalance,
  NotifMoveCompanyDebt,
  NotifMoveCompanyStanding,
  NotifMoveFamilyMember,
  NotifMoveFamilyMembers,
  NotifMoveRegiment,
  NotifMoveShipArgs,
  NotifNewCompanyShare,
  NotifNextPhase,
  NotifPayFromTreasury,
  NotifPlaceShip,
  NotifPurchaseEnterprise,
  NotifReturnFamilyMemberToSupply,
  NotifSeekShare,
  NotifSetCrownClimate,
  NotifSetupFamilyMembers,
  NotifTransferPromiseCubes,
  NotifUpdateRegion,
} from './types';

//  .##.....##....###....##....##....###.....######...########.########.
//  .###...###...##.##...###...##...##.##...##....##..##.......##.....##
//  .####.####..##...##..####..##..##...##..##........##.......##.....##
//  .##.###.##.##.....##.##.##.##.##.....##.##...####.######...########.
//  .##.....##.#########.##..####.#########.##....##..##.......##...##..
//  .##.....##.##.....##.##...###.##.....##.##....##..##.......##....##.
//  .##.....##.##.....##.##....##.##.....##..######...########.##.....##

const MIN_NOTIFICATION_MS = 1200;

export class NotificationManager {
  private static instance: NotificationManager;
  private game: GameAlias;
  // private subscriptions: unknown[];

  constructor(game: GameAlias) {
    this.game = game;
    // this.subscriptions = [];
  }

  // public static create(game: GameAlias) {
  //   NotificationManager.instance = new NotificationManager(game);
  // }

  // public static getInstance() {
  //   return NotificationManager.instance;
  // }

  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......

  setupNotifications() {
    this.game.bga.notifications.setupPromiseNotifications({
      prefix: 'notif_', // default is 'notif_'
      minDuration: 1200, // for longer animations (500 by default)
      minDurationNoText: 1,
      handlers: [this.game.notificationManager], // if you write your notif function in a subclass instead of this (default this)
      logger: debug, // show notif debug informations on console. Could be console.warn or any custom debug function (default null = no logs)
      // ignoreNotifications: ['updateAutoPlay'], // the notif_updateAutoPlay function will be ignored by bgaSetupPromiseNotifications. You'll need to subscribe to it manually
      onStart: (notifName: string, msg: string, args: any) => {
        if (msg != '') {
          $('gameaction_status').innerHTML = msg;
          $('pagemaintitletext').innerHTML = msg;
          $('generalactions').innerHTML = '';

          // If there is some text, we let the message some time, to be read
        }
        // this.game.bga.statusBar.setTitle(msg);
      },
    });
  }

  // setupNotifications() {
  //   console.log('notifications subscriptions setup');

  //   dojo.connect(this.game.framework().notifqueue, 'addToLog', () => {
  //     this.game.addLogClass();
  //   });

  //   /**
  //    * In general:
  //    * private is only for owning player
  //    * all is for both players and spectators
  //    * public / no suffix is for other player and spectators, not owning player
  //    */
  //   const notifs: string[] = [
  //     // Boilerplate
  //     'log',
  //     'message',
  //     // 'draftCard',
  //     'allocateBalanceToOffice',
  //     'changeOrderStatus',
  //     'companyOperationChairman',
  //     'draftCardPrivate',
  //     'draftNewCardsPrivate',
  //     'elephantMarch',
  //     'enlistFamilyMember',
  //     'fillOrder',
  //     'gainCash',
  //     'gainEnterprise',
  //     'makeCheck',
  //     'moveCompanyBalance',
  //     'moveCompanyDebt',
  //     'moveCompanyStanding',
  //     'moveFamilyMember',
  //     'moveFamilyMembers',
  //     'moveRegiment',
  //     'moveShip',
  //     'newCompanyShare',
  //     'nextPhase',
  //     'payFromTreasury',
  //     'placeShip',
  //     'purchaseEnterprise',
  //     'returnFamilyMemberToSupply',
  //     'seekShare',
  //     'setCrownClimate',
  //     'setupDone',
  //     'setupFamilyMembers',
  //     'transferPromiseCubes',
  //     'updateRegion',
  //   ];

  //   // example: https://github.com/thoun/knarr/blob/main/src/knarr.ts
  //   notifs.forEach((notifName) => {
  //     this.subscriptions.push(
  //       dojo.subscribe(notifName, this, (notifDetails: Notif<unknown>) => {
  //         debug(`notif_${notifName}`, notifDetails); // log notif params (with Tisaac log method, so only studio side)

  //         const promise = this[`notif_${notifName}`](notifDetails);
  //         const promises = promise ? [promise] : [];
  //         let minDuration = 1;

  //         // Show log messags in page title
  //         let msg = this.game.format_string_recursive(
  //           notifDetails.log,
  //           notifDetails.args as Record<string, unknown>,
  //         );
  //         // TODO: check if this clearPossible causes any issues?
  //         // this.game.clearPossible();
  //         if (msg != '') {
  //           $('gameaction_status').innerHTML = msg;
  //           $('pagemaintitletext').innerHTML = msg;
  //           $('generalactions').innerHTML = '';

  //           // If there is some text, we let the message some time, to be read
  //           minDuration = MIN_NOTIFICATION_MS;
  //         }

  //         // Promise.all([...promises, sleep(minDuration)]).then(() =>
  //         //   this.game.framework().notifqueue.onSynchronousNotificationEnd()
  //         // );
  //         // tell the UI notification ends, if the function returned a promise.
  //         if (this.game.animationManager.animationsActive()) {
  //           Promise.all([...promises, sleep(minDuration)]).then(() =>
  //             this.game.framework().notifqueue.onSynchronousNotificationEnd(),
  //           );
  //         } else {
  //           // TODO: check what this does
  //           this.game.framework().notifqueue.setSynchronousDuration(0);
  //         }
  //       }),
  //     );
  //     this.game.framework().notifqueue.setSynchronous(notifName, undefined);

  //     ['draftCard'].forEach((notifId) => {
  //       this.game
  //         .framework()
  //         .notifqueue.setIgnoreNotificationCheck(
  //           notifId,
  //           (notif: Notif<{ playerId: number }>) =>
  //             notif.args.playerId == this.game.getPlayerId(),
  //         );
  //     });
  //   });
  // }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  // destroy() {
  //   // @ts-ignore
  //   dojo.forEach(this.subscriptions, dojo.unsubscribe);
  // }

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
    await Interaction.use().wait(1);

    const logPound: HTMLElement = document.querySelector(
      '#pagemaintitletext .joco_pound',
    );

    const playerCashElt = document.getElementById(`joco-cash-${playerId}`);

    const player = PlayerManager.getInstance().getPlayer(playerId);

    const promises = Array.from(Array(amount).keys()).map(async (_, index) => {
      await Interaction.use().wait(index * 150);
      player.counters[CASH_COUNTER].incValue(-1);
      const element = document.createElement('div');
      element.classList.add('log_token');
      element.classList.add('joco_pound');
      element.classList.add('animation');
      // document
      //   .getElementById(`joco-cash-${playerId}`)
      //   .insertAdjacentElement('afterbegin', element);
      logPound.insertAdjacentElement('afterbegin', element);
      await this.game.animationManager.slideIn(element, playerCashElt);

      element.remove();
    });

    await Promise.all(promises);
  }

  async placeFamilyMembers(
    familyMembers: JocoFamilyMember[],
    fromElement: HTMLElement,
  ) {
    const promises = familyMembers.map(async (familyMember, index) => {
      const { id, familyId, location } = familyMember;
      const player = PlayerManager.getInstance().getPlayerForFamily(familyId);
      await Interaction.use().wait(index * 200);

      const elt = createFamilyMember(familyId, id);
      document.getElementById(location)?.appendChild(elt);
      player.counters[FAMILY_MEMBERS_COUNTER].incValue(-1);

      await this.game.animationManager.slideIn(elt, fromElement);
      // await this.game.animationManager.play(
      //   new BgaSlideAnimation({
      //     element: this.ui.familyMembers[id],
      //     transitionTimingFunction: 'ease-in-out',
      //     fromRect,
      //   }),
      // );
      if (location === COURT_OF_DIRECTORS || location === CHAIRMAN) {
        player.counters[SHARES_COUNTER].incValue(1);
      }
    });
    await Promise.all(promises);
  }

  async moveFamilyMember(familyMember: JocoFamilyMember) {
    const { id, location } = familyMember;

    const elt = document.getElementById(id);

    if (location.startsWith('Army')) {
      const regionId = location.split('_')[1];
      India.getInstance().getArmy(regionId).addPiece(elt);
    } else {
      const locationElt = document.getElementById(location);
      await this.game.animationManager.slideAndAttach(elt, locationElt);
    }
  }

  // .##....##..#######..########.####.########..######.
  // .###...##.##.....##....##.....##..##.......##....##
  // .####..##.##.....##....##.....##..##.......##......
  // .##.##.##.##.....##....##.....##..######....######.
  // .##..####.##.....##....##.....##..##.............##
  // .##...###.##.....##....##.....##..##.......##....##
  // .##....##..#######.....##....####.##........######.

  async notif_log(notif: unknown) {
    // this is for debugging php side
    debug('notif_log', notif);
  }

  async notif_message(notif: unknown) {
    // Only here so messages get displayed in title bar
  }

  // TODO: make private notif
  async notif_draftCardPrivate(notif: NotifDraftCardPrivateArgs) {
    const { cardIds } = notif;

    await Promise.all(
      cardIds.map(async (cardId, index) => {
        // await Interaction.use().wait(index * 100);
        await this.game.animationManager.slideAndAttach(
          document.getElementById(cardId),
          document.getElementById('joco_chosen_cards'),
        );
      }),
    );
  }

  async notif_allocateBalanceToOffice(notif: NotifAllocateBalanceToOffice) {
    const { companyBalance, officeTreasury, officeId } = notif;

    const board = Board.getInstance();
    board.treasuries[officeId].toValue(officeTreasury);

    await board.movePawn('balance', companyBalance);
  }

  async notif_changeOrderStatus(notif: NotifChangeOrderStatus) {
    const { order } = notif;
    India.getInstance().ui.orders[order.id].setAttribute(
      'data-status',
      order.status,
    );
  }

  async notif_companyOperationChairman(notif: NotifCompanyOperationChairman) {
    const { debtIncreased, companyDebt, treasuries, companyBalance } = notif;
    const company = Company.getInstance();
    const companyTreasuries = Company.getInstance().treasuries;
    Object.entries(treasuries).forEach(([officeId, value]) => {
      companyTreasuries[officeId].toValue(value);
    });

    company.balance.toValue(companyBalance);
    company.updateCompanyDebt(companyDebt);
  }

  async notif_draftNewCardsPrivate(notif: NotifDraftNewCardsPrivateArgs) {
    const { cardIds, lastCard } = notif;

    SetupArea.getInstance().newCards(cardIds, lastCard);
  }

  async notif_elephantMarch(notif: NotifElephantMarch) {
    India.getInstance().updateElephant(notif);
    await Interaction.use().wait(500);
  }

  async notif_enlistFamilyMember(notif: NotifEnlistFamilyMember) {
    const { familyMember, playerId } = notif;

    await this.placeFamilyMembers(
      [familyMember],
      this.getPlayer(playerId).ui[FAMILY_MEMBERS_COUNTER],
    );
  }

  async notif_fillOrder(notif: NotifFillOrder) {
    const { familyMember, order, from } = notif;
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

  async notif_gainEnterprise(notif: NotifGainEnterprise) {
    const { playerId, type } = notif;

    const player = this.getPlayer(playerId);
    player.counters[this.getEnterpriseCounter(type)].incValue(1);
    if (type === SHIPYARD) {
      player.counters[SHIPS_COUNTER].incValue(1);
    }
  }

  async notif_gainCash(notif: NotifGainCash) {
    const { amount, playerId } = notif;

    // Need to wait, otherwise the token in pagemaintitletext cannot be found
    await Interaction.use().wait(1);
    // let msg = this.game.format_string_recursive(
    //   notif.log,
    //   notif.args as unknown as Record<string, unknown>
    // );
    // $('pagemaintitletext').innerHTML = msg;
    const logPound: HTMLElement = document.querySelector(
      '#pagemaintitletext .joco_pound',
    );

    const promises = Array.from(Array(amount).keys()).map(async (_, index) => {
      await Interaction.use().wait(index * 100);

      const element = document.createElement('div');
      element.classList.add('log_token');
      element.classList.add('joco_pound');
      element.classList.add('animation');
      document
        .getElementById(`joco-cash-${playerId}`)
        .insertAdjacentElement('afterbegin', element);
      await this.game.animationManager.slideIn(element, logPound);

      element.remove();
      PlayerManager.getInstance()
        .getPlayer(playerId)
        .counters[CASH_COUNTER].incValue(1);
    });

    await Promise.all(promises);
  }

  async notif_makeCheck(notif: NotifMakeCheck) {
    // TODO: animation
  }

  async notif_moveCompanyBalance(notif: NotifMoveCompanyBalance) {
    const { companyBalance } = notif;
    const board = Board.getInstance();

    await board.movePawn('balance', companyBalance);
  }

  async notif_moveCompanyDebt(notif: NotifMoveCompanyDebt) {
    const { companyBalance, companyDebt } = notif;
    const board = Board.getInstance();
    const promises = [board.movePawn('debt', companyDebt)];
    if (companyBalance) {
      promises.push(board.movePawn('balance', companyBalance));
    }

    await Promise.all(promises);
  }

  async notif_moveCompanyStanding(notif: NotifMoveCompanyStanding) {
    const { companyStanding } = notif;
    const board = Board.getInstance();

    await board.movePawn('standing', companyStanding);
  }

  async notif_moveFamilyMember(notif: NotifMoveFamilyMember) {
    const { familyMember } = notif;

    if (parentHasChildWithId(familyMember.location, familyMember.id)) {
      return;
    }

    await this.moveFamilyMember(familyMember);
  }

  async notif_moveFamilyMembers(notif: NotifMoveFamilyMembers) {
    const { familyMembers } = notif;
    // const board = Board.getInstance();
    await Promise.all(
      familyMembers.map(async (familyMember, index) => {
        await Interaction.use().wait(index * 200);
        await this.moveFamilyMember(familyMember);
      }),
    );
    // board.updateFamilyMembers(familyMembers);
  }

  async notif_moveRegiment(notif: NotifMoveRegiment) {
    const { from, regiment } = notif;
    const regionId = regiment.location.split('_')[1];

    const army = India.getInstance().getArmy(regionId);
    await army.addPiece(regiment.id);
  }

  async notif_moveShip(notif: NotifMoveShipArgs) {
    const { from, ship } = notif;
    const seaZone = India.getInstance().getSeaZone(ship.location);
    if (!seaZone.hasShip(ship.id)) {
      await seaZone.addShip(ship, from);
    }
  }

  async notif_newCompanyShare(notif: NotifNewCompanyShare) {
    const { playerId, familyMember, debt } = notif;

    const player = this.getPlayer(playerId);

    await this.moveFamilyMember(familyMember);

    Company.getInstance().updateCompanyDebt(debt);
    player.counters[SHARES_COUNTER].incValue(1);
  }

  async notif_nextPhase(notif: NotifNextPhase) {
    const { phase } = notif;
    await Board.getInstance().movePawn('phase', phase);
  }

  async notif_payFromTreasury(notif: NotifPayFromTreasury) {
    const { treasury, officeId } = notif;
    Company.getInstance().treasuries[officeId].toValue(treasury);
  }

  async notif_placeShip(notif: NotifPlaceShip) {
    const { playerId, ship } = notif;
    let placedShip = ship;

    // const isOtherShip = [EXTRA_SHIP, COMPANY_SHIP].includes(ship.type);

    // const player = this.getPlayer(playerId);
    const india = India.getInstance();

    const seaZone = india.getSeaZone(ship.location);
    if (!seaZone.hasShip(ship.id)) {
      await seaZone.addShip(placedShip);
    }
  }

  async notif_purchaseEnterprise(notif: NotifPurchaseEnterprise) {
    const { playerId, enterprise, type, amount } = notif;

    await this.pay(playerId, amount);

    const player = this.getPlayer(playerId);
    player.counters[this.getEnterpriseCounter(type)].incValue(1);
    if (type === SHIPYARD) {
      player.counters[SHIPS_COUNTER].incValue(1);
    }
    await PlayerAreas.getInstance().addEnterprise(
      getEnterpriseCard(enterprise),
    );
  }

  async notif_returnFamilyMemberToSupply(
    notif: NotifReturnFamilyMemberToSupply,
  ) {
    const { familyMember, playerId } = notif;
    const element = Board.getInstance().ui.familyMembers[familyMember.id];
    const toElement = document.getElementById(`joco-familyMembers-${playerId}`);
    this.game.animationManager.slideOutAndDestroy(element, toElement);
    // await moveToAnimation({
    //   game: this.game,
    //   element,
    //   toId: `joco-familyMembers-${playerId}`,
    //   remove: true,
    // });
    this.getPlayer(playerId).counters[FAMILY_MEMBERS_COUNTER].incValue(1);
  }

  async notif_seekShare(notif: NotifSeekShare) {
    const { playerId, familyMember, amount } = notif;
    const { familyId, location, id } = familyMember;
    await this.pay(playerId, amount);

    // await Board.getInstance().placeFamilyMembers(
    //   [familyMember],
    //   this.getPlayer(playerId).ui[FAMILY_MEMBERS_COUNTER],
    // );
    const fromElement = this.getPlayer(playerId).ui[FAMILY_MEMBERS_COUNTER];
    const toElement = document.getElementById(location)!;

    const familyMemberElement = createFamilyMember(
      familyId === CROWN
        ? COLOR_FAMILY_MAP[
            HEX_COLOR_COLOR_MAP[
              PlayerManager.getInstance().getPlayer(CROWN_PLAYER_ID).getColor()
            ]
          ]
        : familyId,
      id,
    );
    toElement.insertAdjacentElement('beforeend', familyMemberElement);

    await this.game.animationManager.slideIn(familyMemberElement, fromElement);
  }

  async notif_setCrownClimate(notif: NotifSetCrownClimate) {
    const { climate } = notif;
    CrownClimate.getInstance().updateClimate(climate);
  }

  async notif_setupDone(notif: unknown) {
    SetupArea.getInstance().hide();
  }

  async notif_setupFamilyMembers(notif: NotifSetupFamilyMembers) {
    const { familyMembers, playerId } = notif;
    await Board.getInstance().placeFamilyMembers(
      familyMembers,
      this.getPlayer(playerId).ui[FAMILY_MEMBERS_COUNTER],
    );
  }

  async notif_transferPromiseCubes(notif: NotifTransferPromiseCubes) {
    const { playerId, amount } = notif;
    // Player pays to crown

    const fromElement =
      amount < 0
        ? document.getElementById(`joco-promiseCubes-${playerId}`)
        : document.getElementById(`joco-promiseCubes-${CROWN_PLAYER_ID}`);

    const toElement =
      amount < 0
        ? document.getElementById(`joco-promiseCubes-${CROWN_PLAYER_ID}`)
        : document.getElementById(`joco-promiseCubes-${playerId}`);

    const fromPlayer =
      amount < 0 ? this.getPlayer(playerId) : this.getPlayer(CROWN_PLAYER_ID);
    const toPlayer =
      amount < 0 ? this.getPlayer(CROWN_PLAYER_ID) : this.getPlayer(playerId);

    const promises = Array.from(Array(Math.abs(amount)).keys()).map(
      async (_, index) => {
        Interaction.use().wait(index * 250);
        fromPlayer.counters[PROMISE_CUBES_COUNTER].incValue(-1);
        const element = document.createElement('div');
        element.classList.add('log_token');
        element.classList.add('joco-promise-cube');
        element.classList.add('animation');
        toElement.insertAdjacentElement('afterbegin', element);

        await this.game.animationManager.slideIn(element, fromElement);
        element.remove();
        toPlayer.counters[PROMISE_CUBES_COUNTER].incValue(1);
      },
    );

    await Promise.all(promises);
  }

  async notif_updateRegion(notif: NotifUpdateRegion) {
    const { region } = notif;
    Board.getInstance().regions[region.id].update(region);
  }
}
