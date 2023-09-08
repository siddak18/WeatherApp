import express from 'express';
import { addfav, signin, signup, weatherinfo } from './controller.js';

const router=express.Router();

router.post("/",weatherinfo);
router.post("/signup",signup);
router.post("/signin",signin);
router.post("/addfav",addfav);
export default router;