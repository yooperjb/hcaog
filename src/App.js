import MapGL, { GeolocateControl, Layer, NavigationControl, Popup, Source } from '@urbica/react-map-gl';
import React, { useState } from 'react';
import './App.scss';
import Sidebar from './components/Sidebar';
import { applyFocusToLayer, filterVisibleLayers, icons, routes } from './config/layers.js';
import { clearFocusedLayer, setFocusedLayer, useGlobals } from './contexts/GlobalContext';
import { useLayerVisibility } from './contexts/LayerVisibilityContext';

//import ReactMapGl, {Marker, Popup, Source, Layer} from 'react-map-gl';

const App  = () => {

  const [viewport, setViewport] = useState({
    latitude: 40.7450,
    longitude: -123.8695,
    zoom: 8,
  });

  // useState for Popups and 
  const [selectedBikePoint, setSelectedBikePoint] = useState(null);
  const [selectedBikeRoute, setSelectedBikeRoute] = useState(null);
  const [LngLat, setLngLat] = useState(null);
  // useState for Cursor style on hover
  const [cursorStyle, setCursorStyle] = useState(null);
  
  const [globals, dispatchGlobals] = useGlobals();
  const [ layerVisibility ] = useLayerVisibility();
  
  const logBikePoint = (event) => {
    //console.log("features", event.features[0].properties);
    setSelectedBikePoint(event.features[0].properties);
    //console.log("lngLat", event.lngLat);
    setLngLat(event.lngLat);
    //console.log("LngLat:", LngLat);
  };

  const logBikeRoute = (event) => {
    setSelectedBikeRoute(event.features[0].properties);
    //console.log("Bike Route", selectedBikeRoute);
    setLngLat(event.lngLat);
    //console.log("LngLat:", event.lngLat);
    //console.log("LngLat:", LngLat);
  };

  // set cursor to pointer on feature hover
  const getCursor = (layer) => () => {
    setCursorStyle('pointer');
    dispatchGlobals(setFocusedLayer(layer));
  };

  // set cursor to default on feature leave
  const returnCursor = () => {
    setCursorStyle(null);
    dispatchGlobals(clearFocusedLayer());
  };

  const iconLayers = filterVisibleLayers(
    icons.layers,
    layerVisibility,
    globals.focusedLayer
  );
  const routeLayers = filterVisibleLayers(
    routes.layers,
    layerVisibility,
    globals.focusedLayer,
    icons.layers.slice(-1)[0]?.id
  );
  
  return (
    <div className="container">
      <MapGL
        {...viewport}
        style={{ flexGrow: '1', height: '100%' }}
        mapStyle='mapbox://styles/yooperjb/ckot0y3yz3kd217lllr2akvdn'
        //mapStyle='mapbox://styles/yooperjb/ckn6lzo7i08vu17nvv4tm9i6k'
        accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={setViewport}
        cursorStyle={cursorStyle}
    
      >
        <Source {...routes.source} >
          {
            routeLayers.map((layer) => (
              <Layer
                key={layer.id}
                {...(globals.focusedLayer === layer.id
                  ? applyFocusToLayer(layer)
                  : layer
                )}
                onClick={logBikePoint}
                onHover={getCursor(layer.id)}
                onLeave={returnCursor}
              />
            ))
          }
        </Source>
        <Source {...icons.source}>
          {
            iconLayers.map((layer) => (
              <Layer
                key={layer.id}
                {...(globals.focusedLayer === layer.id
                  ? applyFocusToLayer(layer)
                  : layer
                )}
                onHover={getCursor(layer.id)}
                onLeave={returnCursor}
                onClick={logBikeRoute}
              />
            ))
          }
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
                <p><a target="_blank" href={selectedBikePoint.Website} rel="noreferrer">Website</a></p>
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
        <GeolocateControl></GeolocateControl>

      </MapGL>
      <Sidebar></Sidebar>
    </div>
  );
};

export default App;
