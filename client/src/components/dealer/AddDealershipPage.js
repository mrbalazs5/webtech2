import React from 'react';
import Page from '../Page';
import Forms from '../Forms';
import AddDealership from './AddDealership';

class AddDealershipPage extends React.Component{
  render(){
    return(
      <Page location={this.props.location}>
        <Forms>
          <AddDealership history={this.props.history}/>
        </Forms>
      </Page>
    );
  }
}

export default AddDealershipPage;