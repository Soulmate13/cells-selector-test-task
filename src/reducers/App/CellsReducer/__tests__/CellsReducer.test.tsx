import { selectedCells } from 'constants/tests';
import { ActionTypes } from 'contexts/App/CellsContext';
import { initialState } from 'providers/App/CellsProvider';
import cellsReducer from 'reducers/App/CellsReducer/CellsReducer';

describe('CellsReducer()', () => {
  describe('when START_SELECTING action is dispatched', () => {
    it('returns correct state', () => {
      const action: ActionTypes = { type: 'START_SELECTING', payload: { row: 1, column: 1 } };
      const result = cellsReducer(initialState, action);

      expect(result).toStrictEqual({ ...initialState, isSelecting: true, startCell: action.payload });
    });
  });

  describe('when SELECT_CELLS action is dispatched', () => {
    it('returns correct state', () => {
      const startCell = { row: 1, column: 1 };
      const action: ActionTypes = { type: 'SELECT_CELLS', payload: { row: 1, column: 2 } };
      const result = cellsReducer({ ...initialState, isSelecting: true, startCell: startCell }, action);

      expect(result).toStrictEqual({ cells: selectedCells, isSelecting: true, startCell: startCell });
    });
  });

  describe('when STOP_SELECTING action is dispatched', () => {
    it('returns correct state', () => {
      const startCell = { row: 1, column: 1 };
      const action: ActionTypes = { type: 'STOP_SELECTING' };
      const result = cellsReducer({ cells: selectedCells, isSelecting: true, startCell: startCell }, action);

      expect(result).toStrictEqual({ cells: selectedCells, isSelecting: false, startCell: null });
    });
  });
});
