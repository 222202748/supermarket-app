require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Category = require('./models/Category');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  serverApi: {
    version: mongoose.mongo.ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})
.then(async () => {
  console.log('Connected to MongoDB');
  
  // 1. Find a category slug
  const category = await Category.findOne({ name: 'Dairy, Bread & Eggs' });
  if (!category) {
    console.log('Category not found');
    process.exit(1);
  }
  console.log('Category found:', category.name, 'Slug:', category.slug);

  // 2. Simulate the controller logic manually to verify
  // But actually, I want to test the controller. Since I can't easily import the controller without express req/res mocking,
  // I'll just verify the logic I added: Find category by slug -> Get ID -> Find products.
  
  const slug = category.slug;
  
  // Logic from controller:
  let query = {};
  if (mongoose.Types.ObjectId.isValid(slug)) {
    query.category = slug;
  } else {
    const catDoc = await Category.findOne({ slug: slug });
    if (catDoc) {
      console.log('Found category by slug:', catDoc.name);
      query.category = catDoc._id;
    } else {
      console.log('Category slug not found');
    }
  }
  
  const products = await Product.find(query).limit(1);
  console.log('Products found via slug query:', products.length);
  
  process.exit(0);
})
.catch(err => {
  console.error(err);
  process.exit(1);
});
