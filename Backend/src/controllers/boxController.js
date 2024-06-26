const Box = require('../models/box');

class BoxController {
    async store(req, res) {

        const box = await Box.create({ title: req.body.title });
        return res.json(box);
    }

    async show(req, res) {

        const box = await Box.findById(req.params.id).populate({
            path: "files",
            options: { sort: { createdAt: 1 } }
        });

        return res.json(box);
    }

    async list(req, res) {
        const box = await Box.find();
        return res.json(box);
    }
    
    async remove(req, res) {
        const box = await Box.find();
        return res.json(box);
    }
}

module.exports = new BoxController();