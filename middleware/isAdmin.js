const isAdmin = async (req, res, next) => {
    if (req.user && req.user.role === "ADMIN") {
        return next()
    }

    res.status(403).json({ message: "Admins only" })
}

module.exports = isAdmin