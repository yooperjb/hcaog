import { setFocusedLayer, clearFocusedLayer } from './actions';

export default (state, {type, value}) => {
  switch (type) {
  case setFocusedLayer:
    return { ...state, focusedLayer: value };
  case clearFocusedLayer:
    return { ...state, focusedLayer: undefined };
  }
};