import React from 'react';
import Page from '../Page';

class MyVehiclesPage extends React.Component{
  render(){
    return(
      <Page location={this.props.location}>
        MyVehiclesPage
      </Page>
    );
  }
}

export default MyVehiclesPage;