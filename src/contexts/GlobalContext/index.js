import PropTypes from 'prop-types';
import { createContext, useContext, useReducer } from 'react';
import reducer from './reducer';

const initialState = {
  focusedLayer: 'class1',
};

const GlobalContext = createContext(initialState);

export * from './actions';

export const GlobalProvider = ({children}) => {
  const [globalState, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={[globalState, dispatch]}>
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export const useGlobals = () => useContext(GlobalContext);

export default GlobalProvider;
