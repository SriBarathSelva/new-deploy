const express = require('express');
const transactionRouter = express.Router();
const controller = require('../controller/transaction')



transactionRouter.get('/', controller.listAllData)
transactionRouter.get('/:id', controller.getSingleData)
transactionRouter.post('/', controller.createNewData)
transactionRouter.put('/:id', controller.updateSingleData)
transactionRouter.delete('/:id', controller.deleteSingleData)

module.exports = transactionRouter;
