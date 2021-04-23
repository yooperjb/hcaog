import React, { useState, useEffect } from 'react';
import ReactMapGl, {Marker, Popup, Source, Layer} from 'react-map-gl';
import './App.css';

const bikePoints = {
  name: 'bike-points',
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
    width: '100vw',
    height: '100vh'
  });

  // for popup
  const [selectedBikePoint, setSelectedBikePoint] = useState(null);
  console.log({selectedBikePoint});

  const logEvent = (event) => {
    console.log("Features", event.features);
  }
  
  return (
    <ReactMapGl
    {...viewport}
    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    onViewportChange={setViewport}
    onClick={logEvent}
    >

      <Source {...bikePoints} onClick={setSelectedBikePoint}>
        <Layer {...bikePointsStyle} 
        //onClick={logEvent}
        
          />
      </Source>
      
      {selectedBikePoint ? (
        <Popup
        latitude={selectedBikePoint.geometry.coordinates[1]}
        longitude={selectedBikePoint.geometry.coordinates[0]}
        closeButton={true}
        onClose={() => setSelectedBikePoint(null)}>
          <div>
            <h3>{selectedBikePoint.properties.Name}</h3>
          </div>
        </Popup>
      ) : null }

    </ReactMapGl>
  );
}

export default App;
