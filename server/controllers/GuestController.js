const UserModel = require('../models/User');
var jwt = require('jsonwebtoken');
require('dotenv').config();
var bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = function(req,res) {
    const newUser = new UserModel(req.body);
    newUser.role = 2;//role = 0 : admin, 1: instructor and 2 : normal user
    const payload = {
        user_id: newUser._id
    }
    console.log('process.env.SECRET_KEY='+process.env.SECRET_KEY);
    var token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' });
    console.log('token='+process.env.SECRET_KEY);
    newUser.token = token;
    newUser.save((err,result) => {
        if(err) return res.status(404).json({err});
        return res.json({user: result});
    });
}

exports.login = function(req,res) {
    // check if email and password user enter is match with email and password in database
    if(!req.body.email || !req.body.password) {
        res.json({success: false, message:'Email and password is not provided!'});
    }
    UserModel.findOne({email: req.body.email}, function(err, user){
        if(err) res.json({success: false, message:'User not found!'});
        if(!user) {
            res.json({success: false, message:'User not found!'});
        }
        else{
            //check if password is match with password in database
            const isValidPassword = bcrypt.compareSync(req.body.password, user.password);
            if(!isValidPassword) {
                res.json({success: false, message:'Invalid password!'});
            }
            else {
                const payload = {
                    user_id: user._id
                }
                console.log('login success with user id='+user._id);
                console.log('process.env.SECRET_KEY='+process.env.SECRET_KEY);
                var token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' });
                console.log('token='+process.env.SECRET_KEY);
                console.log('user token='+user.token);
                if(user.token==''){
                    console.log('token is empty');
                    user.token = token;

                    user.save((errx,result) => {
                     
                        console.log('user.token after save='+user.token);
                        res.cookie('my_auth', token , {maxAge : 14*24*60*60*1000, httpOnly: true }).json({
                            success: true,
                            user: user
                        });
                    });

                }
                else{
                    console.log('user.token else222='+user.token);
                    User.verifyToken(user.token,function(err,userFound){
                        if(err) {
                            if(err.message=='jwt expired' || err.message=='invalid signature') {
                                var newToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '10d' });
                                console.log('token has been expired, create new token'+ newToken);
                                user.token = newToken;

                                user.save((errx,resultUser) => {
                                
                                    console.log('user.token after save with new token ='+newToken);
                                    res.cookie('my_auth', newToken , {maxAge : 14*24*60*60*1000, httpOnly: true }).json({
                                        success: true,
                                        user: resultUser
                                    });
                                });
                            }
                        }
                        else{
                            console.log('userFound22...........');
                            console.log(userFound);
                            //var newToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '10d' });
                            res.cookie('my_auth', userFound.token , {maxAge : 14*24*60*60*1000, httpOnly: true }).json({
                                success: true,
                                user: user
                            });
                        }
                    })
                }
                
            }
        }
    })
}

exports.logout = function(req,res) {
    
    User.findOneAndUpdate(
        {_id: req.user._id},
        {token: ''}
        ,function(err, user){
            console.log('user'+user.token);
            res.cookie('my_auth', user.token, {expiresIn : Date.now(), httpOnly: true }).json({
                success: true,
                user: user
            });
        })
    
}