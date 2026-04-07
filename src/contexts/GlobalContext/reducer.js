import { GLOBAL_ACTIONS } from './actions';

export default (state, {type, value}) => {
  switch (type) {
  case GLOBAL_ACTIONS.SET_FOCUSED_LAYER:
    return { ...state, focusedLayer: value };
  case GLOBAL_ACTIONS.CLEAR_FOCUSED_LAYER:
    return { ...state, focusedLayer: undefined };
  case GLOBAL_ACTIONS.SHOW_SIDEBAR:
    return {...state, showSidebar: true};
  case GLOBAL_ACTIONS.HIDE_SIDEBAR:
    return {...state, showSidebar: false};
  case GLOBAL_ACTIONS.TOGGLE_SIDEBAR:
    return {...state, showSidebar: !state.showSidebar};
  }
};
