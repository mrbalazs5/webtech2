import React from 'react';
import Page from '../Page';

class UsersPage extends React.Component{
  render(){
    return(
      <Page location={this.props.location}>
        UsersPage
      </Page>
    );
  }
}

export default UsersPage;