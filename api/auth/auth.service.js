const bcrypt = require('bcryptjs')
const userService = require('../user/user.service')

const saltRounds = 10

async function login(email, pass) {
    if (!email || !pass) return Promise.reject('email and password are required!')

    const user = await userService.getByEmail(email)
    if (!user) return Promise.reject('Invalid email or password')
    const match = await bcrypt.compare(pass, user.pass)
    if (!match) return Promise.reject('Invalid email or password')

    delete user.pass;
    return user;
    // return { email, username: user.username, userId: user._id }
}

async function signup(email, pass, username) {
    if (!email || !pass || !username) return Promise.reject('email, username and password are required!')

    const hash = await bcrypt.hash(pass, saltRounds)
    return userService.add({email, pass: hash, username})
}

module.exports = {
    signup,
    login,
}