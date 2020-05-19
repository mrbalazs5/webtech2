import React from 'react';
import './Forms.scss';
import SimpleReactValidator from 'simple-react-validator';
import {NavLink} from 'react-router-dom';

class AddModelForm extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      name: '',
      make: ''
    }

    this.validator = new SimpleReactValidator();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
          this.props.history.push({
            pathname: '/',
            state: {message: response}
          });
          window.location.reload();
        }else if(response.type === 'alert'){
          this.props.history.push({
            pathname: '/sign-in',
            state: {message: response}
          });
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
      <form className={'form twocol'}>
        <div className={'form-item twosize bottomborder'}>
          Add model
        </div>

        <div className={'form-item onesize left fullborder'}>

          <div className={'validator'}>
            <div className={'validator-text'}>
              {this.validator.message('name', this.state.name, 'required|string')}
            </div>
          </div>

          <label className={'form-label'} htmlFor={'name'}>Name</label>
          <input
            type={'text'}
            id={'name'}
            value={this.state.name}
            onChange={this.handleChange}
            autoComplete={'on'}
            placeholder={'Model`s name..'}
            className={'form-input'}
          />
        </div>

        <div className={'form-item onesize right fullborder'}>

          <div className={'validator'}>
            <div className={'validator-text'}>
              {this.validator.message('make', this.state.make, 'required|string')}
            </div>
          </div>

          <label className={'form-label'} htmlFor={'make'}>Make</label>
          <input
            type={'text'}
            id={'make'}
            value={this.state.make}
            onChange={this.handleChange}
            autoComplete={'on'}
            placeholder={'Model`s make..'}
            className={'form-input'}
          />
        </div>

        <div className={'form-item onesize'}>
          <button className={'submit-button'} type={'submit'}>Add Model</button>
        </div>

        <div className={'form-item twosize bottomborder'}>
          Add Generation
        </div>

        <div className={'form-item onethird left fullborder'}>

          <label className={'form-label'} htmlFor={'getmodel'}>Name</label>
          <input
            type={'text'}
            id={'getmodel'}
            value={this.state.name}
            onChange={this.handleChange}
            autoComplete={'on'}
            placeholder={'Generation`s name..'}
            className={'form-input'}
          />
        </div>

        <div className={'form-item onethird left fullborder'}>

          <label className={'form-label'} htmlFor={'getmodel'}>Year begin</label>
          <input
            type={'text'}
            id={'getmodel'}
            value={this.state.name}
            onChange={this.handleChange}
            autoComplete={'on'}
            placeholder={'Generation`s year begin..'}
            className={'form-input'}
          />
        </div>

        <div className={'form-item onethird left fullborder'}>

          <label className={'form-label'} htmlFor={'getmodel'}>Year end</label>
          <input
            type={'text'}
            id={'getmodel'}
            value={this.state.name}
            onChange={this.handleChange}
            autoComplete={'on'}
            placeholder={'Generation`s year end..'}
            className={'form-input'}
          />
        </div>

        <div className={'form-item onesize'}>
          <button className={'submit-button'} type={'submit'}>Add Generation</button>
        </div>

        <div className={'form-item twosize bottomborder'}>
          Add Series
        </div>

        <div className={'form-item onethird left fullborder'}>

          <label className={'form-label'} htmlFor={'getmodel'}>Name</label>
          <input
            type={'text'}
            id={'getmodel'}
            value={this.state.name}
            onChange={this.handleChange}
            autoComplete={'on'}
            placeholder={'Generation`s name..'}
            className={'form-input'}
          />
        </div>

        <div className={'form-item onethird left fullborder'}>

          <label className={'form-label'} htmlFor={'getmodel'}>Year begin</label>
          <input
            type={'text'}
            id={'getmodel'}
            value={this.state.name}
            onChange={this.handleChange}
            autoComplete={'on'}
            placeholder={'Generation`s year begin..'}
            className={'form-input'}
          />
        </div>

        <div className={'form-item onethird left fullborder'}>

          <label className={'form-label'} htmlFor={'getmodel'}>Year end</label>
          <input
            type={'text'}
            id={'getmodel'}
            value={this.state.name}
            onChange={this.handleChange}
            autoComplete={'on'}
            placeholder={'Generation`s year end..'}
            className={'form-input'}
          />
        </div>

        <div className={'form-item onethird left fullborder'}>

          <label className={'form-label'} htmlFor={'getmodel'}>Name</label>
          <input
            type={'text'}
            id={'getmodel'}
            value={this.state.name}
            onChange={this.handleChange}
            autoComplete={'on'}
            placeholder={'Generation`s name..'}
            className={'form-input'}
          />
        </div>

        <div className={'form-item onethird left fullborder'}>

          <label className={'form-label'} htmlFor={'getmodel'}>Year begin</label>
          <input
            type={'text'}
            id={'getmodel'}
            value={this.state.name}
            onChange={this.handleChange}
            autoComplete={'on'}
            placeholder={'Generation`s year begin..'}
            className={'form-input'}
          />
        </div>

        <div className={'form-item onethird left fullborder'}>

          <label className={'form-label'} htmlFor={'getmodel'}>Year end</label>
          <input
            type={'text'}
            id={'getmodel'}
            value={this.state.name}
            onChange={this.handleChange}
            autoComplete={'on'}
            placeholder={'Generation`s year end..'}
            className={'form-input'}
          />
        </div>

        <div className={'form-item onesize'}>
          <button className={'submit-button'} type={'submit'}>Add Series</button>
        </div>

      </form>
    );
  }
}

export default AddModelForm;
