import React from 'react';
import Popup from '../Popup';
import '../Forms.scss';
import SimpleReactValidator from 'simple-react-validator';

class AddMakePopup extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      name: '',
      messages: ''
    }

    this.validator = new SimpleReactValidator();
    this.handleChange = this.handleChange.bind(this);
    this.clearMessages = this.clearMessages.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  clearMessages(){
    this.setState({
      messages: ''
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.clearMessages();

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
          this.setState({
            messages: response
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

        {this.state.messages &&
          this.state.messages.messages.map((message, id) => {
            return(
              <div key={id} onClick={this.clearMessages} className={'form-message'}>
                {message}
              </div>
            );
          })
        }

        <form id={'add-make-form'} className={'form onecol'} onSubmit={this.handleSubmit}>

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
            <button className={'submit-button'} type={'submit'} onClick={this.props.updateMakes()}>Add Make</button>
          </div>

        </form>
      </Popup>
    );
  }
}

export default AddMakePopup;