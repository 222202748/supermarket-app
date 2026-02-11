require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Category = require('./models/Category');

mongoose.connect(process.env.MONGO_URI, {
  serverApi: {
    version: mongoose.mongo.ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})
.then(async () => {
  console.log('Connected to MongoDB');
  
  const productCount = await Product.countDocuments();
  console.log(`Total products: ${productCount}`);
  
  if (productCount > 0) {
    const products = await Product.find().limit(5).populate('category');
    console.log('Sample products categories:');
    products.forEach(p => {
      console.log(`- Product: ${p.name}, Category: ${p.category ? p.category.name : 'Uncategorized'} (${p.category ? p.category._id : 'null'})`);
    });
  }

  const categories = await Category.find({ parentCategory: null }).limit(5);
  console.log('Sample parent categories:');
  categories.forEach(c => {
    console.log(`- ${c.name} (${c._id})`);
  });

  process.exit(0);
})
.catch(err => {
  console.error(err);
  process.exit(1);
});
