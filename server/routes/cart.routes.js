import express from 'express';
import { updateCart } from '../controllers/cart.controller.js';
import authUser from '../middleware/authUser';

const cartRouter = express.Router();

cartRouter.post('/update', authUser, updateCart);

export default cartRouter;