const mongoose = require('mongoose');
const Product = require('./models/Product');
const Category = require('./models/Category');

mongoose.connect('mongodb://localhost:27017/supermarket', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');

  // Helper to find category ID by name
  const getCatId = async (name) => {
    const cat = await Category.findOne({ name: name });
    return cat ? cat._id : null;
  };

  const dairyId = await getCatId('Dairy Products');
  const eggsId = await getCatId('Eggs');
  const bakeryId = await getCatId('Buns & Bakery');

  if (!dairyId || !eggsId || !bakeryId) {
    console.log('One or more categories not found. Please check names.');
    console.log(`Dairy Products: ${dairyId}`);
    console.log(`Eggs: ${eggsId}`);
    console.log(`Buns & Bakery: ${bakeryId}`);
    process.exit(1);
  }

  const newProducts = [
    {
      name: 'Fresh Toned Milk',
      description: 'Pasteurized toned milk, rich in calcium and protein.',
      price: 50,
      originalPrice: 55,
      category: dairyId,
      stock: 100,
      unit: 'Liters',
      quantity: 1,
      image: { url: '/images/products/milk.jpg' }, // Placeholder
      tags: ['milk', 'dairy', 'fresh', 'breakfast']
    },
    {
      name: 'Full Cream Milk',
      description: 'Rich and creamy full cream milk.',
      price: 32,
      originalPrice: 35,
      category: dairyId,
      stock: 80,
      unit: 'Liters',
      quantity: 0.5,
      image: { url: '/images/products/milk-fullcream.jpg' }, // Placeholder
      tags: ['milk', 'dairy', 'creamy']
    },
    {
      name: 'Farm Fresh Eggs (6 pcs)',
      description: 'Naturally laid eggs, rich in protein.',
      price: 45,
      originalPrice: 50,
      category: eggsId,
      stock: 200,
      unit: 'Pieces',
      quantity: 6,
      image: { url: '/images/products/eggs.jpg' }, // Placeholder
      tags: ['eggs', 'protein', 'breakfast']
    },
    {
      name: 'Brown Eggs (12 pcs)',
      description: 'Healthy brown eggs.',
      price: 110,
      originalPrice: 120,
      category: eggsId,
      stock: 150,
      unit: 'Pieces',
      quantity: 12,
      image: { url: '/images/products/brown-eggs.jpg' }, // Placeholder
      tags: ['eggs', 'brown eggs', 'healthy']
    },
    {
      name: 'Whole Wheat Bread',
      description: 'Freshly baked whole wheat bread, high in fiber.',
      price: 40,
      originalPrice: 45,
      category: bakeryId,
      stock: 50,
      unit: 'Pack',
      quantity: 1,
      image: { url: '/images/products/wheat-bread.jpg' }, // Placeholder
      tags: ['bread', 'wheat', 'bakery', 'breakfast']
    },
    {
      name: 'Sandwich White Bread',
      description: 'Soft white bread perfect for sandwiches.',
      price: 35,
      originalPrice: 40,
      category: bakeryId,
      stock: 60,
      unit: 'Pack',
      quantity: 1,
      image: { url: '/images/products/white-bread.jpg' }, // Placeholder
      tags: ['bread', 'white bread', 'bakery']
    }
  ];

  for (const productData of newProducts) {
    // Check if product exists to avoid duplicates
    const existing = await Product.findOne({ name: productData.name });
    if (!existing) {
      await Product.create(productData);
      console.log(`Added: ${productData.name}`);
    } else {
      console.log(`Skipped (Exists): ${productData.name}`);
    }
  }

  console.log('Product addition complete.');
  process.exit(0);
})
.catch(err => {
  console.error(err);
  process.exit(1);
});
