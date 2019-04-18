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
	senha:{
		type: String,
		required: true
	},
  avatar: [{ type: mongoose.Schema.Types.ObjectId, ref: "File"}],
  perfil:{
		type: String,
		required: true
  },
  status:{
		type: String,
		required: true
  }
},{
	timestamps: true
});

module.exports = mongoose.model('User', User);