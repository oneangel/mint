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
router.delete('/deleteF/transaction/:code', authMiddleware, TransactionController.deleteTransactionF);
router.put('/recover/transaction/:code', authMiddleware, TransactionController.recoverTransaction);
router.put('/update/transaction/:code', authMiddleware, TransactionController.updateTransaction);
router.get('/get/transaction/:code', authMiddleware, TransactionController.getTransaction);
router.get('/get/user/transactions/:code', authMiddleware, TransactionController.getUserTransactionsList);
router.post('/get/transactions/bydate/:code', authMiddleware, TransactionController.getUserTransactionsByDateRange);
router.post('/get/incomes/bydate/:code', authMiddleware, TransactionController.getIncomesByDateRange);
router.post('/get/expenses/bydate/:code', authMiddleware, TransactionController.getExpensesByDateRange);
router.post('/get/expensesTotal/bydate/:code', authMiddleware, TransactionController.getExpensesByRangeTotal);
router.post('/get/incomesTotal/bydate/:code', authMiddleware, TransactionController.getIncomesByRangeTotal);
router.get('/get/expensesTotal/:code', authMiddleware, TransactionController.getExpensesTotal);
router.get('/get/incomesTotal/:code', authMiddleware, TransactionController.getIncomesTotal);
router.get('/get/transaction/balance/:code', authMiddleware, TransactionController.getBalanceAccount);
router.get('/get/transaction/last-ones/:code', authMiddleware, TransactionController.getLastTransactions);
router.get('/get/incomes/list/:code', authMiddleware, TransactionController.getIncomesList);
router.get('/get/expenses/list/:code', authMiddleware, TransactionController.getExpensesList);

//Savings Goal
router.post('/register/goal', authMiddleware, SavingsGoal.registerSavingGoals);
router.delete('/delete/goal/:code', authMiddleware, SavingsGoal.deleteSavingGoals);
router.put('/update/goal/:code', authMiddleware, SavingsGoal.updateSavingGoals);
router.get('/get/goals/:code', authMiddleware, SavingsGoal.getsavingGoals);
router.put('/add/amount/goal/:code', authMiddleware, SavingsGoal.addAmountGoal);

//Meter
router.post('/register/meter', MeterController.registerMeter);
router.get('/get/meter/:code', MeterController.getMeter);
router.put('/link/meter', authMiddleware, MeterController.linkMeter);

//Service
router.put('/register/service', ServiceController.registerService);
router.post('/get/totalMonthMeasure/:code', authMiddleware, ServiceController.getTotalEMonthMeasure);
router.post('/get/totalTMeasure/:code', authMiddleware, ServiceController.getTotalTemperatureMeasure);
router.post('/get/tariff/cost/:code', authMiddleware, ServiceController.getTarrifCost);
router.post('/get/tariff/water/cost/:code', authMiddleware, ServiceController.getTarrifWaterCost);
router.post('/get/services/list/:code', authMiddleware, ServiceController.getServicesList);

//Tariff electricity
router.post('/register/tariff', authMiddleware, TariffController.registerTariff);
router.get('/get/tariff/:code', authMiddleware, TariffController.getTariff);

//Tariff water
router.post('/register/tariff/water', authMiddleware, TariffWController.registerTariffW);
router.get('/get/tariff/water/:code', authMiddleware, TariffWController.getTariffW);

//Upload image
router.put('/update/imageProfile/:code', authMiddleware, ClientController.updateImage);

//Verify token
router.get('/verify-token', authMiddleware, (req, res) => { res.json({ message: 'Acceso permitido' }) })

export default router;