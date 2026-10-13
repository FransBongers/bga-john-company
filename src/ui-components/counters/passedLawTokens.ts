import { IconCounter, IconCounterProps } from '../../boilerplate/ui-components';
import { createHtmlElement } from '../../boilerplate/utility';
import { tplPassedLawTokenIcon } from '../../icons/templates';

export interface PassedLawTokensCounterProps extends Omit<
  IconCounterProps,
  'iconElement' | 'type' | 'iconPosition'
> {}

export class PassedLawTokensCounter extends IconCounter {
  constructor(props: PassedLawTokensCounterProps) {
    super({
      ...props,
      iconElement: createHtmlElement(tplPassedLawTokenIcon()),
      iconPosition: 'overlap',
      type: 'passed-law-token',
    });

    this.setup();
  }

  setup() {
    this.counterElement.classList.add('fb-font-baskerville');
  }
}
