const User = require('../models/user')
const {v4: uuidv4} = require('uuid');
const {getUser, setUser} = require('../service/auth')

async function handleUserSignup(req, res){
    const {name, email, password} = req.body;
    await User.create({
        name,
        email,
        password
    }) 
    return res.redirect("/");
}

async function handleLogin(req, res) {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    console.log('user', user, password)
    if (!user || user.password !== password){
        return res.render("login", {error: 'Wrong email/password'})
    }
    console.log('Looking for user')
    const token = setUser(user);
    // mark cookie httpOnly for slightly better security
    res.cookie("token", token, { httpOnly: true });
    return res.redirect('/');
}

module.exports = {
    handleUserSignup,
    handleLogin,
}