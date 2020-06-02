import React from 'react';
import Page from '../Page';
import MakesTable from '../MakesTable';
import AdminPage from '../admin/AdminPage';
import AdminTitle from '../admin/AdminTitle';
import AddMakePopup from '../admin/AddMakePopup';

class MakesPage extends React.PureComponent{
  constructor(props){
    super(props);

    this.state = {
      addMakePopup: false,
      makes: []
    };

    this.fetchMakes = this.fetchMakes.bind(this);
    this.handleAddMakePopup = this.handleAddMakePopup.bind(this);
  }

  componentDidMount(){
    this.fetchMakes();
  }

  fetchMakes(){
    fetch('/api/get-makes')
    .then((response) => {
      if(response.status === 200){
        return response.json();
      }
    })
    .then((makes) => {
      this.setState({
        makes: makes
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  handleAddMakePopup() {
    this.setState({
      addMakePopup: !this.state.addMakePopup
    });
  }

  render(){
    return(
      <Page location={this.props.location}>
        <AdminPage>

          <AdminTitle text={'Makes list'} />
          
          {this.state.addMakePopup ? 
            <AddMakePopup onClose={this.handleAddMakePopup} updateMakes={this.fetchMakes}/>
          : ''}

          <MakesTable makes={this.state.makes} showPopup={this.handleAddMakePopup}/>
        </AdminPage>
      </Page>
    );
  }
}

export default MakesPage;