import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Vehicle = new Schema({
    vehicleType: { type: Number, required: true },
    price: { type: Number },
    isServiced: { type: Boolean },
    image: { type: String, required: true },
    model: { type: Schema.Types.ObjectId, ref: 'Model', required: true },
    dealership: { type: Schema.Types.ObjectId, ref: 'Dealership'}
}, {
    timestamps: true
});

export default mongoose.model('Vehicle', Vehicle);