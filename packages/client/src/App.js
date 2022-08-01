import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ViewCampaigns from './campaigns/pages/ViewCampaigns';
import CreateCampaign from './campaigns/pages/CreateCampaign';
import EditCampaign from './campaigns/pages/EditCampaign';
import PreviewCampaign from './campaigns/pages/PreviewCampaign';
import ScheduleCampaign from './campaigns/pages/ScheduleCampaign';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={ViewCampaigns} />
          <Route path="/campaigns/create" component={CreateCampaign} />
          <Route path="/campaigns/:title/preview" component={PreviewCampaign} />
          <Route path="/campaigns/:title/schedule" component={ScheduleCampaign} />
          <Route path="/campaigns/:title" component={EditCampaign} />
        </Switch>
      </Router>
    );
  }
}

export default App;
