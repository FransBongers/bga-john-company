export const tplRegiment = ({
  id,
  extraClasses = '',
}: {
  id?: string;
  extraClasses?: string;
}): string => {
  return `
    <div id="${id ?? ''}" class="joco-regiment ${extraClasses}"></div>
  `;
};
