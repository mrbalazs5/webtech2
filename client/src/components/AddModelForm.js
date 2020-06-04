import React from 'react';
import './Forms.scss';
import SVG from './SVG';
import AddMakePopup from './admin/AddMakePopup';
import SimpleReactValidator from 'simple-react-validator';

class AddModelForm extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      addMakePopup: false,
      name: '',
      makes: [],
      selectedMake: 'Select Make..',
      generations: [],
      series: [],
      generation: {
        name: '',
        yearBegin: '',
        yearEnd: '',
        series: []
      },
      series: {
        name: '',
        specification: []
      },
      specification: {
        engine: '',
        enginePower: '',
        gearType: 'Manual Transmission',
        numberOfGears: '',
        numberOfWheels: '',
        width: '',
        length: '',
        seatingCapacity: '',
        maxSpeed: '',
        fullWeight: '',
        fuelCapacity: '',
        fuelConsumption: ''
      }
    };

    this.validator = new SimpleReactValidator({
      messages: {
        required: 'This field is required!'
      },
    })
    this.handleAddMakePopup = this.handleAddMakePopup.bind(this);
    this.fetchMakes = this.fetchMakes.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMakeChange = this.handleMakeChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleSeriesChange = this.handleSeriesChange.bind(this);
    this.handleSpecificationChange = this.handleSpecificationChange.bind(this);
    this.handleGenerationChange = this.handleGenerationChange.bind(this);
    this.handleAddSeries = this.handleAddSeries.bind(this);
    this.handleAddGeneration = this.handleAddGeneration.bind(this);
    this.resetSeries = this.resetSeries.bind(this);
    this.resetSpecification = this.resetSpecification.bind(this);
    this.resetGeneration = this.resetGeneration.bind(this);
  }

  handleMakeChange(e){
    let selectedMake = e.target.value;

    this.setState({
      selectedMake: selectedMake
    });
  }

  handleModelChange(e) {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({
      name: value
    });
  }

  handleSeriesChange(e){
    let name = e.target.name;
    let value = e.target.value;

    let series = Object.assign({}, this.state.series);
    series[name] = value;

    this.setState({
      series: series
    });
  }

  handleSpecificationChange(e){
    let name = e.target.name;
    let value = e.target.value;

    let specification = Object.assign({}, this.state.specification);
    specification[name] = value;

    this.setState({
      specification: specification
    });
  }

  handleGenerationChange(e){
    let name = e.target.name;
    let value = e.target.value;

    let generation = Object.assign({}, this.state.generation);
    generation[name] = value;

    this.setState({
      generation: generation
    });
  }

  handleAddSeries(){
    if(
      this.validator.fieldValid('specName') &&
      this.validator.fieldValid('specEngine') &&
      this.validator.fieldValid('specEnginePower') &&
      this.validator.fieldValid('specNumberOfGears') &&
      this.validator.fieldValid('specWidth') &&
      this.validator.fieldValid('specNumberOfWheels') &&
      this.validator.fieldValid('specLength') &&
      this.validator.fieldValid('specSeatingCapacity') &&
      this.validator.fieldValid('specMaxSpeed') &&
      this.validator.fieldValid('specFullWeight') &&
      this.validator.fieldValid('specFuelCapacity') &&
      this.validator.fieldValid('specFuelConsumption')
    ){
      let generation = this.state.generation;
      let series = Object.assign({}, this.state.series);
      let specification = Object.assign({}, this.state.specification);

      series.specification = specification;
      generation.series = [...generation.series, series];

      this.setState({
        generation: generation
      });

    }else {
      this.validator.showMessageFor('specName');
      this.validator.showMessageFor('specEngine');
      this.validator.showMessageFor('specEnginePower');
      this.validator.showMessageFor('specNumberOfGears');
      this.validator.showMessageFor('specWidth');
      this.validator.showMessageFor('specNumberOfWheels');
      this.validator.showMessageFor('specLength');
      this.validator.showMessageFor('specSeatingCapacity');
      this.validator.showMessageFor('specMaxSpeed');
      this.validator.showMessageFor('specFullWeight');
      this.validator.showMessageFor('specFuelCapacity');
      this.validator.showMessageFor('specFuelConsumption');
      this.forceUpdate();
    }
  }

  resetSeries(series){
    series.name = '';
    series.specification = [];

    document.getElementById('specName').value = '';

    return series;
  }

  resetSpecification(specification){
    specification.engine = '';
    specification.enginePower = '';
    specification.gearType = 'Manual Transmission';
    specification.numberOfGears = '';
    specification.numberOfWheels = '';
    specification.width = '';
    specification.length = '';
    specification.seatingCapacity = '';
    specification.maxSpeed = '';
    specification.fullWeight = '';
    specification.fuelCapacity = '';
    specification.fuelConsumption = '';

    document.getElementById('specEngine').value = '';
    document.getElementById('specEnginePower').value = '';
    document.getElementById('specGearType').value = 'Manual Transmission';
    document.getElementById('specNumberOfGears').value = '';
    document.getElementById('specNumberOfWheels').value = '';
    document.getElementById('specWidth').value = '';
    document.getElementById('specLength').value = '';
    document.getElementById('specSeatingCapacity').value = '';
    document.getElementById('specMaxSpeed').value = '';
    document.getElementById('specFullWeight').value = '';
    document.getElementById('specFuelCapacity').value = '';
    document.getElementById('specFuelConsumption').value = '';

    return specification;
  }

  handleAddGeneration(){
    if(
      this.validator.fieldValid('generationName') &&
      this.validator.fieldValid('generationYearBegin') &&
      this.validator.fieldValid('generationYearEnd')
    ){
      this.setState({
        generations: [...this.state.generations, this.state.generation]
      });

      let generation = Object.assign({}, this.state.generation);
      let series = Object.assign({}, this.state.series);
      let specification = Object.assign({}, this.state.specification);

      this.setState({
        generation: generation,
        specification: specification,
        series: series
      });

    }else {
      this.validator.showMessageFor('generationName');
      this.validator.showMessageFor('generationYearBegin');
      this.validator.showMessageFor('generationYearEnd');
      this.forceUpdate();
    }
  }

  resetGeneration(generation){
    generation.name = '';
    generation.yearBegin = '';
    generation.yearEnd = '';
    generation.series = [];

    document.getElementById('generationName').value = '';
    document.getElementById('generationYearBegin').value = '';
    document.getElementById('generationYearEnd').value = '';

    return generation;
  }

  componentDidMount(){
    this.fetchMakes();
    console.log(this.state.generation);
  }

  fetchMakes(){
    fetch('/api/get-makes')
    .then((response) => {
      if(response.status === 200){
        return response.json();
      }
    })
    .then((makes) => {
      this.setState({
        makes: makes
      });
      console.log(this.state.makes);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  handleAddMakePopup() {
    this.setState({
      addMakePopup: !this.state.addMakePopup
    });
  }

  handleSubmit(e){
    e.preventDefault();
    console.log('submit pressed');

    if(this.validator.fieldValid('modelName')){
      console.log('more than 0');
      if(this.state.generations.length > 0){
        let formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('make', this.state.selectedMake);
        formData.append('generations', this.state.generations);

        console.log(formData);
        console.log(this.state.name);

        fetch('/api/create-model', {
          method: 'POST',
          body: JSON.stringify({
              name: this.state.name,
              make: this.state.selectedMake,
              generations: this.state.generations
          }),
          headers: {"Content-Type": "application/json"}
        })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          if(response.type === 'success'){
            this.props.history.push({
              pathName: '/admin/add-model',
              state: {message: response}
            });
            window.location.reload();
          }else{
            return this.props.history.push({
              pathName: '/admin/add-model',
              state: {message: response}
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
      }else {
        this.props.history.push({
          pathName: '/admin/add-model',
          state: {message: 'You must need to add at least one generation!'}
        });
        console.log('less than 0');
      }
    }else {
      this.validator.showMessageFor('modelName');
      this.forceUpdate();
    }
  }

  render(){
    return(
      <div>
        {this.state.addMakePopup ? 
          <AddMakePopup onClose={this.handleAddMakePopup} updateMakes={this.fetchMakes}/>
        : ''}
          
        <form id={'add-model-form'} className={'form twocol withbg'} onSubmit={this.handleSubmit}>

          <div className={'form-item twosize bottomborder'}>
            Add model
          </div>

          <div className={'form-item onesize fullborder'}>
            <div className={'validator'}>
              <div className={'validator-text'}>
                {this.validator.message('modelName', this.state.name, 'required')}
              </div>
            </div>
            <label className={'form-label'} htmlFor={'modelName'}>Name</label>
            <input
              type={'text'}
              name={'name'}
              id={'modelName'}
              defaultValue={this.state.name}
              onChange={this.handleModelChange}
              autoComplete={'off'}
              placeholder={'Model`s name..'}
              className={'form-input'}
            />
          </div>

          <div className={'form-item onesize fullborder'}>
            <label className={'form-label'}>Make
              <div className={'label-icon'} onClick={this.handleAddMakePopup}>
                <SVG name={'ADD_PLUS_ICON'} className={'label-svg'}/>
              </div>
            </label>
            <select className={'form-select'} value={this.state.selectedMake} onChange={this.handleMakeChange}>
              <option value={'Select Make..'}>Select Make..</option>
              {this.state.makes && this.state.makes.map((make, id) => {
                return(
                  <option key={id} value={make.name}>{make.name}</option>
                );
              })}
            </select>
            
          </div>

          <div className={'form-item twosize bottomborder'}>
            Add Generation
            <div className={'form-subtext'}>Currently added:
              {this.state.generations.length === 0 ? '' : (
                <div className={'subtext-holder'}>
                  {this.state.generations.map((g, id) => {
                    return(
                      <div key={id} className={'subtext'}>- {g.name} </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className={'form-item thirdsize fullborder'}>
            <div className={'validator'}>
              <div className={'validator-text'}>
                {this.validator.message('generationName', this.state.generation.name, 'required')}
              </div>
            </div>
            <label className={'form-label'} htmlFor={'generationName'}>Name</label>
            <input
              type={'text'}
              name={'name'}
              id={'generationName'}
              onChange={this.handleGenerationChange}
              autoComplete={'off'}
              placeholder={'Name..'}
              className={'form-input'}
            />
          </div>

          <div className={'form-item thirdsize fullborder'}>
            <div className={'validator'}>
              <div className={'validator-text'}>
                {this.validator.message('generationYearBegin', this.state.generation.yearBegin, 'required')}
              </div>
            </div>
            <label className={'form-label'} htmlFor={'generationYearBegin'}>Year begin</label>
            <input
              type={'number'}
              name={'yearBegin'}
              id={'generationYearBegin'}
              onChange={this.handleGenerationChange}
              autoComplete={'off'}
              placeholder={'Year begin..'}
              className={'form-input'}
            />
          </div>

          <div className={'form-item thirdsize fullborder'}>
            <div className={'validator'}>
              <div className={'validator-text'}>
                {this.validator.message('generationYearEnd', this.state.generation.yearEnd, 'required')}
              </div>
            </div>
            <label className={'form-label'} htmlFor={'generationYearEnd'}>Year end</label>
            <input
              type={'number'}
              name={'yearEnd'}
              id={'generationYearEnd'}
              onChange={this.handleGenerationChange}
              autoComplete={'off'}
              placeholder={'Year end..'}
              className={'form-input'}
            />
          </div>

          <div className={'form-item twosize bottomborder'}>
            Add Series
            <div className={'form-subtext'}>Currently added:
              {this.state.generation.series.length === 0 ? '' : (
                <div className={'subtext-holder'}>
                  {this.state.generation.series.map((s, id) => {
                    return(
                      <div key={id} className={'subtext'}>- {s.name} </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          

          <div className={'form-item thirdsize fullborder'}>
            <div className={'validator'}>
              <div className={'validator-text'}>
                {this.validator.message('specName', this.state.series.name, 'required')}
              </div>
            </div>
            <label className={'form-label'} htmlFor={'specName'}>Name</label>
            <input
              type={'text'}
              name={'name'}
              id={'specName'}
              onChange={this.handleSeriesChange}
              autoComplete={'off'}
              placeholder={'Name..'}
              className={'form-input'}
            />
          </div>

          <div className={'form-item thirdsize fullborder'}>
            <div className={'validator'}>
              <div className={'validator-text'}>
                {this.validator.message('specEngine', this.state.specification.engine, 'required')}
              </div>
            </div>
            <label className={'form-label'} htmlFor={'specEngine'}>Engine</label>
            <input
              type={'text'}
              name={'engine'}
              id={'specEngine'}
              onChange={this.handleSpecificationChange}
              autoComplete={'off'}
              placeholder={'Engine..'}
              className={'form-input'}
            />
          </div>

          <div className={'form-item thirdsize fullborder'}>
            <div className={'validator'}>
              <div className={'validator-text'}>
                {this.validator.message('specEnginePower', this.state.specification.enginePower, 'required')}
              </div>
            </div>
            <label className={'form-label'} htmlFor={'specEnginePower'}>Engine power</label>
            <input
              type={'number'}
              name={'enginePower'}
              id={'specEnginePower'}
              onChange={this.handleSpecificationChange}
              autoComplete={'off'}
              placeholder={'Engine power..'}
              className={'form-input'}
            />
          </div>

          <div className={'form-item thirdsize fullborder'}>
            <label className={'form-label'}>Gear type</label>
            <select 
              name={'gearType'}
              id={'specGearType'}
              className={'form-select'}
              onChange={this.handleSpecificationChange}
            >
              <option>Manual Transmission</option>
              <option>Automated-Manual Transmission</option>
              <option>Traditional Automatic Transmission</option>
              <option>Continuously Variable Transmission</option>
              <option>Dual-Clutch Transmission</option>
              <option>Direct Shift Gearbox</option>
              <option>Tiptronic Transmission</option>
            </select>
          </div>

          <div className={'form-item thirdsize fullborder'}>
            <div className={'validator'}>
              <div className={'validator-text'}>
                {this.validator.message('specNumberOfGears', this.state.specification.numberOfGears, 'required')}
              </div>
            </div>
            <label className={'form-label'} htmlFor={'specNumberOfGears'}>Number of gears</label>
            <input
              type={'number'}
              name={'numberOfGears'}
              id={'specNumberOfGears'}
              onChange={this.handleSpecificationChange}
              autoComplete={'off'}
              placeholder={'Number of gears..'}
              className={'form-input'}
            />
          </div>

          <div className={'form-item thirdsize fullborder'}>
            <div className={'validator'}>
              <div className={'validator-text'}>
                {this.validator.message('specNumberOfWheels', this.state.specification.numberOfWheels, 'required')}
              </div>
            </div>
            <label className={'form-label'} htmlFor={'specNumberOfWheels'}>Number of wheels</label>
            <input
              type={'number'}
              name={'numberOfWheels'}
              id={'specNumberOfWheels'}
              onChange={this.handleSpecificationChange}
              autoComplete={'off'}
              placeholder={'Number of wheels..'}
              className={'form-input'}
            />
          </div>

          <div className={'form-item thirdsize fullborder'}>
            <div className={'validator'}>
              <div className={'validator-text'}>
                {this.validator.message('specWidth', this.state.specification.width, 'required')}
              </div>
            </div>
            <label className={'form-label'} htmlFor={'specWidth'}>Width</label>
            <input
              type={'text'}
              name={'width'}
              id={'specWidth'}
              onChange={this.handleSpecificationChange}
              autoComplete={'off'}
              placeholder={'Width..'}
              className={'form-input'}
            />
          </div>

          <div className={'form-item thirdsize fullborder'}>
            <div className={'validator'}>
              <div className={'validator-text'}>
                {this.validator.message('specLength', this.state.specification.length, 'required')}
              </div>
            </div>
            <label className={'form-label'} htmlFor={'specLength'}>Length</label>
            <input
              type={'text'}
              name={'length'}
              id={'specLength'}
              onChange={this.handleSpecificationChange}
              autoComplete={'off'}
              placeholder={'Length..'}
              className={'form-input'}
            />
          </div>

          <div className={'form-item thirdsize fullborder'}>
            <div className={'validator'}>
              <div className={'validator-text'}>
                {this.validator.message('specSeatingCapacity', this.state.specification.seatingCapacity, 'required')}
              </div>
            </div>
            <label className={'form-label'} htmlFor={'specSeatingCapacity'}>Seating capacity</label>
            <input
              type={'number'}
              name={'seatingCapacity'}
              id={'specSeatingCapacity'}
              onChange={this.handleSpecificationChange}
              autoComplete={'off'}
              placeholder={'Seating capacity..'}
              className={'form-input'}
            />
          </div>

          <div className={'form-item thirdsize fullborder'}>
            <div className={'validator'}>
              <div className={'validator-text'}>
                {this.validator.message('specMaxSpeed', this.state.specification.maxSpeed, 'required')}
              </div>
            </div>
            <label className={'form-label'} htmlFor={'specMaxSpeed'}>Max speed</label>
            <input
              type={'text'}
              name={'maxSpeed'}
              id={'specMaxSpeed'}
              onChange={this.handleSpecificationChange}
              autoComplete={'off'}
              placeholder={'Max speed..'}
              className={'form-input'}
            />
          </div>

          <div className={'form-item thirdsize fullborder'}>
            <div className={'validator'}>
              <div className={'validator-text'}>
                {this.validator.message('specFullWeight', this.state.specification.fullWeight, 'required')}
              </div>
            </div>
            <label className={'form-label'} htmlFor={'specFullWeight'}>Full weight</label>
            <input
              type={'text'}
              name={'fullWeight'}
              id={'specFullWeight'}
              onChange={this.handleSpecificationChange}
              autoComplete={'off'}
              placeholder={'Full weight..'}
              className={'form-input'}
            />
          </div>

          <div className={'form-item thirdsize fullborder'}>
            <div className={'validator'}>
              <div className={'validator-text'}>
                {this.validator.message('specFuelCapacity', this.state.specification.fuelCapacity, 'required')}
              </div>
            </div>
            <label className={'form-label'} htmlFor={'specFuelCapacity'}>Fuel capacity</label>
            <input
              type={'text'}
              name={'fuelCapacity'}
              id={'specFuelCapacity'}
              onChange={this.handleSpecificationChange}
              autoComplete={'off'}
              placeholder={'Fuel capacity..'}
              className={'form-input'}
            />
          </div>

          <div className={'form-item thirdsize fullborder'}>
            <div className={'validator'}>
              <div className={'validator-text'}>
                {this.validator.message('specFuelConsumption', this.state.specification.fuelConsumption, 'required')}
              </div>
            </div>
            <label className={'form-label'} htmlFor={'specFuelConsumption'}>Fuel consumption</label>
            <input
              type={'text'}
              name={'fuelConsumption'}
              id={'specFuelConsumption'}
              onChange={this.handleSpecificationChange}
              autoComplete={'off'}
              placeholder={'Fuel consumption..'}
              className={'form-input'}
            />
          </div>

          <div className={'form-item twosize'}>
            <button className={'submit-button half'} type={'button'} onClick={this.handleAddSeries}>Add Series</button>
          </div>

          <div className={'form-item twosize'}>
            <button className={'submit-button'} type={'button'} onClick={this.handleAddGeneration}>Add Generation</button>
          </div>

          <div className={'form-item twosize'}>
            <button className={'submit-button centered'} type={'submit'}>Save</button>
          </div>

        </form>
      </div>
    );
  }
}

export default AddModelForm;
