// TODO: split in framework & game specic

export interface AddButtonProps {
  id: string;
  text: string;
  callback: () => void;
  extraClasses?: string;
}

export interface AddActionButtonProps extends AddButtonProps {
  color?: 'blue' | 'gray' | 'red' | 'none';
}

export interface GameState<T> {
  onEnteringState: (args: T) => void;
  onLeavingState: () => void;
  setDescription: (
    activePlayerIds: number | number[],
    args: T,
  ) => void;
}

export interface CommonStateArgs {
  optionalAction: boolean;
  previousEngineChoices: number;
  previousSteps: number[];
}

export interface GamePiece {
  id: string;
  location: string;
  state: number;
}
