const jwt = require('jsonwebtoken');
require('dotenv').config();
const fetchuser=(req,res,next)=>{
    // Get the user from the jwt token and add id to req object.
    // A request header is an HTTP header that can be used in an HTTP request to provide information about the request context, so that the server can tailor the response.
    // can be used to supply authentication credentials (e.g. Authorization), to control caching, or to get information about the user agent or referrer, etc.
    const token = req.header('auth-token');
    if(!token){
        // 401 is access denied.
        res.status(401).send({error: " Please authenticate a valid token"})
    }

    try {
        const data = jwt.verify(token, process.env.JWTSECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error: " Please authenticate a valid token"});
    }
}
module.exports = fetchuser;
