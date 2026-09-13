export const tplDivider = (
  style: 'vertical' | 'horizontal' = 'horizontal',
  extraClasses = '',
) => `<div class="fb-divider ${extraClasses}" data-style="${style}"></div>`;
