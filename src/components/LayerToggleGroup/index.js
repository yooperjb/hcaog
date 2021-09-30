import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import ToolTip from '../ToolTip';
import styles from './style.module.css';

const LayerToggleGroup = ({header, description, children}) => (
  <>
    {
      header &&
        <h3 className={styles['layer-group-header']}>
          <span className={styles['layer-group-header-text']}>{header}</span>
          {
            description &&
              <ToolTip text={description} direction="top">
                <FontAwesomeIcon icon="info-circle" style={{color:'white'}} />
              </ToolTip>
          }
        </h3>
    }
    {children}
  </>
);

LayerToggleGroup.propTypes = {
  header: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.any,
};

export default LayerToggleGroup;