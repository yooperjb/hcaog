import React from 'react';
import logo from '../../images/logo.png';
import LayerToggle from '../LayerToggle';
import styles from './style.module.scss';

const routeLayers = [
  {
    id: 'ClassI',
    name: 'Class I Bike Route',
    description: 'A separated paved path for bicycles and pedestrians.'
  },
  {
    id: 'ClassII',
    name: 'Class II Bike Route',
    description: 'A restricted right-of-way for bicycles along the side of a street (typically 5 feet wide). A thick white line separates the auto and bike lanes. Motor vehicles may merge into these lanes to make turns.'
  },
  {
    id: 'ClassIII',
    name: 'Class III Bike Route',
    description: 'A travel lane shared by bicycles and motor vehicles designated only by signs or pavement markings. This type of facility mainly informs motorists of preferred cycling routes.'
  },
  {
    id: 'Trail',
    name: 'Natural Surface Trails',
    description: 'A dirt or gravel single-track paths that are bicycle compatible.'
  },
];

const iconLayers = [
  {
    id: 'bike-shops',
    name: 'Bike Shops'
  },
  {
    id: 'bike-parking',
    name: 'Bike Parking'
  },
  {
    id: 'tool-station',
    name: 'Tool Station'
  },
];

const connectorLayers = [
  {
    id: 'familyfriendly',
    name: 'Family Friendly',
  },
  {
    id: 'intermediate',
    name: 'Intermediate',
  },
  {
    id: 'advanced',
    name: 'Advanced',
  },
];

const Sidebar = () => {

  return (
    <div className={styles['sidebar']}>
      <div className={styles['logo']}>
        <img src={logo} alt="HCAGO Logo" />
      </div>
      <div>
        <p>
          Humboldt County offers incredible bike opportunities for
          visitors and locals alike. Find a new way to commute to work,
          explore the countryside, an adventurous mountain bike ride, and more!
        </p>
        <p>
          To learn more about Humboldt County Bike Routes click
          <a target="_blank" href="https://www.hcaog.net/documents/humboldt-regional-bicycle-plan-2018" rel="noreferrer">here</a>.
        </p>
      </div>

      <div className={styles['layers']}>
        <h3>Existing Bike Routes</h3>
        {routeLayers.map(layer => <LayerToggle key={layer.id} layer={layer} type="line" />)}
        {iconLayers.map(layer => <LayerToggle key={layer.id} layer={layer} type="icon" />)}
      </div>
      <div className={styles['layers']}>
        <h3>Connector Routes</h3>
        {connectorLayers.map(layer => (
          <LayerToggle key={layer.id} layer={layer} type="icon" />
        ))}
      </div>

    </div>
  );
};

export default Sidebar;