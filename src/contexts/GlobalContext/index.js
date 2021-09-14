import PropTypes from 'prop-types';
import { createContext, useContext, useReducer } from 'react';
import { getViewPort } from '../../util/window';
import reducer from './reducer';

const { width } = getViewPort();

const initialState = {
  showSidebar: width > 600,
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
