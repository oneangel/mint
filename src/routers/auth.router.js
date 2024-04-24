import { Router } from "express";
import {
  UserController,
  ClientController,
  TransactionController,
  SavingsGoal,
  MeterController,
  ServiceController,
  TariffController,
  TariffWController
} from "../controllers/controllers.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = Router();

//User routes
router.post("/login/user", UserController.login);
router.post("/register/user", UserController.register);
router.put("/delete/user/:code", authMiddleware, UserController.deleteUser);
router.put("/update/user/:code", authMiddleware, UserController.updateUser);
router.get("/get/user/:code", authMiddleware, UserController.getUser);

//Client routes
router.post("/register/client", ClientController.registerClient);
router.put("/delete/client/:code", authMiddleware, ClientController.deleteClient);
router.put("/update/client/:code", ClientController.updateClient);
router.get("/get/client/:code", authMiddleware, ClientController.getClient);
router.get('/verify/user/:token', ClientController.verifyAccount);

//Transaction
router.post('/register/transaction/:code', authMiddleware, TransactionController.registerTransaction);
router.put('/delete/transaction/:code', TransactionController.deleteTransaction);
router.delete('/deleteF/transaction/:code', TransactionController.deleteTransactionF);
router.put('/recover/transaction/:code', TransactionController.recoverTransaction);
router.put('/update/transaction/:code', TransactionController.updateTransaction);
router.get('/get/transaction/:code', authMiddleware, TransactionController.getTransaction);
router.get('/get/user/transactions/:code', authMiddleware, TransactionController.getUserTransactionsList);
router.post('/get/transactions/bydate/:code', authMiddleware, TransactionController.getUserTransactionsByDateRange);
router.post('/get/incomes/bydate/:code', authMiddleware, TransactionController.getIncomesByDateRange);
router.post('/get/expenses/bydate/:code', authMiddleware, TransactionController.getExpensesByDateRange);
router.post('/get/expensesTotal/bydate/:code', TransactionController.getExpensesByRangeTotal);
router.post('/get/incomesTotal/bydate/:code', TransactionController.getIncomesByRangeTotal);
router.get('/get/expensesTotal/:code', TransactionController.getExpensesTotal);
router.get('/get/incomesTotal/:code', TransactionController.getIncomesTotal);
router.get('/get/transaction/balance/:code', authMiddleware, TransactionController.getBalanceAccount);
router.get('/get/transaction/last-ones/:code', authMiddleware, TransactionController.getLastTransactions);
router.get('/get/incomes/list/:code', TransactionController.getIncomesList);
router.get('/get/expenses/list/:code', TransactionController.getExpensesList);

//Savings Goal
router.post('/register/goal', SavingsGoal.registerSavingGoals);
router.delete('/delete/goal/:code', SavingsGoal.deleteSavingGoals);
router.put('/update/goal/:code', authMiddleware, SavingsGoal.updateSavingGoals);
router.get('/get/goals/:code', authMiddleware, SavingsGoal.getsavingGoals);
router.put('/add/amount/goal/:code', SavingsGoal.addAmountGoal);

//Meter
router.post('/register/meter', MeterController.registerMeter);
router.get('/get/meter/:code', MeterController.getMeter);
router.put('/link/meter', MeterController.linkMeter);

//Service
router.put('/register/service', ServiceController.registerService);
router.post('/get/totalMonthMeasure/:code', ServiceController.getTotalEMonthMeasure);
router.post('/get/tariff/cost/:code', ServiceController.getTarrifCost);
router.post('/get/tariff/water/cost/:code', ServiceController.getTarrifWaterCost);
router.post('/get/services/list/:code', ServiceController.getServicesList);

//Tariff electricity
router.post('/register/tariff', TariffController.registerTariff);
router.get('/get/tariff/:code', TariffController.getTariff);

//Tariff water
router.post('/register/tariff/water', TariffWController.registerTariffW);
router.get('/get/tariff/water/:code', TariffWController.getTariffW);

//Upload image
router.put('/update/imageProfile/:code', ClientController.updateImage);

//Verify token
router.get('/verify-token', authMiddleware, (req, res) => { res.json({ message: 'Acceso permitido' }) })

export default router;