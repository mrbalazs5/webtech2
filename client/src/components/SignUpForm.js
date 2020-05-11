import React from 'react';
import './Forms.scss';
import SimpleReactValidator from 'simple-react-validator';
import {NavLink} from 'react-router-dom';
import defaultAvatar from '../images/defaultAvatar.png';
import CropImage from './CropImage';

class SignUpForm extends React.Component{
  constructor(props){
    super(props);

    this.state={
      name: '',
      email: '',
      password: '',
      passwordVerify: '',
      avatar: null,
      avatarSrc: null,
      cropping: false
    };

    this.validator = new SimpleReactValidator({
      validators: {
        passwordMatch: {
          message: 'Password does not match!',
          rule: (val, param, validator) => {
            return val === this.state.password;
          }
        }
      }
    });

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setCropping = this.setCropping.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  setCropping = () => {
    this.setState({
      cropping: !this.state.cropping
    });
  }

  onSaveImage = (file, croppedImageUrl) => {

    fetch(croppedImageUrl).then(r => {
      return r.blob();
    })
    .then((blob) => {
      const croppedImage = new File([blob], file.name, {type: file.type, lastModified: file.lastModified});

      this.setState({
        cropping: false,
        avatarSrc: croppedImageUrl,
        avatar: croppedImage
      });
    });
  }

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
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        if(response.type === 'success'){
          this.props.history.push('/sign-in');
        }else{
          console.log(response);
        }
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
      <form className={'form twocol'} onSubmit={this.handleSubmit}>

        <div className={'form-item twosize bottomborder'}>
          Sign Up
        </div>

        <div className={'validator'}>
          {this.validator.message('name', this.state.name, 'required|string')}
        </div>

        <div className={'form-item onesize left fullborder'}>
          <label className={'form-label'} htmlFor={'name'}>Name</label>
          <input
            type={'text'}
            id={'name'}
            value={this.state.name}
            onChange={this.handleChange}
            autoComplete={'on'}
            placeholder={'Your full name..'}
            className={'form-input'}
          />
        </div>
        
        <div className={'validator'}>
          {this.validator.message('email', this.state.email, 'required|email')}
        </div>

        <div className={'form-item onesize right fullborder'}>
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

        <div className={'form-item onesize left fullborder'}>
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

        <div className={'validator'}>
          {this.validator.message('passwordVerify', this.state.passwordVerify, 'required|min:6|passwordMatch')}
        </div>

        <div className={'form-item onesize right fullborder'}>
          <label className={'form-label'} htmlFor={'passwordVerify'}>Password Verify</label>
          <input
            type={'password'}
            id={'passwordVerify'}
            value={this.state.passwordVerify}
            onChange={this.handleChange}
            autoComplete={'off'}
            placeholder={'Verify Your password.. '}
            className={'form-input'}
          />
        </div>

        <div className={'validator'}>
          {this.validator.message('avatarSet', this.state.avatarSrc, 'avatarSet')}
        </div>

        <div className={'form-item onesize left fullborder'}>
          <img id={'avatarSet'} onClick={this.setCropping} className={'avatar-preview'} src={this.state.avatarSrc ? this.state.avatarSrc : defaultAvatar} alt={'Avatar preview'}/>
          <label className={'form-label'}>Avatar</label>
        </div>

        {this.state.cropping && (
          <CropImage onCancel={this.setCropping} onSave={this.onSaveImage}/>
        )}

        <div className={'form-item onesize'}>
          <button className={'submit-button'} type={'submit'}>Sign Up</button>
        </div>

        <div className={'form-item onesize'}>
          <div className={'href-text'}>
            Already have an account?
            <NavLink className={'href-link'} exact to={'/sign-in'}> Click here!</NavLink>
          </div>
        </div>

      </form>
    );
  }
}

export default SignUpForm;
