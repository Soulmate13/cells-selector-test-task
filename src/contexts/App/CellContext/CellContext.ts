import React, { createContext } from 'react';
import { INITIAL_GRID } from 'constants/grid';

export type Cell = { row: number, column: number };

export interface StateType {
  startCell: Cell | null;
  isSelecting: boolean;
  cells: typeof INITIAL_GRID;
}

export type ActionTypes =
  | { type: 'START_SELECTING', payload: Cell }
  | { type: 'SELECT_CELLS', payload: Cell }
  | { type: 'STOP_SELECTING' }

export const StateContext = createContext<StateType | undefined>(undefined);
StateContext.displayName = 'StateContext';

export const DispatchContext = createContext<React.Dispatch<ActionTypes> | undefined>(undefined);
DispatchContext.displayName = 'DispatchContext';
