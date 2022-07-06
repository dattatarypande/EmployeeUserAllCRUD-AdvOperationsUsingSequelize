let jwt = require("jsonwebtoken");
let checkToken = (req, res, next) => {
    const token = req.headers.token;

    if (token) {
        jwt.verify(token, "node", (err, decoded) => {
            if (err) {

                return res.status(401).json({
                    message: "Token is not valid",
                });
            } else {
                req.user = decoded;

                if (!req.user.ID) {
                    return res.status(401).json({
                        message: "Unauthorized attempt!",
                    });
                } else {
                    next();
                }
            }
        });
    } else {

        return res.status(401).json({
            error: true,
            message: "Auth token is not supplied",
        });
    }
};



module.exports = {
    checkToken
};