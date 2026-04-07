// Action type constants
export const GLOBAL_ACTIONS = {
  SET_FOCUSED_LAYER: 'SET_FOCUSED_LAYER',
  CLEAR_FOCUSED_LAYER: 'CLEAR_FOCUSED_LAYER',
  SHOW_SIDEBAR: 'SHOW_SIDEBAR',
  HIDE_SIDEBAR: 'HIDE_SIDEBAR',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR'
};

/**
 * @param {string} layer - layer to focus
 */
export const setFocusedLayer = (layer) => {
  return {
    type: GLOBAL_ACTIONS.SET_FOCUSED_LAYER,
    value: layer
  };
};

/**
 */
export const clearFocusedLayer = () => {
  return {
    type: GLOBAL_ACTIONS.CLEAR_FOCUSED_LAYER
  };
};

/**
 */
export const showSidebar = () => {
  return {
    type: GLOBAL_ACTIONS.SHOW_SIDEBAR
  };
};

/**
 */
export const hideSidebar = () => {
  return {
    type: GLOBAL_ACTIONS.HIDE_SIDEBAR
  };
};

/**
 */
export const toggleSidebar = () => {
  return {
    type: GLOBAL_ACTIONS.TOGGLE_SIDEBAR
  };
};