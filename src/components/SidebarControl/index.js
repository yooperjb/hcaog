import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Breakpoints from '../../config/breakpoints';
import { toggleSidebar, useGlobals } from '../../contexts/GlobalContext';
import { useViewPort } from '../../contexts/ViewPortContext';
import styles from './style.module.css';

const SidebarControl = () => {
  const [{showSidebar}, dispatch] = useGlobals();
  const {width} = useViewPort();

  const onClick = () => dispatch(toggleSidebar());
  const showControl = width <= Breakpoints.LARGE;

  useEffect(() => {
    if (showControl) return;
    if (showSidebar) return;
    dispatch(toggleSidebar());
  }, [showControl]);

  // Note: map.resize() is not needed with react-map-gl - it handles resizing automatically

  if (!showControl) return <></>;

  return (
    <div className={styles['sidebar-toggle']}>
      <div className="mapboxgl-ctrl mapboxgl-ctrl-group">
        <button className="mapboxgl-ctrl-geolocate" onClick={onClick}>
          <FontAwesomeIcon icon={`chevron-${showSidebar ? 'right': 'left'}`} />
        </button>
      </div>
    </div>
  );
};

export default SidebarControl;