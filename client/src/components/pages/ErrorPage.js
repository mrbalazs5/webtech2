import React from 'react';
import Page from '../Page';

class ErrorPage extends React.Component{
  render(){
    return(
      <Page location={this.props.location}>
        errorpage
      </Page>
    );
  }
}

export default ErrorPage;