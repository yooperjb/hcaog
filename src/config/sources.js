export const SOURCES = {
  get: (id) => ({ ...SOURCES[id], id}),
  'bike-points': {
    id: 'bike-points',
    type: 'geojson',
    data: 'https://services6.arcgis.com/CIAecyfzYKLq6rPc/arcgis/rest/services/Bike_Facilities/FeatureServer/2/query?f=geojson&where=1%3D1&outFields=*',
  },
  'bike-routes': {
    id: 'bike-routes',
    type: 'geojson',
    data: 'https://services6.arcgis.com/CIAecyfzYKLq6rPc/arcgis/rest/services/Bike_Facilities/FeatureServer/4/query?f=geojson&where=1%3D1&outFields=*',
  },
  'connectors': {
    id: 'connectors',
    type: 'geojson',
    data: 'https://services6.arcgis.com/CIAecyfzYKLq6rPc/arcgis/rest/services/Bike_Facilities/FeatureServer/3/query?f=geojson&where=1%3D1&outFields=*'
  },
  'pcb': {
    id: 'pcb',
    type: 'geojson',
    data: 'https://services6.arcgis.com/CIAecyfzYKLq6rPc/arcgis/rest/services/Bike_Facilities/FeatureServer/8/query?f=geojson&where=1%3D1&outFields=*'
  }
};

export const SOURCE_LAYERS = {
  'bike-points': 'bike_points-0g9ncs',
  'bike-routes': 'bike_routes-4e3370',
  'connectors': 'connectors-7o42gn',
  'pcb': 'PCB_full-4s2gb0'
};
