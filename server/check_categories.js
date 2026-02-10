const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/supermarket', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
    
    const Category = mongoose.model('Category', new mongoose.Schema({
      name: String,
      parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
    }));

    const categories = await Category.find({});
    console.log('Categories found:', categories.length);
    
    categories.forEach(c => {
      console.log(`Name: ${c.name}, ID: ${c._id}, Parent: ${c.parentCategory || 'None'}`);
    });

    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

connectDB();
