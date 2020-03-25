import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Country = new Schema({
    isoCode: {type: String, required: true},
    name: {type: String, required: true},
}, {
    timestamps: true
});

export default mongoose.model('Country', Country);