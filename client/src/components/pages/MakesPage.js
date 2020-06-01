import React from 'react';
import Page from '../Page';
import MakesTable from '../MakesTable';
import AdminPage from '../admin/AdminPage';
import AdminTitle from '../admin/AdminTitle';

class MakesPage extends React.PureComponent{

    constructor(props){
        super(props);

        this.state = {
            makes: []
        };
    }

    componentDidMount(){
        fetch('/api/get-makes')
            .then((response) => {
                return response.json();
            })
            .then((makes) => {
                this.setState({
                    makes: makes
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

                <AdminTitle text={'Makes list'} />

                <MakesTable makes={this.state.makes}/>
            </AdminPage>
        </Page>
    );
  }
}

export default MakesPage;