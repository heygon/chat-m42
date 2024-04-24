const express  = require('express');
const mongoose = require('mongoose'); 
const path     = require('path');
const cors     = require('cors');
const env      = require('dotenv/config');


const app      = express(); 
const server   = require('http').Server(app);
const io       = require('socket.io')(server);
app.use(cors());


mongoose.connect(process.env.MONGO, { useNewUrlParser: true });


io.on('connection', socket => {
	socket.on("connectRoom", box => {
		socket.join(box);
	});
});


app.use((req, res, next) => {
	req.io = io;
	return next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use((req,res) => { res.json({ 'live':true }) });
app.use(require('./routes'));

server.listen(process.env.PORT || 3333);