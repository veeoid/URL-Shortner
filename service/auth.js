// const sessionIdToUserMap = new Map();
const jwt = require('jsonwebtoken');
const SECRET = 'JWTSecret'; 


function setUser(user){
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
        },
        SECRET
    );
}

function getUser(token){
    if (!token || typeof token !== 'string'){
        return null;
    }

    try{
        return jwt.verify(token, SECRET);
    }catch(err){
        // Token is malformed/expired/invalid
        return null;
    }
}

module.exports = {
    setUser,
    getUser, 
}