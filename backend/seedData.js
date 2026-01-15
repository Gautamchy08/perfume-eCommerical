/**
 * Seed Data Script
 *
 * This file populates your MongoDB database with sample perfume products.
 * Run this once to add mock data: npm run seed
 *
 * WHY WE NEED THIS:
 * - The assignment requires data to come from database, not hardcoded
 * - This creates realistic sample data for testing
 * - You can modify this data anytime
 */

const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Product = require('./models/Product')
const Review = require('./models/Review')

// Load environment variables
dotenv.config()

// Sample perfume products data
// These are based on the original template but structured for our database
const products = [
  // ============ MEN'S PERFUMES ============
  {
    name: 'Versace Dylan Blue',
    shortDescription:
      'A fresh, woody fragrance with Mediterranean notes perfect for the modern man.',
    fullDescription:
      'Versace Pour Homme Dylan Blue is a unique, fresh and woody fragrance that captures the strength of a man who knows the value of tradition. The scent combines natural citrus notes with aquatic accords, creating an elegant and sophisticated fragrance. Top notes include Calabrian bergamot, grapefruit and fig leaf. Heart notes feature violet leaf, papyrus wood and patchouli. Base notes are musk, tonka bean, saffron and incense.',
    price: 4141,
    oldPrice: 5050,
    category: 'Men',
    sizes: ['30ml', '50ml', '100ml', '200ml'],
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500'
    ],
    rating: 4.5,
    numReviews: 12,
    inStock: true,
    brand: 'Versace'
  },
  {
    name: 'Dunhill Icon Elite',
    shortDescription:
      'A sophisticated blend of black pepper, lavender and vetiver for the refined gentleman.',
    fullDescription:
      'Dunhill Icon Elite is a sophisticated fragrance for the refined gentleman. This elegant scent opens with notes of black pepper and bergamot, leading to a heart of iris and lavender. The base features vetiver, agarwood and leather, creating a powerful yet refined signature. Perfect for formal occasions and evening wear.',
    price: 7800,
    oldPrice: 8500,
    category: 'Men',
    sizes: ['50ml', '100ml'],
    images: [
      'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=500',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500',
      'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500'
    ],
    rating: 4.8,
    numReviews: 8,
    inStock: true,
    brand: 'Dunhill'
  },
  {
    name: 'Jaguar Classic EDT',
    shortDescription:
      'A classic masculine scent with notes of mandarin, sandalwood and musk.',
    fullDescription:
      'Jaguar Classic is an aromatic-fougère fragrance for men. This timeless scent opens with refreshing mandarin and apple, balanced by heart notes of jasmine and pink pepper. The dry-down reveals a warm base of sandalwood, musk and oakmoss. A versatile fragrance suitable for both day and evening wear.',
    price: 2700,
    oldPrice: 3300,
    category: 'Men',
    sizes: ['40ml', '100ml'],
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbabd7f539?w=500',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500',
      'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=500'
    ],
    rating: 4.2,
    numReviews: 15,
    inStock: true,
    brand: 'Jaguar'
  },
  {
    name: 'Paco Rabanne Invictus',
    shortDescription:
      'A powerful, sporty fragrance for the victorious man with marine and woody notes.',
    fullDescription:
      'Invictus by Paco Rabanne is an aromatic-aquatic fragrance for the modern champion. The scent bursts open with grapefruit and marine accord, leading to a heart of bay leaf and jasmine. The base features guaiac wood, patchouli, oakmoss and ambergris. A powerful, athletic fragrance that embodies victory and success.',
    price: 7500,
    oldPrice: 8100,
    category: 'Men',
    sizes: ['50ml', '100ml', '150ml'],
    images: [
      'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=500',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500',
      'https://images.unsplash.com/photo-1592945403244-b3fbabd7f539?w=500'
    ],
    rating: 4.7,
    numReviews: 23,
    inStock: true,
    brand: 'Paco Rabanne'
  },
  {
    name: 'Hugo Boss Bottled Infinite',
    shortDescription:
      'An intense, aromatic fragrance with apple, sage and sandalwood notes.',
    fullDescription:
      'Boss Bottled Infinite is a woody-aromatic fragrance that captures the essence of infinite possibilities. Opening with bright apple and mandarin, the scent develops into a heart of sage and cinnamon. The warm base of sandalwood, olive tree and vetiver creates a sophisticated and long-lasting impression.',
    price: 8650,
    oldPrice: 9100,
    category: 'Men',
    sizes: ['50ml', '100ml', '200ml'],
    images: [
      'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500',
      'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=500',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500'
    ],
    rating: 4.6,
    numReviews: 18,
    inStock: true,
    brand: 'Hugo Boss'
  },

  // ============ WOMEN'S PERFUMES ============
  {
    name: 'Carolina Herrera Good Girl',
    shortDescription:
      'A bold, seductive fragrance with notes of tuberose, jasmine and cocoa.',
    fullDescription:
      'Good Girl by Carolina Herrera is a modern, sophisticated fragrance for the confident woman. The scent opens with almond and coffee, leading to a heart of tuberose and jasmine sambac. The sensual base of tonka bean and cocoa creates an addictive, unforgettable trail. The iconic stiletto bottle represents the duality of the modern woman.',
    price: 8250,
    oldPrice: 8650,
    category: 'Women',
    sizes: ['30ml', '50ml', '80ml'],
    images: [
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=500',
      'https://images.unsplash.com/photo-1592945403244-b3fbabd7f539?w=500',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500'
    ],
    rating: 4.9,
    numReviews: 31,
    inStock: true,
    brand: 'Carolina Herrera'
  },
  {
    name: 'Michael Kors Sexy Amber',
    shortDescription:
      'A warm, sensual fragrance with white flowers, sandalwood and amber.',
    fullDescription:
      'Michael Kors Sexy Amber is a luxurious, sensual fragrance that captures timeless sophistication. The scent opens with sparkling mandarin and black pepper, blending into a heart of white flowers and jasmine. The warm base of sandalwood, amber and musk creates an irresistible, feminine allure.',
    price: 8800,
    oldPrice: 9000,
    category: 'Women',
    sizes: ['30ml', '50ml', '100ml'],
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500',
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=500',
      'https://images.unsplash.com/photo-1592945403244-b3fbabd7f539?w=500'
    ],
    rating: 4.4,
    numReviews: 14,
    inStock: true,
    brand: 'Michael Kors'
  },
  {
    name: 'Versace Pour Femme Dylan Blue',
    shortDescription:
      'A fresh, fruity fragrance with blackcurrant, granny smith apple and rose.',
    fullDescription:
      'Versace Dylan Blue Pour Femme is a fresh, sensual fragrance celebrating the strength and femininity of women. Opening with blackcurrant and granny smith apple, the heart reveals forget-me-not petals and rose. The base of white woods, musk and styrax creates a modern, sophisticated signature.',
    price: 7987,
    oldPrice: 8875,
    category: 'Women',
    sizes: ['30ml', '50ml', '100ml'],
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbabd7f539?w=500',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500',
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=500'
    ],
    rating: 4.6,
    numReviews: 20,
    inStock: true,
    brand: 'Versace'
  },
  {
    name: 'Jean Paul Gaultier Scandal',
    shortDescription:
      'A provocative scent with blood orange, honey and gardenia notes.',
    fullDescription:
      'Scandal by Jean Paul Gaultier is a provocative fragrance for the daring woman. The scent opens with blood orange and mandarin, leading to a heart of honey, gardenia and jasmine. The sensual base of patchouli, caramel and beeswax creates an unforgettable, scandalous trail.',
    price: 6900,
    oldPrice: 7514,
    category: 'Women',
    sizes: ['30ml', '50ml', '80ml'],
    images: [
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=500',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500',
      'https://images.unsplash.com/photo-1592945403244-b3fbabd7f539?w=500'
    ],
    rating: 4.7,
    numReviews: 25,
    inStock: true,
    brand: 'Jean Paul Gaultier'
  },
  {
    name: 'Jimmy Choo Fever',
    shortDescription:
      'A glamorous, oriental fragrance with black plum, vanilla and heliotrope.',
    fullDescription:
      'Jimmy Choo Fever is a glamorous fragrance for the confident, fashion-forward woman. The scent opens with lychee and grapefruit, developing into a heart of black plum and heliotrope. The opulent base of roasted tonka bean, vanilla and benzoin creates a warm, addictive signature perfect for evening occasions.',
    price: 7450,
    oldPrice: 7999,
    category: 'Women',
    sizes: ['40ml', '60ml', '100ml'],
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500',
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=500',
      'https://images.unsplash.com/photo-1592945403244-b3fbabd7f539?w=500'
    ],
    rating: 4.5,
    numReviews: 17,
    inStock: true,
    brand: 'Jimmy Choo'
  },

  // ============ UNISEX PERFUMES ============
  {
    name: 'Calvin Klein CK One Summer',
    shortDescription:
      'A refreshing, citrusy fragrance perfect for warm summer days.',
    fullDescription:
      'CK One Summer is a refreshing, unisex fragrance that captures the carefree spirit of summer. The scent opens with lime, grapefruit and cucumber, leading to a heart of sea salt and watermelon. The base of musk and cedar creates a clean, fresh finish perfect for everyday wear.',
    price: 3808,
    oldPrice: 3500,
    category: 'Unisex',
    sizes: ['100ml'],
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500',
      'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=500',
      'https://images.unsplash.com/photo-1592945403244-b3fbabd7f539?w=500'
    ],
    rating: 4.3,
    numReviews: 28,
    inStock: true,
    brand: 'Calvin Klein'
  },
  {
    name: 'Tom Ford Oud Wood',
    shortDescription:
      'A luxurious, exotic fragrance with rare oud, sandalwood and vetiver.',
    fullDescription:
      'Tom Ford Oud Wood is a luxurious, exotic fragrance that showcases the rare and precious oud. Opening with rosewood and cardamom, the heart reveals Chinese pepper and oud wood. The sophisticated base of sandalwood, vetiver and tonka bean creates an opulent, unforgettable signature.',
    price: 15500,
    oldPrice: 17000,
    category: 'Unisex',
    sizes: ['30ml', '50ml', '100ml'],
    images: [
      'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=500',
      'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500'
    ],
    rating: 4.9,
    numReviews: 45,
    inStock: true,
    brand: 'Tom Ford'
  },
  {
    name: 'Jo Malone Wood Sage & Sea Salt',
    shortDescription:
      'A fresh, natural fragrance inspired by the windswept shore.',
    fullDescription:
      'Jo Malone Wood Sage & Sea Salt captures the essence of a windswept shore. The scent features earthy sage and the clean freshness of sea salt, grounded by grapefruit and ambrette seed. A natural, effortless fragrance that evokes the freedom of the coast.',
    price: 12000,
    oldPrice: 13500,
    category: 'Unisex',
    sizes: ['30ml', '100ml'],
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbabd7f539?w=500',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500'
    ],
    rating: 4.7,
    numReviews: 33,
    inStock: true,
    brand: 'Jo Malone'
  },
  {
    name: 'Maison Margiela Replica Jazz Club',
    shortDescription:
      'A warm, smoky fragrance reminiscent of a Brooklyn jazz club.',
    fullDescription:
      'Replica Jazz Club by Maison Margiela transports you to a Brooklyn jazz club in the 1950s. The scent opens with pink pepper and neroli, developing into a heart of rum absolute, clary sage and tobacco leaf. The base of vanilla and styrax creates a warm, inviting atmosphere.',
    price: 9800,
    oldPrice: 11000,
    category: 'Unisex',
    sizes: ['30ml', '100ml'],
    images: [
      'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=500',
      'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=500',
      'https://images.unsplash.com/photo-1592945403244-b3fbabd7f539?w=500'
    ],
    rating: 4.6,
    numReviews: 22,
    inStock: true,
    brand: 'Maison Margiela'
  },
  {
    name: 'Byredo Gypsy Water',
    shortDescription:
      'A romantic, bohemian fragrance with bergamot, juniper and pine.',
    fullDescription:
      'Byredo Gypsy Water is a romantic fragrance inspired by the fascination with the Romany lifestyle. Opening with bergamot, lemon and pepper, the heart reveals incense, juniper berries and orris. The base of pine needles, sandalwood and vanilla creates an earthy, enchanting trail.',
    price: 14500,
    oldPrice: 16000,
    category: 'Unisex',
    sizes: ['50ml', '100ml'],
    images: [
      'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500',
      'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=500'
    ],
    rating: 4.8,
    numReviews: 38,
    inStock: true,
    brand: 'Byredo'
  }
]

// Sample reviews data
const sampleReviews = [
  {
    userName: 'Rahul Kumar',
    rating: 5,
    comment:
      'Amazing fragrance! Lasts all day and I get compliments everywhere I go.'
  },
  {
    userName: 'Priya Singh',
    rating: 4,
    comment:
      'Beautiful scent, perfect for special occasions. A bit pricey but worth it.'
  },
  {
    userName: 'Amit Sharma',
    rating: 5,
    comment:
      'This is now my signature scent. The projection and longevity are incredible.'
  },
  {
    userName: 'Neha Gupta',
    rating: 4,
    comment:
      'Lovely packaging and the smell is divine. Would definitely recommend.'
  },
  {
    userName: 'Vikram Patel',
    rating: 5,
    comment: "Best perfume I've ever owned. The quality is outstanding."
  }
]

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    // Clear existing data
    await Product.deleteMany({})
    await Review.deleteMany({})
    console.log('🗑️  Cleared existing data')

    // Insert products
    const createdProducts = await Product.insertMany(products)
    console.log(`📦 Added ${createdProducts.length} products`)

    // Add sample reviews to each product
    for (const product of createdProducts) {
      // Add 2-3 random reviews per product
      const numReviews = Math.floor(Math.random() * 2) + 2
      for (let i = 0; i < numReviews; i++) {
        const randomReview =
          sampleReviews[Math.floor(Math.random() * sampleReviews.length)]
        await Review.create({
          productId: product._id,
          userName: randomReview.userName,
          rating: randomReview.rating,
          comment: randomReview.comment
        })
      }
    }
    console.log('⭐ Added sample reviews')

    console.log('✅ Database seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

// Run the seed function
seedDatabase()
