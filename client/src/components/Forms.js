import React from 'react';
import './Forms.scss';

class Forms extends React.Component {
  render(){
    return(
      <div className={'forms'}>

        <div className={'forms-bg'}/>

        <div className={'forms-content'}>
          {this.props.children}
        </div>

      </div>
    );
  }
}

export default Forms;