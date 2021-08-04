const User = require('../models/User');

exports.isInstructor = function() {
   
    return function middleware(req,res,next) {
        console.log('req.user.role='+req.user.role);
        if(req.user.role=='1')
        {
            console.log('is instructor....');
            next();
        }
        else{
            console.log('is not instructor....');
            req.token = "";
                req.user= null;
                req.isAuth = false;
                req.message = 'You do not have permission to access this route...';
                return res.status(403).send({ 
                    success: false, 
                    message: 'You do not have permission to access this resource!' 
                });
        }
    }
}

exports.checkAuthenticate = function() {
   
    return function middleware(req,res,next) {
  
    // decode token
    if (req.cookies.my_auth) {
        var token = req.cookies.my_auth;
        console.log('token value in middlewareaa : ', token);
        console.log('ifkkkk');
        User.verifyToken(token,function(err,user){
            if(err) {
                /*return res.send({ 
                    success: false, 
                    message: err.message 
                });*/
                console.log('error in middleware...........');
                console.log(err);
                req.isAuth = false;
                req.message = err.message;
                next();
            }
            else{
                /*if(!user) return res.json({
                    isAuth: false,
                    error: true
                })*/
                console.log('usseryyyyyyyyyyyyyyyyyyyyyyy');
                console.log(user);
                req.token = token;
                req.user= user;
                req.isAuth = true;
                req.message = 'Get user information successfully!';
                next();
            }
        });
        
    } else {
        // if there is no token
        // return an error
        console.log('elase');
        /*return res.send({ 
            success: false, 
            message: 'No token provided.' 
        });*/
            req.isAuth = false;
            req.message = 'No token provided!';
            next();
        }
    }
}

exports.checkAdminAuthenticate = function() {
   
    return function middleware(req,res,next) {
    var token = req.cookies.c_auth;
    console.log('token value in middleware : ', token);
    // decode token
    if (token) {
        console.log('ifkkkk');
        User.verifyToken(token,function(err,user){
            if(err) throw err;
            if(!user) return res.json({
                isAuth: false,
                error: true
            })
            console.log('usser');
            console.log(user);
            if(user.role === 0) {
                req.token = token;
                req.user= user;
                next();
            }
            else{
                return res.status(403).send({ 
                    success: false, 
                    message: 'You do not have permission to access this resource!' 
                });
            }
            
        });
        /*// verifies secret and checks exp
        jwt.verify(token, process.env.superSecret, function(err, decoded) {      
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });    
            } else {
                // if everything is good, save to request for use in other routes
                console.log('decoded value :',decoded);
                req.decoded = decoded;   
                next(); 
            }
        });*/
    } else {
        // if there is no token
        // return an error
        console.log('elase');
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });
        }
    }
}

exports.checkRole = function() {
   
    return function middleware(req,res,next) {
    
    
                if(req.user.role=='1')
                {
                    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
                    req.token = token;
                    req.user= user;
                    req.isAuth = true;
                    req.message = 'Get user information successfully!';
                    next();
                }
                else{
                    console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
                    req.isAuth = false;
                    req.message = 'You do not have permission to access this route!';
                    next();
                }
    }
}

exports.checkUserAuthenticate = function() {
   
    return function middleware(req,res,next) {
    var token = req.cookies.c_auth;
    console.log('token value in middleware : ', token);
    // decode token
    if (token) {
        console.log('ifkkkk');
        User.verifyToken(token,function(err,user){
            if(err) throw err;
            if(!user) return res.json({
                isAuth: false,
                error: true
            })
            console.log('usser');
            console.log(user);
            if(user.role === 2) {
                req.token = token;
                req.user= user;
                next();
            }
            else{
                return res.status(403).send({ 
                    success: false, 
                    message: 'You do not have permission to access this resource!' 
                });
            }
            
        });
        /*// verifies secret and checks exp
        jwt.verify(token, process.env.superSecret, function(err, decoded) {      
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });    
            } else {
                // if everything is good, save to request for use in other routes
                console.log('decoded value :',decoded);
                req.decoded = decoded;   
                next(); 
            }
        });*/
    } else {
        // if there is no token
        // return an error
        console.log('elase');
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });
        }
    }
}
//module.exports = checkAuthenticate;