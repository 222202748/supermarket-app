const mongoose = require('mongoose');
const Product = require('./models/Product');
const Category = require('./models/Category');

mongoose.connect('mongodb://localhost:27017/supermarket', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');
  
  // 1. Find the parent category
  const parentSlug = 'dairy,-bread-&-eggs';
  const parentCategory = await Category.findOne({ slug: parentSlug });
  
  if (!parentCategory) {
    console.log('Parent category not found');
    process.exit(1);
  }
  console.log(`Parent Category: ${parentCategory.name} (${parentCategory._id})`);

  // 2. Find subcategories
  const subCategories = await Category.find({ parentCategory: parentCategory._id });
  console.log(`Subcategories found: ${subCategories.length}`);
  const subCategoryIds = subCategories.map(c => c._id);
  
  // 3. Find products in parent OR subcategories (Logic implemented in controller)
  const categoryIds = [parentCategory._id, ...subCategoryIds];
  const products = await Product.find({ category: { $in: categoryIds } });
  
  console.log(`Products found: ${products.length}`);
  if (products.length > 0) {
    console.log('First 3 products:');
    products.slice(0, 3).forEach(p => console.log(`- ${p.name}`));
  }

  process.exit(0);
})
.catch(err => {
  console.error(err);
  process.exit(1);
});
