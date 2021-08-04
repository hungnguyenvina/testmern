var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()
var UserSchema = new Schema({
    name: {
        type: String,
        required: 'Please input full name',
        maxlength: 100
    },
    email: {
        type: String,
        required: 'Please input email',
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: 'Please input password'
    },
    role: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        default: 0
    },
    token: {
        type: String,
        default: ''
    },
    avatar_url: {
        type: String,
        default: ''
    },
    cart: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    }
});



UserSchema.pre('save', async function(next) {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(this.password, salt);
    console.log('hashedPassword..........................');
    console.log(hashedPassword);
    if (!this.isModified('password')) return next();
    this.password = hashedPassword;
    next();
})

UserSchema.statics.verifyToken = function(token, callback) {
    const user = this;
    console.log('process.env.SECRET_KEY: '+process.env.SECRET_KEY);
    console.log('token in verifytoken: '+token);
    jwt.verify(token, process.env.SECRET_KEY, function(err, decodeToken){
        console.log('err in verifytoken: ');
        console.log(err);
        if(err)  callback(err,null);
        else{
        if(!decodeToken) {
            callback(null,null);
        }
        else {
            console.log('decodeToken in verifytoken: '+decodeToken.user_id);
            user.findOne({ _id: decodeToken.user_id, token: token}, function(err2, userFound){
                console.log('userFound: '+userFound);
                if(err2) callback(err2,null);
                callback(null,userFound);
            })
        }
    }
    })
}


var User = mongoose.model('User',UserSchema);
module.exports = User;   