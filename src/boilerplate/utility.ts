interface AbsolutePosition {
  top: number;
  left: number;
}

const isDebug =
  window.location.host == 'studio.boardgamearena.com' ||
  window.location.hash.indexOf('debug') > -1;
const debug = isDebug ? console.info.bind(window.console) : () => {};

const addCancelButton = (callback?: Function) => {
  Interaction.use().addCancelButton(callback);
};

const addConfirmButton = (callback: Function) => {
  Interaction.use().addConfirmButton(callback);
};

const addPrimaryActionButton = (props: {
  id: string;
  text: string;
  callback: Function | string;
  extraClasses?: string;
}) => Interaction.use().addPrimaryActionButton(props);

const clearPossible = () => {
  Interaction.use().clearPossible();
};

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

const onClick = (
  node: HTMLElement | string,
  callback: Function,
  temporary = true
) => {
  let element = typeof node === 'string' ? document.getElementById(node) : node;
  Interaction.use().onClick(element, callback, temporary);
};

const setSelected = (node: HTMLElement | string) => {
  let element = typeof node === 'string' ? document.getElementById(node) : node;
  Interaction.use().setSelected(element);
};

const performAction = (actionName: string, args: Record<string, unknown>) => {
  Interaction.use().clearPossible();
  Interaction.use().performAction(actionName, args);
};
