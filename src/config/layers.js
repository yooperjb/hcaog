import { SOURCES, SOURCE_LAYERS } from './sources';

export const LAYER_WEIGHTS = {
  symbol: 1,
  line: 3,
};

const makeLayerBuilder = ({
  type,
  sourceId,
  sourceLayerId,
  layout: baseLayout,
  paint: basePaint,
  filter
}) =>  {
  return ({ id, layerName, layout, paint }) => ({
    id,
    type,
    source: sourceId,
    'source-layer': SOURCE_LAYERS[sourceLayerId], 
    layout: {
      ...baseLayout,
      ...layout
    },
    paint: {
      ...basePaint,
      ...paint
    },
    filter: filter(layerName)
  });
};

const makeSymbolLayerBuilder = ({
  sourceId,
  sourceLayerId,
  filter
}) => makeLayerBuilder({
  type: 'symbol',
  sourceId,
  sourceLayerId,
  layout: {
    'icon-size': LAYER_WEIGHTS.symbol,
    'icon-allow-overlap': true,
    'visibility': 'visible'
  },
  paint: {
    'icon-opacity': 1,
  },
  filter
});
const makeLineLayerBuilder = ({
  sourceId,
  sourceLayerId,
  filter
}) => makeLayerBuilder({
  type: 'line',
  sourceId,
  sourceLayerId,
  layout: {
    'line-cap': 'round',
    'line-join': 'round',
    'visibility': 'visible'
  },
  paint: {
    'line-width': LAYER_WEIGHTS.line,
  },
  filter
});

const buildIconLayer = makeSymbolLayerBuilder({
  sourceId: 'bike-points',
  sourceLayerId: 'bike-points',
  filter: (layerName) => ['==', 'Type', layerName]
});
const buildRouteLayer = makeLineLayerBuilder({
  sourceId: 'bike-routes',
  sourceLayerId: 'bike-routes',
  filter: (layerName) => ['==', 'type_2021', layerName]
});

export const ICONS = {
  source: SOURCES.get('bike-points'),
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
  details: {
    'bike-shops': {
      name: 'Bike Shops'
    },
    'bike-parking': {
      name: 'Bike Parking'
    },
    'tool-station': {
      name: 'Tool Station'
    },
  }
};

export const ROUTES = {
  source: SOURCES.get('bike-routes'),
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
  details: {
    'ClassI': {
      name: 'Class I Bike Route',
      description: 'A separated paved path for bicycles and pedestrians.'
    },
    'ClassII': {
      name: 'Class II Bike Route',
      description: 'A restricted right-of-way for bicycles along the side of a street (typically 5 feet wide). A thick white line separates the auto and bike lanes. Motor vehicles may merge into these lanes to make turns.'
    },
    'ClassIII': {
      name: 'Class III Bike Route',
      description: 'A travel lane shared by bicycles and motor vehicles designated only by signs or pavement markings. This type of facility mainly informs motorists of preferred cycling routes.'
    },
    'Trail': {
      name: 'Natural Surface Trails',
      description: 'A dirt or gravel single-track paths that are bicycle compatible.'
    },
  }
};

export const connectors = {
  details: {
    'familyfriendly': {
      name: 'Family Friendly',
    },
    'intermediate': {
      name: 'Intermediate',
    },
    'advanced': {
      name: 'Advanced',
    },
  }
};



export default { icons: ICONS, routes: ROUTES };
