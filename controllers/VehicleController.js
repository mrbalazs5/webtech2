import Dealership from '../models/dealership.model';
import Address from '../models/address.model';
import Vehicle from '../models/vehicle.model';
import Model from '../models/model.model';
import Make from '../models/make.model';
import Specification from '../models/specification.model';
import Generation from '../models/generation.model';
import Series from '../models/series.model';
import Message from "../utils/Message";
import {isEmpty} from '../utils/customValidator';
import {trim, escape, normalizeEmail, isNumeric, isEmail, isLength} from 'validator';
import FileHandler from "../utils/FileHandler";
import uploadsPath from "../utils/uploadsPath";

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

            let bodyModel = req.body;

            if(
                isEmpty(bodyModel.name)
            ){
                return res.status(422).json(new Message(['Model name field constraint violation']).error());
            }

            let make = bodyModel.make;

            if(isEmpty(make)){
                throw new Error('Model make field constraint violation');
            }

            if(bodyModel.generations && bodyModel.generations.length > 0){

                bodyModel.generations.map((generation) => {

                    if (
                        isEmpty(generation.name) ||
                        isEmpty(generation.yearBegin) ||
                        isEmpty(generation.yearEnd)
                    ) {
                        throw new Error('Generation field constraint violation');
                    }

                    if(generation.series && generation.series.length > 0) {

                        generation.series.map((series) => {

                            if (
                                isEmpty(series.name)
                            ) {
                                throw new Error('Series field constraint violation');
                            }

                            let specification = series.specification;

                            if(specification){

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

                            }

                        });

                    }

                });
            }

            trim(bodyModel.name);

            Model.find({name: bodyModel.name})
                .then((models) => {

                    if(models.length > 0){
                        throw new Error('Model already exists in the database');
                    }

                    return Make.findById(make)
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

                    if(bodyModel.generations && bodyModel.generations.length > 0){

                        let generationPromises = bodyModel.generations.map((generation) => {

                            let generationObject = new Generation({
                                name: generation.name,
                                yearBegin: generation.yearBegin,
                                yearEnd: generation.yearEnd,
                                model: model._id.toString(),
                            });

                            return generationObject.save()
                                .then((generationDB) => {

                                    if(generation.series && generation.series.length > 0){

                                        let seriesPromises = generation.series.map((series) => {

                                            let seriesObject = new Series({
                                                name: series.name
                                            });
                                            seriesObject.generations.push(generationDB._id.toString());

                                            let specification = series.specification;

                                            return seriesObject.save()
                                                .then((seriesDB) => {

                                                    if(specification){

                                                        let specificationObject = new Specification(specification);
                                                        specificationObject.series = seriesDB._id.toString();

                                                        specificationObject.save()
                                                            .then((specificationDB) => {
                                                                seriesDB.specification = specificationDB._id.toString();
                                                                seriesDB.save();
                                                            });

                                                    }

                                                    return seriesDB._id.toString();
                                                });
                                        });

                                        Promise.all(seriesPromises)
                                            .then((seriesIds) => {
                                                generationDB.series = seriesIds;
                                                generationDB.save();
                                            })
                                            .catch((err) => {
                                                throw new Error(err);
                                            });

                                    }

                                    return generationDB._id.toString();
                                });

                        });

                        return Promise.all(generationPromises)
                            .then((generationIds) => {
                                model.generations = generationIds;
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
                .populate('generations')
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
    createDealership: {
        controller: (req, res) => {

            const dealershipBody = req.body;

            if(
                !dealershipBody || isEmpty(dealershipBody.name)
            ){
                return res.status(422).json(new Message(['Dealership name field constraint violation']).error());
            }

            const address = dealershipBody.address;

            if(
                !address ||
                isEmpty(address.country) ||
                isEmpty(address.city) ||
                isEmpty(address.street)
            ){
                return res.status(422).json(new Message(['Dealership address field constraint violation']).error());
            }

            trim(dealershipBody.name);
            escape(dealershipBody.name);

            Dealership.find({name: dealershipBody.name})
                .then((dealerships) => {

                    if(dealerships.length > 0){
                        throw new Error('Dealership already exists in the database');
                    }

                    let dealershipObj = new Dealership({name: dealershipBody.name, user: '5eb1c911bd337c3b4080938a'});

                    return dealershipObj.save();
                })
                .then((dealership) => {

                    let addressObject = new Address(address);

                    return addressObject.save()
                        .then((addressDB) => {
                            dealership.address = addressDB._id.toString();

                            return dealership.save();
                        });
                })
                .then(() => {

                    return res.status(200).json(new Message(['Dealership successfully created']).success());
                })
                .catch((err) =>{
                    console.log(err);

                    return res.status(422).json(new Message([err.toString()]).error());
                });


        }
    },
    getDealerships: {
        controller: (req, res) => {

            Dealership.find().populate('user').populate('vehicles').populate('address')
                .then((dealerships) =>{

                    if(dealerships.length < 1){
                        throw new Error('There are no dealerships in the database');
                    }

                    return res.status(200).json(dealerships);
                })
                .catch((err) =>{
                    console.log(err);

                    return res.status(422).json(new Message([err.toString()]).error());
                });

        }
    },
    createVehicle: {
        controller: (req, res) => {
            const fileHandler = new FileHandler(req, res, uploadsPath('image'));

            fileHandler.uploadSingle({type: 'image'})
                .then((file) => {

                    const body = req.body;

                    if(
                        isEmpty(body.vehicleType) || !isNumeric(body.vehicleType) ||
                        isEmpty(body.vehicleType) || !isNumeric(body.vehicleType) ||
                        isEmpty(body.generation) ||
                        isEmpty(body.series) ||
                        isEmpty(body.dealership)
                    ){
                        fileHandler.revokeFileUpload(file);
                        throw new Error('Field constraint violation');
                    }

                    body.file = file;

                    return body;

                })
                .then((body) => {

                    const {vehicleType, price, isServiced, dealership, file, generation, series, model} = body;

                    let vehicle = new Vehicle({
                        vehicleType: vehicleType,
                        price: price,
                        isServiced: isServiced,
                        image: file.path,
                        model: model,
                        generation: generation,
                        series: series,
                        dealership: dealership
                    });

                    return vehicle.save()
                })
                .then(() => {
                    return res.status(200).json(new Message(['Vehicle successfully created']).success());
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