import React from 'react';
import Page from '../Page';
import './ModelsPage.scss';

class ModelsPage extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      
    };
  }

  render(){
    return(
      <Page>
        <div className={'models'}>
          <div className={'models-title'}>
            Models lists
          </div>
        </div>
      </Page>
    );
  }
}

export default ModelsPage;