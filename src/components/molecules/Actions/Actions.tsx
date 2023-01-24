import { ChangeEvent } from 'react';
import useSWR from 'swr';
import { getModes } from 'api/modes';
import { generateEmptyTable } from 'utils/table';
import { TOptions, TTable, UseStoreType } from 'components/organisms/Grid/Grid';
import classes from './styles.module.css';

interface IProps {
  useOptions: UseStoreType<TOptions>
  useTable: UseStoreType<TTable>
}

const Actions = ({ useTable, useOptions }: IProps) => {
  const { data, isLoading, error } = useSWR('modes', getModes);

  const [hasStarted, setHasStarted] = useOptions<boolean>((store) => store.hasStarted);
  const [size, setSize] = useOptions<number>((store) => store.size);
  const [, setTable] = useTable<TTable>((store) => store);

  if (isLoading) return <p>Loading actions...</p>;
  if (!isLoading && data?.length === 0) return <p>Actions not found...</p>;
  if (error) return <p>Error while searching for actions</p>;

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (!hasStarted) {
      setSize({ size: +event.target.value });
    }
  };

  const startGame = () => {
    setHasStarted({ hasStarted: true });
    setTable({ ...generateEmptyTable(size) });
  };

  return (
    !isLoading && !!data?.length ?
      <div className={classes.actions}>
        <select
          name="mode"
          id="mode"
          onChange={onChange}
          disabled={hasStarted}
          value={size}
        >
          <option disabled value={0}>
            Choose difficulty
          </option>
          {data.map((option) => (
            <option
              key={option.field}
              value={option.field}
            >
              {option.name}
            </option>
          )
          )}
        </select>
        <div className={classes.buttonsContainer}>
          <button
            className={classes.actionButton}
            disabled={hasStarted || !size}
            onClick={startGame}>
            START
          </button>
        </div>
      </div> : null
  );
};

export default Actions;
