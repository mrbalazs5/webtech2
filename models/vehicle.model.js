import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Vehicle = new Schema({
    vehicleType: { type: Number, required: true },
    price: { type: Number },
    isServiced: { type: Boolean },
    image: { type: String, required: true },
    model: { type: Schema.Types.ObjectId, ref: 'Model' },
    generation: { type: Schema.Types.ObjectId, ref: 'Generation', required: true },
    series: { type: Schema.Types.ObjectId, ref: 'Series', required: true },
    dealership: { type: Schema.Types.ObjectId, ref: 'Dealership', required: true}
}, {
    timestamps: true
});

export default mongoose.model('Vehicle', Vehicle);