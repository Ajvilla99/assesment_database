import { Router } from "express";
import { getBillings, getBillingId, createBilling, editBilling, deleteBilling } from "../controllers/billing.controller.js";

const router = Router();

router.get('/', getBillings);
router.get('/:id', getBillingId);
router.post('/', createBilling);
router.patch('/:id', editBilling);
router.delete('/:id', deleteBilling);

export default router;