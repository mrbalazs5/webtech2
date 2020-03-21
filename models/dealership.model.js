import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Dealership = new Schema({
    name: {type: String, required: true},
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    models: [{ type: Schema.Types.ObjectId, ref: 'Model' }],
    address: { type: Schema.Types.ObjectId, ref: 'Address' },
}, {
    timestamps: true
});

export default mongoose.model('Dealership', Dealership);