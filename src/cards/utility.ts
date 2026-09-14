import { Log } from '../boilerplate/notification-manager/types';
import { formatStringRecursive } from '../boilerplate/utility';

export const tplCardText = (
  text: Array<string | Log>,
  {
    containerClass = 'fb-card-text',
    textClass = 'fb-font-12 fb-font-baskerville',
  }: {
    containerClass?: string;
    textClass?: string;
  },
) => {
  return `
    <div class="${containerClass} bga-autofit">
      ${text
        .map((item: string | Log) => {
          if (typeof item === 'string') {
            return `<span class="${textClass}">${item}</span>`;
          } else {
            return `<span class="${textClass}">${formatStringRecursive(_(item.log), item.args)}</span>`;
          }
        })
        .join('')}
    
    </div>
  `;
};
