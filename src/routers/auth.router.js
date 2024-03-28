import { Router } from "express";
import { UserController, ClientController, TransactionController, SavingsGoal } from "../controllers/controllers.js";
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
router.put("/update/client/:code", authMiddleware, ClientController.updateClient);
router.get("/get/client/:code", authMiddleware, ClientController.getClient);
router.get('/verify/user/:token', ClientController.verifyAccount);

//Transaction
router.post('/register/transaction', authMiddleware, TransactionController.registerTransaction);
router.put('/delete/transaction/:code', authMiddleware, TransactionController.deleteTransaction);
router.put('/update/transaction/:code', authMiddleware, TransactionController.updateTransaction);
router.get('/get/transaction/:code', authMiddleware, TransactionController.getTransaction);
router.get('/get/user/transactions/:code', authMiddleware, TransactionController.getUserTransactionsList);
router.post('/get/transactions/bydate/:code', authMiddleware, TransactionController.getUserTransactionsByDateRange);

//Savings Goal
router.post('/register/goal', authMiddleware, SavingsGoal.registerSavingGoals);
router.put('/delete/goal/:code', authMiddleware, SavingsGoal.deleteSavingGoals);
router.put('/update/goal/:code', authMiddleware, SavingsGoal.updateSavingGoals);
router.get('/get/goal/:code', authMiddleware, SavingsGoal.getsavingGoals);

export default router;