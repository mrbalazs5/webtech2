import React from 'react';
import './forms.scss';
import {NavLink} from 'react-router-dom';

class Login extends React.Component{
  render(){
    return(
      <div className="form-bg">
        <div className="skewed-bg"/>
        <div className="form-holder">
          <form className="loginregister-form login" method="POST">
            <div className="form-title-text">Sign in</div>
            <div className="input-area login">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Your email address.."/>
            </div>
            <div className="input-area login">
              <label for="password">Password</label>
              <input type="password" id="password" name="password" placeholder="Your password.."/>
            </div>
            <button className="login" type="submit">Sign in</button>
            <div className="link">
              Dont have an account?
              <NavLink className="nav-link" exact to="/register"> Click here</NavLink>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
