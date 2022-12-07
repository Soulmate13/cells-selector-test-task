import userEvent from '@testing-library/user-event';
import { Dispatch, ReactNode } from 'react';
import { render, RenderResult } from '@testing-library/react';
import { ActionTypes, StateContext, DispatchContext, StateType } from 'contexts/App/CellsContext';
import { initialState } from 'providers/App/CellsProvider';

type ProviderProps = {
  stateContext?: StateType;
  dispatchContext?: Dispatch<ActionTypes>;
}

const mockProviderProps: Required<ProviderProps> = {
  stateContext: initialState,
  dispatchContext: jest.fn() as Dispatch<ActionTypes>
};

interface IWrapperArguments {
  children: ReactNode;
  providerProps?: ProviderProps;
}

export const wrapper = ({
  children,
  providerProps
}: IWrapperArguments) => (
  <StateContext.Provider value={providerProps?.stateContext ?? mockProviderProps.stateContext}>
    <DispatchContext.Provider value={providerProps?.dispatchContext ?? mockProviderProps.dispatchContext}>
      { children }
    </DispatchContext.Provider>
  </StateContext.Provider>

);

type UserEventType = ReturnType<typeof userEvent.setup>

type CustomRenderReturn = {user: UserEventType, render: RenderResult}

const customRender = (component: ReactNode, providerProps?: ProviderProps, options = {}): CustomRenderReturn => {
  const ui = wrapper({ children: component, providerProps });

  return { user: userEvent.setup(), render: render(ui, options) };
};

export { customRender as render };

