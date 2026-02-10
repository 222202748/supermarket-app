# SuperMarket - Online Grocery Shopping MERN Stack Application

A full-featured e-commerce platform for online grocery shopping built with MongoDB, Express.js, React, and Node.js, with Razorpay payment integration for Indian market.

## 🌟 Features

### User Features
- User registration and authentication (JWT)
- Browse products by categories
- Advanced search and filtering
- Product details with reviews and ratings
- Shopping cart management
- Wishlist functionality
- Multiple delivery addresses
- Order tracking
- Razorpay payment integration (Indian payment gateway)
- Cash on Delivery (COD) option
- Order history
- User profile management

### Admin Features
- Product management (CRUD operations)
- Category management
- Order management and status updates
- User management

### Technical Features
- RESTful API architecture
- JWT authentication
- MongoDB database with Mongoose ODM
- React with Context API for state management
- Responsive design (mobile-first approach)
- Toast notifications
- Form validation
- Protected routes
- Image upload support (Cloudinary ready)

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn
- Razorpay account (for payment integration)

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd supermarket-app
```

### 2. Install dependencies
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Environment Configuration

#### Server (.env file in /server directory)
Create a `.env` file in the server directory:

```env
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/supermarket

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=30d

# Cloudinary (Optional - for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Razorpay Configuration (Indian Payment Gateway)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Email Configuration (for order confirmations)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Frontend URL
CLIENT_URL=http://localhost:3000
```

#### Client (.env file in /client directory)
Create a `.env` file in the client directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### 4. Database Setup

Start MongoDB:
```bash
# On Linux/Mac
sudo systemctl start mongod

# On Windows
net start MongoDB

# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 5. Running the Application

#### Development Mode (Both servers simultaneously)
```bash
# From root directory
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend React app on http://localhost:3000

#### Individual Servers

**Backend Server Only:**
```bash
cd server
npm run dev
```

**Frontend Only:**
```bash
cd client
npm start
```

## 📁 Project Structure

```
supermarket-app/
├── client/                   # React frontend
│   ├── public/
│   └── src/
│       ├── components/       # Reusable UI components
│       │   ├── Header.js
│       │   ├── Footer.js
│       │   ├── ProductCard.js
│       │   └── ...
│       ├── pages/           # Page components
│       │   ├── Home.js
│       │   ├── Products.js
│       │   ├── Cart.js
│       │   └── ...
│       ├── context/         # React Context for state
│       │   ├── AuthContext.js
│       │   └── CartContext.js
│       ├── services/        # API services
│       │   └── api.js
│       ├── utils/           # Utility functions
│       ├── styles/          # CSS files
│       └── App.js
│
├── server/                  # Express backend
│   ├── models/             # Mongoose models
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Category.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── controllers/        # Route controllers
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── ...
│   ├── routes/            # API routes
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   └── ...
│   ├── middleware/        # Custom middleware
│   │   └── auth.js
│   ├── config/           # Configuration files
│   └── server.js         # Entry point
│
└── package.json          # Root package.json
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/update-profile` - Update user profile (Protected)
- `PUT /api/auth/update-password` - Update password (Protected)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `GET /api/products/featured` - Get featured products
- `GET /api/products/category/:categoryId` - Get products by category
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)
- `POST /api/products/:id/reviews` - Add review (Protected)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Cart
- `GET /api/cart` - Get user cart (Protected)
- `POST /api/cart/add` - Add item to cart (Protected)
- `PUT /api/cart/update/:itemId` - Update cart item (Protected)
- `DELETE /api/cart/remove/:itemId` - Remove from cart (Protected)
- `DELETE /api/cart/clear` - Clear cart (Protected)

### Orders
- `POST /api/orders` - Create order (Protected)
- `GET /api/orders/my-orders` - Get user orders (Protected)
- `GET /api/orders/:id` - Get single order (Protected)
- `PUT /api/orders/:id/cancel` - Cancel order (Protected)
- `GET /api/orders` - Get all orders (Admin)
- `PUT /api/orders/:id/status` - Update order status (Admin)

### Payment
- `POST /api/payment/razorpay/create-order` - Create Razorpay order (Protected)
- `POST /api/payment/razorpay/verify` - Verify payment (Protected)

## 💳 Payment Integration

### Razorpay Setup

1. **Create Razorpay Account:**
   - Go to https://razorpay.com
   - Sign up for a free account
   - Complete KYC verification for live mode

2. **Get API Keys:**
   - Login to Razorpay Dashboard
   - Go to Settings → API Keys
   - Generate new keys (Test/Live mode)
   - Copy Key ID and Key Secret

3. **Configure Environment:**
   - Add keys to server `.env` file
   - Add Key ID to client `.env` file

4. **Test Mode:**
   - Use test cards for testing
   - Card Number: 4111 1111 1111 1111
   - CVV: Any 3 digits
   - Expiry: Any future date

## 🎨 Design & Theme

The design follows the uploaded template with:
- **Primary Color:** Orange (#FFA500)
- **Secondary Color:** Green (#32CD32)
- **Category Sections:**
  - Bread & Bakery
  - Fresh Vegetables
  - Fresh Meats
  - Grocery & Frozen
  - Fresh Fish

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Input validation
- XSS protection
- CORS configuration

## 🧪 Testing

### Test User Accounts
Create test accounts through registration or add manually to database:

```javascript
// Admin user (set role: 'admin' in database)
{
  email: "admin@supermarket.com",
  password: "admin123",
  role: "admin"
}

// Regular user
{
  email: "user@test.com",
  password: "user123",
  role: "user"
}
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🚧 Future Enhancements

- [ ] Email notifications
- [ ] Order tracking with real-time updates
- [ ] Product recommendations
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Social media integration
- [ ] Product comparison feature
- [ ] Bulk order discounts
- [ ] Subscription service
- [ ] Mobile app (React Native)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For support, email support@supermarket.com or create an issue in the repository.

## 🙏 Acknowledgments

- Design inspiration from the uploaded template
- Razorpay for payment processing
- MongoDB for database
- React.js community
- Express.js community

---

Made with ❤️ for the Indian Market
