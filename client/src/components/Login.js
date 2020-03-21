import React from 'react';
import './login.scss';
import Icons from './Icons';

export default class Login extends React.Component{
  state = {
    isPopup: false
  }

  handlePopup = () => {
      this.setState({isPopup: !this.state.isPopup})
  }

  render(){
    return(
      <div className="login">
        <Icons name="user"/>
      </div>
    );
  }
}
