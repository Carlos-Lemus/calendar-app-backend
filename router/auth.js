// Rutas del usuario / auth
// host * /api/auth

const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");

const { validFields } = require("../middlewares/valid-fields");
const { createUser, loginUser, revalidToken } = require("../controllers/auth");
const { validJWT } = require("../middlewares/valid-jwt");


router.post(
    "/new",
    [ // middlewares
        check("name", "El name es obligatorio").not().isEmpty(),
        check("email", "El email no es valido").isEmail(),
        check("password", "El password debe de tener al menos 6 caracteres").isLength({ min: 6 }),
        validFields
    ],
    createUser
);

router.post("/",
    [ // middlewares
        check("email", "El email no es valido").isEmail(),
        check("password", "El password debe de contener al menos 6 caracteres").isLength({ min: 6 }),
        validFields
    ],
    loginUser
);

router.get("/renew", validJWT, revalidToken);

module.exports = router;