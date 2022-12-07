import React from 'react';
import { ActionTypes, DispatchContext, StateType, StateContext } from 'contexts/App/CellsContext';
import useSafeContext from 'hooks/App/useSafeContext';
import Row from 'components/molecules/Row';
import classes from './styles.module.css';

const Grid = () => {
  const grid = useSafeContext<StateType | undefined>(StateContext);
  const dispatch = useSafeContext<React.Dispatch<ActionTypes> | undefined>(DispatchContext);

  const onMouseLeave = () => {
    /* istanbul ignore else */
    if (grid?.isSelecting) {
      dispatch({ type: 'STOP_SELECTING' });
    }
  };

  return (
    <div
      className={classes.grid}
      tabIndex={0}
      onMouseLeave={onMouseLeave}
      role="grid"
      aria-colcount={grid.cells[0].length}
      aria-describedby="grid-heading"
      data-testid="grid"
    >
      {grid.cells.map((row, index) => (
        <Row
          key={index}
          cells={row}
        />
      ))}
    </div>
  );
};

export default Grid;
