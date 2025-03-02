/**
 * Note: we need to keep player_name in snake case, because the framework uses
 * it to add player colors to the log messages.
 */

interface Log {
  log: string;
  args: Record<string, unknown>;
}

interface NotifWithPlayerArgs {
  playerId: number;
  player_name: string;
}

interface NotifDraftNewCardsPrivateArgs {
  cardIds: string[];
  lastCard: boolean;
}

interface NotifDraftCardPrivateArgs extends NotifWithPlayerArgs {
  cardIds: string[];
}

interface NotifEnlistFamilyMember extends NotifWithPlayerArgs {
  familyMember: JocoFamilyMember;
}

interface NotifGainCash extends NotifWithPlayerArgs {
  amount: number;
}

interface NotifGainEnterprise extends NotifWithPlayerArgs {
  type: string;
}

interface NotifMoveFamilyMembers {
  familyMembers: JocoFamilyMember[];
}

interface NotifNewCompanyShare extends NotifWithPlayerArgs {
  familyMember: JocoFamilyMember;
  debt: number;
}

interface NotifNextPhase {
  phase: string;
}

interface NotifPlaceShip extends NotifWithPlayerArgs {
  ship: JocoShipBase;
}

interface NotifPurchaseEnterprise extends NotifWithPlayerArgs {
  amount: number;
  type: string;
}

interface NotifSeekShare extends NotifWithPlayerArgs {
  amount: number;
  familyMember: JocoFamilyMember;
}

interface NotifSetupFamilyMembers extends NotifWithPlayerArgs {
  familyMembers: JocoFamilyMember[];
}