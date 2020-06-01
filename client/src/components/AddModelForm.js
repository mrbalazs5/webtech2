import React from 'react';
import './Forms.scss';
import SVG from './SVG';

class AddModelForm extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      name: '',
      makes: []
    };

    this.handleMakeChange = this.handleMakeChange.bind(this);
  }

  componentDidMount(){
    fetch('/api/get-makes')
    .then((response) => {
      if(response.status === 200){
        return response.json();
      }
      console.log(typeof response);
    })
    .then((makes) => {
      makes.forEach((make) => {
        make['active'] = false;
      });

      this.setState({
        makes: makes
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  handleMakeChange(index){

  }

  render(){
    return(
      <form className={'form twocol'}>

        <div className={'form-item twosize bottomborder'}>
          Add model
        </div>

        <div className={'form-item onesize fullborder'}>
          <label className={'form-label'} htmlFor={'name'}>Name</label>
          <input
            type={'text'}
            id={'name'}
            value={this.state.name}
            onChange={this.handleChange}
            autoComplete={'off'}
            placeholder={'Model`s name..'}
            className={'form-input'}
          />
        </div>

        <div className={'form-item onesize fullborder'}>
          <label className={'form-label'}>Make
            <div className={'label-icon'}>
              <SVG name={'ADD_PLUS_ICON'} className={'label-svg'}/>
            </div>
          </label>
          <select className={'form-select'}>
            {this.state.makes.map((make, id) => {
              return(
                <option key={id}>{make.name}</option>
              );
            })}
          </select>
          
        </div>
      </form>
    );
  }
}

export default AddModelForm;
