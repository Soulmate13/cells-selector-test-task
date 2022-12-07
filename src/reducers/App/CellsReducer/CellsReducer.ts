import { Reducer } from 'react';
import { ActionTypes, StateType } from 'contexts/App/CellContext';
import { isNumberBetween } from 'utils/isNumberBetween';

const cellsReducer: Reducer<StateType, ActionTypes> = (state, action) => {
  switch (action.type) {
    case 'START_SELECTING':
      return {
        ...state,
        startCell: {
          row: action.payload.row,
          column: action.payload.column
        },
        isSelecting: true
      };

    case 'SELECT_CELLS': {
      const newCells = [...state.cells.map((rows) => {
        return rows.map((cell) => {
          const isSelected = (!!state.startCell && state.isSelecting)
            ? (isNumberBetween(cell.index, state.startCell.column, action.payload.column) &&
              isNumberBetween(cell.row, state.startCell.row, action.payload.row))
            : /* istanbul ignore next */ false;
          return {
            ...cell,
            isSelected
          };
        });
      })];
      return {
        ...state,
        cells: newCells
      };
    }
    case 'STOP_SELECTING': {
      return {
        ...state,
        startCell: null,
        isSelecting: false
      };
    }
    /* istanbul ignore next */
    default:
      throw new Error('Incorrect action type');
  }
};

export default cellsReducer;
