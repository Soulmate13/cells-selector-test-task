import React from 'react';
import { ActionTypes, DispatchContext, StateContext, StateType } from 'contexts/App/CellsContext';
import useSafeContext from 'hooks/App/useSafeContext';
import classes from './style.module.css';

export interface ICell {
  index: number;
  row: number;
  isSelected: boolean;
}

const Cell = ({ index, row, isSelected }: ICell) => {
  const dispatch = useSafeContext<React.Dispatch<ActionTypes> | undefined>(DispatchContext);
  const grid = useSafeContext<StateType | undefined>(StateContext);

  const onMouseEnter = () => {
    /* istanbul ignore else */
    if (grid?.startCell && grid.isSelecting) {
      dispatch({ type: 'SELECT_CELLS', payload: { row, column: index } });
    }
  };

  const onMouseDown = () => dispatch({ type: 'START_SELECTING', payload: { row, column: index } });

  const onMouseUp = () => dispatch({ type: 'STOP_SELECTING' });

  return (
    <button
      className={`${isSelected ? classes.selected : ''} ${classes.cell}`}
      aria-selected={isSelected}
      role="gridcell"
      aria-colindex={index}
      data-testid={`cell-${row}-${index}`}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseEnter={onMouseEnter}
    />
  );
};

export default Cell;

