import { GRID_DIMENSIONS } from 'constants/grid';
import Cell from 'components/atoms/Cell';
import { TOptions, TTable, UseStoreType } from 'components/organisms/Grid/Grid';
import classes from 'components/organisms/Grid/styles.module.css';

interface IProps {
  useOptions: UseStoreType<TOptions>
  useTable: UseStoreType<TTable>
}

const Table = ({ useTable, useOptions }: IProps) => {
  const [size] = useOptions<number>((store) => store.size);
  const [hasStarted] = useOptions<boolean>((store) => store.hasStarted);

  const divider = window.innerWidth > 768 ? 1 : 2;

  return (
    <div
      className={classes.grid}
      style={{ gridTemplate: `repeat(${size}, ${(GRID_DIMENSIONS / divider) / size - 1}px) / repeat(${size}, ${(GRID_DIMENSIONS / divider) / size - 1}px)` }}
    >
      {(!!size && hasStarted) && Array.from(Array(size), (item, index) => {
        const row = [];
        for (let i = 0; i < size; i++) {
          row.push(
            <Cell
              key={`${index}-${i}`}
              row={index + 1}
              col={i + 1}
              useTable={useTable}
            />
          );
        }
        return row;
      })}
    </div>
  );
};

export default Table;
