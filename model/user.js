const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const validator = require('validator')
const response = require('express')


const userSchema = new Schema({
    fullname: {
        type: String,
        required: [true, 'A user must have a name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'A user must have an emmail'],
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value);
            },
            message: 'Invalid email address',
        },
    },
    active: {
        type: Boolean,
        default: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    confirmPassword: {
        type: String,
        required: true,
        trim: true
    }
})
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
if(this.password ===this.confirmPassword){
    this.password = await bcrypt.hash(this.password, 12)
    this.confirmPassword = ''
}
else{
    throw new Error('password does not match')
}
   
})
userSchema.methods.isValidPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

const userModel = mongoose.model('user', userSchema)
module.exports = { userModel }