import React from 'react';
import GlobalActivityFeed from '../containers/global_activity_feed'
import PositionDetails from '../containers/position_details'
import EditNewPositionButton from '../containers/edit_new_position_button'

export default () => {
  return (
    <div className="row">
      <div className="col-md-4">
        <GlobalActivityFeed/>
        <EditNewPositionButton />
      </div>
      <div className="col-md-8">
        <PositionDetails />
      </div>
    </div>
  );
}
