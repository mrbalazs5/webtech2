import React from 'react';
import Page from '../Page';
import './ModelsPage.scss';
import ModelsTable from '../ModelsTable';

class ModelsPage extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      models: []
    };
  }

  componentDidMount(){
    fetch('/api/get-models')
    .then((response) => {
      return response.json();
    })
    .then((models) => {
      console.log(models);
      this.setState({
        models: models
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render(){
    return(
      <Page location={this.props.location}>
        <div className={'models'}>
          <div className={'models-title'}>Models list</div>
          <ModelsTable models={this.state.models}/>
        </div>
      </Page>
    );
  }
}

export default ModelsPage;