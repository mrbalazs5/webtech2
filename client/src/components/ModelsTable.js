import React from 'react';
import './Tables.scss';

function ModelTable (props) {
  return(
    <div>
      {
        props.models.map((model, id) => {
          return(
            <div key={id}>
              <div>{model.make.name}</div>
              <div>{model.name}</div>
              {
                model.generations.map((generation, id) => {
                  return(
                    <div key={id}>
                      <div>{generation.name}</div>
                      <div>{generation.yearBegin}</div>
                      <div>{generation.yearEnd}</div>
                      {
                        generation.series.map((seria, id) => {
                          return(
                            <div key={id}>
                              <div>{seria.name}</div>
                              
                            </div>
                          );
                        })
                      }
                    </div>
                  );
                })
              }
            </div>
          );
        })
      }
    </div>
  );
}

export default ModelTable;