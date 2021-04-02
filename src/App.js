import React, { useState, useEffect } from 'react';
import ReactMapGl, {Marker, Popup} from 'react-map-gl';
import './App.css';

function App() {

  const [viewport, setViewport] = useState({
    latitude: 40.7450,
    longitude: -123.8695,
    zoom: 11,
    width: '100vw',
    height: '100vh'
  });

  return (
    <ReactMapGl
    {...viewport}
    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    onViewportChange={setViewport}
    >

    </ReactMapGl>
  );
}

export default App;
