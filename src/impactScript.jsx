import React, { useEffect } from 'react';

const ImpactScript = (props) => {
    let id = props.id;
  useEffect(() => {
    window.ire('identify', { customerId: id });
  }, []);

  return null;
};

export default ImpactScript;
