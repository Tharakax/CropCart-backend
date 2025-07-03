import express from 'express';
import { getAllProducts, saveProduct } from '../controllers/productController.js';

const router = express.Router();

router.post("/", saveProduct);
router.get("/", getAllProducts);


export default router;