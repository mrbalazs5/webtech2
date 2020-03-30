import React from 'react';
import './forms.scss';
import {NavLink} from 'react-router-dom';

class Register extends React.Component{
  render(){
    return(
      <div className="form-bg">
        <div className="skewed-bg"/>
        <div className="form-holder">
          <form className="loginregister-form register" method="POST">
            <div className="form-title-text">Sign up</div>
            <div className="input-area register left">
              <label for="name">Name</label>
              <input type="text" id="name" name="name" placeholder="Your full name.."/>
            </div>
            <div className="input-area register right">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Your email address.."/>
            </div>
            <div className="input-area register left">
              <label for="password1">Password</label>
              <input type="password" id="password1" name="password1" placeholder="Your password.."/>
            </div>
            <div className="input-area register right">
              <label for="password2">Password re-enter</label>
              <input type="password" id="password2" name="password2" placeholder="Re-enter your password.."/>
            </div>
            <button className="register" type="submit">Sign up</button>
            <div className="link">
              Already have an account?
              <NavLink className="nav-link" exact to="/login"> Click here</NavLink>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
