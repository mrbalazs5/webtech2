import React from 'react';
import '../Forms.scss';
import Page from '../Page';
import SignUpForm from '../SignUpForm';

class SignUpPage extends React.Component{
  render(){
    return(
      <Page>
        <div className={'forms'}>
          <div className={'forms-bg-skewed'}/>

          <div className={'forms-holder'}>

            <SignUpForm history={this.props.history}/>

          </div>
        </div>
      </Page>
    );
  }
}

export default SignUpPage;
