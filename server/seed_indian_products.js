const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');
const Product = require('./models/Product');

dotenv.config();

const data = [
  {
    name: 'Dairy, Bread & Eggs',
    subcategories: [
      { 
        name: 'Butter', 
        products: ['Amul Butter', 'Britannia Butter', 'Mother Dairy Butter', 'Nutralite Doodh Shakti']
      },
      { 
        name: 'Milk Drinks', 
        products: ['Amul Kool', 'Cavin\'s Milkshake', 'Hershey\'s Milkshake', 'Britannia Winkin Cow']
      },
      { 
        name: 'Curd & Yogurt', 
        products: ['Amul Masti Dahi', 'Nestle Curd', 'Mother Dairy Dahi', 'Milky Mist Curd', 'Epigamia Greek Yogurt']
      },
      { 
        name: 'Eggs', 
        products: ['Farm Fresh White Eggs', 'Brown Eggs', 'Egjee Free Range Eggs']
      },
      { 
        name: 'Buns & Bakery', 
        products: ['English Oven Burger Bun', 'Harvest Gold Pav', 'Britannia Fruit Bun']
      },
      { 
        name: 'Cheese', 
        products: ['Amul Cheese Slices', 'Britannia Cheese Block', 'Go Cheese Slices', 'Mother Dairy Cheese Cubes']
      },
      { 
        name: 'Condensed Milk', 
        products: ['Nestle Milkmaid', 'Amul Mithai Mate']
      },
      { 
        name: 'Dairy Products', 
        products: ['Amul Malai Paneer', 'Mother Dairy Paneer', 'Amul Fresh Cream', 'Milky Mist Paneer']
      },
      { 
        name: 'Breakfast & Instant Food', // Note: User listed this as top level, but indentation in prompt was ambiguous. I'll treat it as top level.
        isTopLevel: true
      }
    ]
  },
  {
    name: 'Breakfast & Instant Food',
    subcategories: [
      {
        name: 'Breakfast Cereal',
        products: ['Kellogg\'s Corn Flakes', 'Quaker Oats', 'Kellogg\'s Chocos', 'Bagrry\'s Muesli', 'Saffola Masala Oats']
      },
      {
        name: 'Noodles, Pasta & Soup',
        products: ['Maggi 2-Minute Noodles', 'Yippee Noodles', 'Top Ramen', 'Knorr Soup', 'Chings Hakka Noodles', 'Bambino Macaroni']
      },
      {
        name: 'Frozen Veg Snacks',
        products: ['McCain Smiles', 'McCain Aloo Tikki', 'Sumeru Green Peas', 'Safal Frozen Corn']
      },
      {
        name: 'Frozen Non-Veg Snacks',
        products: ['McCain Chicken Nuggets', 'Godrej Yummiez Chicken Nuggets', 'Prasuma Momo Chicken']
      },
      {
        name: 'Vermicelli',
        products: ['Bambino Roasted Vermicelli', 'MTR Vermicelli']
      },
      {
        name: 'Instant Mixes',
        products: ['MTR Rava Idli Mix', 'Gits Gulab Jamun Mix', 'MTR Dhokla Mix', 'Knorr Cup-a-Soup']
      },
      {
        name: 'Butter & Spreads',
        products: ['Sundrop Peanut Butter', 'Nutella Hazelnut Spread', 'Dr. Oetker FunFoods Mayonnaise', 'Kissan Jam']
      }
    ]
  },
  {
    name: 'Fruit and Juices',
    subcategories: [
      {
        name: 'Cold Drinks & Juices',
        products: ['Coca Cola', 'Pepsi', 'Thums Up', 'Sprite', '7Up', 'Mirinda', 'Mountain Dew']
      },
      {
        name: 'Soft Drinks',
        products: ['Limca', 'Fanta', 'Maaza', 'Slice']
      },
      {
        name: 'Fruit Juices',
        products: ['Real Fruit Power Mixed Fruit', 'Tropicana Orange Juice', 'B Natural Guava Juice', 'Paper Boat Aamras']
      },
      {
        name: 'Coldpress',
        products: ['Raw Pressery Sugarcane Juice', 'Raw Pressery Coconut Water']
      },
      {
        name: 'Water & Ice Cubes',
        products: ['Bisleri Mineral Water', 'Kinley Water', 'Aquafina', 'Himalayan Natural Mineral Water']
      },
      {
        name: 'Soda & Mixers',
        products: ['Kinley Soda', 'Bisleri Soda', 'Schweppes Tonic Water']
      },
      {
        name: 'Health Drinks',
        products: ['Bournvita', 'Horlicks', 'Complan', 'Boost', 'PediaSure']
      },
      {
        name: 'Herbal Drinks',
        products: ['Patanjali Aloe Vera Juice', 'Kapiva Amla Juice']
      },
      {
        name: 'Flavored Milk',
        products: ['Amul Kool Cafe', 'Hershey\'s Chocolate Milkshake']
      }
    ]
  },
  {
    name: 'Vegetables & Fruits',
    subcategories: [
      {
        name: 'Fresh Vegetables',
        products: ['Potato (Aloo)', 'Onion (Pyaaz)', 'Tomato (Tamatar)', 'Cauliflower (Gobi)', 'Cabbage (Patta Gobi)', 'Lady Finger (Bhindi)', 'Brinjal (Baingan)']
      },
      {
        name: 'Fresh Fruits',
        products: ['Banana Robusta', 'Apple Shimla', 'Pomegranate (Anar)', 'Papaya', 'Orange Nagpur']
      },
      {
        name: 'Organic Vegetables',
        products: ['Organic Potato', 'Organic Tomato', 'Organic Spinach']
      },
      {
        name: 'Leafy Greens',
        products: ['Palak (Spinach)', 'Coriander (Dhania)', 'Mint (Pudina)', 'Methi (Fenugreek)']
      },
      {
        name: 'Exotic Fruits',
        products: ['Kiwi Green', 'Dragon Fruit', 'Avocado', 'Blueberry']
      },
      {
        name: 'Seasonal Fruits',
        products: ['Watermelon', 'Muskmelon', 'Mango Alphonso', 'Mango Dussehri', 'Sitaphal (Custard Apple)']
      },
      {
        name: 'Cut Vegetables',
        products: ['Cut Beans', 'Peeled Garlic', 'Cut Mixed Vegetables']
      }
    ]
  },
  {
    name: 'Atta, Rice & Dal',
    subcategories: [
      {
        name: 'Atta Whole Wheat',
        products: ['Aashirvaad Shudh Chakki Atta', 'Pillsbury Chakki Fresh Atta', 'Fortune Chakki Fresh Atta', 'Nature Fresh Sampoorna Atta']
      },
      {
        name: 'Rice & Rice Products',
        products: ['India Gate Basmati Rice', 'Daawat Rozana Basmati Rice', 'Fortune Basmati Rice', 'Kohinoor Basmati Rice', 'Idli Rice']
      },
      {
        name: 'Dals & Pulses',
        products: ['Tata Sampann Toor Dal', 'Tata Sampann Moong Dal', 'Fortune Arhar Dal', 'Rajma Chitra', 'Kabuli Chana']
      },
      {
        name: 'Dry Fruits',
        products: ['Tata Sampann Almonds', 'Happilo Cashews', 'Happilo Raisins', 'Walnuts', 'Pistachios']
      },
      {
        name: 'Edible Oils & Ghee',
        products: ['Fortune Refined Soyabean Oil', 'Saffola Gold Oil', 'Dhara Mustard Oil', 'Amul Pure Ghee', 'Patanjali Cow Ghee', 'Gowardhan Ghee']
      },
      {
        name: 'Salt, Sugar & Jaggery',
        products: ['Tata Salt', 'Aashirvaad Salt', 'Madhur Sugar', 'Organic Tattva Jaggery Powder']
      }
    ]
  },
  {
    name: 'Chicken, Meat & Fish',
    subcategories: [
      {
        name: 'Chicken',
        products: ['Chicken Curry Cut', 'Chicken Breast Boneless', 'Chicken Drumsticks', 'Chicken Keema']
      },
      {
        name: 'Sausage, Salami & Deli',
        products: ['Chicken Sausages', 'Chicken Salami', 'Chicken Ham']
      },
      {
        name: 'Mutton & Lamb',
        products: ['Mutton Curry Cut', 'Mutton Keema', 'Mutton Chops']
      },
      {
        name: 'Fish & Seafood',
        products: ['Rohu Fish', 'Catla Fish', 'Prawns', 'Surmai Steaks']
      }
    ]
  },
  {
    name: 'Snacks & Munchies',
    subcategories: [
      {
        name: 'Chips & Crisps',
        products: ['Lays India\'s Magic Masala', 'Lays Classic Salted', 'Bingo Mad Angles', 'Pringles Original', 'Uncle Chipps']
      },
      {
        name: 'Nachos & Sauces',
        products: ['Doritos Nacho Cheese', 'Cornitos Nacho Crisps', 'Salsa Dip']
      },
      {
        name: 'Popcorn',
        products: ['Act II Butter Popcorn', 'Act II Golden Sizzle Popcorn']
      },
      {
        name: 'Bhujia & Namkeen',
        products: ['Haldiram\'s Aloo Bhujia', 'Haldiram\'s Bhujia Sev', 'Bikano Navratan Mixture', 'Haldiram\'s Moong Dal']
      },
      {
        name: 'Indian Snacks',
        products: ['Haldiram\'s Samosa', 'Frozen Kachori', 'Mathri']
      },
      {
        name: 'Biscuits & Cookies',
        products: ['Parle-G', 'Britannia Good Day', 'Sunfeast Dark Fantasy', 'Oreo', 'Monaco', 'Britannia Marie Gold']
      }
    ]
  },
  {
    name: 'Tea, Coffee & Health Drinks',
    subcategories: [
      {
        name: 'Tea',
        products: ['Tata Tea Premium', 'Red Label Tea', 'Taj Mahal Tea', 'Wagh Bakri Tea']
      },
      {
        name: 'Coffee',
        products: ['Nescafe Classic', 'Bru Gold', 'Davidoff Coffee', 'Continental Coffee']
      },
      {
        name: 'Green Tea & Herbal Tea',
        products: ['Lipton Green Tea', 'Tetley Green Tea', 'Organic India Tulsi Tea']
      },
      {
        name: 'Tea Bags',
        products: ['Taj Mahal Tea Bags', 'Tetley Tea Bags']
      }
    ]
  },
  {
    name: 'Bakery & Biscuits',
    subcategories: [
      {
        name: 'Cookies',
        products: ['Parle Hide & Seek', 'Britannia Good Day Chunkies', 'Unibic Cookies']
      },
      {
        name: 'Toast & Khari',
        products: ['Britannia Toastea Rusk', 'Parle Rusk', 'Khari Biscuit']
      },
      {
        name: 'Cakes & Pastries',
        products: ['Britannia Gobbles Cake', 'Pillsbury Choco Lava Cake']
      },
      {
        name: 'Breads & Buns',
        products: ['Harvest Gold White Bread', 'Britannia 100% Whole Wheat Bread', 'English Oven Sandwich Bread']
      },
      {
        name: 'Rusks',
        products: ['Elite Milk Rusk', 'Suad Rusk']
      }
    ]
  }
];

const seed = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/supermarket';
    console.log(`Connecting to ${mongoUri}...`);
    await mongoose.connect(mongoUri, {
      serverApi: {
        version: mongoose.mongo.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    console.log('Connected to MongoDB');

    // Create a default user if not exists (optional, not strictly needed for products but good practice)
    
    // Process categories
    for (const catData of data) {
      if (catData.isTopLevel) continue; // Skip if it's just a marker I added

      // 1. Create or Update Parent Category
      let parentCategory = await Category.findOne({ name: catData.name });
      if (!parentCategory) {
        parentCategory = await Category.create({
          name: catData.name,
          description: `All your needs for ${catData.name}`,
          image: {
            url: `https://placehold.co/400x300?text=${encodeURIComponent(catData.name)}`
          }
        });
        console.log(`Created Parent Category: ${parentCategory.name}`);
      } else {
        console.log(`Parent Category exists: ${parentCategory.name}`);
      }

      // 2. Process Subcategories
      if (catData.subcategories) {
        for (const subCatData of catData.subcategories) {
          let subCategory = await Category.findOne({ name: subCatData.name });
          
          if (!subCategory) {
            subCategory = await Category.create({
              name: subCatData.name,
              parentCategory: parentCategory._id,
              description: `Best quality ${subCatData.name}`,
              image: {
                url: `https://placehold.co/400x300?text=${encodeURIComponent(subCatData.name)}`
              }
            });
            console.log(`  Created Subcategory: ${subCategory.name}`);
          } else {
             // Ensure parent is linked if not already (or if it was null)
             if (!subCategory.parentCategory) {
               subCategory.parentCategory = parentCategory._id;
               await subCategory.save();
             }
             console.log(`  Subcategory exists: ${subCategory.name}`);
          }

          // 3. Process Products for this Subcategory
          if (subCatData.products) {
            for (const prodName of subCatData.products) {
              const existingProduct = await Product.findOne({ name: prodName });
              if (!existingProduct) {
                const price = Math.floor(Math.random() * 500) + 30; // Random price 30-530
                const stock = Math.floor(Math.random() * 100) + 10;
                
                await Product.create({
                  name: prodName,
                  description: `${prodName} - Authentic Indian grocery product. Fresh and high quality.`,
                  price: price,
                  originalPrice: Math.floor(price * 1.2),
                  discount: 10 + Math.floor(Math.random() * 10),
                  category: subCategory._id,
                  images: [{
                    url: `https://placehold.co/600x600?text=${encodeURIComponent(prodName)}`,
                    public_id: `placeholder-${Date.now()}`
                  }],
                  unit: 'pack', // Default unit
                  stock: stock,
                  ratings: {
                    average: 4 + Math.random(),
                    count: Math.floor(Math.random() * 500)
                  }
                });
                console.log(`    Added Product: ${prodName}`);
              } else {
                // Update image if it's missing or old placeholder
                if (!existingProduct.images || existingProduct.images.length === 0) {
                    existingProduct.images = [{
                        url: `https://placehold.co/600x600?text=${encodeURIComponent(prodName)}`,
                        public_id: `placeholder-${Date.now()}`
                    }];
                    await existingProduct.save();
                    console.log(`    Updated Image for: ${prodName}`);
                }
              }
            }
          }
        }
      }
    }

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seed();
