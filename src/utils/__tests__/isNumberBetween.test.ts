import { isNumberBetween } from 'utils/isNumberBetween';

describe('isNumberBetween()', () => {
  describe('when number is between given range', () => {
    it('returns true', () => {
      const result = isNumberBetween(2, 1, 3);

      expect(result).toBeTruthy();
    });
  });

  describe('when number is between given range and rangeStart is bigger than rangeEnd', () => {
    it('returns true', () => {
      const result = isNumberBetween(2, 3, 1);

      expect(result).toBeTruthy();
    });
  });

  describe('when number is not between given range', () => {
    it('returns false', () => {
      const result = isNumberBetween(5, 1, 3);

      expect(result).toBeFalsy();
    });
  });

  describe('when number equals to one of the range numbers', () => {
    it('returns true', () => {
      const result = isNumberBetween(5, 3, 5);

      expect(result).toBeTruthy();
    });
  });
});
