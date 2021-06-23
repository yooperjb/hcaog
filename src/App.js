import React, { useState } from 'react';
import MapGL, { GeolocateControl, Layer, NavigationControl, Popup, Source } from '@urbica/react-map-gl';

import FeatureInfo from './components/FeatureInfo';
import Sidebar from './components/Sidebar';

import { ICONS, ROUTES } from './config/layers.js';
import { MAP_DEFAULTS } from './config/map';

import { useGlobals } from './contexts/GlobalContext';
import { useLayerVisibility } from './contexts/LayerVisibilityContext';

import { applyFocusStyleToLayer, filterVisibleLayers } from './util/layers';

import './App.css';

//import ReactMapGl, {Marker, Popup, Source, Layer} from 'react-map-gl';

const App  = () => {
  const [globals] = useGlobals();
  const [ layerVisibility ] = useLayerVisibility();

  const [cursorStyle, setCursorStyle] = useState();
  const [viewport, setViewport] = useState(MAP_DEFAULTS.viewport);
  
  const [selectedFeature, setSelectedFeature] = useState();

  const clearSelectedFeature = () => setSelectedFeature(() => null);
  const onFeatureClick = (type) => ({features, lngLat}) => {
    setSelectedFeature(() => ({
      type,
      ...lngLat,
      info: features[0]?.properties,
    }));
  };

  const onRouteFeatureClick = onFeatureClick('route');
  const onIconFeatureClick = onFeatureClick('icon');

  const resetCursor = () => setCursorStyle(null);
  const setPointerCursor = () => setCursorStyle('pointer');

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
        accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle='mapbox://styles/yooperjb/ckot0y3yz3kd217lllr2akvdn'
        onClick={clearSelectedFeature}
        onViewportChange={setViewport}
        {...viewport}
        cursorStyle={cursorStyle}
        style={{ flexGrow: '1', height: '100%' }}
      >
        <Source {...ROUTES.source} >
          {
            routeLayers
              .map(layer =>
                globals.focusedLayer === layer.id
                  ? applyFocusStyleToLayer(layer)
                  : layer
              )
              .map((layer) => (
                <Layer
                  key={layer.id}
                  { ...layer }
                  onClick={onRouteFeatureClick}
                  onHover={setPointerCursor}
                  onLeave={resetCursor}
                />
              ))
          }
        </Source>
        <Source {...ICONS.source}>
          {
            iconLayers
              .map(layer =>
                globals.focusedLayer === layer.id
                  ? applyFocusStyleToLayer(layer)
                  : layer
              )
              .map((layer) => (
                <Layer
                  key={layer.id}
                  { ...layer }
                  onClick={onIconFeatureClick}
                  onHover={setCursorStyle}
                  onLeave={resetCursor}
                />
              ))
          }
        </Source>
        {
          selectedFeature && (
            <Popup
              latitude={selectedFeature.lat}
              longitude={selectedFeature.lng}
              closeButton={false}
              closeOnClick={false}
              className="selectedFeaturePopup"
              onClose={clearSelectedFeature}>
              <FeatureInfo {...selectedFeature} />
            </Popup>
          )
        }
        <NavigationControl showZoom position='top-right' />
        <GeolocateControl></GeolocateControl>
      </MapGL>
      <Sidebar></Sidebar>
    </div>
  );
};

export default App;
