import React from 'react';
import './Forms.scss';

class AddModelForm extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      makes: []
    };
  }

  componentDidMount(){
    fetch('/api/get-makes')
    .then((response) => {
      if(response.status === 200){
        return response.json();
      }
    })
    .then((makes) => {
      console.log(makes);
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
