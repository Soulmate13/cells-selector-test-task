import { screen, waitFor } from '@testing-library/react';
import { selectedCells } from 'constants/tests';
import { StateType } from 'contexts/App/CellsContext';
import { render } from 'utils/renderer';
import Grid from 'components/organisms/Grid/Grid';
import { initialState } from 'providers/App/CellsProvider';

describe('Grid', () => {
  const mockDispatch = jest.fn();
  const renderComponent = (stateContext?: StateType) => render(
    <Grid/>,
    { dispatchContext: mockDispatch, stateContext }
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when given a grid with selected cells', () => {
    it('they have relevant attributes', async() => {
      renderComponent({ ...initialState, cells: selectedCells });

      expect(screen.getByTestId('cell-1-1')).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByTestId('cell-1-2')).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('when user clicks left mouse button on a cell', () => {
    it('starts selection', async() => {
      const { user } = renderComponent();
      const cell = screen.getByTestId('cell-2-3');
      user.pointer({ keys: '[MouseLeft]', target: cell });

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'START_SELECTING', payload: { row: 2, column: 3 } });
      });
    });
  });

  describe('when user clicks left mouse button on a cell and moves cursor to the neighbour cell', () => {
    it('starts selection and selects cells', async() => {
      const { user } = renderComponent({ ...initialState, startCell: { row: 2, column: 3 }, isSelecting: true });
      const cell = screen.getByTestId('cell-2-3');
      const neighbourCell = screen.getByTestId('cell-2-4');

      user.pointer(
        { keys: '[MouseLeft>]', target: cell }
      );

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'START_SELECTING', payload: { row: 2, column: 3 } });
      });

      user.pointer(
        { target: neighbourCell }
      );

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'SELECT_CELLS', payload: { row: 2, column: 4 } });
      });
    });
  });

  describe('when user clicks left mouse button on a cell and moves cursor to the neighbour cell and then releases mouse', () => {
    it('starts selection and selects cells', async() => {
      const { user } = renderComponent({ ...initialState, startCell: { row: 2, column: 3 }, isSelecting: true });
      const cell = screen.getByTestId('cell-2-3');
      const neighbourCell = screen.getByTestId('cell-2-4');

      user.pointer(
        { keys: '[MouseLeft>]', target: cell }
      );

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'START_SELECTING', payload: { row: 2, column: 3 } });
      });

      user.pointer(
        { target: neighbourCell }
      );

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'SELECT_CELLS', payload: { row: 2, column: 4 } });
      });

      user.pointer(
        { keys: '[/MouseLeft]', target: cell }
      );

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'STOP_SELECTING' });
      });
    });
  });

  describe('when user clicks left mouse button on a cell and moves cursor out of the grid', () => {
    it('stops selection', async() => {
      const { user } = renderComponent({ ...initialState, startCell: { row: 2, column: 3 }, isSelecting: true });
      const grid = screen.getByTestId('grid');
      const cell = screen.getByTestId('cell-2-3');

      user.pointer([{ keys: '[MouseLeft>]', target: cell }, { target: grid, offset: 10000 }]);

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'STOP_SELECTING' });
      });
    });
  });

  describe('when user moves cursor over two cells without clicking left mouse button before', () => {
    it('does nothing', async() => {
      const { user } = renderComponent({ ...initialState });
      const cell = screen.getByTestId('cell-2-3');
      const neighbourCell = screen.getByTestId('cell-2-4');

      user.pointer([{ target: cell }]);

      await waitFor(() => {
        expect(mockDispatch).not.toHaveBeenCalled();
      });

      user.pointer([{ target: neighbourCell }]);

      await waitFor(() => {
        expect(mockDispatch).not.toHaveBeenCalled();
      });
    });
  });

  describe('when user moves cursor out of the grid without clicking left mouse button before', () => {
    it('does nothing', async() => {
      const { user } = renderComponent({ ...initialState, startCell: { row: 2, column: 3 }, isSelecting: true });
      const grid = screen.getByTestId('grid');

      user.pointer([{ target: grid, offset: 10000 }]);

      await waitFor(() => {
        expect(mockDispatch).not.toHaveBeenCalled();
      });
    });
  });
});
