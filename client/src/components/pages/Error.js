import React from 'react';
import './error.scss';
import error404 from '../../images/error404.jpg';
import {Link} from 'react-router-dom';

export default class Error extends React.Component{
  render(){
    return(
      <div className="error">
        <img className="error-img" src={error404}/>

        <div className="error-text">
          Hete oldallátogató, szeretnéd ezt az oldalt megtekinteni igaz hete?<br/> Hát neked ezt nem lehet mivel az oldal nem létezik!
        </div>

        <Link className="back-text" exact to="/">Back to homepage</Link>
      </div>
    );
  }
}
