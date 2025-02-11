interface AbsolutePosition {
  top: number;
  left: number;
}

const isDebug =
  window.location.host == 'studio.boardgamearena.com' ||
  window.location.hash.indexOf('debug') > -1;
const debug = isDebug ? console.info.bind(window.console) : () => {};

const addPrimaryActionButton = (props: {
  id: string;
  text: string;
  callback: Function | string;
  extraClasses?: string;
}) => Interaction.use().addPrimaryActionButton(props);

const updatePageTitle = (
  text: string,
  args: Record<string, string | number> = {},
  nonActivePlayers: boolean = false
) =>
  Interaction.use().clientUpdatePageTitle(
    text,
    Object.assign(args, { you: '${you}' }),
    nonActivePlayers
  );

const setAbsolutePosition = (
  elt: HTMLElement,
  scaleVarName: string,
  { top, left }: AbsolutePosition
) => {
  // console.log('setAbsolutePosition', elt, top, left);
  if (!elt) {
    return;
  }
  elt.style.top = `calc(var(--${scaleVarName}) * ${top}px)`;
  elt.style.left = `calc(var(--${scaleVarName}) * ${left}px)`;
};
