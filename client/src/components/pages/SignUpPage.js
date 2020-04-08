import React from 'react';
import '../Forms.scss';
import Page from '../Page';
import SignUpForm from '../SignUpForm';

class SignUpPage extends React.Component{
  render(){
    return(
      <Page>
        <SignUpForm history={this.props.history}/>
      </Page>
    );
  }
}

export default SignUpPage;
