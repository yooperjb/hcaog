export const SOURCES = {
  get: (id) => ({ ...SOURCES[id], id}),
  'bike-points': {
    id: 'bike-points',
    type: 'vector',
    url: 'mapbox://yooperjb.96kntbve',
  },
  'bike-routes': {
    id: 'bike-routes',
    type: 'vector',
    url: 'mapbox://hcaog.1nksq7lv',
  },
  'connectors': {
    id: 'connectors',
    type: 'vector',
    url: 'mapbox://hcaog.digdwntd'
  },
  'pcb': {
    id: 'pcb',
    type: 'vector',
    url: 'mapbox://hcaog.6vx5ufzz'
  }
};

export const SOURCE_LAYERS = {
  'bike-points': 'bike_points-8mbmdl', 
  'bike-routes': 'bike_routes-4e3370',
  'connectors': 'connectors-7o42gn',
  'pcb': 'PCB_full-4s2gb0'
};
