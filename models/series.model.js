import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Series = new Schema({
    name: { type: String, required: true },
    model: { type: Schema.Types.ObjectId, ref: 'Model', required: true },
    generations: [{ type: Schema.Types.ObjectId, ref: 'Generation' }]
}, {
    timestamps: true
});

export default mongoose.model('Series', Series);