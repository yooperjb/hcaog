import React, { useState, useEffect } from 'react';
import MapGL, { Source, Layer, Popup, NavigationControl, Filter } from '@urbica/react-map-gl';
//import ReactMapGl, {Marker, Popup, Source, Layer} from 'react-map-gl';
import './App.css';
import Sidebar from './Sidebar';
import {bikePoints, bikeParking, bikeShops, toolStation, bikeRoutes, class1, class2, class3, trail} from './layers.js';

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

  // UseState for Popups
  const [selectedBikePoint, setSelectedBikePoint] = useState(null);
  const [LngLat, setLngLat] = useState(null);
  const [cursorStyle, setCursorStyle] = useState(null);
  const [selectedBikeRoute, setSelectedBikeRoute] = useState(null);
  
  //console.log({selectedBikePoint});

  const logBikePoint = (event) => {
    //console.log("features", event.features[0].properties);
    setSelectedBikePoint(event.features[0].properties);
    //console.log("lngLat", event.lngLat);
    setLngLat(event.lngLat);
    //console.log("LngLat:", LngLat);
  }

  const logBikeRoute = (event) => {
    setSelectedBikeRoute(event.features[0].properties);
    //console.log("Bike Route", selectedBikeRoute);
    setLngLat(event.lngLat);
    //console.log("LngLat:", event.lngLat);
    //console.log("LngLat:", LngLat);
  }

  // set cursor to pointer on feature hover
  const getCursor = (event) => {
    setCursorStyle('pointer');
  }

  // set cursor to default on feature leave
  const returnCursor = (event) => {
    setCursorStyle(null);
  }

  //console.log(viewport);
  
  return (
    <div className="container">
    
    <Sidebar></Sidebar>
    
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
      <Source {...bikeRoutes}>
        <Layer {...class1} 
          onHover={getCursor}
          onLeave={returnCursor}
          onClick={logBikeRoute}
        />
        <Layer {...class2} 
          onHover={getCursor}
          onLeave={returnCursor}
          onClick={logBikeRoute}
        />
        <Layer {...class3} 
          onHover={getCursor}
          onLeave={returnCursor}
          onClick={logBikeRoute}
        />
        <Layer {...trail} 
          onHover={getCursor}
          onLeave={returnCursor}
          onClick={logBikeRoute}
          />
      
      </Source>

      <Source {...bikePoints} >
        <Layer {...bikeParking}
        onClick={logBikePoint}
        onHover={getCursor}
        onLeave={returnCursor}
          />
        
        <Layer {...bikeShops}
          onClick={logBikePoint}
          onHover={getCursor}
          onLeave={returnCursor}
          />

        <Layer {...toolStation}
          onClick={logBikePoint}
          onHover={getCursor}
          onLeave={returnCursor}
          />
        
      </Source>
      
      {selectedBikePoint && LngLat ? (
        <Popup
        latitude={LngLat.lat}
        longitude={LngLat.lng}
        closeButton={false}
        className="bikePointsPopup"
        onClose={() => setSelectedBikePoint(null) }>

          <div>
            <h3>{selectedBikePoint.Type}</h3>
            <p>{selectedBikePoint.Name}</p>
            <p>{selectedBikePoint.Location}</p>
            {selectedBikePoint.Website ? (
              <p><a target="_blank" href={selectedBikePoint.Website}>Website</a></p>
            ) : null }
            
          </div>
        </Popup>
      ) : null }

      {selectedBikeRoute && LngLat ? (
        <Popup
        latitude={LngLat.lat}
        longitude={LngLat.lng}
        closeButton={false}
        className="bikeRoutePopup"
        onClose={() => setSelectedBikeRoute(null)}>
          <div>
            <h3>{selectedBikeRoute.type_2021}</h3>
            <p>{selectedBikeRoute.Name}</p>
            <p>Bike Allowed: {selectedBikeRoute.Bikes_Allo}</p>
          </div>
        </Popup>
      ) : null }
    
    <NavigationControl showZoom position='top-right' />

    </MapGL>
    </div>
  );
}

export default App;
