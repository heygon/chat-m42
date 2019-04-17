const express = require('express');
const multer = require('multer');
const multerConfig = require("./config/multer");
const routes = express.Router();

const UserController = require('./controllers/UserController');
const BoxController  = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');

routes.post('/login', UserController.login);
routes.post('/newFolder', BoxController.store);
routes.get('/listfolder', BoxController.list);
routes.put('/removefolder', BoxController.remove);
routes.get('/folder/:id', BoxController.show);
routes.post("/folder/:id/files", multer(multerConfig).single("file"), FileController.store);

module.exports = routes;