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
    user = await User.findOne({email})
    if (!user || user.password != password){
        return res.render("login", {error: 'Wrong email/password'})
    }
    const token = setUser(user);
    // mark cookie httpOnly for slightly better security
    res.cookie("uid", token, { httpOnly: true });
    return res.redirect('/')
}

module.exports = {
    handleUserSignup,
    handleLogin,
}