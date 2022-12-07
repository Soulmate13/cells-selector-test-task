import { createContext, Dispatch } from 'react';
import { initialGrid } from 'constants/grid';

export type Cell = { row: number, column: number };

export interface StateType {
  startCell: Cell | null;
  isSelecting: boolean;
  cells: typeof initialGrid;
}

export type ActionTypes =
  | { type: 'START_SELECTING', payload: Cell }
  | { type: 'SELECT_CELLS', payload: Cell }
  | { type: 'STOP_SELECTING' }

export const StateContext = createContext<StateType | undefined>(undefined);
StateContext.displayName = 'StateContext';

export const DispatchContext = createContext<Dispatch<ActionTypes> | undefined>(undefined);
DispatchContext.displayName = 'DispatchContext';
