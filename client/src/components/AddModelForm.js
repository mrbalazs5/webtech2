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
  }

  componentDidMount(){
    fetch('/api/get-makes')
    .then((response) => {
      console.log(typeof response);
      if(response.status === 200){
        return response.json();
      }
      console.log(typeof response);
    })
    .then((makes) => {
      console.log(typeof makes);
      this.setState({
        makes: makes
      });
    })
    .catch((error) => {
      console.log(error);
    })
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
          {!this.state.makes ? '' : (
            <div>
              {Object.keys(this.state.makes).map((make, id) => {
                return(
                  <div key={id}>
                    {this.state.makes[make].name}
                  </div>
                );
              })}
            </div>
          )}
        </div>
          {
            this.state.makes.map(make => (
                <div key={make._id}>{make.name}</div>
            ))
          }
      </form>
    );
  }
}

export default AddModelForm;
