import PropTypes from 'prop-types';
import { createContext, useContext, useReducer } from 'react';
import reducer from './reducer';

const initialState = {
  ClassI: true,
  ClassII: true,
  ClassIII: true,
  Trail: true,
  'bike-parking': true,
  'bike-shops': true,
  'tool-station': true
};

const LayerVisibilityContext = createContext(initialState);

export * from './actions';

export const LayerVisibilityContextProvider = ({children}) => {
  const [visibilityState, dispatch] = useReducer(reducer, initialState);

  return (
    <LayerVisibilityContext.Provider value={[visibilityState, dispatch]}>
      {children}
    </LayerVisibilityContext.Provider>
  );
};

LayerVisibilityContextProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export const useLayerVisibility = () => useContext(LayerVisibilityContext);

export default LayerVisibilityContextProvider;