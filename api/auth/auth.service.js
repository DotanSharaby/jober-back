const bcrypt = require('bcryptjs')
const userService = require('../user/user.service')

const saltRounds = 10

async function login(email, password) {
    if (!email || !password) return Promise.reject('email and password are required!')

    const user = await userService.getByEmail(email)
    if (!user) return Promise.reject('Invalid email or password')
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid email or password')

    return { email, username: user.username, userId: user.id }
}

async function signup(email, password, username) {
    if (!email || !password || !username) return Promise.reject('email, username and password are required!')

    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({email, password: hash, username})
}

module.exports = {
    signup,
    login,
}