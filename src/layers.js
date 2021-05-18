// Bike Points Source Data
export const bikePoints = {
    id: 'bike-points',
    type: 'vector',
    url: 'mapbox://yooperjb.96kntbve',
  };
  
// Bike Parking points from Bike Points Data
export const bikeParking = {
    id: "bike-parking", 
    type: "symbol",
    source: 'bike-points',
    "source-layer": "bike_points-8mbmdl", 
    layout:{
        "icon-image": 'hcaog-parking-15',
        "icon-size": 1,
        "visibility": "visible",
    },
    paint: {
        "icon-color": "black",
        "icon-opacity": 1,
    },
    filter: ['==', "Type", "Bicycle Parking"]
}
  
// Bicycle Shop points from Bike Points Data
export const bikeShops = {
    id: "bike-shops",
    type: "symbol",
    source: 'bike-points',
    "source-layer": "bike_points-8mbmdl", 
    layout:{
        "icon-image": 'hcaog-hardware-15',
        "icon-size": 1,
        "visibility": "visible",
    },
    paint: {
        "icon-color": "black",
        "icon-opacity": 1,
    },
    filter: ['==', "Type", "Bicycle Shop"]
}
  
// Bicycle tool station points from Bike Points Data
export const toolStation = {
    id: "tool-station",
    type: "symbol",
    source: 'bike-points',
    "source-layer": "bike_points-8mbmdl", 
    layout:{
        "icon-image": 'hardware-15',
        "icon-size": 1,
        "visibility": "visible",
    },
    paint: {
        "icon-opacity": 1,
    },
    filter: ['==', "Type", "Tool Station"]
}

// Bike Route Source Data
export const bikeRoutes = {
    id: 'bike-routes',
    type: 'vector',
    url: 'mapbox://yooperjb.3kf292c5',
  };

// Class I Bike Routes from Bike Route Data
export const class1 = {
    id: "ClassI", 
    type: "line",
    source: 'bike-routes',
    "source-layer": "bike_routes-2nr3p1", 
    // layout:{
    //     "icon-image": 'hcaog-parking-15',
    //     "icon-size": 1,
    //     "visibility": "visible",
    // },
    paint: {
        "line-width": 2,
        "line-color": "red",
    },
    filter: ['==', "type_2021", "Existing Class I"]
}

export const class2 = {
    id: "ClassII", 
    type: "line",
    source: 'bike-routes',
    "source-layer": "bike_routes-2nr3p1", 
    // layout:{
    //     "icon-image": 'hcaog-parking-15',
    //     "icon-size": 1,
    //     "visibility": "visible",
    // },
    paint: {
        "line-width": 2,
        "line-color": "orange",
    },
    filter: ['==', "type_2021", "Existing Class II"]
}

export const class3 = {
    id: "ClassIII", 
    type: "line",
    source: 'bike-routes',
    "source-layer": "bike_routes-2nr3p1", 
    // layout:{
    //     "icon-image": 'hcaog-parking-15',
    //     "icon-size": 1,
    //     "visibility": "visible",
    // },
    paint: {
        "line-width": 2,
        "line-color": "yellow",
    },
    filter: ['==', "type_2021", "Existing Class III"]
}

export default {bikePoints,bikeParking,bikeShops,toolStation, bikeRoutes, class1, class2, class3};