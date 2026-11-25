import { BarConfig } from '.';

export const tplTabButton = ({ id, icon, text }: BarConfig) => `
<div id="joco-bar-item-${id}" data-tab-id="${id}" class="joco-bar-item ${id}-bar-item">
  ${icon ? `<i class="fa6 fa6-${icon}"></i>` : ''}
  <div class="fb-font-baskerville fb-font-bold joco-bar-item-text">${text}</div>
</div>
`;

// const tplTabButton = (text: string, index: number) => `
// <div id="joco-bar-item-${index}" class="joco-bar-item"><span>${text}</span></div>
// `;
