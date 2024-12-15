const jwt=require('jsonwebtoken')
require('dotenv').config()

const SECRET = process.env.SECRET || 'ehwrjgffdrtftgyhuj'
const authenticateUser = (req, res, next) => {
    const token = req.cookies.token;
    console.log("Token", token)
    if (!token) {
        return res.status(401).json({ message: 'Token not here...Please log in' });
    }
    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next()
        console.log("Decoded token", decoded)
    } catch (error) {
        console.error("Token verification error:", error)
        return res.status(403).json({ message: 'Invalid or expired token' })
    }
}


module.exports=authenticateUser
 