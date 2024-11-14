const express = require('express');
const projectRouter = express.Router();
const controller = require('../controller/project.js')



projectRouter.get('/', controller.listAllData)
projectRouter.get('/:id', controller.getSingleData)
projectRouter.post('/', controller.createNewData)
projectRouter.put('/:id', controller.updateSingleData)
projectRouter.delete('/:id', controller.deleteSingleData)

module.exports = projectRouter;
