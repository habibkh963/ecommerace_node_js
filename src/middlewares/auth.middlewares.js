const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: req.t.TOKEN_REQUIRED });
        }

        const token = authHeader.split(" ")[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({ message: req.t.TOKEN_REQUIRED });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; // { id, email }

        next();
    } catch (err) {
        return res.status(401).json({ message: req.t.TOKEN_INVALID });
    }
};
