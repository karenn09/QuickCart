import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    image: { type: String, required: true },
    cartItems: { type: String, default: {}}
    
}, { minimize: false })

const User = mongoose.models.User || mongoose.model('User', userSchema)