// Events Router
// /api/events

const { Router } = require("express");
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");
const { validJWT } = require("../middlewares/valid-jwt");
const { check } = require("express-validator");
const { validFields } = require("../middlewares/valid-fields");
const { isDate } = require("../helpers/isDate");

const router = Router();

router.use(validJWT);

router.get("/", getEvents);

router.post("/",
    [
        check("title", "El titulo es obligatorio").not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validFields
    ]
    , createEvent);

    router.put("/:id", [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalización es obligatoria').custom(isDate),
    validFields
], updateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;