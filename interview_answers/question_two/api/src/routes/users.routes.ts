import express from 'express';
import { getUsers, loginUser } from '../controllers/user.controller';


const router = express.Router();

router.get("/", getUsers)
router.get("/login/:email/auth/:password", loginUser)


export default router;