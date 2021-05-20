import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer";

const initialState = {
  class1: false,
  class2: true,
  class3: true,
  trails: true
}

const LayerVisibilityContext = createContext(initialState);

export * as actions from "./actions";

export const LayerVisibilityContextProvider = ({children}) => {
  const [visibilityState, dispatch] = useReducer(reducer, initialState);

  return <LayerVisibilityContext.Provider value={[visibilityState, dispatch]}>{children}</LayerVisibilityContext.Provider>
}

export const useLayerVisibility = () => useContext(LayerVisibilityContext);

export default LayerVisibilityContextProvider;