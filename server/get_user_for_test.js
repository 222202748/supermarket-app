const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  serverApi: {
    version: mongoose.mongo.ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
}).then(async () => {
  console.log('Connected to DB');
  const user = await User.findOne();
  if (user) {
    console.log('User found:', user.email);
    console.log('Password hash:', user.password); // Note: this might be undefined if select: false
  } else {
    console.log('No users found');
  }
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
