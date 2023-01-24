import { TOptions, TTable, UseStoreType } from 'components/organisms/Grid/Grid';
import classes from './styles.module.css';

interface IProps {
  useTable: UseStoreType<TTable>
  useOptions: UseStoreType<TOptions>
}

function List({ useTable, useOptions }: IProps) {
  const [table] = useTable<TTable>((store) => store);
  const [hasStarted] = useOptions<boolean>((store) => store.hasStarted);

  const selectedCells = (!!table && Object.keys(table).length !== 0) ?
    Object.entries(table)
      .filter(
        (cell) => cell[1].selected)
      .map((cell) => cell[0])
    : [];

  return (
    hasStarted ? <div className={classes.listContainer}>
      <h2 className={classes.title}>List of selected cells (Row-Column)</h2>
      <ul className={classes.list}>
        {!!selectedCells.length && selectedCells.map((element) => {
          const [row, col] = element.split('-');
          return <li key={`${row}-${col}`}>{row}-{col},&nbsp;</li>;
        })}
      </ul>
    </div> : null
  );
}

export default List;
