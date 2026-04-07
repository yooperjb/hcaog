import { useMemo } from 'react';
import { LAYER_WEIGHTS, calculateLineWidth } from '../config/layers';

const LAYER_FOCUS_WEIGHTS = {
  symbol: LAYER_WEIGHTS.symbol * 1.5,
  line: LAYER_WEIGHTS.line * 2,
};

export const filterVisibleLayers = (
  layers,
  layerVisibility,
  focusedLayerId,
  baseLayerId
) => {
  // Filter visible layers and sort by focus in one step
  const processedLayers = useMemo(() => {
    const visible = layers.filter((layer) => layerVisibility[layer.id]);
    const sorted = visible
      .map((layer, i) => [i, layer])
      .sort(([ai, a], [bi, b]) => {
        if (a.id === focusedLayerId) return -1;
        if (b.id === focusedLayerId) return 1;
        return ai - bi;
      })
      .map(([,layer]) => layer);

    return sorted.map((layer, i, layers) => ({
      ...layer,
      before: layers[i - 1]?.id ?? baseLayerId
    }));
  }, [layers, layerVisibility, focusedLayerId, baseLayerId]);

  return processedLayers;
};
export const applyFocusStyleToLayer = (layer) => {
  switch (layer.type) {
  case 'symbol':
    return { 
      ...layer,
      layout:{
        ...layer.layout,
        'icon-size': LAYER_FOCUS_WEIGHTS.symbol
      },
    };
  case 'line':
    return { 
      ...layer,
      paint: {
        ...layer.paint,
        'line-width': calculateLineWidth(LAYER_FOCUS_WEIGHTS.line),
      }
    };
  }
};
