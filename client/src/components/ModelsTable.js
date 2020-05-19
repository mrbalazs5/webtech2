import React from 'react';
import './Tables.scss';
import SpecificationPopup from './SpecificationPopup';

class ModelTable extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      activeSeria: null
    }

    this.closePopup = this.closePopup.bind(this);
  }

  closePopup(){
    this.setState({
      activeSeria: null
    });
  }

  render(){
    return(
      <div className={'table'}>
        <div className={'row'}>
          <div className={'cell left'}><div className={'item left'}>Make</div></div>
          <div className={'cell left'}><div className={'item left'}>Name</div></div>
          <div className={'cell center'}>
            <div className={'cell-row'}><div className={'item center'}>Generations</div></div>
            <div className={'cell-row'}>
              <div className={'item center'}>Name</div>
              <div className={'item center'}>Year begin</div>
              <div className={'item center'}>Year end</div>
            </div>
          </div>
          <div className={'cell center'}>
            <div className={'cell-row'}><div className={'item center'}>Series</div></div>
            <div className={'cell-row'}>
              <div className={'item center'}>Name</div>
              <div className={'item center'}>Specification</div>
            </div>
          </div>
          <div className={'cell right'}><div className={'item right'}>Operations</div></div>
        </div>
        {
          this.props.models.map((model, id) => {
            return(
              <div key={id} className={'row'}>
                <div className={'cell left'}><div className={'item left'}>{model.make.name}</div></div>
                <div className={'cell left'}><div className={'item left'}>{model.name}</div></div>
                <div className={'cell center'}>
                  {
                    model.generations.map((generation, id) => {
                      return(
                        <div key={id} className={'cell-row'}>
                          <div className={'item center'}>{generation.name}</div>
                          <div className={'item center'}>{generation.yearBegin}</div>
                          <div className={'item center'}>{generation.yearEnd}</div>
                          <div className={'cell'}>
                            {
                              generation.series.map((seria, id) => {
                                return(
                                  <div key={id}className={'cell-row'}>
                                    <div className={'item left'}>{seria.name}</div>
                                    <div className={'item center clickable'} onClick={() => {this.setState({activeSeria: seria})}}>Specification</div>
                                  </div>
                                );
                              })
                            }
                          </div>
                        </div>
                      );
                    })
                  }
                </div>
                <div className={'cell right'}><div className={'item right'}>Delete</div></div>
              </div>
            );
          })
        }
        <SpecificationPopup seria={this.state.activeSeria} onClose={this.closePopup}/>
      </div>
    );
  }
}
  
export default ModelTable;