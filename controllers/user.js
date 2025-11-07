const User = require('../models/user')

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
    return res.redirect('/')
}

module.exports = {
    handleUserSignup,
    handleLogin,
}