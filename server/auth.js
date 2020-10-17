const {AuthenticationError} = require('apollo-server')

const jwt = require('jsonwebtoken')
const {users} = require('./models/index')
const secret = 'catpack'

const createToken = ({id, role}) => jwt.sign({id, role }, secret)

const getUserFromToken = token => {
    try {
        const user = jwt.verify(token, secret)
        return users.findOne({id: user.id})
    } catch (e) {
        return null
    }

}

const authenticated = next => (root, args, context, info) => {
    if (!context.user) {
        throw new AuthenticationError('must authenticate')
    }

    return next(root, args, context, info)
}

const authorized = (role, next) => (root, args, context, info) => {
    if (context.user.role !== role) {
        throw new AuthenticationError(`you must have ${role} role`)
    }

    return next(root, args, context, info)
}

module.exports = {
    getUserFromToken,
    authenticated,
    authorized,
    createToken
}
