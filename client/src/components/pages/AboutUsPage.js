import React from 'react';
import Page from '../Page';
import '../Tables.scss';

class AboutUsPage extends React.Component{
  render(){
    return(
      <Page>
        <div className={'table'}>
          <div className={'row'}>
            <div className={'cell'}><div className={'item'}>Seat</div></div>
            <div className={'cell'}><div className={'item'}>Leon</div></div>
            <div className={'cell'}>
              <div className={'cell-row'}>
                <div className={'item'}>item 1</div>
                <div className={'item'}>item 1</div>
                <div className={'item'}>item 1</div>
                <div className={'item'}>
                  <div className={'cell-cell-row'}>
                    <div className={'item'}>item 1</div>
                    <div className={'item'} >item 1</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

export default AboutUsPage;