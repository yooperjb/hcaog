import PropTypes from 'prop-types';
import { CONNECTORS, ICONS, ROUTES, PCB } from '../../config/layers';
import logo from '../../images/logo.png';
import LayerToggle from '../LayerToggle';
import LayerToggleGroup from '../LayerToggleGroup';
import styles from './style.module.css';

const Sidebar = ({show}) => {
  const layerToggleGroups = [
    {
      details:ROUTES.details,
      header: 'Existing Bike Routes',
      toggleType: 'line'
    },
    {
      details:ICONS.details,
    },
    {
      details:CONNECTORS.details,
      header: 'Connector Routes',
      description: 'These are connector routes',
      toggleType: 'line'
    },
    {
      details:PCB.details,
      header: 'Pacific Coast Bike Route',
      toggleType: 'line'
    },
  ];

  return (
    <>
      <div className={styles['sidebar'] + (show ? '' : ` ${styles['hidden']}`)}>
        <div className={styles['logo']}>
          <img src={logo} alt="HCAGO Logo" />
        </div>
        <div className={styles['summary']}>
          <p>
            Humboldt County offers incredible biking opportunities 
            for visitors and residents alike. 
            Find a new way to commute to work, explore the countryside, 
            take an adventurous mountain bike ride, and more!
          </p>
          <p>
            To learn more about Humboldt County Bike Routes click
            <a target="_blank" href="https://www.hcaog.net/documents/humboldt-regional-bicycle-plan-2018" rel="noreferrer"> here</a>.
          </p>
        </div>
        {
          layerToggleGroups.map(({
            header,
            description,
            details,
            toggleType
          }, i) => (
            <LayerToggleGroup
              key={header ?? i}
              header={header}
              description={description}
            >
              {
                Object.entries(details)
                  .map(([layerId, details]) => (
                    <LayerToggle
                      key={layerId}
                      layerId={layerId}
                      details={details}
                      type={toggleType}
                    />
                  ))
              }
            </LayerToggleGroup>
          ))
        }
       
        <div className={styles['summary']}>
          <h4>Public Transit Routes</h4>
          <p>Note that several bus lines are equipped with bike racks. 
            Plan your connection <a href="https://hta.org/" target="_blank" rel="noreferrer">here</a>.</p>
        </div>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  show: PropTypes.bool
};

export default Sidebar;
