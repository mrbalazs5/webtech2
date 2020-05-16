import React from 'react';
import Page from '../Page';

class MyProfilePage extends React.Component{
  render(){
    return(
      <Page location={this.props.location}>
        MyProfilePage
      </Page>
    );
  }
}

export default MyProfilePage;