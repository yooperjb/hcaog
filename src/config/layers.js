import { MAP_DEFAULTS } from './map';
import { SOURCES } from './sources';

// Set default symbol and line size
export const LAYER_WEIGHTS = {
  symbol: 0.8,
  line: 2,
};

export const calculateLineWidth = (width) => [
  'interpolate',
  ['linear'],
  ['zoom'],
  MAP_DEFAULTS.viewport.zoom, width,
  MAP_DEFAULTS.viewport.zoom + 8, width * 2,
  MAP_DEFAULTS.viewport.zoom + 16, width * 4
];

const makeLayerGenerator = ({
  type,
  sourceId,
  layout: baseLayout,
  paint: basePaint,
  filter
}) => {
  return ({ id, layerName, layout, paint }) => ({
    id,
    type,
    source: sourceId,
    layout: {
      ...baseLayout,
      ...layout
    },
    paint: {
      ...basePaint,
      ...paint
    },
    filter: filter(layerName),
  });
};

const makeSymbolLayerGenerator = ({
  sourceId,
  filter
}) => makeLayerGenerator({
  type: 'symbol',
  sourceId,
  layout: {
    'icon-size': LAYER_WEIGHTS.symbol,
    'icon-allow-overlap': false,
    visibility: 'visible',
  },
  paint: {},
  filter
});

const makeLineLayerGenerator = ({
  sourceId,
  filter
}) => makeLayerGenerator({
  type: 'line',
  sourceId,
  layout: {
    'line-cap': 'round',
    'line-join': 'round',
    visibility: 'visible'
  },
  paint: {
    'line-width': calculateLineWidth(LAYER_WEIGHTS.line),
  },
  filter
});

// create bike points ICON layer
const buildIconLayer = makeSymbolLayerGenerator({
  sourceId: 'bike-points',
  filter: (layerName) => ['==', 'Type', layerName]
});

// create bike routes layer
const buildRouteLayer = makeLineLayerGenerator({
  sourceId: 'bike-routes',
  filter: (layerName) => ['==', 'type', layerName]
});

// create connector routes layer
const buildConnectorLayer = makeLineLayerGenerator({
  sourceId: 'connectors',
  filter: (layerName) => ['==', 'Type', layerName]
});

// create pacific coast bike route layer
const buildPcbLayer = makeLineLayerGenerator({
  sourceId: 'pcb',
  filter: (layerName) => ['==', 'BikeRoute', layerName]
});

// ICON layer for bike points
export const ICONS = {
  source: SOURCES.get('bike-points'),
  layers: [
    {
      id: 'bike-shops',
      layout: {
        'icon-image': 'hcaog-bicycle-shop'
      },
      layerName: 'Bicycle Shop'
    },
    {
      id: 'rental',
      layout: {
        'icon-image': 'hcaog-bicycle-rental-17'
      },
      layerName: 'Rental'
    },
    {
      id: 'tool-station',
      layout: {
        'icon-image': 'hcaog-hardware-new'
      },
      layerName: 'Tool Station'
    }
  ].map(buildIconLayer),
  details: {
    'bike-shops': {
      name: 'Bike Shop',
      icon: 'store-alt',
      color: 'white'
    },
    rental: {
      name: 'Bike Rental',
      icon: 'bicycle',
      color: 'white'
    },
    'tool-station': {
      name: 'Tool Station',
      icon: 'wrench',
      color: 'white'
    }
  }
};

// ROUTES layer for Class I,II,III routes
export const ROUTES = {
  source: SOURCES.get('bike-routes'),
  layers: [
    {
      id: 'ClassI',
      paint: {
        'line-color': '#2fa021'
      },
      layerName: 'Existing Class I'
    },
    {
      id: 'ClassII',
      paint: {
        'line-color': '#103ca1'
      },
      layerName: 'Existing Class II'
    },
    {
      id: 'ClassIII',
      paint: {
        'line-color': '#fa8807'
      },
      layerName: 'Existing Class III'
    },
    {
      id: 'ClassIV',
      paint: {
        'line-color': '#FFFF00'
      },
      layerName: 'Existing Class IV'
    },
    {
      id: 'Trail',
      paint: {
        'line-color': '#baa77c',
        'line-dasharray': [1, 2]
      },
      layerName: 'Existing Trail'
    }
  ].map(buildRouteLayer),
  details: {
    ClassI: {
      name: 'Multi-use Path',
      description: 'A separated paved path for bicycles and pedestrians.'
    },
    ClassII: {
      name: 'Bike Lane',
      description: 'A restricted right-of-way for bicycles along the side of a street (typically 5 feet wide). A thick white line separates the auto and bike lanes. Motor vehicles may merge into these lanes to make turns.'
    },
    ClassIII: {
      name: 'Shared Road',
      description: 'A travel lane shared by bicycles and motor vehicles designated only by signs or pavement markings. This type of facility mainly informs motorists of preferred cycling routes.'
    },
    ClassIV: {
      name: 'Separated Bikeways',
      description: 'On-street facilities for cyclists that feature a vertical or physical barrier from, and exclusive use away from, vehicle traffic.'
    },
    Trail: {
      name: 'Natural Surface',
      description: 'A dirt or gravel path that is often bicycle compatible'
    }
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
        'line-dasharray': [1, 2]
      },
      layerName: 'Family Friendly'
    },
    {
      id: 'Intermediate',
      paint: {
        'line-color': '#2b47a1',
        'line-dasharray': [1, 2]
      },
      layerName: 'Intermediate'
    },
    {
      id: 'Advanced',
      paint: {
        'line-color': '#871f1f',
        'line-dasharray': [1, 2]
      },
      layerName: 'Advanced'
    }
  ].map(buildConnectorLayer),
  details: {
    'Family-Friendly': {
      name: 'Mellow',
      description: 'Lower traffic/speed streets; generally appropriate for children and for relaxed everyday use'
    },
    Intermediate: {
      name: 'Confident',
      description: 'Moderate traffic/speed with medium shoulder width streets; suitable for a range of bicyclists'
    },
    Advanced: {
      name: 'Brave',
      description: 'High traffic volume/speed; narrow or non-existent shoulder, and/or extreme topography (hills)'
    }
  }
};

// PCB layer for official and alt routes
export const PCB = {
  source: SOURCES.get('pcb'),
  layers: [
    {
      id: 'Official',
      paint: {
        'line-color': 'black'
      },
      layerName: 'Pacific Coast Bike Route'
    },
    {
      id: 'Alternative',
      paint: {
        'line-color': 'gray'
      },
      layerName: 'Proposed PCBR Alternate'
    }
  ].map(buildPcbLayer),
  details: {
    Official: {
      name: 'Official',
      description: 'Official Pacific Coast Bike Route.'
    },
    Alternative: {
      name: 'Alternative',
      description: 'Alternative Pacific Coast Bike Route segments.'
    }
  }
};

export default {
  icons: ICONS,
  routes: ROUTES,
  connectors: CONNECTORS,
  pcb: PCB,
};
