import React from 'react';
import './tables.scss';
import AdminAddButton from './admin/AdminAddButton';
import roles from '../utils/roles';

class UsersTable extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className={'table-wrapper'}>
                <AdminAddButton text={'Add user'} />
                <div className={'table'}>
                    <div className={'row'}>
                        <div className={'cell left'}><div className={'item left'}>Email</div></div>
                        <div className={'cell left'}><div className={'item left'}>Name</div></div>
                        <div className={'cell left'}><div className={'item left'}>Role</div></div>
                        <div className={'cell left'}><div className={'item left'}>Dealerships</div></div>
                    </div>
                    {
                        this.props.users.map((user, id) => {
                            return(
                                <div key={id} className={'row'}>
                                    <div className={'cell left'}><div className={'item left email'}>{user.email}</div></div>
                                    <div className={'cell left'}><div className={'item left'}>{user.name}</div></div>
                                    <div className={'cell left'}>
                                        <div className={'item left'}>
                                            {Object.keys(roles).find(key => roles[key] === user.role)}
                                        </div>
                                    </div>
                                    <div className={'cell left'}>
                                        {
                                            user.dealerships.map((dealership, id) => (
                                                <div key={id} className={'cell-row'}>
                                                    <div className={'item left'}>{dealership.name}</div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }

}

export default UsersTable;