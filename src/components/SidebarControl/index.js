import { MapContext } from '@urbica/react-map-gl';
import { useContext, useEffect } from 'react';
import Breakpoints from '../../config/breakpoints';
import { toggleSidebar, useGlobals } from '../../contexts/GlobalContext';
import { useViewPort } from '../../contexts/ViewPortContext';
import styles from './style.module.css';

const SidebarControl = () => {
  const [{showSidebar}, dispatch] = useGlobals();
  const {width} = useViewPort();
  const map = useContext(MapContext);


  const onClick = () => dispatch(toggleSidebar());
  const showControl = width <= Breakpoints.LARGE;

  useEffect(() => {
    if (showControl) return;
    if (showSidebar) return;
    dispatch(toggleSidebar());
  }, [showControl]);
  useEffect(() => map.resize(), [showSidebar]);

  if (!showControl) return <></>;

  return (
    <div className={styles['sidebar-toggle']}>
      <div className="mapboxgl-ctrl mapboxgl-ctrl-group">
        <button className="mapboxgl-ctrl-geolocate" onClick={onClick}>
          {<i className={`fa fa-chevron-${showSidebar ? 'right': 'left'}`}/>}
        </button>
      </div>
    </div>
  );
};

export default SidebarControl;