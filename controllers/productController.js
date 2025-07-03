import express from 'express';
import Product from '../models/product.js';
import validator from 'validator';

// Save a new product
export async function saveProduct(req, res){
  try {
    const { name, description, price, displayprice, category, stock, unit, images, createdBy } = req.body;

    // Validate product data
    if (!name || !description || !price || !category || !stock || !unit) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (!validator.isNumeric(price.toString()) || price < 0) {
      return res.status(400).json({ message: 'Price must be a positive number' });
    }

    if (displayprice && (!validator.isNumeric(displayprice.toString()) || displayprice < 0)) {
      return res.status(400).json({ message: 'Display Price must be a positive number' });
    }

    // Create new product
    const newProduct = new Product({
      name,
      description,
      price,
      displayprice,
      category,
      stock,
      unit,
      images,
      createdBy
    });

    // Save to database
    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: 'Product created successfully',
      product: savedProduct
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};


export async function getAllProducts(req, res) {
  try {
    const products = await Product.find().populate('createdBy', 'firstName lastName email');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
}


