import React from 'react';
import Page from '../Page';
import Forms from '../Forms';
import SignUpForm from '../SignUpForm';

class SignUnPage extends React.Component{
  render(){
    return(
      <Page location={this.props.location}>
        <Forms>
          <SignUpForm history={this.props.history}/>
        </Forms>
      </Page>
    );
  }
}

export default SignUnPage;