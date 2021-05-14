import React, { useState, useEffect } from 'react';
import MapGL, { Source, Layer, Popup, NavigationControl, Filter } from '@urbica/react-map-gl';
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
  },
  filter: ['==', "Type", "Bicycle Parking"]
}

const bikeShops = {
  id: "bike-shops",
  type: "circle",
  source: 'bike-points',
  "source-layer": "bike_points-8mbmdl", 
  paint: {
    "circle-radius": 3,
    "circle-color": 'red'
  },
  filter: ['==', "Type", "Bicycle Shop"]
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

  const getCursor = (event) => {
    //console.log(event.lngLat);
    setCursorStyle('pointer');
  }

  const leaveEvent = (event) => {
    setCursorStyle(null);
  }

  //console.log(viewport);
  
  return (
    <MapGL
    {...viewport}
    style={{ width: '100vw', height: '100vh' }}
    mapStyle='mapbox://styles/mapbox/light-v9'
    //mapStyle='mapbox://styles/yooperjb/ckn6lzo7i08vu17nvv4tm9i6k'
    accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    onViewportChange={setViewport}
    cursorStyle={cursorStyle}
    
    >

      <Source {...bikePoints} >
        <Layer {...bikePointsStyle}
        onClick={logEvent}
        onHover={getCursor}
        onLeave={leaveEvent}
          />
        {/* <Filter layerId="bike-points" filter={['==', 'Type', "Bicycle Parking"]} /> */}
        
        <Layer {...bikeShops} />
        {/* <Filter layerId="bikeShops" filter={['==', 'Type', "Bicycle Shops"]} /> */}
      </Source>


      {/* <Source id='contour' type='vector' url='mapbox://mapbox.mapbox-terrain-v2' />
      <Layer
        id='contour'
        type='line'
        source='contour'
        source-layer='contour'
        paint={{
          'line-color': '#877b59',
          'line-width': 1
        }}
      /> */}
      
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
