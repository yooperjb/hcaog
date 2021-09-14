import React, { useCallback, useState } from 'react';
import MapGL, { GeolocateControl, Layer, NavigationControl, Popup, Source, AttributionControl } from '@urbica/react-map-gl';

import FeatureInfo from './components/FeatureInfo';
import Sidebar from './components/Sidebar';

import { MAP_DEFAULTS } from './config/map';
import { ICONS, ROUTES, CONNECTORS, PCB } from './config/layers.js';

import { useGlobals } from './contexts/GlobalContext';
import { useLayerVisibility } from './contexts/LayerVisibilityContext';

import { applyFocusStyleToLayer, filterVisibleLayers } from './util/layers';

import './App.css';
import SidebarControl from './components/SidebarControl';

// mayStyle choices
const styles = {
  light: 'mapbox://styles/yooperjb/ckot0y3yz3kd217lllr2akvdn'
};

const App  = () => {
  const [globals] = useGlobals();
  const [ layerVisibility ] = useLayerVisibility();

  const [cursorStyle, setCursorStyle] = useState();
  const [viewport, setViewport] = useState(MAP_DEFAULTS.viewport);
  
  const [selectedFeature, setSelectedFeature] = useState();

  const clearSelectedFeature = () => setSelectedFeature(() => null);

  const onFeatureClick = (type) => useCallback(({features, lngLat}) => {
    setSelectedFeature(() => ({
      type,
      ...lngLat,
      info: features[0]?.properties,
    }));
  }, [type]);
  const onRouteFeatureClick = onFeatureClick('route');
  const onConnectorFeatureClick = onFeatureClick('connector');
  const onIconFeatureClick = onFeatureClick('icon');
  const onPCBFeatureClick = onFeatureClick('pcb');

  const resetCursor = () => setCursorStyle(null);
  const setPointerCursor = () => setCursorStyle('pointer');

  const mapLayerSources = [
    {
      ...ROUTES.source,
      layers: filterVisibleLayers(
        ROUTES.layers,
        layerVisibility,
        globals.focusedLayer,
        ICONS.layers.slice(-1)[0]?.id
      ),
      onLayerClick: onRouteFeatureClick
    },
    {
      ...CONNECTORS.source,
      layers: filterVisibleLayers(
        CONNECTORS.layers,
        layerVisibility,
        globals.focusedLayer
      ),
      onLayerClick: onConnectorFeatureClick
    },
    {
      ...PCB.source,
      layers: filterVisibleLayers(
        PCB.layers,
        layerVisibility,
        globals.focusedLayer
      ),
      onLayerClick: onPCBFeatureClick
    },
    {
      ...ICONS.source,
      layers: filterVisibleLayers(
        ICONS.layers,
        layerVisibility,
        globals.focusedLayer
      ),
      onLayerClick: onIconFeatureClick
    },
  ];

  return (
    <div className="container">
      <MapGL
        accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle={styles.light}
        onClick={clearSelectedFeature}
        onViewportChange={setViewport}
        cursorStyle={cursorStyle}
        attributionControl={false}
        {...viewport}
      >
        {
          mapLayerSources.map(({layers, onLayerClick, ...source}) => {
            const filteredLayers = layers
              .map(layer =>
                globals.focusedLayer === layer.id
                  ? applyFocusStyleToLayer(layer)
                  : layer
              )
              .map((layer) => (
                <Layer
                  key={layer.id}
                  { ...layer }
                  onClick={onLayerClick}
                  onHover={setPointerCursor}
                  onLeave={resetCursor}
                />
              ));
            if (!filteredLayers.length) return null;
            return (
              <Source {...source} key={source.id} >
                { filteredLayers }
              </Source>
            );
          }).filter(source => source)
            
        }
        
        {
          selectedFeature && !console.log(selectedFeature) && (
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
        <AttributionControl
          position="bottom-right"
          customAttribution="HCAOG"
          compact={true}
        />
        <SidebarControl />
      </MapGL>
      <Sidebar show={globals.showSidebar}></Sidebar>
    </div>
  );
};

export default App;
