const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
// get config vars
dotenv.config();

exports.adminOnly = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if(!user.admin) return res.sendStatus(401);
        
            if (err) return res.sendStatus(403)
            req.user = user
        
            next()
          })
    } else {
        res.sendStatus(401);
    }
};

exports.authorized = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)
            req.user = user
        
            next()
          })
    } else {
        res.sendStatus(401);
    }
};