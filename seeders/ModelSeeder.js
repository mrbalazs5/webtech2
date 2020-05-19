import Make from '../models/make.model';
import Model from '../models/model.model';
import Generation from '../models/generation.model';
import Series from '../models/series.model';
import Specification from '../models/specification.model';

class ModelSeeder{

    async run(){

        const makes = [
            {name: 'Seat'},
            {name: 'Honda'},
            {name: 'Suzuki'},
            {name: 'Ford'},
            {name: 'BMW'},
            {name: 'Audi'}
        ];

        const models = [
            {
                name: 'Leon',
                generations: [{
                    name: 'Typ 1M',
                    yearBegin: 1998,
                    yearEnd: 2005,
                    series: [
                        {
                            name: 'Evolution',
                            specification: {
                                engine: "1.6 L I4 8v",
                                enginePower: 100,
                                gearType: 0,
                                numberOfGears: 5,
                                numberOfWheels: 4,
                                width: 1,
                                length: 3,
                                seatingCapacity: 5,
                                maxSpeed: 200,
                                fullWeight: 1100,
                                fuelCapacity: 1500,
                                fuelConsumption: 5
                            }
                        },
                        {
                            name: 'Top Sport',
                            specification: {
                                engine: "1.6 L I4 16v",
                                enginePower: 150,
                                gearType: 0,
                                numberOfGears: 6,
                                numberOfWheels: 4,
                                width: 1,
                                length: 4,
                                seatingCapacity: 5,
                                maxSpeed: 250,
                                fullWeight: 1150,
                                fuelCapacity: 2000,
                                fuelConsumption: 7
                            }
                        },
                    ]
                }]
            },
            {
                name: 'Altea',
                generations: [{
                    name: '3rd',
                    yearBegin: 2005,
                    yearEnd: 2013,
                    series: [
                        {
                            name: 'Turbo',
                            specification: {
                                engine: "1.9 L I4 8v",
                                enginePower: 200,
                                gearType: 1,
                                numberOfGears: 6,
                                numberOfWheels: 4,
                                width: 1,
                                length: 3,
                                seatingCapacity: 5,
                                maxSpeed: 250,
                                fullWeight: 1105,
                                fuelCapacity: 1505,
                                fuelConsumption: 10
                            }
                        }
                    ]
                },
                    {
                        name: '4th',
                        yearBegin: 2005,
                        yearEnd: 2013,
                        series: [
                            {
                                name: 'Turbo2',
                                specification: {
                                    engine: "1.9 L I4 16v",
                                    enginePower: 260,
                                    gearType: 0,
                                    numberOfGears: 6,
                                    numberOfWheels: 4,
                                    width: 1,
                                    length: 3,
                                    seatingCapacity: 5,
                                    maxSpeed: 250,
                                    fullWeight: 1125,
                                    fuelCapacity: 1700,
                                    fuelConsumption: 10
                                }
                            }
                        ]
                    }
                ]
            },
            {
                name: 'Test model 1',
                generations: [{
                    name: '1st',
                    yearBegin: 2002,
                    yearEnd: 2013,
                    series: [
                        {
                            name: 'Test series 1',
                            specification: {
                                engine: "1.9 L I4 8v",
                                enginePower: 200,
                                gearType: 1,
                                numberOfGears: 6,
                                numberOfWheels: 4,
                                width: 1,
                                length: 3,
                                seatingCapacity: 5,
                                maxSpeed: 250,
                                fullWeight: 1105,
                                fuelCapacity: 1505,
                                fuelConsumption: 10
                            }
                        }
                    ]
                },
                {
                    name: '2nd',
                    yearBegin: 2005,
                    yearEnd: 2014,
                    series: [
                        {
                            name: 'Test series 2',
                            specification: {
                                engine: "1.9 L I4 16v",
                                enginePower: 260,
                                gearType: 0,
                                numberOfGears: 6,
                                numberOfWheels: 4,
                                width: 1,
                                length: 3,
                                seatingCapacity: 5,
                                maxSpeed: 250,
                                fullWeight: 1125,
                                fuelCapacity: 1700,
                                fuelConsumption: 10
                            }
                        },
                        {
                            name: 'Test series 6',
                            specification: {
                                engine: "1.9 L I4 16v",
                                enginePower: 260,
                                gearType: 0,
                                numberOfGears: 6,
                                numberOfWheels: 4,
                                width: 1,
                                length: 3,
                                seatingCapacity: 5,
                                maxSpeed: 250,
                                fullWeight: 1125,
                                fuelCapacity: 1700,
                                fuelConsumption: 10
                            }
                        }
                    ]
                }
                ]
            }
        ];

        return Make.create(makes)
            .then((makes) => {

                let modelPromises = models.map((model) => {

                    let modelObject = new Model({
                        name: model.name,
                        make: makes[Math.floor(Math.random() * makes.length)]._id.toString()
                    });

                    return modelObject.save()
                        .then((modelDB) => {

                            Make.findById(makes[0]._id)
                                .then((makeDB) =>{
                                    makeDB.models.push(modelDB._id.toString());
                                    makeDB.save();
                                });

                            let generationPromises = model.generations.map((generation) => {

                                let generationObject = new Generation({
                                    name: generation.name,
                                    yearBegin: generation.yearBegin,
                                    yearEnd: generation.yearEnd,
                                    model: modelDB._id.toString()
                                });

                                return generationObject.save()
                                    .then((generationDB) => {

                                        let seriesPromises = generation.series.map((series) => {

                                            let specificationObject = new Specification(series.specification);

                                            return specificationObject.save()
                                                .then((specificationDB) => {

                                                    let seriesObject = new Series({
                                                        name: series.name,
                                                        specification: specificationDB._id.toString()
                                                    });

                                                    seriesObject.generations.push(generationDB._id.toString());

                                                    return seriesObject.save()
                                                        .then((seriesDB) => {

                                                            return seriesDB._id.toString();
                                                        })

                                                });

                                        });

                                        return Promise.all(seriesPromises)
                                            .then((seriesIds) => {
                                                generationDB.series = seriesIds;

                                                return generationDB.save()
                                                    .then(() => {
                                                        return generationDB._id.toString();
                                                    })

                                            })

                                    });

                            });

                            return Promise.all(generationPromises)
                                .then((generationIds) => {
                                    modelDB.generations = generationIds;

                                    return modelDB.save();

                                });

                        });

                });

                return Promise.all(modelPromises);

            });

    }

}

export default ModelSeeder;