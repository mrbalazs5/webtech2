import React from 'react';
import './forms.scss';
import {NavLink} from 'react-router-dom';

class Register extends React.Component{
  render(){
    return(
      <div className="forms">

        <div className="forms-bg-skewed"/>
        <div className="forms-holder">
          <form className="two_col" method="post">

            <div className="form-field-holder fullwidth">
              <div className="form-field-border title">
                <div className="form-title">
                  Sign up
                </div>
              </div>
            </div>

            <div className="form-field-holder halfwidth">
              <div className="form-field-border field">
                <label className="form-label" for="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your full name.."
                />
              </div>
            </div>

            <div className="form-field-holder halfwidth">
              <div className="form-field-border field">
                <label className="form-label" for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your email address.."
                />
              </div>
            </div>

            <div className="form-field-holder halfwidth">
              <div className="form-field-border field">
                <label className="form-label" for="password1">Password</label>
                <input
                  type="password"
                  id="password1"
                  name="password1"
                  placeholder="Your password.."
                />
              </div>
            </div>

            <div className="form-field-holder halfwidth">
              <div className="form-field-border field">
                <label className="form-label" for="password2">Password re-enter</label>
                <input
                  type="password"
                  id="password2"
                  name="password2"
                  placeholder="Re-enter your password.."
                />
              </div>
            </div>

            <div className="form-field-holder fullwidth">
              <div className="form-field-border field">
                <label className="form-label">Choose your avatar</label>
                <input
                  type="file"
                  id="file"
                  name="file"
                />
              <label className="upload-label" for="file">Upload</label>
              </div>
            </div>

            <div className="form-field-holder fullwidth button">
              <button className="signup" type="submit">
                Sign up
              </button>
            </div>

            <div className="form-field-holder fullwidth text">
              Already have an account?
              <NavLink className="navlink" exact to="/login"> Click here!
              </NavLink>
            </div>

          </form>
        </div>
      </div>
    );
  }
}

export default Register;
