import React from 'react';
import { CONNECTORS, ICONS, ROUTES, PCB } from '../../config/layers';
import logo from '../../images/logo.png';
import LayerToggle from '../LayerToggle';
import styles from './style.module.css';

const Sidebar = () => {
  return (
    <div className={styles['sidebar']}>
      <div className={styles['logo']}>
        <img src={logo} alt="HCAGO Logo" />
      </div>
      <div className={styles['summary']}>
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
        <h3 className={styles['layers-header']}>Existing Bike Routes</h3>
        {
          Object.entries(ROUTES.details)
            .map(([layerId, details]) => (
              <LayerToggle
                key={layerId}
                layerId={layerId}
                details={details}
                type="line"
              />
            ))
        }
        {
          Object.entries(ICONS.details)
            .map(([layerId, details]) => (
              <LayerToggle
                key={layerId}
                layerId={layerId}
                details={details}
                type="icon"
              />
            ))
        }
        <h3 className={styles['layers-header']}>Connector Routes</h3>
        {
          Object.entries(CONNECTORS.details)
            .map(([layerId, details]) => (
              <LayerToggle
                key={layerId}
                layerId={layerId}
                details={details}
                type="line"
              />
            ))
        }
        <h3 className={styles['layers-header']}>Regional Routes</h3>
        {
          Object.entries(PCB.details)
            .map(([layerId, details]) => (
              <LayerToggle
                key={layerId}
                layerId={layerId}
                details={details}
                type="line"
              />
            ))
        }
      </div>

    </div>
  );
};

export default Sidebar;
