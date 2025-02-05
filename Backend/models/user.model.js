const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const Schema = mongoose.Schema;

//the schema of the user model i.e. how it is stored in a mongoose dB 
const userSchema = new Schema({
    fullname : {
        firstname :{
            type: String,
            required: true,
            minlength :[3, 'First name must be at least 3 characters long']
        },
        lastname : String   
    },
    email :{
        type :String,
        required : true,
        unique : true,
        minlength :[3, 'Email must be at least 3 characters long']
    },
    password : {
        type : String,
        required : true,
        select : false,
    },
    socketId :{
        type: String,
    }
})

//to generate a token 
userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id : this._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
    return token;
}

//to compare if the password is correct
userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password);
}

//converting password to hash
userSchema.statics.hashPassword = async function (password){
    return await bcrypt.hash(password, 10);
}

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;
