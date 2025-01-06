const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const stockSchema = require('./stock');
const { trusted } = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{type:String,required:trusted},
    email:{type:String,required:true,select:false},
    password:{type:String,required:true,select:false },
    passwordHash:{type:String},
    stocks:[stockSchema]
});

userSchema.pre('save', async function(next){
    if(this.isModified('username') || this.isNew){
        const exsistingUser = await mongoose.model('User').findOne({username:this.username})
        if(exsistingUser){
            const error = new Error('Username is already taken');
            return next(error)
        }
    }
    next()
})

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.passwordHash = await bcrypt.hash(this.password,10);
        this.password = undefined
    }
    next()
})

const User = mongoose.model('User',userSchema);
module.exports = User;