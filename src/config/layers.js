import { MAP_DEFAULTS } from './map';
import { SOURCES, SOURCE_LAYERS } from './sources';

// Set default symbol and line size
export const LAYER_WEIGHTS = {
  symbol: 1,
  line: 2,
};

export const calculateLineWidth = (width) => [
  'interpolate', 
  ['linear'], 
  ['zoom'],
  MAP_DEFAULTS.viewport.zoom, width, 
  MAP_DEFAULTS.viewport.zoom + 8, width*2, 
  MAP_DEFAULTS.viewport.zoom + 16, width * 4
];

const makeLayerGenerator = ({
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
    filter: filter(layerName),
  }
  );
};

const makeSymbolLayerGenerator = ({
  sourceId,
  sourceLayerId,
  filter
}) => makeLayerGenerator({
  type: 'symbol',
  sourceId,
  sourceLayerId,
  layout: {
    'icon-size': LAYER_WEIGHTS.symbol,
    'icon-allow-overlap': false,
    'visibility': 'visible',
  },
  paint: {
    // 'icon-opacity': 1,
  },
  filter
});

const makeLineLayerGenerator = ({
  sourceId,
  sourceLayerId,
  filter
}) => makeLayerGenerator({
  type: 'line',
  sourceId,
  sourceLayerId,
  layout: {
    'line-cap': 'round',
    'line-join': 'round',
    'visibility': 'visible'
  },
  paint: {
    'line-width': calculateLineWidth(LAYER_WEIGHTS.line),
  },
  filter
});

// create bike points ICON layer
const buildIconLayer = makeSymbolLayerGenerator({
  sourceId: 'bike-points',
  sourceLayerId: 'bike-points',
  filter: (layerName) => ['==', 'Type', layerName]
});

// create bike routes layer
const buildRouteLayer = makeLineLayerGenerator({
  sourceId: 'bike-routes',
  sourceLayerId: 'bike-routes',
  filter: (layerName) => ['==', 'type_2021', layerName]
});

// create connector routes layer
const buildConnectorLayer = makeLineLayerGenerator({
  sourceId: 'connectors',
  sourceLayerId: 'connectors',
  filter: (layerName) => ['==', 'Type', layerName]
});

// create pacific coast bike route layer
const buildPcbLayer = makeLineLayerGenerator({
  sourceId: 'pcb',
  sourceLayerId: 'pcb',
  filter: (layerName) => ['==', 'Status', layerName]
});

// ICON layer for bike points
export const ICONS = {
  source: SOURCES.get('bike-points'),
  layers: [
    {
      id: 'bike-shops',
      layout:{
        'icon-image': 'hcaog-hardware-15'
      },
      paint: {
        'icon-color': 'black',
      },
      layerName: 'Bicycle Shop'
    },
    {
      id: 'rental',
      layout:{
        'icon-image': 'hcaog-bicycle-15'
      },
      paint: {
        'icon-color': 'black',
      },
      layerName: 'Rental'
    },
    {
      id: 'tool-station',
      layout:{
        'icon-image': 'hardware-15'
      },
      layerName: 'Tool Station'
    },
  ].map(buildIconLayer),
  details: {
    'bike-shops': {
      name: 'Bike Shop'
    },
    'rental': {
      name: 'Bike Rental'
    },
    'tool-station': {
      name: 'Tool Station'
    },
  }
};

// ROUTES layer for Class I,II,III routes
export const ROUTES = {
  source: SOURCES.get('bike-routes'),
  layers: [
    {
      id: 'ClassI', 
      paint: {
        'line-color': '#2fa021',
      },
      layerName: 'Existing Class I',
    },
    {
      id: 'ClassII', 
      paint: {
        'line-color': '#103ca1',
      },
      layerName: 'Existing Class II',
    },
    {
      id: 'ClassIII', 
      paint: {
        'line-color': '#fa8807',
      },
      layerName: 'Existing Class III',
    },
    {
      id: 'Trail', 
      paint: {
        'line-color': '#baa77c',
        'line-dasharray': [1,2],
        //"line-opacity": 1,
      },
      layerName: 'Existing Trail',
    },
  ].map(buildRouteLayer),
  details: {
    'ClassI': {
      name: 'Multi-use Path',
      description: 'A separated paved path for bicycles and pedestrians.'
    },
    'ClassII': {
      name: 'Bike Lane',
      description: 'A restricted right-of-way for bicycles along the side of a street (typically 5 feet wide). A thick white line separates the auto and bike lanes. Motor vehicles may merge into these lanes to make turns.'
    },
    'ClassIII': {
      name: 'Shared Road',
      description: 'A travel lane shared by bicycles and motor vehicles designated only by signs or pavement markings. This type of facility mainly informs motorists of preferred cycling routes.'
    },
    'Trail': {
      name: 'Natural Surface Trails',
      description: 'A dirt or gravel single-track paths that are bicycle compatible.'
    },
  }
};

// CONNECTORS layer for city/rural connections
export const CONNECTORS = {
  source: SOURCES.get('connectors'),
  layers: [
    {
      id: 'Family-Friendly', 
      paint: {
        'line-color': 'green',
        'line-dasharray': [1,2],
      },
      layerName: 'Family Friendly',
      // layerName: 'Family-Friendly',
    },
    {
      id: 'Intermediate', 
      paint: {
        'line-color': '#2b47a1',
        'line-dasharray': [1,2],
      },
      layerName: 'Intermediate',
    },
    {
      id: 'Advanced', 
      paint: {
        'line-color': '#871f1f',
        'line-dasharray': [1,2],
      },
      layerName: 'Advanced',
    },
  ].map(buildConnectorLayer),
  details: {
    'Family-Friendly': {
      name: 'Family Friendly',
      description:'Family friendly connector routes.'
    },
    'Intermediate': {
      name: 'Intermediate',
      description:'Intermediate connector routes that are a little more difficult than famiy-friendly routes.'
    },
    'Advanced': {
      name: 'Advanced',
      description:'Advanced connector routes that typically involves more traffic and may require advanced bike skills.'
    },
  }
};

// PCB layer for official and alt routes
export const PCB = {
  source: SOURCES.get('pcb'),
  layers: [
    {
      id: 'Official', 
      paint: {
        'line-color': 'black',
      },
      layerName: 'Official',
    },
    {
      id: 'Alternative', 
      paint: {
        'line-color': 'gray',
      },
      layerName: 'Alternative',
    },
  ].map(buildPcbLayer),
  details: {
    'Official': {
      name: 'Official',
      description:'Official Pacific Coast Bike Route.'
    },
    'Alternative': {
      name: 'Alternative',
      description:'Alternative Pacific Coast Bike Route segments.'
    },
  }
};

export default { icons:ICONS, routes:ROUTES, connectors:CONNECTORS, pcb:PCB  };
