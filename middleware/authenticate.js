const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET


const authenticateUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Token not here...Please log in' });
    }
    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next()
    } catch (error) {
        console.error("Token verification error:", error)
        return res.status(403).json({ message: 'Invalid or expired token' })
    }
}

module.exports=authenticateUser