import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Address = new Schema({
    country: { type: Schema.Types.ObjectId, ref: 'Country', required: true},
    city: { type: Schema.Types.ObjectId, ref: 'City', required: true},
    street: { type: String, required: true}
}, {
    timestamps: true
});

export default mongoose.model('Address', Address);