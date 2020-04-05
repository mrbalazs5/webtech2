import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Model = new Schema({
    name: { type: String, required: true, unique: true, dropDups: true },
    make: { type: Schema.Types.ObjectId, ref: 'Make', required: true },
    specification: { type: Schema.Types.ObjectId, ref: 'Specification' },
    series: [{ type: Schema.Types.ObjectId, ref: 'Series' }],
    vehicles: [{ type: Schema.Types.ObjectId, ref: 'Vehicle' }]
}, {
    timestamps: true
});

export default mongoose.model('Model', Model);