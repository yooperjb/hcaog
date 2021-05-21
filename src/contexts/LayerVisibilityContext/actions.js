/**
 * @param {string} layer - the layer to toggle visibility for
 */
export const toggleVisibility = (layer) => {
  return {
    type: toggleVisibility,
    value: layer
  };
};
