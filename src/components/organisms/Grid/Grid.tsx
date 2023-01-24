import Table from 'components/molecules/Table';
import List from 'components/molecules/List';
import Actions from 'components/molecules/Actions';
import createStore from 'store/store';
import classes from './styles.module.css';

export type TTableCell = {
  selected: boolean;
}

export type TTable = Record<string, TTableCell>

export type TOptions = {
  size: number;
  hasStarted: boolean;
}

export type UseStoreType<StoreType> = <SelectorOutput>(selector: (store: StoreType) => SelectorOutput) =>
  [SelectorOutput, ((value: Partial<StoreType>) => void)]

const initialTable: TTable = {};

const initialOptions: TOptions = {
  size: 0,
  hasStarted: false
};

const Grid = () => {
  const {
    Provider: TableProvider,
    useStore: useTable
  } = createStore<TTable>(initialTable);

  const {
    Provider: OptionsProvider,
    useStore: useOptions
  } = createStore<TOptions>(initialOptions);

  return (
    <TableProvider>
      <OptionsProvider>
        <div className={classes.gridWrapper}>
          <div className={classes.gridContainer}>
            <Actions
              useTable={useTable}
              useOptions={useOptions}
            />

            <Table
              useOptions={useOptions}
              useTable={useTable}
            />
          </div>

          <List
            useTable={useTable}
            useOptions={useOptions}
          />
        </div>
      </OptionsProvider>
    </TableProvider>
  );
};

export default Grid;
