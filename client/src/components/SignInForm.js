import React from 'react';
import './Forms.scss';
import SimpleReactValidator from 'simple-react-validator';
import {NavLink} from 'react-router-dom';

class SignInForm extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: ''
    }

    this.validator = new SimpleReactValidator();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //set state by field value
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  //handle form submit
  handleSubmit = (e) => {
    e.preventDefault();

    if (this.validator.allValid()) {

      fetch('/api/sign-in', {
        method: 'POST',
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
        headers: {'Content-Type': 'application/json'}
      })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        this.props.history.push('/profile');
      })
      .catch((error) => {
        console.log(error);
      });

    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render(){
    return(
      <form className={'one-col'} onSubmit={this.handleSubmit}>

        <div className={'form-item fullwidth'}>
          <div className={'item-border bottom'}>
            <div className={'title'}>
              Sign In
            </div>
          </div>
        </div>

        <div className={'form-item fullwidth'}>
          <div className={'validation'}>
            {this.validator.message('email', this.state.email, 'required|email')}
          </div>
          <div className={'item-border full'}>
            <label className={'label'} htmlFor={'email'}>Email</label>
            <input
              type={'email'}
              id={'email'}
              value={this.state.email}
              onChange={this.handleChange}
              autoComplete={'on'}
              placeholder={'Your email address..'}
            />
          </div>
        </div>

        <div className={'form-item fullwidth'}>
          <div className={'validation'}>
            {this.validator.message('password', this.state.password, 'required|min:6')}
          </div>
          <div className={'item-border full'}>
            <label className={'label'} htmlFor={'password'}>Password</label>
            <input
              type={'password'}
              id={'password'}
              value={this.state.password}
              onChange={this.handleChange}
              autoComplete={'off'}
              placeholder={'Your password..'}
            />
          </div>
        </div>

        <div className={'server-message'}></div>

        <div className={'form-item fullwidth'}>
          <button type={'submit'}>Sign In</button>
        </div>

        <div className={'form-item fullwidth'}>
          Don't have an account yet?
          <NavLink exact to={'/signup'}>Click here!</NavLink>
        </div>

      </form>
    );
  }
}

export default SignInForm;
