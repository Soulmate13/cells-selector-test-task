import { GridType } from 'constants/grid';
import Cell from 'components/atoms/Cell';
import './styles.css';

export interface IRow {
  cells: GridType[number];
}

const Row = ({ cells }: IRow) => (
  <div
    className="row"
    role="row"
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
