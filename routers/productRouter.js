import express from 'express';
import { getAllProducts, saveProduct, getProductById, deleteProduct} from '../controllers/productController.js';

const router = express.Router();

router.post("/", saveProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);


export default router;