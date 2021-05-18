import React, { useState, useEffect } from 'react';
import MapGL, { Source, Layer, Popup, NavigationControl, Filter } from '@urbica/react-map-gl';
//import ReactMapGl, {Marker, Popup, Source, Layer} from 'react-map-gl';
import './App.css';
import {bikePoints, bikeParking, bikeShops, toolStation, bikeRoutes, class1, class2, class3} from './layers.js';

// const bikePoints = {
//   id: 'bike-points',
//   type: 'vector',
//   url: 'mapbox://yooperjb.96kntbve',
// };

// const bikeParking = {
//   id: "bike-parking", 
//   type: "symbol",
//   source: 'bike-points',
//   "source-layer": "bike_points-8mbmdl", 
//   layout:{
//     "icon-image": 'hcaog-parking-15',
//     "icon-size": 1,
//     "visibility": "visible",
//   },
//   paint: {
//     "icon-color": "black",
//     "icon-opacity": 1,
//   },
//   filter: ['==', "Type", "Bicycle Parking"]
// }

// const bikeShops = {
//   id: "bike-shops",
//   type: "symbol",
//   source: 'bike-points',
//   "source-layer": "bike_points-8mbmdl", 
//   layout:{
//     "icon-image": 'hcaog-hardware-15',
//     "icon-size": 1,
//     "visibility": "visible",
//   },
//   paint: {
//     "icon-color": "black",
//     "icon-opacity": 1,
//   },
//   filter: ['==', "Type", "Bicycle Shop"]
// }

// const toolStation = {
//   id: "tool-station",
//   type: "circle",
//   source: 'bike-points',
//   "source-layer": "bike_points-8mbmdl", 
//   paint: {
//     "circle-radius": 4,
//     "circle-color": 'blue'
//   },
//   filter: ['==', "Type", "Tool Station"]
// }

//console.log({...bikePoints});
//console.log({...bikeParking});
//console.log(Map);

function App() {

  const [viewport, setViewport] = useState({
    latitude: 40.7450,
    longitude: -123.8695,
    zoom: 8,
    //cursorStyle: 'pointer',
    //width: '100vw',
    //height: '100vh'
  });

  // For Bike Points popup
  const [selectedBikePoint, setSelectedBikePoint] = useState(null);
  const [cursorStyle, setCursorStyle] = useState(null);
  const [LngLat, setLngLat] = useState(null);
  console.log({selectedBikePoint});

  const logEvent = (event) => {
    console.log("features", event.features[0].properties);
    setSelectedBikePoint(event.features[0].properties);
    console.log("lngLat", event.lngLat);
    setLngLat(event.lngLat);
    console.log("LngLat:", LngLat);
  }

  // set cursor to pointer on feature hover
  const getCursor = (event) => {
    //console.log(event.lngLat);
    setCursorStyle('pointer');
  }

  // set cursor to default on feature leave
  const leaveEvent = (event) => {
    setCursorStyle(null);
  }

  //console.log(viewport);
  
  return (
    <MapGL
    {...viewport}
    style={{ width: '100vw', height: '100vh' }}
    mapStyle='mapbox://styles/yooperjb/ckot0y3yz3kd217lllr2akvdn'
    //mapStyle='mapbox://styles/yooperjb/ckn6lzo7i08vu17nvv4tm9i6k'
    //accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    accessToken="pk.eyJ1IjoieW9vcGVyamIiLCJhIjoiY2toNXR1cWI4MDV2YzJ1bndoZnJtZzY3bCJ9.4O6nJopZD7FE6pUVr7f3kg"
    onViewportChange={setViewport}
    cursorStyle={cursorStyle}
    
    >

      <Source {...bikePoints} >
        <Layer {...bikeParking}
        onClick={logEvent}
        onHover={getCursor}
        onLeave={leaveEvent}
          />
        
        <Layer {...bikeShops}
          onClick={logEvent}
          onHover={getCursor}
          onLeave={leaveEvent}
          />

        <Layer {...toolStation}
          onClick={logEvent}
          onHover={getCursor}
          onLeave={leaveEvent}
          />
        
      </Source>

      <Source {...bikeRoutes}>
        <Layer {...class1} />
        <Layer {...class2} />
        <Layer {...class3} />
      
      </Source>
      
      {selectedBikePoint && LngLat ? (
        <Popup
        latitude={LngLat.lat}
        longitude={LngLat.lng}
        closeButton={false}
        className="bikePointsPopup"
        onClose={() => setSelectedBikePoint(null)}>
          <div>
            <h3>{selectedBikePoint.Type}</h3>
            <p>City: {selectedBikePoint.City}</p>
            <p>{selectedBikePoint.Location}</p>
          </div>
        </Popup>
      ) : null }
    <NavigationControl showZoom position='top-right' />

    </MapGL>
  );
}

export default App;
