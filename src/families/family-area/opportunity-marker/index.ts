import { formatStringRecursive } from '../../../boilerplate';
import {
  ENLIST_WRITER,
  ENLIST_OFFICER,
  SEEK_SHARE,
  PURCHASE_LUXURY,
  PURCHASE_SHIPYARD,
  PURCHASE_WORKSHOP,
  WRITER,
  OFFICER_IN_TRAINING,
  SHIPYARD,
  LUXURY,
  WORKSHOP,
  SHARE,
} from '../../../constants';
import { GameAlias } from '../../../types';

export interface OpportunityMarkerProps {
  game: GameAlias;
  familyAction: string | null;
  familyId: string;
  parentElement: HTMLElement;
}

export class OpportunityMarker {
  private ui: {
    opportunityMarkerValue: HTMLElement;
  };

  constructor(private props: OpportunityMarkerProps) {
    this.setupUI();
  }

  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......

  private setupUI() {
    this.props.parentElement.insertAdjacentHTML('beforeend', this.tplOpportunityMarker());

    this.ui = {
      opportunityMarkerValue: document.getElementById(`joco-opportunity-marker-value-${this.props.familyId}`) as HTMLElement,
    };

    this.update(this.props.familyAction);
  }

  // .##.....##.########..########.....###....########.########....##.....##.####
  // .##.....##.##.....##.##.....##...##.##......##....##..........##.....##..##.
  // .##.....##.##.....##.##.....##..##...##.....##....##..........##.....##..##.
  // .##.....##.########..##.....##.##.....##....##....######......##.....##..##.
  // .##.....##.##........##.....##.#########....##....##..........##.....##..##.
  // .##.....##.##........##.....##.##.....##....##....##..........##.....##..##.
  // ..#######..##........########..##.....##....##....########.....#######..####

  public update(familyAction: string | null) {
    const value = this.getOpportunityMarkerValue(familyAction);
    const element = this.ui.opportunityMarkerValue;
    if (element) {
      element.replaceChildren();
      element.insertAdjacentHTML('beforeend', value);
    }
  }

  // .##.....##.########.####.##.......####.########.##....##
  // .##.....##....##.....##..##........##.....##.....##..##.
  // .##.....##....##.....##..##........##.....##......####..
  // .##.....##....##.....##..##........##.....##.......##...
  // .##.....##....##.....##..##........##.....##.......##...
  // .##.....##....##.....##..##........##.....##.......##...
  // ..#######.....##....####.########.####....##.......##...

  getOpportunityMarkerValue(familyAction: string | null) {
    const map = {
      [ENLIST_WRITER]: { text: _('Enlist Writer ${tkn_icon}'), icon: WRITER },
      [ENLIST_OFFICER]: {
        text: _('Officer in Training'),
        icon: OFFICER_IN_TRAINING,
      },
      [SEEK_SHARE]: { text: _('Seek Share'), icon: SHARE },
      [PURCHASE_LUXURY]: { text: _('Buy Luxury'), icon: LUXURY },
      [PURCHASE_SHIPYARD]: { text: _('Buy Shipyard'), icon: SHIPYARD },
      [PURCHASE_WORKSHOP]: { text: _('Buy Workshop'), icon: WORKSHOP },
    };

    if (familyAction && map[familyAction]) {
      const { text, icon } = map[familyAction];
      return formatStringRecursive(text, { tkn_icon: icon });//.toLocaleUpperCase();
    }
    return _('Not placed');
  }

  tplOpportunityMarker() {
    return `
      <div id="joco-opportunity-marker-${this.props.familyId}" class="joco-opportunity-marker">
        <span class="fb-font-baskerville fb-font-bold fb-font-16">${_('Opportunity Marker').toLocaleUpperCase()}</span>
        <div class="joco-opportunity-marker-value">
          <span id="joco-opportunity-marker-value-${this.props.familyId}" class="fb-font-baskerville fb-font-bold fb-font-16"></span>
        </div>
      </div>
    `;
  }
}
