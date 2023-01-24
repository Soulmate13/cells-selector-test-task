import { TTableCell, TTable, UseStoreType } from 'components/organisms/Grid/Grid';
import classes from './style.module.css';

export interface ICell {
  col: number;
  row: number;
  useTable: UseStoreType<TTable>
}

const Cell = ({ col, row, useTable }: ICell) => {
  const [value, setStore] = useTable<TTableCell>((store) => store[`${row}-${col}`]);

  const onMouseEnter = () => {
    setStore({ [`${row}-${col}`]: { selected: !value.selected } });
  };

  return (
    <button
      className={`${value.selected ? classes.selected : ''} ${classes.cell}`}
      aria-selected={value.selected}
      role="gridcell"
      aria-colindex={col}
      data-testid={`cell-${row}-${col}`}
      onMouseEnter={onMouseEnter}
    />
  );
};

export default Cell;

