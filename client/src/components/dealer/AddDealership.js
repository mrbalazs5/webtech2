import React from 'react';
import '../Forms.scss';
import SimpleReactValidator from 'simple-react-validator';

class AddDealership extends React.Component{
  constructor(props){
    super(props);

    this.state={
      name: '',
      address: {
        country: '',
        city: '',
        street: ''
      }
    };

    this.validator = new SimpleReactValidator();

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(e){
    let name = e.target.name;
    let value = e.target.value;

    this.setState({
      name: value
    });
  }

  handleAddressChange(e){
    let name = e.target.name;
    let value = e.target.value;

    let address = Object.assign({}, this.state.address);
    address[name] = value;

    this.setState({
      address: address
    });
  }

  handleSubmit(e){
    e.preventDefault();

    if(this.validator.allValid()) {
      let formData = new FormData();
      formData.append('name', this.state.name);
      formData.append('address', this.state.address);

      fetch('/api/create-dealership', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        if(response.type === 'success'){
          this.props.history.push({
            pathname: '/dealer/create-dealership',
            state: {message: response}
          });
        }else if(response.type === 'alert'){
          this.props.history.push({
            pathname: '/dealer/create-dealership',
            state: {message: response}
          });
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
      <form className={'form twocol withbg'} onSubmit={this.handleSubmit}>

        <div className={'form-item twosize bottomborder'}>
          Add Dealership
        </div>

        <div className={'form-item onesize fullborder'}>

          <div className={'validator'}>
            <div className={'validator-text'}>
              {this.validator.message('name', this.state.name, 'required')}
            </div>
          </div>

          <label className={'form-label'} htmlFor={'name'}>Name</label>
          <input
            type={'text'}
            id={'name'}
            name={'name'}
            value={this.state.name}
            onChange={this.handleNameChange}
            placeholder={'Name..'}
            className={'form-input'}
          />
        </div>

        <div className={'form-item onesize fullborder'}>

          <div className={'validator'}>
            <div className={'validator-text'}>
              {this.validator.message('country', this.state.address.country, 'required')}
            </div>
          </div>

          <label className={'form-label'} htmlFor={'email'}>Country</label>
          <input
            type={'text'}
            id={'country'}
            name={'country'}
            value={this.state.address.country}
            onChange={this.handleAddressChange}
            placeholder={'Address..'}
            className={'form-input'}
          />
        </div>

        <div className={'form-item onesize fullborder'}>

          <div className={'validator'}>
            <div className={'validator-text'}>
              {this.validator.message('city', this.state.address.city, 'required')}
            </div>
          </div>

          <label className={'form-label'} htmlFor={'email'}>City</label>
          <input
            type={'text'}
            id={'city'}
            name={'city'}
            value={this.state.address.city}
            onChange={this.handleAddressChange}
            placeholder={'City..'}
            className={'form-input'}
          />
        </div>

        <div className={'form-item onesize fullborder'}>

          <div className={'validator'}>
            <div className={'validator-text'}>
              {this.validator.message('street', this.state.address.street, 'required')}
            </div>
          </div>

          <label className={'form-label'} htmlFor={'email'}>Street</label>
          <input
            type={'text'}
            id={'street'}
            name={'street'}
            value={this.state.address.street}
            onChange={this.handleAddressChange}
            placeholder={'Street..'}
            className={'form-input'}
          />
        </div>

        <div className={'form-item twosize'}>
          <button className={'submit-button centered'} type={'submit'}>Create</button>
        </div>

      </form>
    );
  }
}

export default AddDealership;
