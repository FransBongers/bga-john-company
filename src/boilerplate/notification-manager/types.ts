/**
 * Note: we need to keep player_name in snake case, because the framework uses
 * it to add player colors to the log messages.
 */

import { Climate } from "../../crown/climate";
import { JocoArmyPieceBase, JocoFamilyMember, JoCoOrder, JocoRegionBase, JocoShipBase } from "../../types";

export interface Log {
  log: string;
  args: Record<string, unknown>;
}

export interface NotifWithPlayerArgs {
  playerId: number;
  player_name: string;
}

export interface NotifAllocateBalanceToOffice extends NotifWithPlayerArgs {
  officeId: string;
  companyBalance: number;
  officeTreasury: number;
}

export interface NotifChangeOrderStatus extends NotifWithPlayerArgs {
  order: JoCoOrder;
}

export interface NotifCompanyOperationChairman extends NotifWithPlayerArgs {
  companyBalance: number;
  companyDebt: number;
  debtIncreased: boolean;
  treasuries: Record<string, number>;
}

export interface NotifDraftNewCardsPrivateArgs {
  cardIds: string[];
  lastCard: boolean;
}

export interface NotifElephantMarch {
  location: string;
  facing: string;
}

export interface NotifDraftCardPrivateArgs extends NotifWithPlayerArgs {
  cardIds: string[];
}

export interface NotifEnlistFamilyMember extends NotifWithPlayerArgs {
  familyMember: JocoFamilyMember;
}

export interface NotifFillOrder extends NotifWithPlayerArgs {
  amount: number;
  order: JoCoOrder;
  from: string | null;
  familyMember: JocoFamilyMember | null;
}

export interface NotifGainCash extends NotifWithPlayerArgs {
  amount: number;
}

export interface NotifGainEnterprise extends NotifWithPlayerArgs {
  type: string;
}

export interface NotifMakeCheck extends NotifWithPlayerArgs {
  diceResults: number[];
}

export interface NotifMoveCompanyBalance {
  companyBalance: number;
}

export interface NotifMoveCompanyDebt {
  companyDebt: number;
  companyBalance?: number;
}

export interface NotifMoveCompanyStanding {
  companyStanding: number;
}

export interface NotifMoveFamilyMember {
  familyMember: JocoFamilyMember;
  to: string;
}

export interface NotifMoveFamilyMembers {
  familyMembers: JocoFamilyMember[];
}

export interface NotifMoveRegiment extends NotifWithPlayerArgs {
  regiment: JocoArmyPieceBase;
  from: string;
}

export interface NotifMoveShipArgs extends NotifWithPlayerArgs {
  ship: JocoShipBase;
  from: string;
}

export interface NotifMoveWriterArgs extends NotifWithPlayerArgs {
  writer: JocoFamilyMember;
  from: string;
}

export interface NotifNewCompanyShare extends NotifWithPlayerArgs {
  familyMember: JocoFamilyMember;
  debt: number;
}

export interface NotifNextPhase {
  phase: string;
}

export interface NotifPayFromTreasury extends NotifWithPlayerArgs {
  officeId: string;
  amount: number;
  treasury: number;
}

export interface NotifPlaceShip extends NotifWithPlayerArgs {
  ship: JocoShipBase;
}

export interface NotifPurchaseEnterprise extends NotifWithPlayerArgs {
  amount: number;
  type: string;
}

export interface NotifReturnFamilyMemberToSupply extends NotifWithPlayerArgs {
  familyMember: JocoFamilyMember;
}

export interface NotifSeekShare extends NotifWithPlayerArgs {
  amount: number;
  familyMember: JocoFamilyMember;
}

export interface NotifSetCrownClimate extends NotifWithPlayerArgs {
  climate: Climate;
}

export interface NotifSetupFamilyMembers extends NotifWithPlayerArgs {
  familyMembers: JocoFamilyMember[];
}

export interface NotifTransferPromiseCubes extends NotifWithPlayerArgs {
  amount: number;
}

export interface NotifUpdateRegion {
  region: JocoRegionBase;
}
