import PropTypes from 'prop-types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BASEMAPS } from '../../config/map';
import styles from './style.module.css';

const BasemapSwitcher = ({ currentStyle, onStyleChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const switcherRef = useRef(null);
  const basemapEntries = useMemo(() => Object.entries(BASEMAPS), []);

  const toggleOpen = () => setIsOpen(open => !open);

  const handleStyleSelect = (styleUrl) => {
    onStyleChange(styleUrl);

    // Keep the panel open on larger screens for quicker comparison.
    if (window.matchMedia('(max-width: 768px)').matches) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e, styleUrl) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleStyleSelect(styleUrl);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!switcherRef.current) return;
      if (switcherRef.current.contains(event.target)) return;
      setIsOpen(false);
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, []);

  return (
    <div className={styles['basemap-switcher']} ref={switcherRef}>
      <div className="mapboxgl-ctrl mapboxgl-ctrl-group">
        <button
          type="button"
          className={styles['trigger-button']}
          onClick={toggleOpen}
          aria-label="Toggle basemap options"
          aria-expanded={isOpen}
          title="Basemap options"
        >
          <FontAwesomeIcon icon="map" />
        </button>
      </div>

      <div
        className={`${styles['panel']} ${isOpen ? styles['panel-open'] : styles['panel-closed']}`}
        aria-hidden={!isOpen}
      >
        <div className={styles['panel-title']}>Basemap</div>
        <div className={styles['thumbnail-grid']}>
          {basemapEntries.map(([key, { label, url }]) => (
            <button
              key={key}
              type="button"
              className={`${styles['thumbnail-button']} ${currentStyle === url ? styles.active : ''}`}
              onClick={() => handleStyleSelect(url)}
              onKeyDown={(e) => handleKeyDown(e, url)}
              aria-pressed={currentStyle === url}
              aria-label={`Switch to ${label} basemap`}
              title={label}
            >
              <span className={`${styles.thumbnail} ${styles[key]}`} aria-hidden="true" />
              <span className={styles['thumbnail-label']}>{label}</span>
            </button>
          ))}
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