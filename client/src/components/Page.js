import React from 'react';
import Messages from './Messages';
import AnimateLoad from './AnimateLoad';

class Page extends React.Component{
  render(){

    let message = this.props.location.state ? this.props.location.state.message : null;

    return(
      <div className={'page'}>
        {
          message && message.type === 'success' ?
          (
            <AnimateLoad>
              <Messages message={message} className={'success'} onClean={this.handleClean}/>
            </AnimateLoad>
          ) : ''
        }
        {
          message && message.type === 'alert' ?
          (
            <AnimateLoad>
              <Messages message={message} className={'alert'} onClean={this.handleClean}/>
            </AnimateLoad>
          ) : ''
        }
        {this.props.children}
      </div>
    );
  }
}

export default Page;