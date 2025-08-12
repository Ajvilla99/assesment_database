import { Router } from "express";
import { getUserId, getUsers } from "../controllers/users.controller.js";

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserId);

export default router;