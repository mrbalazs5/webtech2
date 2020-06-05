import React from 'react';
import './DealerPage.scss';

export default function DealerPage(props) {
  return (
    <div className={'dealer-page'}>
      {
        props.children
      }
    </div>
  );
}