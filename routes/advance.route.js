import { Router } from "express";
import { getBillingPending, getTotalMounts, getTransactionPlatform } from "../controllers/advance.controller.js";


const router = Router();

router.get('/total-pay', getTotalMounts);
router.get('/billing/pending', getBillingPending);
router.get('/transactions/platform', getTransactionPlatform);

export default router;