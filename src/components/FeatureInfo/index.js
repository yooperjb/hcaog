import PropTypes from 'prop-types';
import { useMemo } from 'react';

export const FeatureInfo = ({ type, info }) => {
  const typeProperty = useMemo(
    () => type === 'route' ? 'type_2021' : 'Type',
    [type]
  );
  const body = useMemo(
    () => {
      switch (type) {
      case 'route':
        return (
          <p> Bike Allowed: {info.Bikes_Allowed} </p>
        );
      case 'icon':
        return (
          <>
            <p>{info.Location}</p>
            {
              !!info.Website && (
                <p>
                  <a
                    target="_blank"
                    href={info.Website}
                    rel="noreferrer">
                    Website
                  </a>
                </p>
              )
            }
          </>
        );
      }
    },
    [type, info]
  );
  return (
    <div>
      <h3>{info[typeProperty]}</h3>
      <p>{info.Name}</p>
      {body}
    </div>
  );
};

FeatureInfo.propTypes = {
  type: PropTypes.string.isRequired,
  info: PropTypes.object.isRequired,
};

export default FeatureInfo;