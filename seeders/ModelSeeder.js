import Make from '../models/make.model';
import Model from '../models/model.model';

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

        return Make.create(makes)
            .then((makes) => {

                const models = [
                    {
                        name: 'Leon',
                        make: makes[0]._id.toString(),
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
                        make: makes[0]._id.toString(),
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
                    }
                ];

                return Model.create(models);

            });

    }

}

export default ModelSeeder;