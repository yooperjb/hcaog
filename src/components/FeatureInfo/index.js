import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './style.module.css';
import { ICONS } from '../../config/layers';

const iconIdMap = {
  'Bicycle Shop': 'bike-shops',
  'Rental': 'rental',
  'Tool Station': 'tool-station'
};

export const FeatureInfo = ({ type, info }) => {
  const typeProperty = useMemo(
    () => type === 'route' ? 'type_2021' : 'Type',
    [type]
  );
  const icon = useMemo(() => {
    if (type !== 'icon')
      return;
    // const { icon, color } = ICONS.details[iconIdMap[info[typeProperty]]];
    const { icon } = ICONS.details[iconIdMap[info[typeProperty]]];
    return <FontAwesomeIcon icon={icon} color='black'/>;
  }, [type, typeProperty]);
  const link = useMemo(
    () => {
      if (type === 'icon')
        return (
          <a
            target="_blank"
            href={info.Website}
            rel="noreferrer">
            <FontAwesomeIcon icon="external-link-alt"/>
          </a>
        );
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
      <h3>{icon}{info[typeProperty]}</h3>
      {
        info.Name &&
          <div className={styles['popup-row']}>
            <p>{info.Name}</p>
            {link}
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