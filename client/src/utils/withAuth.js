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
                            const error = new Error(res.error);
                            throw error;
                        }
                    })
                    .then(res => {
                        if(!res.user || (role && res.user.role !== roles[role])){
                            throw new Error('Invalid user');
                        }

                        this.setState({ loading: false });
                    })
                    .catch(err => {
                        this.setState({ loading: false, redirect: true });
                    });
            }

            render() {
                const { loading, redirect } = this.state;
                if (loading) {
                    return null;
                }
                if (redirect) {
                    return <Redirect to={{

                        pathname : '/api/sign-in',

                        pathname : '/signin',

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
