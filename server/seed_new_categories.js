const mongoose = require('mongoose');
require('dotenv').config();

const categoriesData = [
  {
    name: 'Dairy, Bread & Eggs',
    subcategories: [
      'Butter', 'Milk Drinks', 'Curd & Yogurt', 'Eggs', 'Buns & Bakery', 
      'Cheese', 'Condensed Milk', 'Dairy Products', 'Breakfast & Instant Food'
    ]
  },
  {
    name: 'Vegetables & Fruits',
    subcategories: [
      'Fresh Vegetables', 'Fresh Fruits', 'Organic Vegetables', 'Leafy Greens', 
      'Exotic Fruits', 'Seasonal Fruits', 'Cut Vegetables'
    ]
  },
  {
    name: 'Atta, Rice & Dal',
    subcategories: [
      'Atta Whole Wheat', 'Rice & Rice Products', 'Dals & Pulses', 'Dry Fruits', 
      'Edible Oils & Ghee', 'Salt, Sugar & Jaggery'
    ]
  },
  {
    name: 'Chicken, Meat & Fish',
    subcategories: [
      'Chicken', 'Sausage, Salami & Deli', 'Mutton & Lamb', 'Fish & Seafood'
    ]
  },
  {
    name: 'Snacks & Munchies',
    subcategories: [
      'Chips & Crisps', 'Nachos & Sauces', 'Popcorn', 'Bhujia & Namkeen', 
      'Indian Snacks', 'Biscuits & Cookies'
    ]
  },
  {
    name: 'Tea, Coffee & Health Drinks',
    subcategories: [
      'Tea', 'Coffee', 'Green Tea & Herbal Tea', 'Tea Bags'
    ]
  },
  {
    name: 'Bakery & Biscuits',
    subcategories: [
      'Cookies', 'Toast & Khari', 'Cakes & Pastries', 'Breads & Buns', 'Rusks'
    ]
  }
];

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/supermarket', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
    
    // Define Schema inline to avoid dependency issues
    const categorySchema = new mongoose.Schema({
      name: { type: String, required: true, unique: true, trim: true },
      slug: { type: String, unique: true, lowercase: true },
      description: String,
      image: { url: String, public_id: String },
      parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
      isActive: { type: Boolean, default: true },
      createdAt: { type: Date, default: Date.now }
    });
    
    // Check if model already exists
    const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

    // Optional: Clear existing categories
    // await Category.deleteMany({});
    // console.log('Existing categories cleared');

    for (const cat of categoriesData) {
      // Create or update parent category
      let parent = await Category.findOne({ name: cat.name });
      if (!parent) {
        parent = await Category.create({
          name: cat.name,
          slug: cat.name.toLowerCase().replace(/&/g, 'and').replace(/,/g, '').replace(/\s+/g, '-'),
          image: { url: '/images/category/category-1.jpg' } // Default image
        });
        console.log(`Created parent category: ${cat.name}`);
      } else {
        console.log(`Parent category exists: ${cat.name}`);
      }

      // Create subcategories
      for (const subName of cat.subcategories) {
        let sub = await Category.findOne({ name: subName });
        if (!sub) {
          await Category.create({
            name: subName,
            slug: subName.toLowerCase().replace(/&/g, 'and').replace(/,/g, '').replace(/\s+/g, '-'),
            parentCategory: parent._id,
            image: { url: '/images/category/category-2.jpg' } // Default image
          });
          console.log(`  Created subcategory: ${subName}`);
        } else {
          // Ensure parent is linked if it wasn't
          if (!sub.parentCategory) {
            sub.parentCategory = parent._id;
            await sub.save();
            console.log(`  Linked existing subcategory: ${subName}`);
          } else {
            console.log(`  Subcategory exists: ${subName}`);
          }
        }
      }
    }

    console.log('Category seeding completed');
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

connectDB();
