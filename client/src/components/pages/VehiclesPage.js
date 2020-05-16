import React from 'react';
import Page from '../Page';

class VehiclesPage extends React.Component{
  render(){
    return(
      <Page location={this.props.location}>
        VehiclesPage
      </Page>
    );
  }
}

export default VehiclesPage;