import { setFocusedLayer, clearFocusedLayer, showSidebar, hideSidebar, toggleSidebar } from './actions';

export default (state, {type, value}) => {
  switch (type) {
  case setFocusedLayer:
    return { ...state, focusedLayer: value };
  case clearFocusedLayer:
    return { ...state, focusedLayer: undefined };
  case showSidebar:
    return {...state, showSidebar: true};
  case hideSidebar:
    return {...state, showSidebar: false};
  case toggleSidebar:
    return {...state, showSidebar: !state.showSidebar};
  }
};
