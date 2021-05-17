// Bike Points Source Data
const bikePoints = {
    id: 'bike-points',
    type: 'vector',
    url: 'mapbox://yooperjb.96kntbve',
  };
  
// Bike Parking points from Bike Points Data
const bikeParking = {
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
const bikeShops = {
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
const toolStation = {
    id: "tool-station",
    type: "circle",
    source: 'bike-points',
    "source-layer": "bike_points-8mbmdl", 
    paint: {
        "circle-radius": 4,
        "circle-color": 'blue'
    },
    filter: ['==', "Type", "Tool Station"]
}