/**
 * @param {string} layer - layer to focus
 */
export const setFocusedLayer = (layer) => {
  return {
    type: setFocusedLayer,
    value: layer
  };
};
/**
 */
export const clearFocusedLayer = () => {
  return {
    type: clearFocusedLayer
  };
};
/**
 */
export const showSidebar = () => {
  return {
    type: showSidebar
  };
};

/**
 */
export const hideSidebar = () => {
  return {
    type: hideSidebar
  };
};

/**
 */
export const toggleSidebar = () => {
  return {
    type: toggleSidebar
  };
};