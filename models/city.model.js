import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const City = new Schema({
    name: { type: String, required: true },
    postalCode: { type: Number }
}, {
    timestamps: true
});

export default mongoose.model('City', City);