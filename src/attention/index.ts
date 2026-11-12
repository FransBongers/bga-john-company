import { GameAlias, JocoAttention } from '../types';

export class AttentionManager {
  private static instance: AttentionManager;
  private entries = new Map<number, JocoAttention>();
  private listeners: Array<() => void> = [];
  private pending = new Set<number>();
  private readOnly: boolean;

  private constructor(private game: GameAlias) {
    this.readOnly = game.isSpectator ||
      (typeof g_archive_mode !== 'undefined' && g_archive_mode) ||
      typeof g_replayFrom !== 'undefined';
    if (!this.readOnly) {
      game.gamedatas.attention.forEach((entry) => this.entries.set(entry.id, entry));
    }
  }

  public static create(game: GameAlias) {
    AttentionManager.instance = new AttentionManager(game);
  }

  public static getInstance() {
    return AttentionManager.instance;
  }

  public subscribe(listener: () => void) {
    this.listeners.push(listener);
  }

  public getEntries(kind: string, itemType: string, itemId?: string) {
    return [...this.entries.values()].filter(
      (entry) => entry.kind === kind && entry.itemType === itemType &&
        (itemId === undefined || entry.itemId === itemId),
    );
  }

  public add(entry: JocoAttention) {
    if (this.readOnly) return;
    this.entries.set(entry.id, entry);
    this.changed();
  }

  public remove(ids: number[]) {
    ids.forEach((id) => this.entries.delete(id));
    this.changed();
  }

  public async acknowledge(entries: JocoAttention[]) {
    const ids = entries.map((entry) => entry.id).filter((id) => !this.pending.has(id));
    if (!ids.length || this.readOnly) return;
    ids.forEach((id) => this.pending.add(id));
    try {
      const request = this.game.bga.actions.performAction(
        'actAcknowledgeAttention',
        { ids: JSON.stringify(ids) },
        { lock: false, checkAction: false, checkPossibleActions: false },
      );
      if (request) {
        await request;
        this.remove(ids);
      }
    } catch (error) {
      console.error('Unable to acknowledge attention', error);
    } finally {
      ids.forEach((id) => this.pending.delete(id));
    }
  }

  private changed() {
    this.listeners.forEach((listener) => listener());
  }
}