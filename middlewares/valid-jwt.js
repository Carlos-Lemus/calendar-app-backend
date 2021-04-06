const { response } = require("express");
const jwt = require("jsonwebtoken");

const validJWT = (req, res = response, next) => {

    const token = req.header("x-token");

    if(!token) {
        res.status(400).json({
            ok: false,
            msg: "El token no existe"
        });
    }

    try {
        const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

            req.uid = uid;
            req.name = name;

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "El token no es valido"
        });
    }

    next();
};

module.exports = {
    validJWT
};