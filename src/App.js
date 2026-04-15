import React, { useState, useEffect } from 'react';
import Map, { Layer, Source, Popup, NavigationControl, GeolocateControl, AttributionControl } from 'react-map-gl';

import FeatureInfo from './components/FeatureInfo';
import Sidebar from './components/Sidebar';
import BasemapSwitcher from './components/BasemapSwitcher';

import { MAP_DEFAULTS, BASEMAPS } from './config/map';
import { ICONS, ROUTES, CONNECTORS, PCB } from './config/layers.js';

import { useGlobals } from './contexts/GlobalContext';
import { useLayerVisibility } from './contexts/LayerVisibilityContext';

import { applyFocusStyleToLayer, filterVisibleLayers } from './util/layers';

import './App.css';
import SidebarControl from './components/SidebarControl';

// Default to light basemap to maintain current behavior
const DEFAULT_BASEMAP = BASEMAPS.light.url;

const App  = () => {
  const [globals] = useGlobals();
  const [ layerVisibility ] = useLayerVisibility();

  const [cursorStyle, setCursorStyle] = useState('default');
  const [selectedFeature, setSelectedFeature] = useState();
  const [mapStyle, setMapStyle] = useState(DEFAULT_BASEMAP);

  const clearSelectedFeature = () => setSelectedFeature(null);

  // Handle map clicks to show feature popups
  const handleMapClick = (event) => {
    const features = event.features;
    if (features && features.length > 0) {
      const feature = features[0];
      const layerId = feature.layer.id;

      // Determine feature type based on layer
      let type = 'route';
      if (ICONS.layers.some(layer => layer.id === layerId)) {
        type = 'icon';
      } else if (CONNECTORS.layers.some(layer => layer.id === layerId)) {
        type = 'connector';
      } else if (PCB.layers.some(layer => layer.id === layerId)) {
        type = 'pcb';
      }

      setSelectedFeature({
        type,
        lat: event.lngLat.lat,
        lng: event.lngLat.lng,
        info: feature.properties,
      });
    } else {
      clearSelectedFeature();
    }
  };

  // Handle mouse movement for cursor changes
  const handleMouseMove = (event) => {
    const features = event.features;
    if (features && features.length > 0) {
      setCursorStyle('pointer');
    } else {
      setCursorStyle('default');
    }
  };

  // Get all layer IDs that should be interactive
  const getInteractiveLayerIds = () => {
    return [
      ...ROUTES.layers.map(layer => layer.id),
      ...CONNECTORS.layers.map(layer => layer.id),
      ...PCB.layers.map(layer => layer.id),
      ...ICONS.layers.map(layer => layer.id),
    ];
  };

  const mapLayerSources = [
    {
      ...ROUTES.source,
      layers: filterVisibleLayers(
        ROUTES.layers,
        layerVisibility,
        globals.focusedLayer,
        ICONS.layers.slice(-1)[0]?.id
      ),
    },
    {
      ...CONNECTORS.source,
      layers: filterVisibleLayers(
        CONNECTORS.layers,
        layerVisibility,
        globals.focusedLayer
      ),
    },
    {
      ...PCB.source,
      layers: filterVisibleLayers(
        PCB.layers,
        layerVisibility,
        globals.focusedLayer
      ),
    },
    {
      ...ICONS.source,
      layers: filterVisibleLayers(
        ICONS.layers,
        layerVisibility,
        globals.focusedLayer
      ),
    },
  ];

  useEffect(clearSelectedFeature, [layerVisibility]);

  return (
    <div className="container">
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        initialViewState={MAP_DEFAULTS.viewport}
        style={{width: '100vw', height: '100vh'}}
        mapStyle={mapStyle}
        onClick={handleMapClick}
        onMouseMove={handleMouseMove}
        cursor={cursorStyle}
        attributionControl={false}
        interactiveLayerIds={getInteractiveLayerIds()}
        styleDiffing={true}
      >
        {
          mapLayerSources.map(({layers, ...source}) => {
            const filteredLayers = layers
              .map(layer =>
                globals.focusedLayer === layer.id
                  ? applyFocusStyleToLayer(layer)
                  : layer
              )
              .map((layer) => (
                <Layer
                  key={layer.id}
                  {...layer}
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
        <AttributionControl
          position="bottom-right"
          customAttribution="HCAOG"
          compact={true}
        />
        <BasemapSwitcher currentStyle={mapStyle} onStyleChange={setMapStyle} />
        <SidebarControl />
      </Map>
      <Sidebar show={globals.showSidebar}></Sidebar>
    </div>
  );
};

export default App;
