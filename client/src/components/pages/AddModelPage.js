import React from 'react';
import Page from '../Page';
import Forms from '../Forms';
import AddModelForm from '../AddModelForm';

class AddModelPage extends React.Component{
  render(){
    return(
      <Page location={this.props.location}>
        <Forms>
          <AddModelForm history={this.props.history}/>
        </Forms>
      </Page>
    );
  }
}

export default AddModelPage;