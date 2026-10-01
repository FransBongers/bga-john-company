//  .########..#######...#######..##.......########.####.########.
//  ....##....##.....##.##.....##.##..........##.....##..##.....##
//  ....##....##.....##.##.....##.##..........##.....##..##.....##
//  ....##....##.....##.##.....##.##..........##.....##..########.
//  ....##....##.....##.##.....##.##..........##.....##..##.......
//  ....##....##.....##.##.....##.##..........##.....##..##.......
//  ....##.....#######...#######..########....##....####.##.......

import { StaticData } from '../../static-data';
import { GameAlias } from '../../types';
import { tplLondonSeasonCardTooltip } from './templates';
export * from './templates';

//  .##.....##....###....##....##....###.....######...########.########.
//  .###...###...##.##...###...##...##.##...##....##..##.......##.....##
//  .####.####..##...##..####..##..##...##..##........##.......##.....##
//  .##.###.##.##.....##.##.##.##.##.....##.##...####.######...########.
//  .##.....##.#########.##..####.#########.##....##..##.......##...##..
//  .##.....##.##.....##.##...###.##.....##.##....##..##.......##....##.
//  .##.....##.##.....##.##....##.##.....##..######...########.##.....##

export class TooltipManager {
  private static instance: TooltipManager;
  private game: GameAlias;
  // This can't be used since some versions of safari don't support it
  // private idRegex = /(?<=id=")[a-z]*_[0-9]*_[0-9]*(?=")/;
  // private idRegex = /id="[a-z]*_[0-9]*_[0-9]*"/;

  private _customTooltipIdCounter: number = 0;
  private _registeredCustomTooltips = {};

  constructor(game: GameAlias) {
    this.game = game;
  }

  public static create(game: GameAlias) {
    TooltipManager.instance = new TooltipManager(game);
  }

  public static getInstance() {
    return TooltipManager.instance;
  }

  // public addTextTooltip({
  //   nodeId,
  //   text,
  //   title,
  //   custom = true,
  // }: {
  //   nodeId: string;
  //   text: string;
  //   title?: string;
  //   custom?: boolean;
  // }) {
  //   if (custom) {
  //     this.addCustomTooltip(
  //       nodeId,
  //       tplTextTooltip({
  //         text,
  //         title,
  //       }),
  //     );
  //   } else {
  //     this.game.framework().addTooltipHtml(
  //       nodeId,
  //       tplTextTooltip({
  //         text,
  //         title,
  //       }),
  //       400,
  //     );
  //   }
  // }

  public removeTooltip(nodeId: string) {
    this.game.bga.gameui.removeTooltip(nodeId);
  }

  public setupTooltips() {}

  public addLondonSeasonCardTooltip({
    nodeId,
    cardId,
    imageOnly = false,
  }: {
    nodeId: string;
    cardId: string;
    imageOnly?: boolean;
  }) {
    const card = StaticData.get().londonSeasonCard(cardId);
    const html = tplLondonSeasonCardTooltip(card);
    // this.addCustomTooltip(nodeId, html, { forceRecreate: true });

    this.game.bga.gameui.addTooltipHtml(nodeId, html, 400);
  }

  public addBlackmailBackTooltip(nodeId: string) {
    const html = `<div class="joco-card" data-background="BlackmailBack"></div>`;
    this.game.bga.gameui.addTooltipHtml(nodeId, html, 400);
  }

  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......

  public addBoardTooltips() {}

  // .##.....##.########.##.......########.....##.....##..#######..########..########
  // .##.....##.##.......##.......##.....##....###...###.##.....##.##.....##.##......
  // .##.....##.##.......##.......##.....##....####.####.##.....##.##.....##.##......
  // .#########.######...##.......########.....##.###.##.##.....##.##.....##.######..
  // .##.....##.##.......##.......##...........##.....##.##.....##.##.....##.##......
  // .##.....##.##.......##.......##...........##.....##.##.....##.##.....##.##......
  // .##.....##.########.########.##...........##.....##..#######..########..########

  /**
   * Tooltip to work with help mode
   */
  // registerCustomTooltip(html, id: string | null = null) {
  //   id =
  //     id ||
  //     this.game.gameName +
  //       '-tooltipable-' +
  //       this._customTooltipIdCounter++;
  //   this._registeredCustomTooltips[id] = html;
  //   return id;
  // }
  // public attachRegisteredTooltips() {
  //   Object.keys(this._registeredCustomTooltips).forEach((id) => {
  //     if ($(id)) {
  //       this.addCustomTooltip(id, this._registeredCustomTooltips[id], {
  //         forceRecreate: true,
  //       });
  //     }
  //   });
  //   this._registeredCustomTooltips = {};
  // }
  // public addCustomTooltip(
  //   id: string,
  //   html: string | Function,
  //   config: { delay?: number; midSize?: boolean; forceRecreate?: boolean } = {},
  // ) {
  //   if (!document.getElementById(id)) {
  //     return;
  //   }
  //   config = Object.assign(
  //     {
  //       delay: 400,
  //       midSize: true,
  //       forceRecreate: false,
  //     },
  //     config,
  //   ) as { delay: 400; midSize: boolean; forceRecreate: boolean };

  //   // Handle dynamic content out of the box
  //   let getContent = () => {
  //     let content = typeof html === 'function' ? html() : html;
  //     if (config.midSize) {
  //       content = '<div class="midSizeDialog">' + content + '</div>';
  //     }
  //     return content;
  //   };

  //   // @ts-expect-error
  //   if (this.game.bga.gameui.tooltips[id] && !config.forceRecreate) {
  //     // @ts-expect-error
  //     this.game.bga.gameui.tooltips[id].getContent = getContent;
  //     return;
  //   }

  //   let tooltip = new dijit.Tooltip({
  //     //        connectId: [id],
  //     getContent,
  //     position: this.game.framework().defaultTooltipPosition,
  //     showDelay: config.delay,
  //   });
  //   this.game.bga.gameui.tooltips[id] = tooltip;
  //   dojo.addClass(id, 'tooltipable');
  //   dojo.place(
  //     `<div class='help-marker'>
  //           <svg><use href="#help-marker-svg" /></svg>
  //         </div>`,
  //     id,
  //   );

  //   dojo.connect($(id), 'click', (evt: PointerEvent) => {
  //     if (!this.game._helpMode) {
  //       tooltip.close();
  //     } else {
  //       evt.stopPropagation();

  //       if (tooltip.state == 'SHOWING') {
  //         this.game.closeCurrentTooltip();
  //       } else {
  //         this.game.closeCurrentTooltip();
  //         tooltip.open($(id));
  //         this.game._displayedTooltip = tooltip;
  //       }
  //     }
  //   });

  //   tooltip.showTimeout = null;
  //   dojo.connect($(id), 'mouseenter', (evt: PointerEvent) => {
  //     evt.stopPropagation();
  //     if (!this.game._helpMode && !this.game._dragndropMode) {
  //       if (tooltip.showTimeout != null) clearTimeout(tooltip.showTimeout);

  //       tooltip.showTimeout = setTimeout(() => {
  //         if ($(id)) tooltip.open($(id));
  //       }, config.delay);
  //     }
  //   });

  //   dojo.connect($(id), 'mouseleave', (evt: PointerEvent) => {
  //     evt.stopPropagation();
  //     if (!this.game._helpMode && !this.game._dragndropMode) {
  //       tooltip.close();
  //       if (tooltip.showTimeout != null) clearTimeout(tooltip.showTimeout);
  //     }
  //   });
  // }
}
