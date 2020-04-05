import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Make = new Schema({
    name: { type: String, required: true, unique: true, dropDups: true },
    models: [{ type: Schema.Types.ObjectId, ref: 'Model' }]
}, {
    timestamps: true
});

export default mongoose.model('Make', Make);