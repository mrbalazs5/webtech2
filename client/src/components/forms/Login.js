import React from 'react';
import './forms.scss';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  onEmailChange(e){
    this.setState({email: e.target.value})
  }

  render(){
    return(
      <div className="bg-forms">
        <form method="POST">
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="Your email" onChange={this.onEmailChange.bind(this)}/>
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" placeholder="Your password"/>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
