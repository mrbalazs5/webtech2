import React from 'react';
import './AdminAddButton.scss';
import {NavLink} from 'react-router-dom';
import SVG from '../SVG';

export default function AdminAddButton(props) {
  return(
    <div className={'admin-add-btn'} onClick={props.popup ? props.popup : () => {}}>
      <NavLink className={'admin-add-link'} exact to={props.link ? props.link : '#'}>
        <SVG name={'ADD_PLUS_ICON'} className={'admin-add-icon'}/>
        {props.text}
      </NavLink>
    </div>
  );
}