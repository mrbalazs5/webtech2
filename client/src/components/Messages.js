import React from 'react';
import classNames from 'classnames';
import './Messages.scss';

class Messages extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      isShow: true
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.setState({
      isShow: false
    });
  }

  componentDidMount(){
    window.scrollTo(0, 0);
    setTimeout(() => {
      this.setState({
        isShow: false
      })
    }, 3000);
  }

  render(){
    if(this.props.message === null){
      return null;
    }

    const {messages} = this.props.message;

    return(
      <div className={classNames('messages', this.state.isShow ? 'show' : 'hide')} onClick={this.handleClick}>
        {
          messages.map((message, index) => {
            return(
              <div key={index} className={this.props.className}>
                {message}
                {console.log(message)}
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default Messages;