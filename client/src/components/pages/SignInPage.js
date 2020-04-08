import React from 'react';
import '../Forms.scss';
import Page from '../Page';
import SignInForm from '../SignInForm';

class SignInPage extends React.Component{
  render(){
    return(
      <Page>
        <SignInForm history={this.props.history}/>
      </Page>
    );
  }
}

export default SignInPage;
