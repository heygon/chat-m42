const express = require('express');
const multer = require('multer');
const multerConfig = require("./config/multer");
const routes = express.Router();


/***********
    Usuários
***********/
const UserController = require('./controllers/userController');
routes.post('/login', UserController.login);
routes.post('/register', UserController.register);


/***********
    Boxes
***********/
const BoxController  = require('./controllers/boxController');
routes.post('/newFolder', BoxController.store);
routes.get('/listfolder', BoxController.list);
routes.put('/removefolder', BoxController.remove);
routes.get('/folder/:id', BoxController.show);



/***********
    File controler
***********/
const FileController = require('./controllers/fileController');
routes.post("/folder/:id/files", multer(multerConfig).single("file"), FileController.store);

module.exports = routes;