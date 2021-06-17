import MapGL, { GeolocateControl, Layer, NavigationControl, Popup, Source, AttributionControl } from '@urbica/react-map-gl';
import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import { ICONS, ROUTES } from './config/layers.js';
import { useGlobals } from './contexts/GlobalContext';
import { useLayerVisibility } from './contexts/LayerVisibilityContext';
import { applyFocusStyleToLayer, filterVisibleLayers } from './util/layers';

const App  = () => {

  // set intial map location settings
  const [viewport, setViewport] = useState({
    latitude: 40.7450,
    longitude: -123.8695,
    zoom: 8,
  });

  // useState for Popups 
  const [selectedBikePoint, setSelectedBikePoint] = useState(null);
  const [selectedBikeRoute, setSelectedBikeRoute] = useState(null);
  const [LngLat, setLngLat] = useState(null);
  // useState for Cursor style on hover
  const [cursorStyle, setCursorStyle] = useState(null);

  const [globals] = useGlobals();
  const [ layerVisibility ] = useLayerVisibility();
  
  // Set bike point info to state for popup
  const logBikePoint = (event) => {
    setSelectedBikePoint(event.features[0].properties);
    setLngLat(event.lngLat);
  };

  // Set bike route info to state for popup
  const logBikeRoute = (event) => {
    setSelectedBikeRoute(event.features[0].properties);
    setLngLat(event.lngLat);
  };

  // set cursor to pointer on feature hover
  const getCursor = () => () => {
    setCursorStyle('pointer');
    //dispatchGlobals(setFocusedLayer(layer));
  };

  // set cursor to back to default on feature leave
  const returnCursor = () => {
    setCursorStyle(null);
    //dispatchGlobals(clearFocusedLayer());
  };

  const iconLayers = filterVisibleLayers(
    ICONS.layers,
    layerVisibility,
    globals.focusedLayer
  );
  
  const routeLayers = filterVisibleLayers(
    ROUTES.layers,
    layerVisibility,
    globals.focusedLayer,
    ICONS.layers.slice(-1)[0]?.id
  );

  return (
    <div className="container">
      <MapGL
        {...viewport}
        style={{ flexGrow: '1', height: '100%' }}
        mapStyle='mapbox://styles/yooperjb/ckot0y3yz3kd217lllr2akvdn'
        // mapStyle='mapbox://styles/yooperjb/ckn6lzo7i08vu17nvv4tm9i6k'
        accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={setViewport}
        cursorStyle={cursorStyle}
        attributionControl={false}
        pitchWithRotate={true}
        dragRotate={true}
      >
        <Source {...ROUTES.source} >
          {
            routeLayers.map((layer) => (
              <Layer
                key={layer.id}
                {...(globals.focusedLayer === layer.id
                  ? applyFocusStyleToLayer(layer)
                  : layer
                )}
                onHover={getCursor(layer.id)}
                onClick={logBikeRoute}
                onLeave={returnCursor}
              />
            ))
          }
        </Source>
        <Source {...ICONS.source}>
          {
            iconLayers.map((layer) => (
              <Layer
                key={layer.id}
                {
                  ...(globals.focusedLayer === layer.id
                    ? applyFocusStyleToLayer(layer)
                    : layer
                  )
                }
                onHover={getCursor(layer.id)}
                onClick={logBikePoint}
                onLeave={returnCursor}
                
              />
            ))
          }
        </Source>
        
        {
          selectedBikePoint && LngLat
            ? (
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
                  {
                    selectedBikePoint.Website
                      ? (
                        <p><a target="_blank" href={selectedBikePoint.Website} rel="noreferrer">Website</a></p>
                      )
                      : null
                  }
                </div>
              </Popup>
            )
            : null
        }

        {
          (selectedBikeRoute && LngLat)
            ? (
              <Popup
                latitude={LngLat.lat}
                longitude={LngLat.lng}
                closeButton={false}
                className="bikeRoutePopup"
                onClose={() => setSelectedBikeRoute(null)}>
                <div>
                  <h3>{selectedBikeRoute.type_2021}</h3>
                  <p>{selectedBikeRoute.Name}</p>
                  <p>Bikes Allowed: {selectedBikeRoute.Bikes_Allo}</p>
                </div>
              </Popup>
            )
            : null
        }
        <NavigationControl showZoom position='top-right' />
        <GeolocateControl></GeolocateControl>
        <AttributionControl
          position="bottom-right"
          customAttribution="HCAOG"
          compact={true}
        />
      </MapGL>
      <Sidebar></Sidebar>
    </div>
  );
};

export default App;
