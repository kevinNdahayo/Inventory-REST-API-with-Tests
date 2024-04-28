const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).json({
        message: "No Token Provided"
    })

    jwt.verify(token, process.env.SECRET, (err, user) => {
        console.log(err)
        if (err) return res.status(403).json({
            message: "Invalid Token"
        })
        req.user = user
        next()
    })
}

module.exports = authenticateToken;