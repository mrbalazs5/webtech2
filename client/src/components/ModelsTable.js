import React from 'react';
import './Tables.scss';

function ModelTable (props) {
  return(
    <div className={'table'}>
      {
        props.models.map((model, id) => {
          return(
            <div key={id} className={'row'}>
              <div className={'cell'}><div className={'item'}>{model.make.name}</div></div>
              <div className={'cell'}><div className={'item'}>{model.name}</div></div>
              <div className={'cell'}>
                {
                  model.generations.map((generation, id) => {
                    return(
                      <div key={id} className={'cell-row'}>
                        <div className={'item'}>{generation.name}</div>
                        <div className={'item'}>{generation.yearBegin}</div>
                        <div className={'item'}>{generation.yearEnd}</div>
                        <div className={'item'}>
                          {
                            generation.series.map((seria, id) => {
                              return(
                                <div key={id} className={'cell-cell-row'}>
                                  <div className={'item'}>{seria.name}</div>
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
            </div>
          );
        })
      }
    </div>
  );
}

export default ModelTable;