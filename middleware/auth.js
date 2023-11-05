const jwt = require("jsonwebtoken");
exports.auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.token;
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.secret_key, (err, men) => {
                if (err) {
                    return res.status(401).json({ message: "Invalid Token" });
                }
                req.men = men;
                next();
            });
        } else {
            res.status(403).json({ message: "You are not authenticated" });
        }
    } catch (error) {
        console.error("Token is invalid", error);
    }
};