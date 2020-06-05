import React from 'react';
import Page from '../Page';
import DealerPage from './DealerPage';
import DealerTitle from './DealerTitle';

class MyDealershipsPage extends React.Component{
  constructor(props){
    super(props);

    this.state = {
    }
  }

  render(){
    return(
      <Page location={this.props.location}>
        <DealerPage>
          <DealerTitle text={'My dealership(s)'} />
        </DealerPage>
      </Page>
    );
  }
}

export default MyDealershipsPage;