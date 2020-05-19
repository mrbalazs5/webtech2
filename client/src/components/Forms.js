import React from 'react';
import './Forms.scss';
import AnimateLoad from './AnimateLoad';

class Forms extends React.Component {
  render(){
    return(
      <div className={'forms'}>

        <div className={'forms-bg'}/>

        <AnimateLoad>
          {this.props.children}
        </AnimateLoad>
      </div>
    );
  }
}

export default Forms;