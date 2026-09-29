import { IconCounter, IconCounterProps } from '../../boilerplate/ui-components';
import { createHtmlElement } from '../../boilerplate/utility';
import { tplTrophyIcon } from '../../icons/templates';

export interface TrophiesCounterProps extends Omit<
  IconCounterProps,
  'iconElement' | 'type' | 'iconPosition'
> {}

export class TrophiesCounter extends IconCounter {
  constructor(props: TrophiesCounterProps) {
    super({
      ...props,
      iconElement: createHtmlElement(tplTrophyIcon()),
      iconPosition: 'overlap',
      type: 'trophy',
    });

    this.setup();
  }

  setup() {
    this.counterElement.classList.add('fb-font-baskerville')
  }
}
