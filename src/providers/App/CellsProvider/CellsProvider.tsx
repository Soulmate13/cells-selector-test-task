import { ReactNode, useReducer } from 'react';
import { INITIAL_GRID } from 'constants/grid';
import { StateContext, DispatchContext, StateType } from 'contexts/App/CellContext';
import cellsReducer from 'reducers/App/CellsReducer';

export const initialState: StateType = {
  startCell: null,
  isSelecting: false,
  cells: INITIAL_GRID
};

interface IProps {
  children: ReactNode;
}

const CellsProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(cellsReducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default CellsProvider;
