import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './style.module.css';

export const FeatureInfo = ({ type, info }) => {
  const typeProperty = useMemo(
    () => type === 'route' ? 'type_2021' : 'Type',
    [type]
  );
  const link = useMemo(
    () => {
      if (type === 'icon')
        return info.Website;
    },
    [type, info]
  );
  const body = useMemo(
    () => {
      if (type === 'icon')
        return (
          <p>{info.Location}</p>
        );
      if (type === 'route' && info[typeProperty] === 'Existing Trail')
        return (
          <p> Bikes Allowed: {info.Bikes_Allo} </p>
        );
    },
    [type, info]
  );
  return (
    <div className={styles['popup']}>
      <h3>{info[typeProperty]}</h3>
      {
        info.Name &&
          <div className={styles['popup-row']}>
            <p>{info.Name}</p>
            {
              link &&
                <a
                  target="_blank"
                  href={link}
                  rel="noreferrer">
                  <FontAwesomeIcon icon="external-link-alt"/>
                </a>
            }
          </div>
      }
      {body}
    </div>
  );
};

FeatureInfo.propTypes = {
  type: PropTypes.string.isRequired,
  info: PropTypes.shape({
    Name: PropTypes.string,
    Location: PropTypes.string,
    Website: PropTypes.string,
    Bikes_Allo: PropTypes.string,
    type_2021: PropTypes.string,
  }).isRequired,
};

export default FeatureInfo;