import React, { memo } from 'react';
import pluginId from '../../pluginId';
import BuildTrigger from '../../components/build-trigger/BuildTrigger';

const HomePage = () => {
  return (
    <div className="container">

      <div className="row">
        <div className="col-6 pt-5">
          <BuildTrigger />
        </div>
      </div>
    </div>
  );
};

export default memo(HomePage);
