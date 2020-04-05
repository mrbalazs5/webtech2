import React from 'react';
import '../Forms.scss';
import Page from '../Page';
import SignInForm from '../SignInForm';

class SignInPage extends React.Component{
  render(){
    return(
      <Page>
        <div className={'forms'}>
          <div className={'forms-bg-skewed'}/>

          <div className={'forms-holder'}>

            <SignInForm/>
            
          </div>
        </div>
      </Page>
    );
  }
}

export default SignInPage;
