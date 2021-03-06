import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import roles from './roles';

export default function withAuth(ComponentToProtect, role) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }

    componentDidMount() {
      fetch('/api/check-token')
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          throw new Error('Server error');
        }
      })
      .then(res => {
        if(!res.user){
          throw new Error('Invalid user');
        }

        if(role && res.user.role !== role){
            throw new Error('Invalid permissions');
        }

        this.setState({ loading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false, redirect: true });
      });
    }

    render() {
      const { loading, redirect } = this.state;
      if(loading) {
        return null;
      }
      if(redirect) {
        return <Redirect to={{
          pathname : '/sign-in',
          state : {flashMessage: {warning: ['Please sign in to access this page']}}
        }} />;
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  }
}
