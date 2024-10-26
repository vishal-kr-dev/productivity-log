const jwt = require('jsonwebtoken');
const JsonWebTokenError = require('jsonwebtoken/lib/JsonWebTokenError');
require('dotenv').config();



const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    // Get the token from Authorisation Header

    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if(!token)
        res.status(403).json({ message: "Token is require for Authorisation"});
    
    // Verify the token
    console.log(token)
    // console.log(JWT_SECRET);

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if(err){
            console.log("This will be the error");

            res.status(401).json({ message: "Invalid token"})

        }
        console.log("If statement did not run");
        req.user = decoded;
        console.log(req.user);
        next();  // Call next to proceed to next middleware
    })
    
    

}

module.exports = authMiddleware;