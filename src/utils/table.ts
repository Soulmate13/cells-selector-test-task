import { TTable } from 'components/organisms/Grid/Grid';

export const generateEmptyTable = (number: number) => {
  const table: TTable = {};
  for (let r = 0; r < number; r++) {
    for (let c = 0; c < number; c++) {
      table[`${r + 1}-${c + 1}` as keyof typeof table] = { selected: false };
    }
  }

  return table;
};
