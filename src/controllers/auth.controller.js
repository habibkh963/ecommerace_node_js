const bcrypt = require("bcrypt");
const User = require("../models/user.model.js");
const generateToken = require("../utils/generate_token");

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exists = await User.findOne({ where: { email } });
        if (exists) {
            return res.status(400).json({ message: req.t.EMAIL_EXISTS });

        }

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashed,
        });

        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: req.t.SERVER_ERROR });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: req.t.INVALID_CREDENTIALS });


        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: req.t.INVALID_CREDENTIALS });


        }

        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
        });
    } catch (err) {

        return res.status(500).json({ message: req.t.SERVER_ERROR });

    }
};
