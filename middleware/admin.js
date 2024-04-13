
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config");

// const { Admin } = require("../db");

//Midleware for handling authentication
function adminMiddleware(req, res, next)
{
    //Implement admin authentication
    //You need to check the headers and validate the admin from the admin database
    //Check readme for the exact headers to be expected

    //Unlike last assignment, you will no longer get username and password in header,
    // instead you will get a token

    const token = req.headers.authorization;  // eg. "Bearer haslchaslchak3hjqewdkq"

    //get back only the token from the string, ie excluding "Bearer"
    const words = token.split(" ");   // ["Bearer", "haslchaslchak3hjqewdkq"]

    const jwtToken = words[1];

    try{
        //Verify the jwtToken using the Secret key
    const decodedValue = jwt.verify(jwtToken, JWT_SECRET);

    if(decodedValue.username)  // where did this username came from? Ans - jwt has username and password encoded inside it
    {
        next();
    }
    else
    {
        res.status(403).json({
            msg : "Incorrect credentials ! "
        })
    }
    }
    catch(e)
    {
        res.status(403).json({
            msg : "Incorrect credentials ! "
        })
    }


} 

module.exports = adminMiddleware;