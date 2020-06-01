import React from 'react';
import './AdminTitle.scss';

export default function AdminTitle(props){
    return (
        <div className={'admin-title'}>
            <div className={'admin-text'}>{props.text}</div>
            {props.children}
        </div>
    );
}