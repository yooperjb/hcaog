import { useMemo } from 'react';

const buildIconLayer = ({ id, icon, paint, layout = {}, layerName}) => ({
  id,
  type: 'symbol',
  source: 'bike-points',
  'source-layer': 'bike_points-8mbmdl', 
  layout:{
    'icon-image': icon,
    'icon-size': 1,
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
    'line-width': 3,
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
  console.log(layerVisibility);
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
      }))
        .map(layer => (console.log(`${layer.id}, ${layer.before}`), layer)),
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
        'icon-size': 1.25,
      },
    };
  case 'line':
    return { 
      ...layer,
      paint: {
        ...layer.paint,
        'line-width': 6
      }
    };
  }
};

export default { icons, routes };