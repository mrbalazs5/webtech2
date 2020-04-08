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

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

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
      <form onSubmit={this.handleSubmit}>

        Sign In

        {this.validator.message('email', this.state.email, 'required|email')}
        <label htmlFor={'email'}>Email</label>
        <input
          type={'email'}
          id={'email'}
          value={this.state.email}
          onChange={this.handleChange}
          autoComplete={'on'}
          placeholder={'Your email address..'}
        />

        {this.validator.message('password', this.state.password, 'required|min:6')}

        <label htmlFor={'password'}>Password</label>
        <input
          type={'password'}
          id={'password'}
          value={this.state.password}
          onChange={this.handleChange}
          autoComplete={'off'}
          placeholder={'Your password..'}
        />

        <button type={'submit'}>Sign In</button>

        Don't have an account yet?
        <NavLink exact to={'/signup'}>Click here!</NavLink>

      </form>
    );
  }
}

export default SignInForm;
