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
  
  // Test with the new clean slug
  const slug = 'dairy-bread-and-eggs';
  console.log(`Testing with slug: ${slug}`);
  
  const categoryDoc = await Category.findOne({ slug: slug });
  if (!categoryDoc) {
    console.log('Category NOT found!');
    process.exit(1);
  }
  console.log(`Category found: ${categoryDoc.name} (${categoryDoc._id})`);
  
  // Check products
  // Logic from controller:
  // 1. Find subcategories
  const subCategories = await Category.find({ parentCategory: categoryDoc._id });
  console.log(`Subcategories: ${subCategories.length}`);
  
  // 2. Build ID list
  const categoryIds = [categoryDoc._id, ...subCategories.map(c => c._id)];
  
  // 3. Find products
  const products = await Product.find({ category: { $in: categoryIds } });
  console.log(`Products found: ${products.length}`);
  
  if (products.length === 0) {
    console.log('Still no products found? Check if products are actually linked to subcategories.');
    // Check one subcategory
    if (subCategories.length > 0) {
      const sub = subCategories[0];
      const subProducts = await Product.find({ category: sub._id });
      console.log(`Products in subcategory "${sub.name}": ${subProducts.length}`);
    }
  }

  process.exit(0);
})
.catch(err => {
  console.error(err);
  process.exit(1);
});
