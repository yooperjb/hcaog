import PropTypes from 'prop-types';
import styles from './style.module.css';

const LayerToggleGroup = ({header, children}) => (
  <>
    {header && <h3 className={styles['layer-group-header']}>{header}</h3>}
    {children}
  </>
);

LayerToggleGroup.propTypes = {
  header: PropTypes.string,
  children: PropTypes.any,
};

export default LayerToggleGroup;