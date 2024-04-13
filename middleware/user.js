const { User } = require('../db');

const { JWT_SECRET } = require("../config");

const jwt = require("jsonwebtoken");

//Midleware for handling authentication
function userMiddleware(req, res, next)
{
    const token = req.headers.authorization;  // eg. "Bearer haslchaslchak3hjqewdkq"

    //get back only the token from the string, ie excluding "Bearer"
    const words = token.split(" ");   // ["Bearer", "haslchaslchak3hjqewdkq"]

    const jwtToken = words[1];

    //Verify the jwtToken using the Secret key
    const decodedValue = jwt.verify(jwtToken, JWT_SECRET);

    if(decodedValue.username)  // where did this username came from? Ans - jwt has username and password encoded inside it
    {
        req.username = decodedValue.username;  // to obtain the username and pass it to the next middleware which could be used in purchasing courses
        next();
    }
    else
    {
        res.status(403).json({
            msg : "Incorrect credentials ! "
        })
    }

} 

module.exports = userMiddleware;