import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { clearFocusedLayer, setFocusedLayer, useGlobals } from '../../contexts/GlobalContext';
import { toggleVisibility, useLayerVisibility } from '../../contexts/LayerVisibilityContext';
import ToolTip from '../ToolTip';
import styles from './style.module.css';
import { ICONS } from '../../config/layers';

const LayerToggle = ({ layerId, details: { name, description }, type = 'icon' }) => {
  const [, dispatchGlobals] = useGlobals();
  const [layerVisibility, dispatchVisibility] = useLayerVisibility();

  const toggle = () => dispatchVisibility(toggleVisibility(layerId));
  const focus = () => dispatchGlobals(setFocusedLayer(layerId));
  const unfocus = () => dispatchGlobals(clearFocusedLayer(layerId));

  const icon = useMemo(() => {
    if (type !== 'icon')
      return;
    const { icon, color } = ICONS.details[layerId];
    return <FontAwesomeIcon icon={icon} color={color}/>;
  }, [type]);
  
  return (
    <div
      className={styles['layer-toggle']}
    >
      <span 
        onClick={toggle}
        onMouseEnter={focus}
        onMouseLeave={unfocus}
        onTouchEnd={unfocus}
        onTouchStart={focus}
        onTouchCancel={unfocus}
      >
        <div className={styles['layer-checkbox']}>
          <input
            type="checkbox"
            className={`${styles[type]} ${styles[layerId]}`}
            defaultChecked={layerVisibility[layerId]}
          />
        </div>
        <label htmlFor={styles[layerId]}>
          {icon && <span>{icon} - </span>}
          {' '}
          {name}
        </label>
      </span>
      {
        description && 
          <ToolTip text={description} direction="top">
            <FontAwesomeIcon icon="info-circle" style={{color:'white'}} />
          </ToolTip>
      }
    </div>
  );
};

LayerToggle.propTypes = {
  layerId: PropTypes.string.isRequired,
  details: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  type: PropTypes.string,
};

export default LayerToggle;
