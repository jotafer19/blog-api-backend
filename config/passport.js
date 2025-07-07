const passport = require("passport")
const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const { getUserById } = require("../services/authService")

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY
}

passport.use(new JwtStrategy(opts, async (payload, done) => {
    try {
        const user = await getUserById(payload.id)

        if (!user) return done(null, false)

        return done(null, user)
    } catch (err) {
        return done(err, false)
    }
}))

module.exports = passport