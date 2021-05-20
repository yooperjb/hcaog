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