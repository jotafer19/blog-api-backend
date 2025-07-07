const passport = require("../config/passport")

const isAuthenticated = passport.authenticate("jwt", { session: false })

module.exports = isAuthenticated