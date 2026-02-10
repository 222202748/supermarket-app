const mongoose = require('mongoose');
const Category = require('./models/Category');

mongoose.connect('mongodb://localhost:27017/supermarket', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');
  
  const categories = await Category.find({});
  console.log(`Found ${categories.length} categories to check/update.`);

  for (const cat of categories) {
    const newSlug = cat.name.toLowerCase()
      .replace(/&/g, 'and')
      .replace(/,/g, '')
      .replace(/\s+/g, '-');
      
    if (cat.slug !== newSlug) {
      console.log(`Updating slug for "${cat.name}": "${cat.slug}" -> "${newSlug}"`);
      cat.slug = newSlug;
      await cat.save();
    }
  }
  
  console.log('Slug update complete.');
  process.exit(0);
})
.catch(err => {
  console.error(err);
  process.exit(1);
});
