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
    url: 'mapbox://yooperjb.3kf292c5',
  },
};

export const SOURCE_LAYERS = {
  'bike-points': 'bike_points-8mbmdl', 
  'bike-routes': 'bike_routes-2nr3p1', 
};
