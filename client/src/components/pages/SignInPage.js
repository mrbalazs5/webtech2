import React from 'react';
import Page from '../Page';
import Forms from '../Forms';
import SignInForm from '../SignInForm';

class SignInPage extends React.Component{
  render(){
    return(
      <Page location={this.props.location}>
        <Forms>
          <SignInForm history={this.props.history}/>
        </Forms>
      </Page>
    );
  }
}

export default SignInPage;