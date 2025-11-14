const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next){
    console.log('Checking for Auth')
    const tokenCookie = req.cookies?.token;
    console.log(req.cookies)
    req.user = null;
    // console.log(req)
    if (!tokenCookie){
        return next(); 
    }
    console.log('We have Token')
    const token = tokenCookie;
    const user = getUser(token);
    req.user = user;
    return next();
}

function restrictTo(roles = []){
    // console.log(req);
    console.log('Checking Restricted')
    return function(req, res, next){
        console.log('checking');
        if (!req.user){
            console.log('requesting login')
            return res.redirect("/login")
        }
        if (!roles.includes(req.user.role)){
            res.end('Unauthorized')
        }
        return next();
    }
}

module.exports = {
    checkForAuthentication,
    restrictTo,
}