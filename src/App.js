import React, { useState, useEffect } from 'react';
import MapGL, { Source, Layer } from '@urbica/react-map-gl';
//import ReactMapGl, {Marker, Popup, Source, Layer} from 'react-map-gl';
import './App.css';

const bikePoints = {
  id: 'bike-points',
  type: 'vector',
  url: 'mapbox://yooperjb.96kntbve',
};

const bikePointsStyle = {
  id: "bike-points", 
  type: "circle",
  source: 'bike-points',
  "source-layer": "bike_points-8mbmdl", 
  paint: {
    "circle-radius": 3,
    "circle-color": 'black'
  }
}

console.log({...bikePoints});
console.log({...bikePointsStyle});
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

  // for popup
  const [selectedBikePoint, setSelectedBikePoint] = useState(null);
  const [cursorStyle, setCursorStyle] = useState(null)
  console.log({selectedBikePoint});

  const logEvent = (event) => {
    console.log("features", event.features);
    //console.log(event.lngLat);
  }

  const hoverEvent = (event) => {
    //console.log(event.lngLat);
    setCursorStyle('pointer');
  }

  const leaveEvent = (event) => {
    setCursorStyle(null);
  }

  console.log(viewport);
  
  return (
    <MapGL
    {...viewport}
    style={{ width: '100vw', height: '100vh' }}
    mapStyle='mapbox://styles/mapbox/light-v9'
    accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    onViewportChange={setViewport}
    cursorStyle={cursorStyle}
    
    >

      <Source {...bikePoints} onClick={setSelectedBikePoint}>
        <Layer {...bikePointsStyle}
        onClick={logEvent}
        onHover={hoverEvent}
        onLeave={leaveEvent}
        
          />
      </Source>
      
      {/* {selectedBikePoint ? (
        <Popup
        latitude={selectedBikePoint.geometry.coordinates[1]}
        longitude={selectedBikePoint.geometry.coordinates[0]}
        closeButton={true}
        onClose={() => setSelectedBikePoint(null)}>
          <div>
            <h3>{selectedBikePoint.properties.Name}</h3>
          </div>
        </Popup>
      ) : null } */}

    </MapGL>
  );
}

export default App;
