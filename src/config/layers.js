import { SOURCES, SOURCE_LAYERS } from './sources';

// Set default symbol and line size
export const LAYER_WEIGHTS = {
  symbol: 1,
  line: 2,
};

// 
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
    filter: filter(layerName),
  }
  );
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
    'icon-allow-overlap': false,
    'visibility': 'visible',
    
  },
  paint: {
    // 'icon-opacity': 1,
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

// create bike points ICON layer
const buildIconLayer = makeSymbolLayerBuilder({
  sourceId: 'bike-points',
  sourceLayerId: 'bike-points',
  filter: (layerName) => ['==', 'Type', layerName]
});

// create bike routes layer
const buildRouteLayer = makeLineLayerBuilder({
  sourceId: 'bike-routes',
  sourceLayerId: 'bike-routes',
  filter: (layerName) => ['==', 'type_2021', layerName]
});

// create connector routes layer
const buildConnectorLayer = makeLineLayerBuilder({
  sourceId: 'connectors',
  sourceLayerId: 'connectors',
  filter: (layerName) => ['==', 'Type', layerName]
});

// create pacific coast bike route layer
const buildPcbLayer = makeLineLayerBuilder({
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
        'icon-image': 'hcaog-hardware-15'},
      paint: {
        'icon-color': 'black',
      },
      layerName: 'Bicycle Shop'
    },
    {
      id: 'bike-parking',
      layout:{
        'icon-image': 'hcaog-parking-15'
      },
      paint: {
        'icon-color': 'black',
      },
      layerName: 'Bicycle Parking'
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

// ROUTES layer for Class I,II,III routes
export const ROUTES = {
  source: SOURCES.get('bike-routes'),
  layers: [
    {
      id: 'ClassI', 
      paint: {
        'line-color': '#b50707',
      },
      layerName: 'Existing Class I',
    },
    {
      id: 'ClassII', 
      paint: {
        'line-color': 'orange',
      },
      layerName: 'Existing Class II',
    },
    {
      id: 'ClassIII', 
      paint: {
        'line-color': '#eded5c',
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

// CONNECTORS layer for city/rural connections
export const CONNECTORS = {
  source: SOURCES.get('connectors'),
  layers: [
    {
      id: 'Family Friendly', 
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
    'Family Friendly': {
      name: 'Family-Friendly',
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
        'line-dasharray': [1,2],
      },
      layerName: 'Official',
    },
    {
      id: 'Alternative', 
      paint: {
        'line-color': 'gray',
        'line-dasharray': [1,2],
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
      description:'Alternative Pacific Coast Bike Route.'
    },
  }
};

//console.log('CONNECTORS', CONNECTORS);

export default { icons: ICONS, routes: ROUTES, connectors: CONNECTORS, pcb: PCB  };
