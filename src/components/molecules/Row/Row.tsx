import { GridType } from 'constants/grid';
import Cell from 'components/atoms/Cell';
import classes from './styles.module.css';

export interface IRow {
  cells: GridType[number];
}

const Row = ({ cells }: IRow) => (
  <div
    className={classes.row}
    role={classes.row}
  >
    {cells.map(({ index, row, isSelected }) => (
      <Cell
        key={`${row}-${index}`}
        row={row}
        index={index}
        isSelected={isSelected}
      />))}
  </div>
);

export default Row;
