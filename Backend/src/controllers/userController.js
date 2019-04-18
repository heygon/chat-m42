const User = require('../models/User');

class UserController {
    async register(req, res) {

        const user = await User.create({ 
            nome  :req.body.nome,
            email :req.body.email,
            senha :req.body.senha,
            perfil:req.body.perfil,
            status:req.body.status
        });
        return res.json(user);
    }

    async login(req, res) {

        const lg = await User.find({
            email :req.body.email,
            senha: req.body.senha
        });

        return res.json(lg);
    }
}

module.exports = new UserController();