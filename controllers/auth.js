const { response } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../helpers/jwt");

const createUser = async (req, res = response) => {

    try {

        const { email, password } = req.body;
        
        const verifyEmail = await User.findOne({ email });

        if(verifyEmail) {
            return res.status(400).json({
                ok: false,
                msg: "Un usuario ya esta registrado con el email"
            });
        }

        
        const user = new User(req.body);
        
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        
        await user.save();

        // Generar token
        const token = await generateToken(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hubo un erro hable con el administrador"
        });
    }

};

const loginUser = async(req, res = response) => {

    
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email})

        if(!user) {
            res.status(400).json({
                ok: false,
                msg: "El usuario no existe"
            });
        }

        const isVerifyPassword = bcrypt.compareSync(password, user.password);

        if(!isVerifyPassword) {
            res.status(400).json({
                ok: false,
                msg: "El password es incorrecto"
            });
        }

        // Generar token
        const token = await generateToken(user.id, user.name);
        
        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error en el email o password"
        })
    }
    
}

const revalidToken = async(req, res) => {
 
    try {
        const { uid, name } = req;
        
        // Generar JWT
        const token = await generateToken(uid, name);
    
        res.json({
            ok: true,
            uid, name, token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error en el email o password"
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    revalidToken
}