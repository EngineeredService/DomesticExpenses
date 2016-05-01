/**
 * 
 * @type Application Resource
 * DailyExpenses
 */
var express = require('express');
var router = express.Router();
var assert = require('assert');
var authController = require('../controller/auth');
var expenseController = require('../controller/DailyExpensesController');

router.route('/')
        .post(authController.isAuthenticated, expenseController.createExpense)
        .get(authController.isAuthenticated, expenseController.getExpenses);

router.route('/:id')
        .get(authController.isAuthenticated, expenseController.getExpenseById)
        


module.exports = router;
