export type AssetType = 'share' | 'enterprise' | 'promiseCard' | 'prestige';

export interface AssetOption {
  id: string;
  label: string;
  element: HTMLElement;
}

export interface AvailableAssets {
  cash: number;
  options: Record<AssetType, AssetOption[]>;
}
