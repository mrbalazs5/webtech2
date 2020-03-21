import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true, minLength: 6},
    name: {type: String, required: true},
    birthDate: {type: Date},
    avatar: {type: String},
    dealerships: [{ type: Schema.Types.ObjectId, ref: 'Dealership' }]
}, {
    timestamps: true
});

export default mongoose.model('User', User);