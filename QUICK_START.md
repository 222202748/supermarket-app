# SuperMarket - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Prerequisites Check
```bash
node --version  # Should be v14+
npm --version   # Should be 6+
mongod --version # Should be 4.4+
```

### 1. Installation
```bash
# Clone or extract the project
cd supermarket-app

# Install all dependencies (root, server, client)
npm run install-all

# This will take 2-3 minutes
```

### 2. Database Setup
```bash
# Start MongoDB
# Option A: System service (Linux/Mac)
sudo systemctl start mongod

# Option B: Docker
docker run -d -p 27017:27017 --name supermarket-mongo mongo

# Option C: Windows
net start MongoDB

# Verify MongoDB is running
mongo --eval "db.version()"
```

### 3. Environment Configuration

Create `server/.env` file:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/supermarket
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_123456
JWT_EXPIRE=30d

# Razorpay (Get from https://dashboard.razorpay.com)
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_secret_key

CLIENT_URL=http://localhost:3000
```

Create `client/.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_RAZORPAY_KEY_ID=rzp_test_your_key_id
```

### 4. Start the Application
```bash
# Start both servers (recommended)
npm run dev

# OR start separately:
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
cd client && npm start
```

### 5. Access the Application
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **API Health Check:** http://localhost:5000/api/health

## 📱 First Steps

### Create an Admin User
Use MongoDB Compass or shell:
```javascript
use supermarket

db.users.insertOne({
  name: "Admin User",
  email: "admin@supermarket.com",
  password: "$2a$10$6XvMGhzlRQ8YF.nWqF7eSOQM9z5jqKVD7E8P3vQxTLxJqQGQMUgNO", // admin123
  phone: "9876543210",
  role: "admin",
  addresses: [],
  wishlist: [],
  createdAt: new Date()
})
```

### Create Sample Categories
```javascript
db.categories.insertMany([
  { name: "Fruits & Vegetables", slug: "fruits", isActive: true },
  { name: "Dairy Products", slug: "dairy", isActive: true },
  { name: "Fresh Meat", slug: "fresh-meat", isActive: true },
  { name: "Grocery & Frozen", slug: "frozen", isActive: true },
  { name: "Bread & Bakery", slug: "bakery", isActive: true },
  { name: "Fresh Fish", slug: "fish", isActive: true }
])
```

### Create Sample Products
```javascript
db.products.insertMany([
  {
    name: "Fresh Tomatoes",
    description: "Farm fresh red tomatoes, rich in vitamins",
    price: 40,
    originalPrice: 60,
    discount: 33,
    category: db.categories.findOne({slug: "fruits"})._id,
    images: [{url: "https://example.com/tomato.jpg"}],
    unit: "kg",
    stock: 100,
    isFeatured: true,
    ratings: {average: 4.5, count: 25},
    createdAt: new Date()
  },
  {
    name: "Whole Milk",
    description: "Pure cow milk, 1 liter pack",
    price: 56,
    originalPrice: 60,
    discount: 7,
    category: db.categories.findOne({slug: "dairy"})._id,
    images: [{url: "https://example.com/milk.jpg"}],
    unit: "liters",
    stock: 50,
    isFeatured: true,
    ratings: {average: 4.8, count: 45},
    createdAt: new Date()
  }
])
```

## 🧪 Testing the Application

### Test User Login
1. Go to http://localhost:3000/register
2. Create a new account
3. Login and browse products

### Test Admin Features
1. Login with admin credentials
2. Access admin routes (implement in backend)
3. Add/Edit products

### Test Payment (Razorpay Test Mode)
1. Add products to cart
2. Proceed to checkout
3. Use test card: **4111 1111 1111 1111**
4. Any future expiry date
5. Any CVV

## 📋 Project Structure Overview

```
supermarket-app/
├── server/              # Express Backend
│   ├── models/         # MongoDB Schemas
│   ├── controllers/    # Business Logic
│   ├── routes/         # API Endpoints
│   ├── middleware/     # Auth & Validation
│   └── server.js       # Entry Point
│
├── client/             # React Frontend
│   ├── src/
│   │   ├── components/ # Reusable Components
│   │   ├── pages/      # Page Components
│   │   ├── context/    # State Management
│   │   └── services/   # API Calls
│   └── public/
│
└── package.json        # Root Scripts
```

## 🔧 Common Commands

```bash
# Install dependencies
npm run install-all

# Start development
npm run dev

# Start backend only
npm run server

# Start frontend only
npm run client

# Build for production
cd client && npm run build
```

## ⚡ Quick Troubleshooting

### MongoDB Won't Start
```bash
# Check if already running
ps aux | grep mongod

# Check MongoDB logs
tail -f /var/log/mongodb/mongod.log
```

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Dependencies Issues
```bash
# Clear all node_modules and reinstall
rm -rf node_modules client/node_modules server/node_modules
npm run install-all
```

## 🎯 Next Steps

1. **Customize Design:** Modify CSS files to match your brand
2. **Add Sample Data:** Use the MongoDB scripts above
3. **Configure Payment:** Set up Razorpay account
4. **Test Features:** Try all user flows
5. **Deploy:** Follow deployment guide in README.md

## 📞 Support

- **Documentation:** See README.md and COMPLETE_SETUP.md
- **Issues:** Create an issue in the repository
- **Questions:** Check the FAQ section

---

**Ready to go!** 🎉 Your SuperMarket application is now set up and running!
