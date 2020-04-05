import Vehicle from '../models/vehicle.model';
import Model from '../models/model.model';
import Make from '../models/make.model';
import Specification from '../models/specification.model';
import Generation from '../models/generation.model';
import Series from '../models/series.model';
import Message from "../utils/Message";
import {isEmpty} from '../utils/customValidator';
import {trim, escape, normalizeEmail, isNumeric} from 'validator';

const VehicleController = {

    createMake: {
        controller: (req, res) => {

            const make = req.body;

            if(!make || isEmpty(make.name)){
                return res.status(422).json(new Message(['Make name field constraint violation']).error());
            }

            trim(make.name);
            escape(make.name);

            Make.find({name: make.name})
                .then((makes) => {

                    if(makes.length > 0){
                        throw new Error('Make already exists in the database');
                    }

                    let makeObj = new Make(make);

                    return makeObj.save();

                })
                .then(() => {

                    return res.status(200).json(new Message(['Make successfully created']).success());

                })
                .catch((err) =>{
                    console.log(err);

                    return res.status(422).json(new Message([err.toString()]).error());
                });


        }
    },
    getMakes: {
        controller: (req, res) => {

            Make.find().populate('models')
                .then((makes) => {

                    if(makes.length < 1){
                        throw new Error('There are no makes in the database');
                    }

                    return res.status(200).json(makes);

                })
                .catch((err) =>{
                    console.log(err);

                    return res.status(422).json(new Message([err.toString()]).error());
                });


        }
    },
    createModel: {

        controller: (req, res) => {

            let bodyModel = req.body.model;

            if(
                isEmpty(bodyModel.name)
            ){
                return res.status(422).json(new Message(['Model name field constraint violation']).error());
            }

            trim(bodyModel.name);

            Model.find({name: bodyModel.name})
                .then((models) => {

                    if(models.length > 0){
                        throw new Error('Model already exists in the database');
                    }

                    if(!bodyModel.make){
                        throw new Error('Model make field constraint violation');
                    }

                    let make = bodyModel.make;

                    if(isEmpty(make.name)){
                        throw new Error('Make name field constraint violation');
                    }

                    return Make.findOne({name: make.name})
                            .then((makeDB) => {

                                if(!makeDB){
                                    throw new Error('Make does not exits in the database');
                                }

                                let model = new Model({name: bodyModel.name});

                                makeDB.models.push(model._id.toString());
                                model.make = makeDB._id.toString();

                                makeDB.save();

                                return model.save();

                            });


                })
                .then((model) => {


                    if(bodyModel.specification){

                        let specification = bodyModel.specification;

                        if(
                            specification.enginePower && !isNumeric(specification.enginePower) ||
                            specification.gearType && !isNumeric(specification.gearType) ||
                            specification.numberOfGears && !isNumeric(specification.numberOfGears) ||
                            specification.numberOfWheels && !isNumeric(specification.numberOfWheels) ||
                            specification.width && !isNumeric(specification.width) ||
                            specification.length && !isNumeric(specification.length) ||
                            specification.seatingCapacity && !isNumeric(specification.seatingCapacity) ||
                            specification.maxSpeed && !isNumeric(specification.maxSpeed) ||
                            specification.fullWeight && !isNumeric(specification.fullWeight) ||
                            specification.fuelCapacity && !isNumeric(specification.fuelCapacity) ||
                            specification.fuelConsumption && !isNumeric(specification.fuelConsumption)
                        ){
                            throw new Error('Specification field constraint violation');
                        }

                        let specificationObject = new Specification(specification);
                        specificationObject.model = model._id.toString();

                        return specificationObject.save()
                            .then((specificationDB) => {
                                model.specification = specificationDB._id.toString();
                                return model.save();
                            });

                    }

                    return model;

                })
                .then((model) => {

                    if(bodyModel.series && bodyModel.series.length > 0){

                        let seriesPromises = bodyModel.series.map((series) => {

                            if(
                                isEmpty(series.name)
                            ){
                                throw new Error('Series field constraint violation');
                            }

                            let seriesObject = new Series(series);
                            seriesObject.model = model._id.toString();

                            return seriesObject.save()
                                .then((seriesDB) => {

                                    if(series.generations && series.generations.length > 0){

                                        let generationPromises = series.generations.map((generation) => {

                                            if(
                                                isEmpty(generation.name) ||
                                                isEmpty(generation.yearBegin) ||
                                                isEmpty(generation.yearEnd)
                                            ){
                                                throw new Error('Generation field constraint violation');
                                            }

                                            let generationObject = new Generation(generation);
                                            generationObject.series = seriesDB._id.toString();

                                            return generationObject.save()
                                                .then((generationDB) => {
                                                    return generationDB._id.toString();
                                                });
                                        });

                                         Promise.all(generationPromises)
                                            .then((generationIds) => {
                                                seriesDB.generations = generationIds;
                                                seriesDB.save();
                                            })
                                            .catch((err) => {
                                                throw new Error(err);
                                            });

                                    }

                                    return seriesDB._id.toString();
                                });

                        });

                        return Promise.all(seriesPromises)
                            .then((seriesIds) => {
                                model.series = seriesIds;
                                return model.save();
                            });

                    }

                })
                .then(() => {

                    return res.status(200).json(new Message(['Model successfully created']).success());

                })
                .catch ((err) => {
                    console.log(err);

                    return res.status(422).json(new Message([err.toString()]).error());
                });

        }

    },
    getModels: {
        controller: (req, res) =>{

            Model.find()
                .populate('make')
                .populate('specification')
                .populate('series')
                .populate('vehicles')
                .then((models) =>{

                    if(models.length < 1){
                        throw new Error('There are no models in the database');
                    }

                    return res.status(200).json(models);
                })
                .catch((err) =>{
                    console.log(err);

                    return res.status(422).json(new Message([err.toString()]).error());
                });


        }
    },
    getVehicles: {
        controller: (req, res) => {

            Vehicle.find().populate('model').populate('dealership')
                .then((vehicles) =>{

                    if(vehicles.length < 1){
                        throw new Error('There are no vehicles in the database');
                    }

                    return res.status(200).json(vehicles);
                })
                .catch((err) =>{
                    console.log(err);

                    return res.status(422).json(new Message([err.toString()]).error());
                });

        }
    }

};

export default VehicleController;