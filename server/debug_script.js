const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config();

const Product = require('./models/Product');

async function debugObjectIdError() {
  try {
    console.log('Connecting to MongoDB...');
    if (!process.env.MONGO_URI) {
        console.error('MONGO_URI is missing in .env');
        // fallback for testing if env not loaded correctly
        // process.env.MONGO_URI = 'mongodb://localhost:27017/supermarket';
    }
    
    await mongoose.connect(process.env.MONGO_URI, {
      serverApi: {
        version: mongoose.mongo.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    console.log('Connected.');

    // 1. Test finding with a valid ID (if we have one)
    const product = await Product.findOne();
    if (product) {
        console.log(`Found a product with ID: ${product._id}`);
        
        // Test findById with valid ID
        console.log('Testing findById with valid ID...');
        const p1 = await Product.findById(product._id);
        console.log('Result:', p1 ? 'Found' : 'Not Found');
    } else {
        console.log('No products found in DB to test valid ID.');
    }

    // 2. Test findById with INVALID ID (this should cause CastError)
    console.log('Testing findById with INVALID ID "invalid-id"...');
    try {
        await Product.findById('invalid-id');
        console.log('Unexpected: findById with invalid ID did NOT throw error.');
    } catch (err) {
        console.log('Caught expected error:');
        console.log('Name:', err.name);
        console.log('Message:', err.message);
        if (err.name === 'CastError') {
            console.log('SUCCESS: Reproduced "Cast to ObjectId" error.');
        } else {
            console.log('FAILED: Caught different error.');
        }
    }

    console.log('Done.');
    process.exit(0);

  } catch (err) {
    console.error('Unexpected error:', err);
    process.exit(1);
  }
}

debugObjectIdError();
