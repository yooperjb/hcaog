import PropTypes from 'prop-types';
import { useMemo } from 'react';

export const FeatureInfo = ({ type, info }) => {
  const typeProperty = useMemo(
    () => type === 'route' ? 'type_2021' : 'Type',
    [type]
  );
  const body = useMemo(
    () => {
      if (type == 'icon')
        return (
          <>
            <p>{info.Location}</p>
            {
              info.Website && (
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
      if (type == 'route' && info.type_2021 === 'Existing Trail')
        return (
          <p> Bike Allowed: {info.Bikes_Allo} </p>
        );
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
  info: PropTypes.shape({
    Name: PropTypes.string,
    Location: PropTypes.string,
    Website: PropTypes.string,
    Bikes_Allo: PropTypes.string,
    type_2021: PropTypes.string,
  }).isRequired,
};

export default FeatureInfo;