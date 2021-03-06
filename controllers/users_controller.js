const User = require('../models/user');

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('users_profile', {
            title: "User Profile",
            profile_user: user
        });
    });
}


module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, {name: req.body.name, email: req.body.email}, function(err, user){  // we can also use req.body instead of this as it is same
            req.flash('success', 'Details Updated');
            return res.redirect('back');
        });
    }else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}

//render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('user_sign_up',{
        title: "Authentication | Sign Up"
    });
}

//Render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('user_sign_in',{
        title: "Authentication | Sign In"
    });
}

//get the sign up data
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }, function(err, user){
        if(err){
            req.flash('error', err);
            return;
        }
        if(!user){ // if user doesn't exist, create user
            User.create(req.body, function(err, user){
                if(err){
                    req.flash('error', err);
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        }else{ // if user exists then redirect to sign up page
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');     
        }
    });
}

//sign in and create session for user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout(); // this function is inbuilt in passport.js
    req.flash('success', 'You have logged out');
    return res.redirect('/');
}