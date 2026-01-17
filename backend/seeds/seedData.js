/**
 * Seed Data Script
  
 * used to add the mock data to the database
 */

const Product = require('../models/Product')
const Review = require('../models/Review')
const { connectDB } = require('../database/service')

// Sample perfume products data

const products = [
  //  MEN'S PERFUMES 
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
      'https://images.unsplash.com/photo-1508771400123-e194ad75c0e3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJlbWl1aW0lMjBwZXJmdW1lJTIwcGhvdG9zfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1759793500315-e64644e6954c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fHByZW1pdWltJTIwcGVyZnVtZSUyMHBob3Rvc3xlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1626008485223-cac13eabf1b0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fHByZW1pdWltJTIwcGVyZnVtZSUyMHBob3Rvc3xlbnwwfHwwfHx8MA%3D%3D'
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
      'https://images.unsplash.com/photo-1704900165490-1e02ec72809c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJlbWl1aW0lMjBwZXJmdW1lJTIwcGhvdG9zfGVufDB8fDB8fHww',
      ' https://images.unsplash.com/photo-1737424065216-bc51dd626175?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJlbWl1aW0lMjBwZXJmdW1lJTIwcGhvdG9zfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1680484155524-1dd89cc4ac09?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHByZW1pdWltJTIwcGVyZnVtZSUyMHBob3Rvc3xlbnwwfHwwfHx8MA%3D%3D'
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
     'https://images.unsplash.com/photo-1641248775395-2b938a7c099a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByZW1pdWltJTIwcGVyZnVtZSUyMHBob3Rvc3xlbnwwfHwwfHx8MA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1757614255517-a73613e4d6a6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByZW1pdWltJTIwcGVyZnVtZSUyMHBob3Rvc3xlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1643797517590-c44cb552ddcc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByZW1pdWltJTIwcGVyZnVtZSUyMHBob3Rvc3xlbnwwfHwwfHx8MA%3D%3D'
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
     'https://images.unsplash.com/photo-1759793500315-e64644e6954c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fHByZW1pdWltJTIwcGVyZnVtZSUyMHBob3Rvc3xlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1651737232635-edfae6d77f68?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fHByZW1pdWltJTIwcGVyZnVtZSUyMHBob3Rvc3xlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1604164229905-51db4c30ee8b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fHByZW1pdWltJTIwcGVyZnVtZSUyMHBob3Rvc3xlbnwwfHwwfHx8MA%3D%3D'
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
      'https://images.unsplash.com/photo-1623071279663-14b52938bf5f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fHByZW1pdWltJTIwcGVyZnVtZSUyMHBob3Rvc3xlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1541108564883-bec8126021f5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzR8fHByZW1pdWltJTIwcGVyZnVtZSUyMHBob3Rvc3xlbnwwfHwwfHx8MA%3D%3D',
 'https://images.unsplash.com/photo-1700473209752-395910c89003?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzZ8fHByZW1pdWltJTIwcGVyZnVtZSUyMHBob3Rvc3xlbnwwfHwwfHx8MA%3D%3D'
    ],
    rating: 4.6,
    numReviews: 18,
    inStock: true,
    brand: 'Hugo Boss'
  },

  //  WOMEN'S PERFUMES 
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
      'https://images.unsplash.com/photo-1613521140785-e85e427f8002?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fHByZW1pdWltJTIwcGVyZnVtZSUyMHBob3Rvc3xlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1611146264101-358a3b387eee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODd8fHByZW1pdWltJTIwcGVyZnVtZSUyMHBob3Rvc3xlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1748480852876-47b508a0902d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODh8fHByZW1pdWltJTIwcGVyZnVtZSUyMHBob3Rvc3xlbnwwfHwwfHx8MA%3D%3D'
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
     'https://images.unsplash.com/photo-1714637641172-76bd99501a1a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTB8fHByZW1pdWltJTIwcGVyZnVtZSUyMHBob3Rvc3xlbnwwfHwwfHx8MA%3D%3D',
 
     'https://images.unsplash.com/photo-1533603208986-24fd819e718a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTV8fHByZW1pdWltJTIwcGVyZnVtZSUyMHBob3Rvc3xlbnwwfHwwfHx8MA%3D%3D',
 
     'https://images.unsplash.com/photo-1737424065243-117191bc1345?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTh8fHByZW1pdWltJTIwcGVyZnVtZSUyMHBob3Rvc3xlbnwwfHwwfHx8MA%3D%3D'
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
      'https://images.unsplash.com/photo-1757313186394-322d29d26a90?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTExfHxwcmVtaXVpbSUyMHBlcmZ1bWUlMjBwaG90b3N8ZW58MHx8MHx8fDA%3D',
 
      'https://images.unsplash.com/photo-1746958582485-0316de5197df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEyfHxwcmVtaXVpbSUyMHBlcmZ1bWUlMjBwaG90b3N8ZW58MHx8MHx8fDA%3D',
 
      'https://images.unsplash.com/photo-1611255680915-114e3414c085?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE1fHxwcmVtaXVpbSUyMHBlcmZ1bWUlMjBwaG90b3N8ZW58MHx8MHx8fDA%3D'
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
      'https://images.unsplash.com/photo-1757313239816-9bac11170af8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE2fHxwcmVtaXVpbSUyMHBlcmZ1bWUlMjBwaG90b3N8ZW58MHx8MHx8fDA%3D',
 
      'https://plus.unsplash.com/premium_photo-1674865345778-fa29c016a67c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE3fHxwcmVtaXVpbSUyMHBlcmZ1bWUlMjBwaG90b3N8ZW58MHx8MHx8fDA%3D',
 
  'https://images.unsplash.com/photo-1709095458638-08cef2b85cc0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIzfHxwcmVtaXVpbSUyMHBlcmZ1bWUlMjBwaG90b3N8ZW58MHx8MHx8fDA%3D'
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
      'https://images.unsplash.com/photo-1607329128748-886236fb9a2f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTMyfHxwcmVtaXVpbSUyMHBlcmZ1bWUlMjBwaG90b3N8ZW58MHx8MHx8fDA%3D',
 
      'https://images.unsplash.com/photo-1707899997123-226a3f57aa32?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM2fHxwcmVtaXVpbSUyMHBlcmZ1bWUlMjBwaG90b3N8ZW58MHx8MHx8fDA%3D',
 
      'https://images.unsplash.com/photo-1600612155749-5460e3d2e89e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQyfHxwcmVtaXVpbSUyMHBlcmZ1bWUlMjBwaG90b3N8ZW58MHx8MHx8fDA%3D'
    ],
    rating: 4.5,
    numReviews: 17,
    inStock: true,
    brand: 'Jimmy Choo'
  },

  //  UNISEX PERFUMES 
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
      'https://images.unsplash.com/photo-1663936046049-fe674075681a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTl8fHByZW1pdWltJTIwcGVyZnVtZSUyMHBob3Rvc3xlbnwwfHwwfHx8MA%3D%3D',
 
      'https://images.unsplash.com/photo-1759793500315-e64644e6954c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fHByZW1pdWltJTIwcGVyZnVtZSUyMHBob3Rvc3xlbnwwfHwwfHx8MA%3D%3D',
 
      'https://images.unsplash.com/photo-1626008485223-cac13eabf1b0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fHByZW1pdWltJTIwcGVyZnVtZSUyMHBob3Rvc3xlbnwwfHwwfHx8MA%3D%3D'
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
      'https://images.unsplash.com/photo-1763986665850-6e66549aa8e0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ4fHxwcmVtaXVpbSUyMHBlcmZ1bWUlMjBwaG90b3N8ZW58MHx8MHx8fDA%3D',
 
      'https://images.unsplash.com/photo-1561997837-ad5a1641dbd7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTUwfHxwcmVtaXVpbSUyMHBlcmZ1bWUlMjBwaG90b3N8ZW58MHx8MHx8fDA%3D',
 
      'https://images.unsplash.com/photo-1592914658737-efc0f615b296?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTUxfHxwcmVtaXVpbSUyMHBlcmZ1bWUlMjBwaG90b3N8ZW58MHx8MHx8fDA%3D'
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
      'https://images.unsplash.com/photo-1733660227083-12b78ad0073d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU4fHxwcmVtaXVpbSUyMHBlcmZ1bWUlMjBwaG90b3N8ZW58MHx8MHx8fDA%3D',
 
      'https://plus.unsplash.com/premium_photo-1669825065302-ef9c8cba1558?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU3fHxwcmVtaXVpbSUyMHBlcmZ1bWUlMjBwaG90b3N8ZW58MHx8MHx8fDA%3D',
 
      'https://plus.unsplash.com/premium_photo-1752485892414-6656876bf49b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTYxfHxwcmVtaXVpbSUyMHBlcmZ1bWUlMjBwaG90b3N8ZW58MHx8MHx8fDA%3D'
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
       'https://images.unsplash.com/photo-1587304432009-5b88d3e7146b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fHByZW1pdWltJTIwcGVyZnVtZSUyMHBob3Rvc3xlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1680503504076-e5c61901c36d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fHByZW1pdWltJTIwcGVyZnVtZSUyMHBob3Rvc3xlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1604494319224-9f162a11ae1a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fHByZW1pdWltJTIwcGVyZnVtZSUyMHBob3Rvc3xlbnwwfHwwfHx8MA%3D%3D'
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
      'https://images.unsplash.com/photo-1600024914711-3dcb25fa643e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTY2fHxwcmVtaXVpbSUyMHBlcmZ1bWUlMjBwaG90b3N8ZW58MHx8MHx8fDA%3D',
 
      'https://images.unsplash.com/photo-1600024914711-3dcb25fa643e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTY2fHxwcmVtaXVpbSUyMHBlcmZ1bWUlMjBwaG90b3N8ZW58MHx8MHx8fDA%3D',
 
      'https://images.unsplash.com/photo-1622978148095-cfd6b60e4d29?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHByZW1pdWltJTIwcGVyZnVtZSUyMHBob3Rvc3xlbnwwfHwwfHx8MA%3D%3D'
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
    // Connect to MongoDB using centralized service
    await connectDB()

    // Clear existing data
    await Product.deleteMany({})
    await Review.deleteMany({})
    console.log('  Cleared existing data')

    // Insert products
    const createdProducts = await Product.insertMany(products)

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
    console.log(' Added sample reviews')

    console.log('✅ Database seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

// Run the seed function
seedDatabase()

