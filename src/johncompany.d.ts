// TODO: split in framework & game specicf

interface AddButtonProps {
  id: string;
  text: string;
  callback: () => void;
  extraClasses?: string;
}

interface AddActionButtonProps extends AddButtonProps {
  color?: 'blue' | 'gray' | 'red' | 'none';
}

interface State {
  onEnteringState: (args: any) => void;
  onLeavingState: () => void;
}

interface CommonStateArgs {
  optionalAction: boolean;
  previousEngineChoices: number;
  previousSteps: number[];
}

interface GamePiece {
  id: string;
  location: string;
  state: number;
}

// interface JohnCompanyGame extends Game {
//   // addCancelButton: ({ callback }?: { callback?: Function }) => void;
//   addConfirmButton: (props: { callback: Function | string }) => void;
//   // addLogClass: () => void;
//   // addPassButton: (props: { optionalAction: boolean; text?: string }) => void;
//   // addPlayerButton: ({
//   //   player,
//   //   callback,
//   // }: {
//   //   player: BgaPlayer;
//   //   callback: Function | string;
//   // }) => void;
//   addPrimaryActionButton: (props: AddButtonProps) => void;
//   addSecondaryActionButton: (props: AddButtonProps) => void;
//   // addDangerActionButton: (props: AddButtonProps) => void;
//   addUndoButtons: (props: CommonStateArgs) => void;
//   // cancelLogs: (notifIds: string[]) => void;
//   // clearInterface: () => void;
//   clearPossible: () => void;
//   clientUpdatePageTitle: (props: {
//     text: string;
//     args: Record<string, unknown>;
//     nonActivePlayers?: boolean;
//   }) => void;
//   // closeCurrentTooltip: () => void;
//   // format_string_recursive: (
//   //   log: string,
//   //   args: Record<string, unknown>
//   // ) => string;
//   // getPlayerId: () => number;
//   // onCancel: () => void;
//   // setCardSelectable: (props: {
//   //   id: string;
//   //   callback: (event: PointerEvent) => void;
//   // }) => void;
//   // setCardSelected: (props: { id: string }) => void;
//   // setLocationSelectable: (props: {
//   //   id: string;
//   //   callback: (event: PointerEvent) => void;
//   // }) => void;
//   // setLocationSelected: (props: { id: string }) => void;
//   // setSpaceSelectable: (props: {
//   //   id: string;
//   //   callback: (event: PointerEvent) => void;
//   // }) => void;
//   // setSpaceSelected: (props: { id: string }) => void;
//   // setElementSelectable: (props: {
//   //   id: string;
//   //   callback: (event: PointerEvent) => void;
//   // }) => void;
//   // setElementSelected: (props: { id: string }) => void;
//   // removeSelectedFromElement: (props: { id: string }) => void;
//   takeAction: (props: {
//     action: string;
//     atomicAction?: boolean;
//     args?: Record<string, unknown>;
//     checkAction?: string; // Action used in checkAction
//   }) => void;
//   // toggleHelpMode: (b: boolean) => void;
//   // updateLayout: () => void;
//   // updateLogTooltips: () => void;
//   // _displayedTooltip: null | Tooltip;
//   // _dragndropMode: boolean;
//   // _helpMode: boolean;
//   // _last_tooltip_id: number; // generic
//   // tooltipsToMap: [tooltipId: number, card_id: string][]; // generic

// }

// Used to define game in all core states

interface JohnCompanyGamedatas extends Gamedatas {
  // Default
  canceledNotifIds: string[];
  gameOptions: {
    crownEnabled: boolean;
  };
  playerOrder: number[];
  players: Record<number, JohnCompanyPlayerData>;
  armyPieces: Record<string, JocoArmyPieceBase>
  company: {
    debt: number;
    balance: number;
    standing: number | 'fail';
  };
  crown?: {
    color: string;
    climate?: Climate;
  };
  enterprises: Record<string, JoCoEnterPriseBase>
  families: Record<string, JocoFamily>;
  familyMembers: Record<string, JocoFamilyMember>;
  offices: Record<string, JoCoOfficeBase>;
  orders: Record<string, JoCoOrder>;
  phase: string;
  powerTokens: string[];
  regions: Record<string, JocoRegionBase>;
  ships: Record<string, JocoShipBase>;
  staticData: {
    regions: Record<string, JocoRegionStatic>;
    setupCards: Record<string, JocoSetupCardStatic>;
  };
  turn: number;
}

interface JocoFamily {
  id: string;
  crownPromiseCubes: number;
  hasChairmanMarker: number;
  isLeaderOfOpposition: number;
  lawPieces: number;
  location: string;
  opportunityMarker: number;
  spentOnRetirement: number;
  state: number;
  treasury: number;
  trophies: number;
  victoryPoints: number;
}

type BengalPresidency = 'BengalPresidency';
type BombayPresidency = 'BombayPresidency';
type MadrasPresidency = 'MadrasPresidency';
type JoCoPresidency = BengalPresidency | BombayPresidency | MadrasPresidency;

interface JocoFamilyMember {
  id: string;
  location: string;
  state: number;
  familyId: string;
  presidency: JoCoPresidency | null;
}

interface JoCoOfficeBase extends GamePiece {
  familyMemberId: string | null;
  treasury: number;
}

interface JoCoOrder {
  id: string;
  location: string;
  status: 'open' | 'closed' | 'filled' | 'string';
}

interface JocoArmyPieceBase extends GamePiece {
  exhausted: boolean;
}

interface JocoRegionBase {
  id: string;
  control: string | null;
  looted: boolean;
  strength: number;
  untest: number;
}

interface JocoRegionStatic {
  name: string;
}

interface JocoShipBase extends GamePiece {
  type: string;
  fatigued: boolean;
}

type JoCoSetupCard = JoCoSetupCardBase & JocoSetupCardStatic;

interface JoCoSetupCardBase {
  id: string;
  location: string;
}

type JocoSetupCardStatic = {
  id: string;
  extra: boolean;
  scenarioSetup: number;
  items: Array<{ type: string; value?: string }>;
};

interface JoCoEnterPriseBase extends GamePiece {
  invested: boolean;
  shipId: string | null;
  type: string;
  used: boolean;
}

interface JohnCompanyPlayerData extends BgaPlayer {
  draft: JoCoSetupCard[];
  familyId: string;
  setupCards: JoCoSetupCard[];
}

type GameAlias = JohnCompany;
type GamedatasAlias = JohnCompanyGamedatas;
