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

interface NotifNextPhase {
  phase: string;
}

interface NotifSetupFamilyMembers extends NotifWithPlayerArgs {
  familyMembers: JocoFamilyMember[];
}