const { response } = require("express");
const Event = require("../models/Event");

const createEvent = async (req, res = response) => {

    const event = new Event(req.body);

    event.user = req.uid;

    try {
        console.log("aqui")
        const eventSave = await event.save();

        res.json({
            ok: true,
            event: eventSave
        });

    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok: false,
            msg: "Hubo un problema hable con el administrador"
        });
    }

};

const getEvents = async (req, res = response) => {

    const events = await Event.find().populate("user", "name");

    res.json({
        ok: true,
        events
    });
};

const updateEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: "El evento no existe"
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene permisos para editar el evento"
            });
        }

        const eventNew = {
            ...req.body,
            user: uid
        };

        const eventUpdate = await Event.findByIdAndUpdate(eventId, eventNew, { new: true });

        res.json({
            ok: true,
            eventUpdate
        });

    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok: false,
            msg: "Hubo un problema hable con el administrador"
        });
    };
};

const deleteEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: "El evento no existe"
            });
        };

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene permisos para eliminar el evento"
            });
        };

        await Event.findByIdAndDelete(eventId);

        res.json({
            ok: true
        });


    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok: false,
            msg: "Hubo un problema hable con el administrador"
        });
    };
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };