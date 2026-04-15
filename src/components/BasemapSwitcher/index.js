import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { BASEMAPS } from '../../config/map';
import styles from './style.module.css';

const BasemapSwitcher = ({ currentStyle, onStyleChange }) => {
  const basemapEntries = useMemo(() => Object.entries(BASEMAPS), []);

  const handleKeyDown = (e, styleUrl) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onStyleChange(styleUrl);
    }
  };

  return (
    <div className={styles['basemap-switcher']}>
      <div className="mapboxgl-ctrl mapboxgl-ctrl-group">
        <div className={styles['basemap-container']}>
          <div className={styles['basemap-label']}>Basemap</div>
          <div className={styles['basemap-buttons']}>
            {basemapEntries.map(([key, { label, url }]) => (
              <button
                key={key}
                className={`${styles['basemap-button']} ${currentStyle === url ? styles.active : ''}`}
                onClick={() => onStyleChange(url)}
                onKeyDown={(e) => handleKeyDown(e, url)}
                aria-pressed={currentStyle === url}
                aria-label={`Switch to ${label} basemap`}
                title={label}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

BasemapSwitcher.propTypes = {
  currentStyle: PropTypes.string.isRequired,
  onStyleChange: PropTypes.func.isRequired,
};

export default BasemapSwitcher;