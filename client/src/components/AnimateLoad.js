import React from 'react';
import classNames from 'classnames';
import './AnimateLoad.scss';

class AnimateLoad extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      didMount: false
    }
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({
        didMount: true
      });
    }, 20);
  }

  render(){
    const {didMount} = this.state;

    return(
      <div className={classNames('fade-in', didMount && 'visible')}>
        {this.props.children}
      </div>
    );
  }
}

export default AnimateLoad;