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
  
  const parentSlug = 'dairy-bread-and-eggs'; // Updated slug from previous turn
  const parent = await Category.findOne({ slug: parentSlug });
  
  if (!parent) {
    console.log(`Parent category '${parentSlug}' not found.`);
    process.exit(1);
  }
  
  console.log(`Parent: ${parent.name}`);
  
  const subcategories = await Category.find({ parentCategory: parent._id });
  console.log('Subcategories:');
  subcategories.forEach(s => console.log(`- ${s.name} (Slug: ${s.slug}, ID: ${s._id})`));
  
  process.exit(0);
})
.catch(err => {
  console.error(err);
  process.exit(1);
});
