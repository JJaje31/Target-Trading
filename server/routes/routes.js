const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');
const authMiddleware = require('./authorized')

router.post('/signin',controller.signIn)

router.post('/signup',controller.newUser)

router.post('/api/adviser',authMiddleware,controller.investmentAI)

router.post('/api/addstock',authMiddleware,controller.addStock)

router.post('/api/userstocks',authMiddleware,controller.userStocks)

router.delete('/api/stockdelete/:id',authMiddleware,controller.deleteStock)

router.put('/api/updateshares/:id',authMiddleware,controller.addShare);

router.post('/api/user/adviser',authMiddleware,controller.myStockInvestmentAI)

module.exports = router;
