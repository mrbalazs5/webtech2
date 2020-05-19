import React from 'react';
import './Popup.scss';
import AnimateLoad from './AnimateLoad';
import SVG from './SVG';

class Popup extends React.Component {
  render(){
    return(
      <AnimateLoad>
        <div className={'popup'}>
          <div className={'popup-bg'}/>

          <div className={'popup-content'}>

            <div className={'popup-close'} onClick={() => (this.props.onClose())}>
              <SVG name={'CLOSE_ICON'} className={'popup-close-icon'}></SVG>
            </div>

            {this.props.children}
          </div>

        </div>
      </AnimateLoad>
    );
  }
}

export default Popup;