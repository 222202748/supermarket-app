const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import Models
const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');
const Cart = require('./models/Cart');
const Order = require('./models/Order');

const SOURCE_DB = 'mongodb://localhost:27017/supermarket';
const TARGET_DB = 'mongodb://localhost:27017/sanjanasupermarket';

const migrate = async () => {
  console.log('🚀 Starting migration...');

  // 1. Fetch data from Source DB
  console.log(`\n📥 Connecting to Source DB: ${SOURCE_DB}`);
  await mongoose.connect(SOURCE_DB, {
    serverApi: {
      version: mongoose.mongo.ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  
  console.log('Fetching data...');
  const users = await User.find({});
  const categories = await Category.find({});
  const products = await Product.find({});
  const carts = await Cart.find({});
  const orders = await Order.find({});
  
  console.log(`Found:
  - ${users.length} Users
  - ${categories.length} Categories
  - ${products.length} Products
  - ${carts.length} Carts
  - ${orders.length} Orders`);

  await mongoose.disconnect();
  console.log('✅ Disconnected from Source DB');

  // 2. Insert data into Target DB
  console.log(`\n📤 Connecting to Target DB: ${TARGET_DB}`);
  await mongoose.connect(TARGET_DB, {
    serverApi: {
      version: mongoose.mongo.ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  console.log('Clearing existing data in Target DB...');
  await User.deleteMany({});
  await Category.deleteMany({});
  await Product.deleteMany({});
  await Cart.deleteMany({});
  await Order.deleteMany({});

  console.log('Inserting data...');
  
  if (users.length > 0) await User.insertMany(users);
  if (categories.length > 0) await Category.insertMany(categories);
  if (products.length > 0) await Product.insertMany(products);
  if (carts.length > 0) await Cart.insertMany(carts);
  if (orders.length > 0) await Order.insertMany(orders);

  console.log('✅ Migration completed successfully!');
  
  // Verify counts
  const newUsers = await User.countDocuments();
  const newCategories = await Category.countDocuments();
  const newProducts = await Product.countDocuments();
  const newCarts = await Cart.countDocuments();
  const newOrders = await Order.countDocuments();

  console.log(`\n📊 Verification (Target DB Counts):
  - ${newUsers} Users
  - ${newCategories} Categories
  - ${newProducts} Products
  - ${newCarts} Carts
  - ${newOrders} Orders`);

  await mongoose.disconnect();
  process.exit(0);
};

migrate().catch(err => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
