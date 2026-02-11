const mongoose = require('mongoose');
require('dotenv').config();
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
  
  const categories = await Category.find({});
  console.log('All Categories:');
  categories.forEach(c => {
    console.log(`- Name: "${c.name}", Slug: "${c.slug}", ID: ${c._id}`);
  });

  process.exit(0);
})
.catch(err => {
  console.error(err);
  process.exit(1);
});
