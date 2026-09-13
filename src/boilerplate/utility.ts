import { PlayerManager } from '../player-manager';
import { CommonStateArgs } from '../types';
import { Interaction } from './interaction';

export interface AbsolutePosition {
  top: number;
  left: number;
}

export const isDebug =
  window.location.host == 'studio.boardgamearena.com' ||
  window.location.hash.indexOf('debug') > -1;
export const debug = isDebug ? console.info.bind(window.console) : () => {};

export const addCancelButton = (
  props: { callback?: Function; extraClasses?: string } = {},
) => {
  Interaction.use().addCancelButton(props);
};

export const addConfirmButton = (callback: Function) => {
  Interaction.use().addConfirmButton(callback);
};

export const addDangerActionButton = (props: {
  id: string;
  text: string;
  callback: Function;
  extraClasses?: string;
}) => {
  Interaction.use().addDangerActionButton(props);
};

export const addPassButton = (optionalAction: boolean, text?: string) =>
  Interaction.use().addPassButton(optionalAction, text);

export const addPlayerButton = (props: {
  id: string;
  text: string;
  playerId: number;
  callback: Function;
  extraClasses?: string;
}) => Interaction.use().addPlayerButton(props);

export const addPrimaryActionButton = (props: {
  id: string;
  text: string;
  callback: Function;
  extraClasses?: string;
}) => Interaction.use().addPrimaryActionButton(props);

export const addSecondaryActionButton = (props: {
  id: string;
  text: string;
  callback: Function;
  extraClasses?: string;
}) => Interaction.use().addSecondaryActionButton(props);

export const addUndoButtons = (props: CommonStateArgs) => {
  Interaction.use().addUndoButtons(props);
};

export const clearPossible = () => {
  Interaction.use().clearPossible();
};

export const updatePageTitle = (
  text: string,
  args: Record<string, string | number | unknown> = {},
  nonActivePlayers: boolean = false,
) => Interaction.use().clientUpdatePageTitle(text, args, nonActivePlayers);

export const formatStringRecursive = (
  log: string,
  args: Record<string, unknown>,
): string => {
  return Interaction.use().formatStringRecursive(log, args);
};

export const setAbsolutePosition = (
  elt: HTMLElement,
  scaleVarName: string,
  { top, left }: AbsolutePosition,
) => {
  // console.log('setAbsolutePosition', elt, top, left);
  if (!elt) {
    return;
  }
  elt.style.top = `calc(var(--${scaleVarName}) * ${top}px)`;
  elt.style.left = `calc(var(--${scaleVarName}) * ${left}px)`;
};

export const onClick = (
  node: HTMLElement | string,
  callback: Function,
  temporary = true,
) => {
  let element = typeof node === 'string' ? document.getElementById(node) : node;
  Interaction.use().onClick(element, callback, temporary);
};

export const setSelected = (node: HTMLElement | string) => {
  let element = typeof node === 'string' ? document.getElementById(node) : node;
  Interaction.use().setSelected(element);
};

export const performAction = (
  actionName: string,
  args: Record<string, unknown>,
) => {
  Interaction.use().clearPossible();
  Interaction.use().performAction(actionName, args);
};

export const getPlayerName = (playerId: number) => {
  return PlayerManager.getInstance().getPlayer(playerId).getName();
};

export const createHtmlElement = (html: string): HTMLElement => {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstChild as HTMLElement;
};
