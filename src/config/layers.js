import { useMemo } from 'react';

const LAYER_WEIGHTS = {
  symbol: 1,
  line: 3,
};

const LAYER_FOCUS_WEIGHTS = {
  symbol: LAYER_WEIGHTS.symbol * 1.5,
  line: LAYER_WEIGHTS.line * 2,
};

const buildIconLayer = ({ id, icon, paint, layout = {}, layerName}) => ({
  id,
  type: 'symbol',
  source: 'bike-points',
  'source-layer': 'bike_points-8mbmdl', 
  layout:{
    'icon-image': icon,
    'icon-size': LAYER_WEIGHTS.symbol,
    'icon-allow-overlap': true,
    'visibility': 'visible',
    'symbol-sort-key': 2,
    ...layout
  },
  paint: {
    'icon-opacity': 1,
    ...paint
  },
  filter: ['==', 'Type', layerName]
});
const buildRouteLayer = ({ id, paint, layout, layerName}) => ({
  id,
  type: 'line',
  source: 'bike-routes',
  'source-layer': 'bike_routes-2nr3p1', 
  layout: {
    'line-cap': 'round',
    'line-join': 'round',
    'line-sort-key': 1,
    ...layout
  },
  paint: {
    'line-width': LAYER_WEIGHTS.line,
    ...paint,
  },
  filter: ['==', 'type_2021', layerName]
});

export const icons = {
  source: {
    id: 'bike-points',
    type: 'vector',
    url: 'mapbox://yooperjb.96kntbve',
  },
  layers: [
    buildIconLayer({
      id: 'bike-shops',
      icon: 'hcaog-hardware-15',
      paint: {
        'icon-color': 'black',
      },
      layerName: 'Bicycle Shop'
    }),
    buildIconLayer({
      id: 'bike-parking',
      icon: 'hcaog-parking-15',
      paint: {
        'icon-color': 'black',
      },
      layerName: 'Bicycle Parking'
    }),
    buildIconLayer({
      id: 'tool-station',
      icon: 'hardware-15',
      layerName: 'Tool Station'
    }),
  ],
};

export const routes = {
  source: {
    id: 'bike-routes',
    type: 'vector',
    url: 'mapbox://yooperjb.3kf292c5',
  },
  layers: [
    buildRouteLayer({
      id: 'ClassI', 
      paint: {
        'line-color': '#b50707',
      },
      layerName: 'Existing Class I',
    }),
    buildRouteLayer({
      id: 'ClassII', 
      paint: {
        'line-color': 'orange',
      },
      layerName: 'Existing Class II',
    }),
    buildRouteLayer({
      id: 'ClassIII', 
      paint: {
        'line-color': '#eded5c',
      },
      layerName: 'Existing Class III',
    }),
    buildRouteLayer({
      id: 'Trail', 
      paint: {
        'line-color': '#baa77c',
        'line-dasharray': [1,3],
        //"line-opacity": 1,
      },
      layerName: 'Existing Trail',
    }),
  ],
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
export const applyFocusToLayer = (layer) => {
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

export default { icons, routes };