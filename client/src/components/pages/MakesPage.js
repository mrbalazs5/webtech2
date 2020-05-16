import React from 'react';
import Page from '../Page';

class MakesPage extends React.Component{
  render(){
    return(
      <Page location={this.props.location}>
        MakesPage
      </Page>
    );
  }
}

export default MakesPage;