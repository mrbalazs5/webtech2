import React from 'react';
import './forms.scss';
import {NavLink} from 'react-router-dom';

class Login extends React.Component{
  render(){
    return(
      <div className="forms">

        <div className="forms-bg-skewed"/>
        <div className="forms-holder">
          <form className="one_col" method="post">

            <div className="form-field-holder fullwidth">
              <div className="form-field-border title">
                <div className="form-title">
                  Sign in
                </div>
              </div>
            </div>

            <div className="form-field-holder fullwidth">
              <div className="form-field-border field">
                <label className="form-label" for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your email address.."/
                >
              </div>
            </div>

            <div className="form-field-holder fullwidth">
              <div className="form-field-border field">
                <label className="form-label" for="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Your password.."/
                >
              </div>
            </div>

            <div className="form-field-holder fullwidth">
              <button className="signin" type="submit">
                Sign in
              </button>
            </div>

            <div className="form-field-holder fullwidth text">
              Don't have an account
              <NavLink className="navlink" exact to="/register"> Click here!
              </NavLink>
            </div>

          </form>
        </div>
      </div>
    );
  }
}

export default Login;
