import React from 'react';
import './DealerTitle.scss';

export default function DealerTitle(props){
  return (
    <div className={'dealer-title'}>
      <div className={'dealer-text'}>{props.text}</div>
      {props.children}
    </div>
  );
}