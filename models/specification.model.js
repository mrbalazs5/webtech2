import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Specification = new Schema({
    engine: { type: String },
    enginePower: { type: Number},
    gearType: { type: Number},
    numberOfGears: { type: Number},
    numberOfWheels: { type: Number},
    width: { type: Number},
    length: { type: Number},
    seatingCapacity: { type: Number},
    maxSpeed: { type: Number},
    fullWeight: { type: Number},
    fuelCapacity: { type: Number},
    fuelConsumption: { type: Number},
    series: { type: Schema.Types.ObjectId, ref: 'Series' }
}, {
    timestamps: true
});

export default mongoose.model('Specification', Specification);