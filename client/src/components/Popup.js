import React from 'react';
import './Popup.scss';
import AnimateLoad from './AnimateLoad';

class Popup extends React.Component {
  render(){
    return(
      <AnimateLoad>
        <div className={'popup'}>
          <div className={'popup-bg'}/>

          <div className={'popup-content'}>
            {this.props.children}
          </div>

        </div>
      </AnimateLoad>
    );
  }
}

export default Popup;