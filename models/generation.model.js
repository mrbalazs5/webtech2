import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Generation = new Schema({
    name: { type: String, required: true },
    yearBegin: { type: Number, required: true },
    yearEnd: { type: Number, required: true },
    model: { type: Schema.Types.ObjectId, ref: 'Model', required: true },
    series: [{ type: Schema.Types.ObjectId, ref: 'Series' }]
}, {
    timestamps: true
});

export default mongoose.model('Generation', Generation);