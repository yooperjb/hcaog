import PropTypes from 'prop-types';
import styles from './style.module.scss';


const ToolTip = ({text, direction, children}) => {
  return <span className={`${styles['tooltip']} ${styles['tooltip-' + direction]}`}>
    {children}
    <span className={styles['tooltip-text']}>{text}</span>
  </span>;
};

ToolTip.propTypes = {
  text: PropTypes.string.isRequired,
  direction: PropTypes.oneOf(['top', 'bottom', 'left', 'right']).isRequired,
  children: PropTypes.node.isRequired
};

export default ToolTip;