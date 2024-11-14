const express = require('express');
const configurationRouter = express.Router();
const controller = require('../controller/configuration')



configurationRouter.get('/', controller.listAllData)
configurationRouter.get('/:id', controller.getSingleData)
configurationRouter.post('/', controller.createNewData)
configurationRouter.put('/:id', controller.updateSingleData)
configurationRouter.delete('/:id', controller.deleteSingleData)

module.exports = configurationRouter;
