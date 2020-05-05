import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Series = new Schema({
    name: { type: String, required: true },
    specification: { type: Schema.Types.ObjectId, ref: 'Specification' },
    generations: [{ type: Schema.Types.ObjectId, ref: 'Generation' }]
}, {
    timestamps: true
});

export default mongoose.model('Series', Series);