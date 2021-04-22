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
    "circle-color": '#5776f2'
  }
}

const waterPoints = {
  name: 'water-points',
  type: 'vector',
  url: "mapbox://yooperjb.d3fmw0q7"
};

const waterStyle = {
  id: "water-points", 
  type: "circle",
  source: 'water-points',
  "source-layer": "water_points-d2zqcw", 
  paint: {
    "circle-radius": 4,
    "circle-color": '#5776f2'
  }
}

console.log(waterPoints);
console.log({...waterPoints})

function App() {

  const [viewport, setViewport] = useState({
    latitude: 40.7450,
    longitude: -123.8695,
    zoom: 8,
    width: '100vw',
    height: '100vh'
  });

  return (
    <ReactMapGl
    {...viewport}
    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    onViewportChange={setViewport}
    >
      <Source {...waterPoints}>
        <Layer {...waterStyle} />
      </Source>

      <Source {...bikePoints}>
        <Layer {...bikePointsStyle} />
      </Source>
      

    </ReactMapGl>
  );
}

export default App;
