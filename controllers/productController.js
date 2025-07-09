import express from 'express';
import Product from '../models/product.js';
import validator from 'validator';
import User from '../models/user.js';
import JWTauth from '../middleware/auth.js';

// Save a new product

export async function saveProduct(req, res) {
  // Get user ID from authenticated user

   console.log("params "+  req.user._id); 

  req.body.createdBy = req.user._id // Assuming User._id is the ID of the authenticated user
  // If images are uploaded, process them
  

  // Create product data object
  const productData = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    displayprice: req.body.displayprice || req.body.price, // Default to price if not provided
    category: req.body.category,
    stock: req.body.stock,
    unit: req.body.unit,
    images: req.body.images || [], // Default to empty array if no images
    createdBy: createdBy,
    isFeatured: req.body.isFeatured || false,
    discount: req.body.discount || 0,
    tags: req.body.tags || [],
    shelfLife: req.body.shelfLife,
    storageInstructions: req.body.storageInstructions
  };

  // Create product in database
  const product = await Product.create(productData);
  console.log(productData.images);
    console.log(req.body.images);

  res.status(201).json({
    success: true,
    product
  });
};

export async function getAllProducts(req, res) {
  try {
    const products = await Product.find().populate('createdBy', 'firstName lastName email');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
}

export async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id).populate('createdBy', 'firstName lastName email');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
}

export async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
}

