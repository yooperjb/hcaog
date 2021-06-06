import { useMemo } from 'react';
import { LAYER_WEIGHTS } from '../config/layers';

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
  const visibleLayers = useMemo(
    () => layers.filter((layer) => layerVisibility[layer.id]),
    [layers, layerVisibility]
  );
  const layersOrderedByFocus = useMemo(
    () => visibleLayers.map((layer, i) => [i, layer])
      .sort(([ai, a], [bi, b]) => {
        if (a.id == focusedLayerId) return -1;
        if (b.id == focusedLayerId) return 1;
        return ai - bi;
      })
      .map(([,layer]) => layer),
    [visibleLayers, focusedLayerId]
  );
  return Array.from(
    useMemo(
      () =>  layersOrderedByFocus.map((layer, i, layers) => ({
        ...layer,
        before: layers[i - 1]?.id ?? baseLayerId
      })),
      [layersOrderedByFocus, baseLayerId]
    )
  );
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
        'line-width': LAYER_FOCUS_WEIGHTS.line,
      }
    };
  }
};
