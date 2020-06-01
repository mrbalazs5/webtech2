import React from 'react';
import Popup from '../Popup';
import '../Forms.scss';
import SimpleReactValidator from 'simple-react-validator';

class AddMakePopup extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      name: ''
    }

    this.validator = new SimpleReactValidator();
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
      fetch('/api/create-make', {
        method: 'POST',
        body: JSON.stringify({
          name: this.state.name
        }),
        headers: {'Content-Type': 'application/json'}
      })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        if(response){
          window.location.reload();
          this.props.history.push({
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
      <Popup onClose={this.props.onClose}>

        <form className={'form onecol'} onSubmit={this.handleSubmit}>

          <div className={'form-item onesize bottomborder'}>
            Add Make
          </div>

          <div className={'form-item onesize fullborder'}>

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
              autoComplete={'off'}
              placeholder={'Make`s name..'}
              className={'form-input'}
            />
          </div>

          <div className={'form-item onesize'}>
            <button className={'submit-button'} type={'submit'}>Add Make</button>
          </div>

        </form>
      </Popup>
    );
  }
}

export default AddMakePopup;