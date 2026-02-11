const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');
const Product = require('./models/Product');

dotenv.config();

const categoriesStructure = [
  {
    name: 'Dairy, Bread & Eggs',
    image: '/images/category/category-dairy-bread-eggs.jpg',
    children: [
      'Butter', 'Milk Drinks', 'Curd & Yogurt', 'Eggs', 'Buns & Bakery', 
      'Cheese', 'Condensed Milk', 'Dairy Products'
    ]
  },
  {
    name: 'Breakfast & Instant Food',
    image: '/images/category/category-instant-food.jpg',
    children: [
      'Breakfast Cereal', 'Noodles, Pasta & Soup', 'Frozen Veg Snacks', 
      'Frozen Non-Veg Snacks', 'Vermicelli', 'Instant Mixes', 'Butter & Spreads', 
      'Fruit and Juices'
    ]
  },
  {
    name: 'Cold Drinks & Juices',
    image: '/images/category/category-cold-drinks-juices.jpg',
    children: [
      'Soft Drinks', 'Fruit Juices', 'Coldpress', 'Water & Ice Cubes', 
      'Soda & Mixers', 'Health Drinks', 'Herbal Drinks', 'Flavored Milk'
    ]
  },
  {
    name: 'Vegetables & Fruits',
    image: '/images/category/category-fruits-vegetables.jpg',
    children: [
      'Fresh Vegetables', 'Fresh Fruits', 'Organic Vegetables', 
      'Leafy Greens', 'Exotic Fruits', 'Seasonal Fruits', 'Cut Vegetables'
    ]
  },
  {
    name: 'Atta, Rice & Dal',
    image: '/images/category/category-atta-rice-dal.jpg',
    children: [
      'Atta Whole Wheat', 'Rice & Rice Products', 'Dals & Pulses', 
      'Dry Fruits', 'Edible Oils & Ghee', 'Salt, Sugar & Jaggery'
    ]
  },
  {
    name: 'Chicken, Meat & Fish',
    image: '/images/category/category-chicken-meat-fish.jpg',
    children: [
      'Chicken', 'Sausage, Salami & Deli', 'Mutton & Lamb', 
      'Fish & Seafood', 'Eggs', 'Frozen Non-Veg Snacks'
    ]
  },
  {
    name: 'Snacks & Munchies',
    image: '/images/category/category-snack-munchies.jpg',
    children: [
      'Chips & Crisps', 'Nachos & Sauces', 'Popcorn', 
      'Bhujia & Namkeen', 'Indian Snacks', 'Biscuits & Cookies'
    ]
  },
  {
    name: 'Tea, Coffee & Health Drinks',
    image: '/images/category/category-tea-coffee-drinks.jpg',
    children: [
      'Tea', 'Coffee', 'Health Drinks', 
      'Green Tea & Herbal Tea', 'Tea Bags'
    ]
  },
  {
    name: 'Bakery & Biscuits',
    image: '/images/category/category-bakery-biscuits.jpg',
    children: [
      'Cookies', 'Toast & Khari', 'Cakes & Pastries', 
      'Breads & Buns', 'Rusks'
    ]
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/supermarket', {
      serverApi: {
        version: mongoose.mongo.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    for (const parentData of categoriesStructure) {
      // Create Parent Category
      const parentCategory = await Category.create({
        name: parentData.name,
        image: { url: parentData.image },
        isActive: true
      });
      console.log(`Created Parent: ${parentCategory.name}`);

      // Create Children Categories
      for (const childName of parentData.children) {
        try {
          const childCategory = await Category.create({
            name: childName,
            parentCategory: parentCategory._id,
            isActive: true
          });
          
          // Create dummy products for this child category
          await Product.create({
            name: `${childName} Sample Product`,
            description: `Best ${childName} in town`,
            price: Math.floor(Math.random() * 100) + 20,
            category: childCategory._id,
            stock: 50,
            images: [{ url: 'https://placehold.co/150' }]
        });
      } catch (err) {
          console.log(`Skipping duplicate or error for ${childName}: ${err.message}`);
        }
      }
    }

    console.log('Database seeded successfully with new structure');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
