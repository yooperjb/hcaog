// Bike Points Source Data
export const bikePoints = {
  id: 'bike-points',
  type: 'vector',
  url: 'mapbox://yooperjb.96kntbve',
};
  
// Bike Parking points from Bike Points Data
export const bikeParking = {
  id: 'bike-parking', 
  type: 'symbol',
  source: 'bike-points',
  'source-layer': 'bike_points-8mbmdl', 
  layout:{
    'icon-image': 'hcaog-parking-15',
    'icon-size': 1,
    'visibility': 'visible',
  },
  paint: {
    'icon-color': 'black',
    'icon-opacity': 1,
  },
  filter: ['==', 'Type', 'Bicycle Parking']
};
  
// Bicycle Shop points from Bike Points Data
export const bikeShops = {
  id: 'bike-shops',
  type: 'symbol',
  source: 'bike-points',
  'source-layer': 'bike_points-8mbmdl', 
  layout:{
    'icon-image': 'hcaog-hardware-15',
    'icon-size': 1,
    'visibility': 'visible',
  },
  paint: {
    'icon-color': 'black',
    'icon-opacity': 1,
  },
  filter: ['==', 'Type', 'Bicycle Shop']
};
  
// Bicycle tool station points from Bike Points Data
export const toolStation = {
  id: 'tool-station',
  type: 'symbol',
  source: 'bike-points',
  'source-layer': 'bike_points-8mbmdl', 
  layout:{
    'icon-image': 'hardware-15',
    'icon-size': 1,
    'visibility': 'visible',
  },
  paint: {
    'icon-opacity': 1,
  },
  filter: ['==', 'Type', 'Tool Station']
};

// Bike Route Source Data
export const bikeRoutes = {
  id: 'bike-routes',
  type: 'vector',
  url: 'mapbox://yooperjb.3kf292c5',
};

// Class I Bike Routes from Bike Route Data
export const class1 = {
  id: 'ClassI', 
  type: 'line',
  source: 'bike-routes',
  'source-layer': 'bike_routes-2nr3p1', 

  paint: {
    'line-width': 3,
    'line-color': '#b50707',
  },
  filter: ['==', 'type_2021', 'Existing Class I']
};

export const class2 = {
  id: 'ClassII', 
  type: 'line',
  source: 'bike-routes',
  'source-layer': 'bike_routes-2nr3p1', 

  paint: {
    'line-width': 3,
    'line-color': 'orange',
  },
  filter: ['==', 'type_2021', 'Existing Class II']
};

export const class3 = {
  id: 'ClassIII', 
  type: 'line',
  source: 'bike-routes',
  'source-layer': 'bike_routes-2nr3p1', 

  paint: {
    'line-width': 3,
    'line-color': '#eded5c',
  },
  filter: ['==', 'type_2021', 'Existing Class III']
};

export const trails = {
  id: 'Trail', 
  type: 'line',
  source: 'bike-routes',
  'source-layer': 'bike_routes-2nr3p1', 

  paint: {
    'line-width': 3,
    'line-color': '#baa77c',
    'line-dasharray': [1,3],
    //"line-opacity": 1,
  },
  layout: {
    'line-cap': 'round',
    'line-join': 'round',
    // Sorts lines based on this value
    'line-sort-key': 1,
  },
  filter: ['==', 'type_2021', 'Existing Trail']
};

export default {
  bikePoints,
  bikeParking,
  bikeShops,
  toolStation,
  bikeRoutes,
  class1,
  class2,
  class3,
  trail: trails,
};