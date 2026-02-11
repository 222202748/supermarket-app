require('dotenv').config();
const mongoose = require('mongoose');
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
  
  const categories = await Category.find({ parentCategory: null });
  console.log('Parent Categories:');
  categories.forEach(c => {
    console.log(`Name: "${c.name}", Slug: "${c.slug}", ID: ${c._id}`);
  });
  
  // Also check if any products are linked to these categories
  const Product = require('./models/Product');
  const count = await Product.countDocuments();
  console.log(`Total Products: ${count}`);

  process.exit(0);
})
.catch(err => {
  console.error(err);
  process.exit(1);
});
