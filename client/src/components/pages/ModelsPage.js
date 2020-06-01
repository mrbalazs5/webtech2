import React from 'react';
import Page from '../Page';
import './ModelsPage.scss';
import ModelsTable from '../ModelsTable';
import AdminPage from '../admin/AdminPage';
import AdminTitle from '../admin/AdminTitle';

class ModelsPage extends React.PureComponent{
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
        <AdminPage>

            <AdminTitle text={'Models list'} />
          
          <ModelsTable models={this.state.models}/>
        </AdminPage>
      </Page>
    );
  }
}

export default ModelsPage;