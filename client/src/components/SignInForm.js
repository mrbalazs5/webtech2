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
        if(response.type === 'success'){
          this.props.history.push('/my-profile');
          window.location.reload();
        }else{
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }else{
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render(){
    return(
      <form className={'form onecol'} onSubmit={this.handleSubmit}>

        <div className={'form-item onesize bottomborder'}>
          Sign In
        </div>

        <div className={'validator'}>
          {this.validator.message('email', this.state.email, 'required|email')}
        </div>

        <div className={'form-item onesize fullborder'}>
          <label className={'form-label'} htmlFor={'email'}>Email</label>
          <input
            type={'email'}
            id={'email'}
            value={this.state.email}
            onChange={this.handleChange}
            autoComplete={'on'}
            placeholder={'Your email address..'}
            className={'form-input'}
          />
        </div>

        <div className={'validator'}>
          {this.validator.message('password', this.state.password, 'required|min:6')}
        </div>
        
        <div className={'form-item onesize fullborder'}>
          <label className={'form-label'} htmlFor={'password'}>Password</label>
          <input
            type={'password'}
            id={'password'}
            value={this.state.password}
            onChange={this.handleChange}
            autoComplete={'off'}
            placeholder={'Your password..'}
            className={'form-input'}
          />
        </div>

        <div className={'form-item onesize'}>
          <button className={'submit-button'} type={'submit'}>Sign In</button>
        </div>
        
        <div className={'form-item onesize'}>
          <div className={'href-text'}>
            Don't have an account yet?
            <NavLink className={'href-link'} exact to={'/sign-up'}> Click here!</NavLink>
          </div>
        </div>

      </form>
    );
  }
}

export default SignInForm;
