import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';
import { getViewPort } from '../../util/window';

const ViewPortContext = createContext(getViewPort());

export const ViewPortProvider = ({children}) => {
  const [viewPort, setViewPort] = useState(getViewPort());

  useEffect(() => {
    const onResize = () => {
      setViewPort(getViewPort());
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [viewPort]);

  return (
    <ViewPortContext.Provider value={viewPort}>
      {children}
    </ViewPortContext.Provider>
  );
};

ViewPortProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export const useViewPort = () => useContext(ViewPortContext);

export default ViewPortProvider;
