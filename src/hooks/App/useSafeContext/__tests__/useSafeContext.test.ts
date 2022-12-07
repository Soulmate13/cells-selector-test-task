import { renderHook } from '@testing-library/react';
import { DispatchContext } from 'contexts/App/CellsContext';
import { wrapper } from 'utils/renderer';
import useSafeContext from 'hooks/App/useSafeContext/useSafeContext';

describe('useSafeContext', () => {
  beforeAll(() => jest.spyOn(console, 'error').mockImplementation((() => null)));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => jest.restoreAllMocks());

  describe('when called within a relevant provider', () => {
    it('returns context', () => {
      const { result } = renderHook(() => useSafeContext(DispatchContext), { wrapper });

      expect(result.current).toBeDefined();
    });
  });

  describe('when called without a relevant provider', () => {
    it('throws an error', () => {
      expect(() => {
        renderHook(() => useSafeContext(DispatchContext));
      }).toThrowError('Context may be extracted only when used within DispatchContext provider');
    });
  });
});
