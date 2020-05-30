import React from 'react';
import Page from '../Page';
import './ModelsPage.scss';
import ModelsTable from '../ModelsTable';
import SVG from '../SVG';
import {NavLink} from 'react-router-dom';

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

          <div className={'models-title'}>
            <div className={'models-text'}>Models list</div>
            <div className={'models-add'}>
              <NavLink className={'models-add-btn'} exact to={'/admin/add-model'}>
                <SVG name={'ADD_PLUS_ICON'} className={'models-add-icon'}/>
                Add model
              </NavLink>
            </div>
          </div>
          
          <ModelsTable models={this.state.models}/>
        </div>
      </Page>
    );
  }
}

export default ModelsPage;