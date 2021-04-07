// Events Router
// /api/events

const { Router } = require("express");
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");
const { validJWT } = require("../middlewares/valid-jwt");
const { check } = require("express-validator");
const { validFields } = require("../middlewares/valid-fields");

const router = Router();

router.use(validJWT);

router.get("/", getEvents);
router.post("/",
    [
        check("title", "El titulo es obligatorio").not().isEmpty(),
        check("start", "La fecha de inicio no es valida").isDate(),
        check("end", "La fecha final no es valida").isDate(),
        validFields
    ]
    , createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

module.exports = router;