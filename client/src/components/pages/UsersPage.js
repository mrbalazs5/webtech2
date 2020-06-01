import React from 'react';
import Page from '../Page';
import UsersTable from '../UsersTable';
import AdminPage from '../admin/AdminPage';
import AdminTitle from '../admin/AdminTitle';

class UsersPage extends React.PureComponent{
  constructor(props){
      super(props);

      this.state = {
          users: []
      };
  }

    componentDidMount(){
        fetch('/api/get-users')
            .then((response) => {
                return response.json();
            })
            .then((users) => {
                this.setState({
                    users: users
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

              <AdminTitle text={'Users list'} />

              <UsersTable users={this.state.users}/>
          </AdminPage>
      </Page>
    );
  }
}

export default UsersPage;