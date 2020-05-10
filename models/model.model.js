import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Model = new Schema({
    name: { type: String, required: true, unique: true, dropDups: true },
    make: { type: Schema.Types.ObjectId, ref: 'Make', required: true },
    generations: [{ type: Schema.Types.ObjectId, ref: 'Generation' }]
}, {
    timestamps: true
});

export default mongoose.model('Model', Model);