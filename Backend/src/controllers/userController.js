const User = require('../models/User');

class UserController {
    async register(req, res) {

        const user = await User.create({ 
            nome  :req.body.nome,
            email :req.body.email,
            senha :req.body.senha,
            Perfil:1,
            Status:1
        });
        return res.json(user);
    }

    async login(req, res) {

        const box = await Box.find({
            nome:req.body.login,
            senha: req.body.senha
        }).populate({
            path: "files"
        });

        return res.json(box);
    }
}

module.exports = new UserController();