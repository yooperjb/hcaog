import PropTypes from 'prop-types';
import { clearFocusedLayer, setFocusedLayer, useGlobals } from '../../contexts/GlobalContext';
import { toggleVisibility, useLayerVisibility } from '../../contexts/LayerVisibilityContext';
import ToolTip from '../ToolTip';
import styles from './style.module.scss';



const LayerToggle = ({ layerId, details: { name, description }, type }) => {
  const [, dispatchGlobals] = useGlobals();
  const [layerVisibility, dispatchVisibility] = useLayerVisibility();

  const toggle = () => dispatchVisibility(toggleVisibility(layerId));
  const focus = () => dispatchGlobals(setFocusedLayer(layerId));
  const unfocus = () => dispatchGlobals(clearFocusedLayer(layerId));
  
  return (
    <div
      className={styles['layer-toggle']}
    >
      <span 
        onClick={toggle}
        onMouseEnter={focus}
        onMouseLeave={unfocus}
      >
        <input
          type="checkbox"
          className={`${styles[type]} ${styles[layerId]}`}
          defaultChecked={layerVisibility[layerId]}
        />
        <label htmlFor={styles[layerId]}>{name}</label>
      </span>
      {description && <ToolTip text={description} direction="top">🛈<strong></strong></ToolTip>}
    </div>
  );
};

LayerToggle.propTypes = {
  layerId: PropTypes.string.isRequired,
  details: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  type: PropTypes.string.isRequired,
};

export default LayerToggle;