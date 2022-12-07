export const isNumberBetween = (number: number, rangeStart: number, rangeEnd: number) => {
  if (rangeEnd < rangeStart) {
    [rangeStart, rangeEnd] = [rangeEnd, rangeStart];
  }

  return number >= rangeStart && number <= rangeEnd;
};
