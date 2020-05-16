import React from 'react';
import Messages from './Messages';
import AnimateLoad from './AnimateLoad';

class Page extends React.Component{

  render(){

    const message = this.props.location.state ? this.props.location.state.message : null;

    return(
      <div className={'page'}>
        {
          message && message.type === 'success' ?
          (
            <AnimateLoad>
              <Messages message={message} className={'success'}/>
            </AnimateLoad>
          ) : ''
        }
        {
          message && message.type === 'alert' ?
          (
            <AnimateLoad>
              <Messages message={message} className={'alert'}/>
            </AnimateLoad>
          ) : ''
        }
        {this.props.children}
      </div>
    );
  }
}

export default Page;