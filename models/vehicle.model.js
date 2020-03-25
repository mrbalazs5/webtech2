import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Vehicle = new Schema({
    model: { type: Schema.Types.ObjectId, ref: 'Model', required: true},
    vehicleType: {type: Number, required: true},
    price: {type: Number},
    image: {type: String, required: true}
}, {
    timestamps: true
});

export default mongoose.model('Vehicle', Vehicle);