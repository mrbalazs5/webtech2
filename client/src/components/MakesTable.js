import React from 'react';
import './tables.scss';
import AdminAddButton from './admin/AdminAddButton';

class MakesTable extends React.PureComponent{
  constructor(props){
    super(props);
  }

  render(){
    return(
        <div className={'table-wrapper'}>
            <AdminAddButton text={'Add make'} popup={this.props.showPopup}/>
            <div className={'table'}>
                <div className={'row'}>
                    <div className={'cell left'}><div className={'item left'}>Name</div></div>
                    <div className={'cell center'}>
                        <div className={'cell-row'}><div className={'item left'}>Models</div></div>
                    </div>
                </div>
                {
                    this.props.makes.map((make, id) => {
                        return(
                            <div key={id} className={'row'}>
                                <div className={'cell left'}><div className={'item left'}>{make.name}</div></div>
                                <div className={'cell left'}>
                                    {
                                        make.models.map((model, id) => (
                                            <div key={id} className={'cell-row'}>
                                                <div className={'item left'}>{model.name}</div>
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
  
export default MakesTable;