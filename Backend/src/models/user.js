const mongoose = require('mongoose');

const User = new mongoose.Schema({
	nome:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true
    },
    Rash:{
		type: String,
		required: true
    },
    avatar: [{ type: mongoose.Schema.Types.ObjectId, ref: "File"}],
    Perfil:{
		type: String,
		required: true
    },
    Status:{
		type: String,
		required: true
    }
},{
	timestamps: true
});

module.exports = mongoose.model('User', User);