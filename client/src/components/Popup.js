import React from 'react';
import './Popup.scss';

class Popup extends React.Component {
  render(){
    return(
      <div className={'popup'}>
        <div className={'popup-bg'}/>

        <div className={'popup-content'}>
          {this.props.children}
        </div>

      </div>
    );
  }
}

export default Popup;