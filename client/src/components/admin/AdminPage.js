import React from 'react';
import './AdminPage.scss';

export default function AdminPage(props) {
    return (
        <div className={'admin-page'}>
            {
                props.children
            }
        </div>
    );
}