import React from 'react';
import './Forms.scss';
import SimpleReactValidator from 'simple-react-validator';
import {NavLink} from 'react-router-dom';
import defaultAvatar from '../images/defaultAvatar.png';
import {imageMimeTypes} from '../utils/imageMimeTypes';

class SignUpForm extends React.Component{
  constructor(props){
    super(props);

    this.state={
      name: '',
      email: '',
      password: '',
      passwordVerify: '',
      avatar: '',
      avatarSrc: ''
    };

    this.validator = new SimpleReactValidator({
    //custom validators for password match and image mime type
      validators: {
        passwordMatch: {
          message: 'Password does not match!',
          rule: (val, param, validator) => {
            return val === this.state.password;
          }
        },
        imageIsValid: {
          message: 'Image must be png or jpeg',
          rule: (val, param, validator) => {
            return imageMimeTypes.includes(val.type);
          }
        }
      }
    });

    this.handleChange = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //handle input changes
  //update state with the input field value by id
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  //handle image change
  //if we have file and the file type is correct then set avatarSrc state with the img src
  //set the state of avatar for file upload
  handleImageChange = (e) => {
    if(e.target.files && e.target.files[0]){
      if(imageMimeTypes.includes(e.target.files[0].type)){
        this.setState({
          avatarSrc: URL.createObjectURL(e.target.files[0])
        });
      }
      this.setState({
        avatar: e.target.files[0]
      });
    }
  }

  //handle form submit
  //prevent page reload on button click
  //check the validator errors
  handleSubmit = (e) => {
    e.preventDefault();

    if (this.validator.allValid()) {
      let formData = new FormData();
      formData.append('image', this.state.avatar);
      formData.append('name', this.state.name);
      formData.append('password', this.state.password);
      formData.append('email', this.state.email);

      fetch('/api/sign-up', {
        method: 'POST',
        body: formData
      })
      .then((result) => {
        return result.json()
      })
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        console.log(error)
      });

    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render(){
    return(
      <form className={'two-col'} onSubmit={this.handleSubmit}>

        <div className={'form-item fullwidth'}>
          <div className={'item-border bottom'}>
            <div className={'title'}>
              Sign Up
            </div>
          </div>
        </div>

        <div className={'form-item halfwidth'}>
          <div className={'validation'}>
            {this.validator.message('name', this.state.name, 'required|string')}
          </div>
          <div className={'item-border full'}>
            <label className={'label'} htmlFor={'name'}>Name</label>
            <input
              type={'text'}
              id={'name'}
              value={this.state.name}
              onChange={this.handleChange}
              autoComplete={'on'}
              placeholder={'Your full name..'}
            />
          </div>
        </div>

        <div className={'form-item halfwidth'}>
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

        <div className={'form-item halfwidth'}>
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

        <div className={'form-item halfwidth'}>
          <div className={'validation'}>
            {this.validator.message('passwordVerify', this.state.passwordVerify, 'required|min:6|passwordMatch')}
          </div>
          <div className={'item-border full'}>
            <label className={'label'} htmlFor={'passwordVerify'}>Password Verify</label>
            <input
              type={'password'}
              id={'passwordVerify'}
              value={this.state.passwordVerify}
              onChange={this.handleChange}
              autoComplete={'off'}
              placeholder={'Verify Your password.. '}
            />
          </div>
        </div>

        <div className={'form-item halfwidth'}>
          <div className={'validation'}>
            {this.validator.message('avatar', this.state.avatar, 'required|imageIsValid')}
          </div>
          <div className={'item-border full'}>
            <label className={'label'}>Avatar</label>
            <input
              type={'file'}
              id={'avatar'}
              onChange={this.handleImageChange}
            />
            <label className={'label-choose'} htmlFor={'avatar'}>Choose</label>
            <div className={'avatar'}>
              <img className={'avatar-preview'} src={this.state.avatarSrc ? this.state.avatarSrc : defaultAvatar} alt={'Avatar preview'}/>
            </div>
          </div>
        </div>

        <div className={'server-message'}></div>

        <div className={'form-item flex'}>
          <button type={'submit'}>Signup</button>
        </div>

        <div className={'form-item halfwidth'}>
          Already have an account?
          <NavLink exact to={'/signin'}>Click here!</NavLink>
        </div>

      </form>
    );
  }
}

export default SignUpForm;
