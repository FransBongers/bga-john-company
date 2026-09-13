/**
 *------
 * BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
 * JohnCompany implementation : © Frans Bongers <fjmbongers@gmail.com>
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 *
 * johncompany.js
 *
 * In this file, you are describing the logic of your user interface, in Javascript language.
 *
 */

import { Bar } from './bar';
import { Board } from './board';
import {
  NotificationManager,
  debug,
  Interaction,
  SELECTABLE,
  SELECTED,
} from './boilerplate';
import { ConfirmPartialTurn } from './boilerplate/states/ConfirmPartialTurn';
import { ConfirmTurn } from './boilerplate/states/ConfirmTurn';
import { LondonSeasonCardsManager } from './cards/london-season-cards';
import { Company } from './company';
import { CROWN_PLAYER_ID, SETUP } from './constants';
import { CrownClimate } from './crown/climate';
import { India } from './india';
import { BgaAnimations, BgaAutofit } from './libs';
import { getTokenDiv } from './logs';
import { London } from './london';
import { Negotiation } from './negotiation';
import { PhaseTracker } from './phase-tracker';
import { PlayerAreas } from './player-areas';
import { PlayerManager } from './player-manager';
import { SetupArea } from './setup-area';
import {
  Chairman,
  ChairmanDebtConsent,
  CrownChairmanRequestAllocation,
  CrownChairmanRequestDebtAdvancement,
  CrownManagerOfShippingBuyCompanyShips,
  CrownManagerOfShippingFitShips,
  CrownManagerOfShippingLeaseExtraShips,
  CrownManagerOfShippingPlaceShips,
  DirectorOfTradeSpecialEnvoy,
  DirectorOfTradeSpecialEnvoySuccess,
  DirectorOfTradeTransfers,
  DraftCard,
  EnlistWriter,
  EventsInIndiaCrisisDefense,
  FamilyAction,
  ManagerOfShipping,
  MilitaryAffairsAssign,
  MilitaryAffairsTransfers,
  PlayerTurn,
  PresidencyDecideOrder,
  PresidencyTrade,
  PresidencyTradeFillOrders,
  RevenuePayDividends,
  RevenueRoyalPardon,
  SeekShare,
} from './states';
import { StaticData } from './static-data';
import { tplPlayArea, tplCrownPlayerPanel } from './templates';
import { JohnCompanyGamedatas, GamedatasAlias } from './types';

// declare const define; // TODO: check if we comment here or in bga-animations module?
// declare const ebg;
// declare const $;
// declare const dijit;
// declare const dojo: Dojo;
// declare const _: (stringToTranslate: string) => string;
// declare const g_gamethemeurl;
// declare const playSound;
// declare var noUiSlider;

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export class Game {
  public gamedatas: JohnCompanyGamedatas;

  // Default
  public animationManager!: InstanceType<typeof BgaAnimations.Manager>;
  //  public settings: Settings;
  public gameOptions: GamedatasAlias['gameOptions'];
  public notificationManager: NotificationManager;
  //  public playerManager: PlayerManager;
  public playerOrder: number[];
  //  public tooltipManager: TooltipManager;
  public gameName: string = '';
  private isLoadingComplete: boolean = false;

  // Boiler plate
  //  private alwaysFixTopActions: boolean;
  //  private alwaysFixTopActionsMaximum: number;
  //  public tooltipsToMap: [tooltipId: number, card_id: string][] = [];
  public _connections: unknown[];
  //  public _displayedTooltip = null;
  //  public _dragndropMode = false; // Not used but present in boiler plate code
  public _helpMode = false; // Use to implement help mode
  private _last_notif = null;
  //  public _last_tooltip_id = 0;
  private _notif_uid_to_log_id = {};
  private _notif_uid_to_mobile_log_id = {};
  private _selectableNodes = []; // TODO: use to keep track of selectable classed?
  public mobileVersion: boolean = false;

  private states = {
    Chairman,
    ChairmanDebtConsent,
    CrownChairmanRequestAllocation,
    CrownChairmanRequestDebtAdvancement,
    CrownManagerOfShippingBuyCompanyShips,
    CrownManagerOfShippingFitShips,
    CrownManagerOfShippingLeaseExtraShips,
    CrownManagerOfShippingPlaceShips,
    // CrownManagerOfShippingUnfittedShipOptions,
    ConfirmPartialTurn,
    ConfirmTurn,
    DirectorOfTradeSpecialEnvoy,
    DirectorOfTradeSpecialEnvoySuccess,
    DirectorOfTradeTransfers,
    DraftCard,
    EnlistWriter,
    EventsInIndiaCrisisDefense,
    FamilyAction,
    ManagerOfShipping,
    MilitaryAffairsAssign,
    MilitaryAffairsTransfers,
    PlayerTurn,
    PresidencyDecideOrder,
    PresidencyTrade,
    PresidencyTradeFillOrders,
    RevenuePayDividends,
    RevenueRoyalPardon,
    SeekShare,
  };
  public bga: Bga;

  constructor(bga: Bga) {
    this.bga = bga;
    console.log('johncompany constructor');

    this.gameName = 'hegemony';

    this.bga.gameui.onScreenWidthChange = () => this.onScreenWidthChange();
    this.overrideOnPlaceLogOnChannel();
    this.overrideAddToLog();
    this.overrideSetLoader();
    this.overrideUpdatePlayerOrdering();

    this.bga.userPreferences.onChange = (prefId, prefValue) =>
      this.onUserPrefChanged(prefId, prefValue);
  }

  onScreenWidthChange() {
    this.updateLayout();
  }

  // .########.########.....###....##.....##.########.##......##..#######..########..##....##
  // .##.......##.....##...##.##...###...###.##.......##..##..##.##.....##.##.....##.##...##.
  // .##.......##.....##..##...##..####.####.##.......##..##..##.##.....##.##.....##.##..##..
  // .######...########..##.....##.##.###.##.######...##..##..##.##.....##.########..#####...
  // .##.......##...##...#########.##.....##.##.......##..##..##.##.....##.##...##...##..##..
  // .##.......##....##..##.....##.##.....##.##.......##..##..##.##.....##.##....##..##...##.
  // .##.......##.....##.##.....##.##.....##.########..###..###...#######..##.....##.##....##

  // ..#######..##.....##.########.########..########..####.########..########..######.
  // .##.....##.##.....##.##.......##.....##.##.....##..##..##.....##.##.......##....##
  // .##.....##.##.....##.##.......##.....##.##.....##..##..##.....##.##.......##......
  // .##.....##.##.....##.######...########..########...##..##.....##.######....######.
  // .##.....##..##...##..##.......##...##...##...##....##..##.....##.##.............##
  // .##.....##...##.##...##.......##....##..##....##...##..##.....##.##.......##....##
  // ..#######.....###....########.##.....##.##.....##.####.########..########..######.

  /**
   * Setup undo/cancel log tracking for notifications
   * Intercepts log placement to map notification UIDs to log IDs
   * @private
   */
  private overrideOnPlaceLogOnChannel(): void {
    const originalOnPlaceLogOnChannel =
      // @ts-ignore
      this.bga.gameui.onPlaceLogOnChannel.bind(this.bga.gameui);
    // @ts-ignore
    this.bga.gameui.onPlaceLogOnChannel = (msg: Notif<unknown>) => {
      // @ts-ignore
      const currentLogId = this.bga.gameui.notifqueue.next_log_id;
      // @ts-ignore
      const currentMobileLogId = this.bga.gameui.next_log_id;
      const res = originalOnPlaceLogOnChannel(msg);

      this._notif_uid_to_log_id[msg.uid] = currentLogId;
      this._notif_uid_to_mobile_log_id[msg.uid] = currentMobileLogId;
      this._last_notif = {
        logId: currentLogId,
        mobileLogId: currentMobileLogId,
        msg,
      };

      return res;
    };
  }

  private overrideAddToLog(): void {
    const originalAddToLog =
      // @ts-ignore
      this.bga.notifications.game.notifqueue.addToLog.bind(
        // @ts-ignore
        this.bga.notifications.game.notifqueue,
      );
    // @ts-ignore
    this.bga.notifications.game.notifqueue.addToLog = (input: unknown) => {
      // @ts-ignore

      const res = originalAddToLog(input);
      this.addLogClass();

      return res;
    };
  }

  private overrideSetLoader() {
    const originalSetLoader =
      // @ts-ignore
      this.bga.gameui.setLoader.bind(
        // @ts-ignore
        this.bga.gameui,
      );

    // @ts-ignore
    this.bga.gameui.setLoader = (value: any, max: any) => {
      originalSetLoader(value, max);

      if (!this.isLoadingComplete && value >= 100) {
        this.isLoadingComplete = true;
        this.onLoadingComplete();
      }
    };
  }

  onLoadingComplete() {
    this.updateLayout();
    BgaAutofit.init({ scaleStep: 0.025, rootElement: document.body });
  }

  private overrideUpdatePlayerOrdering() {
    const original =
      // @ts-ignore
      this.bga.gameui.updatePlayerOrdering.bind(
        // @ts-ignore
        this.bga.gameui,
      );

    // @ts-ignore
    this.bga.gameui.updatePlayerOrdering = () => {
      original();
      const container = document.getElementById('player_boards');
      if (!container) {
        return;
      }

      this.playerOrder.forEach((playerId) => {
        const playerBoard = document.getElementById(
          `overall_player_board_${playerId}`,
        )!;
        container.insertAdjacentElement('beforeend', playerBoard);
      });
    };
  }

  public bgaFormatText(
    log: string,
    args: Record<string, unknown>,
  ): { log: string; args: any } {
    try {
      if (log && args && !args.processed) {
        args.processed = true;

        // replace all keys that start with 'logToken'
        Object.entries(args).forEach(([key, value]) => {
          if (key.startsWith('tkn_')) {
            args[key] = getTokenDiv({
              key,
              value: value as string,
              game: this,
            });
          }
        });
      }
    } catch (e) {
      console.error(log, args, 'Exception thrown', (e as Error).stack);
    }
    return { log, args };
  }

  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......

  public setup(gamedatas: JohnCompanyGamedatas) {
    const body = document.getElementById('ebd-body');
    this.mobileVersion = body && body.classList.contains('mobile_version');

    // Create a new div for buttons to avoid BGA auto clearing it
    document
      .getElementById('generalactions')!
      .insertAdjacentHTML(
        'afterend',
        "<div id='customActions' style='display:inline-block'></div>",
      );

    document
      .getElementById('game_play_area')
      .insertAdjacentHTML('afterbegin', tplPlayArea());

    //  this.setAlwaysFixTopActions();
    this.setupDontPreloadImages();

    this.gamedatas = gamedatas;
    this.gameOptions = gamedatas.gameOptions;

    debug('gamedatas', gamedatas);
    this.setupPlayerOrder(gamedatas.playerOrder);
    if (this.gameOptions.crownEnabled) {
      document
        .getElementById('player_boards')
        .insertAdjacentHTML(
          'afterbegin',
          tplCrownPlayerPanel(
            _('The Crown'),
            gamedatas.players[CROWN_PLAYER_ID].color,
          ),
        );
      // dojo.place(tplWakhanPlayerPanel({ name: _('Wakhan') }), 'player_boards', 0);
    }

    this._connections = [];

    Object.values(this.states).forEach((state) => state.create(this));

    //  this.tooltipManager = new TooltipManager(this);
    //  this.playerManager = new PlayerManager(this);
    //  this.infoPanel = new InfoPanel(this);
    //  this.settings = new Settings(this);
    //  this.infoPanel.setupAddCardTooltips();
    //  this.informationModal = new InformationModal(this);

    this.animationManager = new BgaAnimations.Manager({
      duration: 500,
      animationsActive: () => {
        const showAnimations = this.bga.userPreferences.get(100) === 1;
        return showAnimations && this.bga.gameui.bgaAnimationsActive();
      },
    });
    LondonSeasonCardsManager.create(this);

    //  this.gameMap = new GameMap(this);
    //  this.cardArea = new CardArea(this);
    StaticData.create(this);
    Interaction.create(this);
    PhaseTracker.create(this);

    PlayerManager.create(this);
    if (this.gameOptions.crownEnabled) {
      CrownClimate.create(this);
    }
    this.notificationManager = new NotificationManager(this);
    Negotiation.create(this);
    PlayerAreas.create(this);
    Board.create(this);
    Company.create(this);

    London.create(this);
    India.create(this);
    Bar.create(this);

    if (
      this.playerOrder.includes(this.getPlayerId()) &&
      gamedatas.phase === SETUP
    ) {
      SetupArea.create(this);
    }

    this.notificationManager.setupNotifications();

    //  this.tooltipManager.setupTooltips();
    // this.setupResizeObserver();
    debug('Ending game setup');
  }

  // Sets player order with current player at index 0 if player is in the game
  setupPlayerOrder(playerOrder: number[]) {
    const currentPlayerId = this.getPlayerId();
    const isInGame = playerOrder.includes(currentPlayerId);
    if (isInGame) {
      while (playerOrder[0] !== currentPlayerId) {
        const firstItem = playerOrder.shift();
        playerOrder.push(firstItem);
      }
    }
    this.playerOrder = playerOrder;
  }

  /**
   * Example:
   * this.framework().dontPreloadImage("background_balcony.webp");
   */
  setupDontPreloadImages() {}

  //  .####.##....##.########.########.########.....###.....######..########.####..#######..##....##
  //  ..##..###...##....##....##.......##.....##...##.##...##....##....##.....##..##.....##.###...##
  //  ..##..####..##....##....##.......##.....##..##...##..##..........##.....##..##.....##.####..##
  //  ..##..##.##.##....##....######...########..##.....##.##..........##.....##..##.....##.##.##.##
  //  ..##..##..####....##....##.......##...##...#########.##..........##.....##..##.....##.##..####
  //  ..##..##...###....##....##.......##....##..##.....##.##....##....##.....##..##.....##.##...###
  //  .####.##....##....##....########.##.....##.##.....##..######.....##....####..#######..##....##

  ///////////////////////////////////////////////////
  //// Game & client states

  // onEnteringState: this method is called each time we are entering into a new game state.
  //                  You can use this method to perform some user interface changes at this moment.
  public onEnteringState(stateName: string, args: any) {
    console.log('Entering state: ' + stateName, args);
    const activePlayerIds: number[] | undefined = args.args?.activePlayerIds;
    const playerIsActiveAndStateExists =
      this.bga.players.isCurrentPlayerActive() &&
      this.states[stateName as keyof typeof this.states];

    const currentPlayerId = this.getPlayerId();
    // UI changes for active player
    if (
      playerIsActiveAndStateExists &&
      (!activePlayerIds || activePlayerIds.includes(currentPlayerId))
    ) {
      this.states[stateName].getInstance().onEnteringState(args.args);
    } else if (this.states[stateName]) {
      this.states[stateName]
        .getInstance()
        .setDescription(
          activePlayerIds || Number(args.active_player),
          args.args,
        );
    }

    // if (this.framework().isCurrentPlayerActive()) {
    //   this.addPrimaryActionButton({
    //     id: "pass_button",
    //     text: _("Pass"),
    //     callback: () => this.takeAction({ action: "passTurn" }),
    //   });
    //   this.addDangerActionButton({
    //     id: "end_game_button",
    //     text: _("End game"),
    //     callback: () => this.takeAction({ action: "endGame" }),
    //   });
    // }

    // Undo last steps
    if (args.args && args.args.previousSteps) {
      args.args.previousSteps.forEach((stepId: number) => {
        let logEntry = $('logs').querySelector(
          `.log.notif_newUndoableStep[data-step="${stepId}"]`,
        ) as HTMLElement;
        if (logEntry) {
          this.onClick(logEntry, () => this.undoToStep({ stepId }));
        }

        logEntry = document.querySelector(
          `.chatwindowlogs_zone .log.notif_newUndoableStep[data-step="${stepId}"]`,
        );
        if (logEntry) {
          this.onClick(logEntry, () => this.undoToStep({ stepId }));
        }
      });
    }
  }

  // onLeavingState: this method is called each time we are leaving a game state.
  //                 You can use this method to perform some user interface changes at this moment.
  //
  public onLeavingState(stateName: string) {
    if (this.states[stateName]) {
      this.states[stateName].getInstance().onLeavingState();
    }
    this.clearPossible();
  }

  // onUpdateActionButtons: in this method you can manage "action buttons" that are displayed in the
  //                        action status bar (ie: the HTML links in the status bar).
  //
  public onUpdateActionButtons(stateName: string, args: any) {
    // console.log('onUpdateActionButtons: ' + stateName);
  }

  // .##.....##.########.##.......########.....##.....##..#######..########..########
  // .##.....##.##.......##.......##.....##....###...###.##.....##.##.....##.##......
  // .##.....##.##.......##.......##.....##....####.####.##.....##.##.....##.##......
  // .#########.######...##.......########.....##.###.##.##.....##.##.....##.######..
  // .##.....##.##.......##.......##...........##.....##.##.....##.##.....##.##......
  // .##.....##.##.......##.......##...........##.....##.##.....##.##.....##.##......
  // .##.....##.########.########.##...........##.....##..#######..########..########

  //  public toggleHelpMode(b: boolean) {
  // 	 console.log('toggleHelpMode', this.framework().defaultTooltipPosition);
  // 	 if (b) this.activateHelpMode();
  // 	 else this.deactivateHelpMode();
  //  }

  //  activateHelpMode() {
  // 	 this._helpMode = true;
  // 	 dojo.addClass('ebd-body', 'help-mode');
  // 	 this._displayedTooltip = null;
  // 	 document.body.addEventListener(
  // 		 'click',
  // 		 this.closeCurrentTooltip.bind(this)
  // 	 );
  //  }

  //  deactivateHelpMode() {
  // 	 this.closeCurrentTooltip();
  // 	 this._helpMode = false;
  // 	 dojo.removeClass('ebd-body', 'help-mode');
  // 	 document.body.removeEventListener(
  // 		 'click',
  // 		 this.closeCurrentTooltip.bind(this)
  // 	 );
  //  }

  //  closeCurrentTooltip() {
  // 	 if (!this._helpMode) return;

  // 	 if (this._displayedTooltip == null) return;
  // 	 else {
  // 		 this._displayedTooltip.close();
  // 		 this._displayedTooltip = null;
  // 	 }
  //  }

  // .##.....##..######..########.########.
  // .##.....##.##....##.##.......##.....##
  // .##.....##.##.......##.......##.....##
  // .##.....##..######..######...########.
  // .##.....##.......##.##.......##...##..
  // .##.....##.##....##.##.......##....##.
  // ..#######...######..########.##.....##

  // .########..########..########.########..######.
  // .##.....##.##.....##.##.......##.......##....##
  // .##.....##.##.....##.##.......##.......##......
  // .########..########..######...######....######.
  // .##........##...##...##.......##.............##
  // .##........##....##..##.......##.......##....##
  // .##........##.....##.########.##........######.

  private onUserPrefChanged(prefId: number, prefValue: string | number) {
    switch (prefId) {
    }
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  public clearInterface() {
    //  this.playerManager.clearInterface();
    //  this.gameMap.clearInterface();
  }

  clearPossible() {
    this.bga.statusBar.removeActionButtons();
    dojo.empty('customActions');

    dojo.forEach(this._connections, dojo.disconnect);
    this._connections = [];
    this._selectableNodes.forEach((node) => {
      if ($(node)) {
        dojo.removeClass(node, SELECTABLE);
        dojo.removeClass(node, SELECTED);
      }
    });
    this._selectableNodes = [];

    //  // TODO: remove this and handle via _selectableNodes
    dojo.query(`.${SELECTABLE}`).removeClass(SELECTABLE);
    dojo.query(`.${SELECTED}`).removeClass(SELECTED);

    //  this.gameMap.clearSelectable();
  }

  public getPlayerId(): number {
    return this.bga.players.getCurrentPlayerId();
  }

  onCancel() {
    this.clearPossible();
    this.bga.states.restoreServerGameState();
  }

  clientUpdatePageTitle({
    text,
    args,
    nonActivePlayers = false,
  }: {
    text: string;
    args: Record<string, string | number>;
    nonActivePlayers?: boolean;
  }) {
    this.bga.statusBar.setTitle(_(text), args);
  }

  // .########...#######..####.##.......########.########.
  // .##.....##.##.....##..##..##.......##.......##.....##
  // .##.....##.##.....##..##..##.......##.......##.....##
  // .########..##.....##..##..##.......######...########.
  // .##.....##.##.....##..##..##.......##.......##...##..
  // .##.....##.##.....##..##..##.......##.......##....##.
  // .########...#######..####.########.########.##.....##

  // .########..##..........###....########.########
  // .##.....##.##.........##.##......##....##......
  // .##.....##.##........##...##.....##....##......
  // .########..##.......##.....##....##....######..
  // .##........##.......#########....##....##......
  // .##........##.......##.....##....##....##......
  // .##........########.##.....##....##....########

  /*
   * Custom connect that keep track of all the connections
   *  and wrap clicks to make it work with help mode
   */
  connect(node: HTMLElement, action: string, callback: Function) {
    this._connections.push(dojo.connect($(node), action, callback));
  }

  onClick(node: HTMLElement, callback: Function, temporary = true) {
    let safeCallback = (evt) => {
      evt.stopPropagation();
      // @ts-expect-error
      if (this.bga.actions.game.isInterfaceLocked()) {
        return false;
      }
      if (this._helpMode) {
        return false;
      }
      callback(evt);
    };

    if (temporary) {
      this.connect($(node), 'click', safeCallback);
      node.classList.add(SELECTABLE);
      this._selectableNodes.push(node);
    } else {
      dojo.connect($(node), 'click', safeCallback);
    }
  }

  undoToStep({ stepId }: { stepId: string | number }) {
    // this.stopActionTimer();
    // this.framework().checkAction("actRestart");
    // this.takeAction('actUndoToStep', args: { stepId });
    // this.takeAction({
    //   action: 'actUndoToStep',
    //   atomicAction: false,
    //   args: {
    //     stepId,
    //   },
    //   checkAction: 'actRestart',
    // });
  }

  public updateLayout() {
    // console.log('updateLayout');
    //  if (!this.settings) {
    // 	 return;
    //  }

    //  $('play_area_container').setAttribute(
    // 	 'data-two-columns',
    // 	 this.settings.get({ id: 'twoColumnsLayout' })
    //  );

    const ROOT = document.documentElement;
    const playerAreaContainer = document.getElementById('joco-play-area');

    if (!playerAreaContainer) {
      return;
    }
    let WIDTH = playerAreaContainer.getBoundingClientRect()['width'];
    const LEFT_COLUMN = 1500;
    const RIGHT_COLUMN = 634;

    //  if (this.settings.get({ id: 'twoColumnsLayout' }) === PREF_ENABLED) {
    // 	 WIDTH = WIDTH - 8; // grid gap + padding
    // 	 const size = Number(this.settings.get({ id: 'columnSizes' }));
    // 	 const proportions = [size, 100 - size];
    // 	 const LEFT_SIZE = (proportions[0] * WIDTH) / 100;
    // 	 const leftColumnScale = LEFT_SIZE / LEFT_COLUMN;
    // 	 ROOT.style.setProperty('--leftColumnScale', `${leftColumnScale}`);
    // 	 ROOT.style.setProperty('--mapSizeMultiplier', '1');
    // 	 const RIGHT_SIZE = (proportions[1] * WIDTH) / 100;
    // 	 const rightColumnScale = RIGHT_SIZE / RIGHT_COLUMN;
    // 	 ROOT.style.setProperty('--rightColumnScale', `${rightColumnScale}`);

    // 	 $(
    // 		 'play_area_container'
    // 	 ).style.gridTemplateColumns = `${LEFT_SIZE}px ${RIGHT_SIZE}px`;
    //  } else {
    const LEFT_SIZE = WIDTH;
    const leftColumnScale = LEFT_SIZE / LEFT_COLUMN;

    ROOT.style.setProperty('--leftColumnScale', `${leftColumnScale}`);
    //  ROOT.style.setProperty(
    // 	 '--mapSizeMultiplier',
    // 	 `${
    // 		 Number(this.settings.get({ id: PREF_SINGLE_COLUMN_MAP_SIZE })) / 100
    // 	 }`
    //  );
    const RIGHT_SIZE = WIDTH;
    const rightColumnScale = RIGHT_SIZE / RIGHT_COLUMN;
    ROOT.style.setProperty('--rightColumnScale', `${rightColumnScale}`);
    //  }
  }

  // .########.########.....###....##.....##.########.##......##..#######..########..##....##
  // .##.......##.....##...##.##...###...###.##.......##..##..##.##.....##.##.....##.##...##.
  // .##.......##.....##..##...##..####.####.##.......##..##..##.##.....##.##.....##.##..##..
  // .######...########..##.....##.##.###.##.######...##..##..##.##.....##.########..#####...
  // .##.......##...##...#########.##.....##.##.......##..##..##.##.....##.##...##...##..##..
  // .##.......##....##..##.....##.##.....##.##.......##..##..##.##.....##.##....##..##...##.
  // .##.......##.....##.##.....##.##.....##.########..###..###...#######..##.....##.##....##

  // ..#######..##.....##.########.########..########..####.########..########..######.
  // .##.....##.##.....##.##.......##.....##.##.....##..##..##.....##.##.......##....##
  // .##.....##.##.....##.##.......##.....##.##.....##..##..##.....##.##.......##......
  // .##.....##.##.....##.######...########..########...##..##.....##.######....######.
  // .##.....##..##...##..##.......##...##...##...##....##..##.....##.##.............##
  // .##.....##...##.##...##.......##....##..##....##...##..##.....##.##.......##....##
  // ..#######.....###....########.##.....##.##.....##.####.########..########..######.

  /**
   * Apparently onAdding<notif id>ToLog is called with every notification
   */
  onAddingNewUndoableStepToLog(notif: {
    logId: number;
    mobileLogId: number;
    msg: Notif<{
      preserve: string;
      processed: boolean;
      stepId: number | string;
    }>;
  }) {
    if (!$(`log_${notif.logId}`)) return;
    let stepId = notif.msg.args.stepId;
    $(`log_${notif.logId}`).dataset.step = stepId as string;
    if ($(`dockedlog_${notif.mobileLogId}`))
      $(`dockedlog_${notif.mobileLogId}`).dataset.step = stepId as string;

    if (
      (
        this.gamedatas.gamestate as Gamestate & {
          args: { previousSteps?: number[] };
        }
      ).args.previousSteps?.includes(Number(stepId))
    ) {
      this.onClick($(`log_${notif.logId}`), () => this.undoToStep({ stepId }));
      if ($(`dockedlog_${notif.mobileLogId}`))
        this.onClick($(`dockedlog_${notif.mobileLogId}`), () =>
          this.undoToStep({ stepId }),
        );
    }
  }

  /*
   * cancelLogs:
   *   strikes all log messages related to the given array of notif ids
   */
  checkLogCancel(notifId: string) {
    if (
      this.gamedatas.canceledNotifIds != null &&
      this.gamedatas.canceledNotifIds.includes(notifId)
    ) {
      //  this.cancelLogs([notifId]);
    }
  }

  public cancelLogs(notifIds: string[]) {
    notifIds.forEach((uid) => {
      if (this._notif_uid_to_log_id.hasOwnProperty(uid)) {
        let logId = this._notif_uid_to_log_id[uid];
        if ($('log_' + logId)) dojo.addClass('log_' + logId, 'cancel');
      }
      if (this._notif_uid_to_mobile_log_id.hasOwnProperty(uid)) {
        let mobileLogId = this._notif_uid_to_mobile_log_id[uid];
        if ($('dockedlog_' + mobileLogId))
          dojo.addClass('dockedlog_' + mobileLogId, 'cancel');
      }
    });
  }

  addLogClass() {
    if (this._last_notif == null) {
      return;
    }

    let notif = this._last_notif;
    let type = notif.msg.type;
    if (type == 'history_history') {
      type = notif.msg.args.originalType;
    }

    if ($('log_' + notif.logId)) {
      dojo.addClass('log_' + notif.logId, 'notif_' + type);

      var methodName =
        'onAdding' + type.charAt(0).toUpperCase() + type.slice(1) + 'ToLog';
      this[methodName]?.(notif);
    }
    if ($('dockedlog_' + notif.mobileLogId)) {
      dojo.addClass('dockedlog_' + notif.mobileLogId, 'notif_' + type);
    }

    //  while (this.tooltipsToMap.length) {
    // 	 const tooltipToMap = this.tooltipsToMap.pop();
    // 	 if (!tooltipToMap || !tooltipToMap[1]) {
    // 		 console.error('error tooltipToMap', tooltipToMap);
    // 	 } else {
    // 		 this.addLogTooltip({
    // 			 tooltipId: tooltipToMap[0],
    // 			 cardId: tooltipToMap[1],
    // 		 });
    // 	 }
    //  }
  }

  addLogTooltip({ tooltipId, cardId }: { tooltipId: number; cardId: string }) {
    //  this.tooltipManager.addCardTooltip({
    // 	 nodeId: `gest_tooltip_${tooltipId}`,
    // 	 cardId,
    //  });
  }

  updateLogTooltips() {
    // console.log("tooltipsToMap", this.tooltipsToMap);
    // TODO: check how to update this. For now needs refresh
  }
}
