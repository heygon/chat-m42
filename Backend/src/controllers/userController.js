const User = require('../models/user');

class UserController {
    async register(req, res) {

        try {
            const user = await User.create(req.body);
            return res.status(200).json(user);    
        } catch (error) {
            return res.status(400).json({ resp : "Erro ao cadastrar usuário" });
        }

    }

    async update(req, res) {

        const user = await User.findById(req.body.id)
        user.nome   = req.body.nome
        user.email  = req.body.email
        user.senha  = req.body.senha
        user.perfil = req.body.perfil
        user.status = req.body.status

        try {
            user.save()
            return res.status(200).json(user);    
        } catch (error) {
            return res.status(400).json({ resp : "Erro ao editar usuário" });
        }
        
    }

    async login(req, res) {
        try {
            const lg = await User.find({
                email :req.body.email,
                senha: req.body.senha
            });
    
            return res.status(200).json(lg);    
        } catch (error) {
            return res.status(400).json({ resp : "Erro ao realizar login" });
        }
        
    }

    async recuperarSenha(req, res) {

        const user = await User.findById(req.body.id)
        
        try {
            return res.status(200).json(user);    
        } catch (error) {
            return res.status(400).json({ resp : "Erro ao editar usuário" });
        }
        
    }

}

module.exports = new UserController();