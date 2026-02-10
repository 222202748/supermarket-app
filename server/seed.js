const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');
const Product = require('./models/Product');

dotenv.config();

const categoriesData = [
  { name: 'Snack & Munchies', image: { url: 'https://images.unsplash.com/photo-1621939514649-28b5fe2dc6a3?auto=format&fit=crop&w=500&q=60' } },
  { name: 'Bakery & Biscuits', image: { url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=60' } },
  { name: 'Baby Care', image: { url: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=500&q=60' } },
  { name: 'Cold Drinks & Juices', image: { url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=60' } },
  { name: 'Toiletries', image: { url: 'https://images.unsplash.com/photo-1556228720-1987df21f727?auto=format&fit=crop&w=500&q=60' } },
  { name: 'Dairy, Bread & Eggs', image: { url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=500&q=60' } },
  { name: 'Chicken, Meat & Fish', image: { url: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=500&q=60' } },
  { name: 'Fruits & Vegetables', image: { url: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=500&q=60' } },
  { name: 'Pet Food', image: { url: 'https://images.unsplash.com/photo-1589924691195-41432c84c161?auto=format&fit=crop&w=500&q=60' } },
];

const productsData = {
  'Snack & Munchies': [
    { name: 'Potato Chips', price: 20, description: 'Crispy salted potato chips', unit: 'pack', stock: 100, isFeatured: true, image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=500&q=60' },
    { name: 'Salted Peanuts', price: 40, description: 'Roasted salted peanuts', unit: 'pack', stock: 50, image: 'https://images.unsplash.com/photo-1605333396915-47edadb30bc0?auto=format&fit=crop&w=500&q=60' },
  ],
  'Bakery & Biscuits': [
    { name: 'Whole Wheat Bread', price: 35, description: 'Freshly baked whole wheat bread', unit: 'pack', stock: 30, isFeatured: true, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=60' },
    { name: 'Chocolate Cookies', price: 50, description: 'Rich chocolate chip cookies', unit: 'pack', stock: 40, image: 'https://images.unsplash.com/photo-1499636138143-bd7cda054522?auto=format&fit=crop&w=500&q=60' },
  ],
  'Baby Care': [
    { name: 'Baby Diapers', price: 500, description: 'Soft and absorbent diapers', unit: 'pack', stock: 100, image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=500&q=60' },
    { name: 'Baby Lotion', price: 150, description: 'Gentle moisturizing lotion', unit: 'bottle', stock: 60, image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=500&q=60' },
  ],
  'Cold Drinks & Juices': [
    { name: 'Orange Juice', price: 80, description: 'Freshly squeezed orange juice', unit: 'bottle', stock: 40, isFeatured: true, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=500&q=60' },
    { name: 'Cola Drink', price: 40, description: 'Refreshing carbonated drink', unit: 'bottle', stock: 100, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=60' },
  ],
  'Toiletries': [
    { name: 'Toothpaste', price: 45, description: 'Minty fresh toothpaste', unit: 'tube', stock: 80, image: 'https://images.unsplash.com/photo-1556228720-1987df21f727?auto=format&fit=crop&w=500&q=60' },
    { name: 'Bath Soap', price: 25, description: 'Fragrant bath soap', unit: 'bar', stock: 100, image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=500&q=60' },
  ],
  'Dairy, Bread & Eggs': [
    { name: 'Fresh Milk', price: 60, description: 'Farm fresh cow milk', unit: 'liter', stock: 50, isFeatured: true, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=500&q=60' },
    { name: 'Eggs (Dozen)', price: 70, description: 'Fresh farm eggs', unit: 'pack', stock: 60, image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=500&q=60' },
  ],
  'Chicken, Meat & Fish': [
    { name: 'Chicken Breast', price: 250, description: 'Boneless chicken breast', unit: 'kg', stock: 30, isFeatured: true, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=500&q=60' },
    { name: 'Salmon Fillet', price: 500, description: 'Fresh salmon fillet', unit: 'kg', stock: 20, image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=500&q=60' },
  ],
  'Fruits & Vegetables': [
    { name: 'Fresh Tomatoes', price: 30, description: 'Red ripe tomatoes', unit: 'kg', stock: 100, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=60' },
    { name: 'Bananas', price: 40, description: 'Fresh yellow bananas', unit: 'dozen', stock: 80, isFeatured: true, image: 'https://images.unsplash.com/photo-1571771896612-9867564723a8?auto=format&fit=crop&w=500&q=60' },
  ],
  'Pet Food': [
    { name: 'Dog Food', price: 300, description: 'Nutritious food for dogs', unit: 'pack', stock: 40, image: 'https://images.unsplash.com/photo-1589924691195-41432c84c161?auto=format&fit=crop&w=500&q=60' },
    { name: 'Cat Food', price: 250, description: 'Delicious food for cats', unit: 'pack', stock: 40, image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=500&q=60' },
  ],
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/supermarket');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Insert Categories
    const categoriesWithSlugs = categoriesData.map(c => ({
      ...c,
      slug: c.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and').replace(/[^\w-]+/g, '')
    }));

    const createdCategories = await Category.insertMany(categoriesWithSlugs);
    console.log('Categories created');

    // Insert Products
    const productsToInsert = [];
    for (const category of createdCategories) {
      const products = productsData[category.name];
      if (products) {
        products.forEach(p => {
          productsToInsert.push({
            ...p,
            category: category._id,
            images: [{ url: p.image }],
          });
        });
      }
    }

    await Product.insertMany(productsToInsert);
    console.log('Products created');

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
