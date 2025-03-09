

const express = require('express');

const app = express();

const port = 3000;

app.use(express.json());

// Mock data for demonstration purposes

let products = [
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 200 },
  { id: 3, name: 'Product 3', price: 300 }
];

// Get all products

app.get('/products', (req, res) => {
  res.json(products);
});

// Get product by ID

app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
});

// Add a new product

app.post('/products', (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
});

// Update a product by ID

app.put('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const updatedProduct = {
    id: productId,
    name: req.body.name || products[productIndex].name,
    price: req.body.price || products[productIndex].price
  };

  products[productIndex] = updatedProduct;

  res.json(updatedProduct);
});