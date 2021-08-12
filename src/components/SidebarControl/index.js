import { MapContext } from '@urbica/react-map-gl';
import { useContext, useEffect } from 'react';
import { toggleSidebar, useGlobals } from '../../contexts/GlobalContext';
import styles from './style.module.css';

const SidebarControl = () => {
  const [{showSidebar}, dispatch] = useGlobals();
  const map = useContext(MapContext);

  const onClick = () => dispatch(toggleSidebar());

  useEffect(() => map.resize(), [showSidebar]);

  return (
    <div className={styles['sidebar-toggle']}>
      <div className="mapboxgl-ctrl mapboxgl-ctrl-group">
        <button className="mapboxgl-ctrl-geolocate" onClick={onClick}>
          {showSidebar ? '>' : '<'}
        </button>
      </div>
    </div>
  );
};

export default SidebarControl;