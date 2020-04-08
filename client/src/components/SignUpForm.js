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
        console.log(result);
        this.props.history.push('/sign-in');
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
      <form onSubmit={this.handleSubmit}>

        Sign up

        {this.validator.message('name', this.state.name, 'required|string')}
        <label htmlFor={'name'}>Name</label>
        <input
          type={'text'}
          id={'name'}
          value={this.state.name}
          onChange={this.handleChange}
          autoComplete={'on'}
          placeholder={'Your full name..'}
        />


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


        {this.validator.message('passwordVerify', this.state.passwordVerify, 'required|min:6|passwordMatch')}

        <label htmlFor={'passwordVerify'}>Password Verify</label>
        <input
          type={'password'}
          id={'passwordVerify'}
          value={this.state.passwordVerify}
          onChange={this.handleChange}
          autoComplete={'off'}
          placeholder={'Verify Your password.. '}
        />

        {this.validator.message('avatar', this.state.avatar, 'required|imageIsValid')}
        <label>Avatar</label>
        <input
          type={'file'}
          id={'avatar'}
          onChange={this.handleImageChange}
        />
        <label htmlFor={'avatar'}>Choose</label>
        <img src={this.state.avatarSrc ? this.state.avatarSrc : defaultAvatar} alt={'Avatar preview'}/>

        <button type={'submit'}>Signup</button>

        Already have an account?
        <NavLink exact to={'/signin'}>Click here!</NavLink>

      </form>
    );
  }
}

export default SignUpForm;
