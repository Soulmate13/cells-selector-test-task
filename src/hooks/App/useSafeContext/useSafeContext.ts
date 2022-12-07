import { Context, useContext } from 'react';

const useSafeContext = <T>(context: Context<T>) => {
  const saveContext = useContext(context);

  if (!saveContext) {
    throw new Error(`Context may be extracted only when used within ${context.displayName} provider`);
  }

  return saveContext;
};

export default useSafeContext;
