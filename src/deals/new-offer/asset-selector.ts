import { CashCounter } from '../../ui-components';
import { JocoDealAssets } from '../../types';
import { AssetType, AvailableAssets } from './types';
import { getAvailableAssets } from './utility';

const SECTIONS: { type: AssetType; title: () => string }[] = [
  { type: 'share', title: () => _('Company Shares') },
  { type: 'enterprise', title: () => _('Enterprises') },
  { type: 'promiseCard', title: () => _('Promise Cards') },
  { type: 'prestige', title: () => _('Prestige Cards') },
];

const emptySelection = (): Record<AssetType, string[]> => ({
  share: [],
  enterprise: [],
  prestige: [],
  promiseCard: [],
});

/** Lets one side of a deal pick the assets (cash and cards) they hand over. */
export class AssetSelector {
  private available: AvailableAssets | null = null;
  private selected = emptySelection();
  private cash: CashCounter;
  private assetsContainer: HTMLElement;

  constructor(
    private id: string,
    private onChange: () => void,
  ) {
    this.assetsContainer = document.getElementById(`${id}-assets`)!;

    this.cash = new CashCounter({
      parent: document.getElementById(`${id}-cash`)!,
      initialValue: 0,
      id: `new-offer-${id}`,
      buttonStyle: 'blue',
    });
    this.cash.setActive();
    this.cash
      .getButtonElement('plus')
      .addEventListener('click', () => this.changeCash(1));
    this.cash
      .getButtonElement('minus')
      .addEventListener('click', () => this.changeCash(-1));

    document.getElementById(`${id}-reset`)!.onclick = () => this.reset();
  }

  public load(playerId: number) {
    this.available = getAvailableAssets(playerId);
    this.reset();
  }

  public reset() {
    this.selected = emptySelection();
    this.cash.toValue(0);
    this.render();
    this.onChange();
  }

  public getAssets(): JocoDealAssets {
    return { cash: this.cash.getValue(), ...this.selected };
  }

  public getLabels(): string[] {
    const labels: string[] = [];
    const cash = this.cash.getValue();
    if (cash > 0) {
      labels.push(`£${cash}`);
    }
    SECTIONS.forEach(({ type }) => {
      if (type === 'share') {
        const count = this.selected.share.length;
        if (count > 0) {
          labels.push(`${count} ${_('Company Share(s)')}`);
        }
        return;
      }
      this.selected[type].forEach((id) => {
        const option = this.available?.options[type].find((o) => o.id === id);
        if (option) {
          labels.push(option.label);
        }
      });
    });
    return labels;
  }

  private changeCash(delta: number) {
    const max = this.available?.cash ?? 0;
    const next = Math.min(max, Math.max(0, this.cash.getValue() + delta));
    this.cash.toValue(next);
    this.onChange();
  }

  private toggle(type: AssetType, id: string, elt: HTMLElement) {
    const isSelected = this.selected[type].includes(id);
    this.selected[type] = isSelected
      ? this.selected[type].filter((itemId) => itemId !== id)
      : [...this.selected[type], id];
    elt.classList.toggle('selected', !isSelected);
    this.onChange();
  }

  private render() {
    this.assetsContainer.replaceChildren();
    if (!this.available) {
      return;
    }

    SECTIONS.forEach(({ type, title }) => {
      const options = this.available!.options[type];
      if (options.length === 0) {
        return;
      }
      const section = document.createElement('div');
      section.classList.add('joco-asset-section', `joco-asset-section-${type}`);

      const header = document.createElement('div');
      header.classList.add('fb-font-baskerville', 'fb-font-16');
      header.textContent = title().toLocaleUpperCase();
      section.appendChild(header);

      const list = document.createElement('div');
      list.classList.add('joco-asset-list');
      options.forEach(({ id, element }) => {
        element.classList.add('joco-asset-option', 'selectable');
        element.classList.toggle('selected', this.selected[type].includes(id));
        element.onclick = () => this.toggle(type, id, element);
        list.appendChild(element);
      });
      section.appendChild(list);
      this.assetsContainer.appendChild(section);
    });
  }
}
