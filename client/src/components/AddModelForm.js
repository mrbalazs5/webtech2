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
      generations: [],
      generation: {
        name: '',
        yearBegin: '',
        yearEnd: '',
        series: []
      },
      seria: {
        name: '',
        engine: '',
        enginePower: '',
        gearType: 'Manual Transmission',
        numberOfGears: '',
        numberOfWheels: '',
        width: '',
        seatingCapacity: '',
        maxSpeed: '',
        fullWeight: '',
        fuelCapacity: '',
        fuelConsumption: ''
      }
    };

    this.validator = new SimpleReactValidator();
    this.handleAddMakePopup = this.handleAddMakePopup.bind(this);
    this.fetchMakes = this.fetchMakes.bind(this);
    this.handlesubmit = this.handlesubmit.bind(this);
    this.handleGenerationChange = this.handleGenerationChange.bind(this);
    this.handleAddGeneration = this.handleAddGeneration.bind(this);
    this.resetGeneration = this.resetGeneration.bind(this);
    this.handleSeriaChange = this.handleSeriaChange.bind(this);
  }

  componentDidMount(){
    this.fetchMakes();
  }

  fetchMakes(){
    fetch('/api/get-makes')
    .then((response) => {
      if(response.status === 200){
        return response.json();
      }
      console.log(typeof response);
    })
    .then((makes) => {
      this.setState({
        makes: makes
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  handleGenerationChange(e) {
    let name = e.target.name;
    let value = e.target.value;

    let generation = Object.assign({}, this.state.generation);
    generation[name] = value;

    this.setState({
      generation: generation
    });
  }

  handleAddGeneration(){
    if(
      this.validator.fieldValid('name') &&
      this.validator.fieldValid('yearBegin') &&
      this.validator.fieldValid('yearEnd')
    ){
      this.setState({
        generations: [...this.state.generations, this.state.generation]
      }, () => {

        let generation = Object.assign({}, this.state.generation);
        this.resetGeneration(generation);

        this.setState({
          generation: generation
        });
        console.log(this.state.generations);

      });
    }else{
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  resetGeneration(generation){
    generation['name'] = '';
    generation['yearBegin'] = '';
    generation['yearEnd'] = '';

    document.getElementById('generationName').value = '';
    document.getElementById('generationYearBegin').value = '';
    document.getElementById('generationYearEnd').value = '';

    return generation;
  }

  handleSeriaChange(e){
    let name = e.target.name;
    let value = e.target.value;

    let seria = Object.assign({}, this.state.seria);
    seria[name] = value;

    this.setState({
      seria: seria
    });

  }

  handleAddMakePopup() {
    this.setState({
      addMakePopup: !this.state.addMakePopup
    });
  }

  handlesubmit(e){
    e.preventDefault();
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
            <label className={'form-label'} htmlFor={'name'}>Name</label>
            <input
              type={'text'}
              id={'name'}
              value={this.state.name}
              onChange={this.handleChange}
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
            <select className={'form-select'}>
              {this.state.makes.map((make, id) => {
                return(
                  <option key={id}>{make.name}</option>
                );
              })}
            </select>
            
          </div>

          <div className={'form-item twosize bottomborder'}>
            Add Generation
          </div>

          <div className={'form-item thirdsize fullborder'}>
            <div className={'validator'}>
              <div className={'validator-text'}>
                {this.validator.message('name', this.state.generation.name, 'required')}
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
                {this.validator.message('yearBegin', this.state.generation.yearBegin, 'required')}
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
                {this.validator.message('yearEnd', this.state.generation.yearEnd, 'required')}
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
          </div>

          <div className={'form-item thirdsize fullborder'}>
            <div className={'validator'}>
              <div className={'validator-text'}>
                {this.validator.message('seriaName', this.state.seria.name, 'required')}
              </div>
            </div>
            <label className={'form-label'} htmlFor={'seriaName'}>Name</label>
            <input
              type={'text'}
              name={'name'}
              id={'seriaName'}
              onChange={this.handleSeriaChange}
              autoComplete={'off'}
              placeholder={'Name..'}
              className={'form-input'}
            />
          </div>

          <div className={'form-item thirdsize fullborder'}>
            <div className={'validator'}>
              <div className={'validator-text'}>
                {this.validator.message('seriaEngine', this.state.seria.engine, 'required')}
              </div>
            </div>
            <label className={'form-label'} htmlFor={'seriaEngine'}>Engine</label>
            <input
              type={'text'}
              name={'engine'}
              id={'seriaEngine'}
              onChange={this.handleSeriaChange}
              autoComplete={'off'}
              placeholder={'Engine..'}
              className={'form-input'}
            />
          </div>

          <div className={'form-item thirdsize fullborder'}>
            <div className={'validator'}>
              <div className={'validator-text'}>
                {this.validator.message('seriaEnginePower', this.state.seria.enginePower, 'required')}
              </div>
            </div>
            <label className={'form-label'} htmlFor={'seriaEnginePower'}>Engine power</label>
            <input
              type={'text'}
              name={'enginePower'}
              id={'seriaEnginePower'}
              onChange={this.handleSeriaChange}
              autoComplete={'off'}
              placeholder={'Engine power..'}
              className={'form-input'}
            />
          </div>

          <div className={'form-item thirdsize fullborder'}>
            <div className={'validator'}>
              <div className={'validator-text'}>
                {this.validator.message('seriaGearType', this.state.seria.gearType, 'required')}
              </div>
            </div>
            <label className={'form-label'}>Gear type</label>
            <select 
              name={'gearType'}
              id={'seriaGearType'}
              className={'form-select'}
              onChange={this.handleSeriaChange}
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
                {this.validator.message('seriaNumberOfGears', this.state.seria.numberOfGears, 'required')}
              </div>
            </div>
            <label className={'form-label'} htmlFor={'seriaNumberOfGears'}>Number of gears</label>
            <input
              type={'text'}
              name={'numberOfGears'}
              id={'seriaNumberOfGears'}
              onChange={this.handleSeriaChange}
              autoComplete={'off'}
              placeholder={'Number of gears..'}
              className={'form-input'}
            />
          </div>

          <div className={'form-item thirdsize fullborder'}>
            <div className={'validator'}>
              <div className={'validator-text'}>
                {this.validator.message('seriaNumberOfWheels', this.state.seria.numberOfWheels, 'required')}
              </div>
            </div>
            <label className={'form-label'} htmlFor={'seriaNumberOfWheels'}>Number of wheels</label>
            <input
              type={'text'}
              name={'numberOfWheels'}
              id={'seriaNumberOfWheels'}
              onChange={this.handleSeriaChange}
              autoComplete={'off'}
              placeholder={'Number of wheels..'}
              className={'form-input'}
            />
          </div>

          <div className={'form-item thirdsize fullborder'}>
            <div className={'validator'}>
              <div className={'validator-text'}>
                {this.validator.message('seriaWidth', this.state.seria.width, 'required')}
              </div>
            </div>
            <label className={'form-label'} htmlFor={'seriaWidth'}>Width</label>
            <input
              type={'text'}
              name={'width'}
              id={'seriaWidth'}
              onChange={this.handleSeriaChange}
              autoComplete={'off'}
              placeholder={'Width..'}
              className={'form-input'}
            />
          </div>

          <div className={'form-item thirdsize fullborder'}>
            <div className={'validator'}>
              <div className={'validator-text'}>
                {this.validator.message('seriaLength', this.state.seria.length, 'required')}
              </div>
            </div>
            <label className={'form-label'} htmlFor={'seriaLength'}>Length</label>
            <input
              type={'text'}
              name={'length'}
              id={'seriaLength'}
              onChange={this.handleSeriaChange}
              autoComplete={'off'}
              placeholder={'Length..'}
              className={'form-input'}
            />
          </div>

          <div className={'form-item thirdsize fullborder'}>
            <div className={'validator'}>
              <div className={'validator-text'}>
                {this.validator.message('seriaSeatingCapacity', this.state.seria.seatingCapacity, 'required')}
              </div>
            </div>
            <label className={'form-label'} htmlFor={'seriaSeatingCapacity'}>Seating capacity</label>
            <input
              type={'text'}
              name={'seatingCapacity'}
              id={'seriaSeatingCapacity'}
              onChange={this.handleSeriaChange}
              autoComplete={'off'}
              placeholder={'Seating capacity..'}
              className={'form-input'}
            />
          </div>

          <div className={'form-item thirdsize fullborder'}>
            <div className={'validator'}>
              <div className={'validator-text'}>
                {this.validator.message('seriaMaxSpeed', this.state.seria.maxSpeed, 'required')}
              </div>
            </div>
            <label className={'form-label'} htmlFor={'seriaMaxSpeed'}>Max speed</label>
            <input
              type={'text'}
              name={'maxSpeed'}
              id={'seriaMaxSpeed'}
              onChange={this.handleSeriaChange}
              autoComplete={'off'}
              placeholder={'Max speed..'}
              className={'form-input'}
            />
          </div>

          <div className={'form-item thirdsize fullborder'}>
            <div className={'validator'}>
              <div className={'validator-text'}>
                {this.validator.message('seriaFullWeight', this.state.seria.fullWeight, 'required')}
              </div>
            </div>
            <label className={'form-label'} htmlFor={'seriaFullWeight'}>Full weight</label>
            <input
              type={'text'}
              name={'fullWeight'}
              id={'seriaFullWeight'}
              onChange={this.handleSeriaChange}
              autoComplete={'off'}
              placeholder={'Full weight..'}
              className={'form-input'}
            />
          </div>

          <div className={'form-item thirdsize fullborder'}>
            <div className={'validator'}>
              <div className={'validator-text'}>
                {this.validator.message('seriaFuelCapacity', this.state.seria.fuelCapacity, 'required')}
              </div>
            </div>
            <label className={'form-label'} htmlFor={'seriaFuelCapacity'}>Fuel capacity</label>
            <input
              type={'text'}
              name={'fuelCapacity'}
              id={'seriaFuelCapacity'}
              onChange={this.handleSeriaChange}
              autoComplete={'off'}
              placeholder={'Fuel capacity..'}
              className={'form-input'}
            />
          </div>

          <div className={'form-item thirdsize fullborder'}>
            <div className={'validator'}>
              <div className={'validator-text'}>
                {this.validator.message('seriaFuelConsumption', this.state.seria.fuelConsumption, 'required')}
              </div>
            </div>
            <label className={'form-label'} htmlFor={'seriaFuelConsumption'}>Fuel consumption</label>
            <input
              type={'text'}
              name={'fuelConsumption'}
              id={'seriaFuelConsumption'}
              onChange={this.handleSeriaChange}
              autoComplete={'off'}
              placeholder={'Fuel consumption..'}
              className={'form-input'}
            />
          </div>

          <div className={'form-item twosize'}>
            <button className={'submit-button'} type={'button'} >Add Series</button>
          </div>

          <div className={'form-item twosize'}>
            <button className={'submit-button centered'} type={'button'} onClick={this.handleAddGeneration}>Add Generation</button>
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
