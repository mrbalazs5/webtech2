import React from 'react';
import Page from '../Page';

class SettingsPage extends React.Component{
  render(){
    return(
      <Page location={this.props.location}>
        SettingsPage
      </Page>
    );
  }
}

export default SettingsPage;