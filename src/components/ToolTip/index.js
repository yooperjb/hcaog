import PropTypes from 'prop-types';
import { useRef } from 'react';
import styles from './style.module.scss';

const setOffset = (offset) => offset
  ? document.documentElement.style.setProperty('--tooltip-offset', `${offset}px`)
  : document.documentElement.style.removeProperty('--tooltip-offset');

const ToolTip = ({text, direction, children}) => {
  const tooltipRef = useRef();
  const updateOffset = () => {
    if (!tooltipRef.current) return;
    const rect = tooltipRef.current.getBoundingClientRect();
    const deltaX = Math.floor(Math.min(0, window.innerWidth - rect.right));
    setOffset(deltaX);
  };
  const clearOffset = () => setOffset(0);
  return (
    <span
      className={`${styles['tooltip']} ${styles['tooltip-' + direction]}`}
      onMouseEnter={updateOffset}
      onMouseLeave={clearOffset}
    >
      {children}
      <div
        className={styles['tooltip-text']}
        ref={tooltipRef}
      >
        {text}
      </div>
    </span>
  );
};

ToolTip.propTypes = {
  text: PropTypes.string.isRequired,
  direction: PropTypes.oneOf(['top', 'bottom', 'left', 'right']).isRequired,
  children: PropTypes.node.isRequired
};

export default ToolTip;
