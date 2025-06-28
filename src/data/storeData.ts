
import { StoreItem, StoreLayout } from '../types/store';

// Updated store layout based on your dataset - represents a typical grocery store
export const storeLayout: StoreLayout = {
  entrance: { x: 50, y: 5 },
  checkout: { x: 85, y: 5 },
  sections: {
    'fruits': { x: 5, y: 15, width: 15, height: 20 },
    'produce': { x: 25, y: 15, width: 15, height: 20 },
    'frozen': { x: 45, y: 15, width: 15, height: 20 },
    'bakery': { x: 65, y: 15, width: 15, height: 20 },
    'dairy': { x: 85, y: 15, width: 15, height: 20 },
    'endcaps': { x: 5, y: 40, width: 95, height: 10 },
    'aisles': { x: 5, y: 55, width: 95, height: 40 }
  }
};

// Comprehensive store inventory based on your dataset
export const storeItems: StoreItem[] = [
  // Location 1 - Fruits (Peripheral)
  {
    id: '1',
    name: 'Bananas',
    category: 'Fruits',
    subcategory: 'Bananas (1)',
    location: {
      section: 'fruits',
      aisle: 1,
      shelf: 'A',
      position: { x: 10, y: 20 }
    },
    fixtureType: 'peripheral'
  },
  {
    id: '2',
    name: 'Oranges',
    category: 'Fruits',
    subcategory: 'Citrus (2)',
    location: {
      section: 'fruits',
      aisle: 1,
      shelf: 'A',
      position: { x: 12, y: 22 }
    },
    fixtureType: 'peripheral'
  },
  {
    id: '3',
    name: 'Apples',
    category: 'Fruits',
    subcategory: 'Hard Fruit (3)',
    location: {
      section: 'fruits',
      aisle: 1,
      shelf: 'B',
      position: { x: 15, y: 25 }
    },
    fixtureType: 'peripheral'
  },
  {
    id: '4',
    name: 'Grapes',
    category: 'Fruits',
    subcategory: 'Soft Fruit (4)',
    location: {
      section: 'fruits',
      aisle: 1,
      shelf: 'B',
      position: { x: 17, y: 27 }
    },
    fixtureType: 'peripheral'
  },

  // Location 2 - Produce (Peripheral)
  {
    id: '5',
    name: 'Carrots',
    category: 'Produce',
    subcategory: 'Root Vegetables (5)',
    location: {
      section: 'produce',
      aisle: 2,
      shelf: 'A',
      position: { x: 30, y: 20 }
    },
    fixtureType: 'peripheral'
  },
  {
    id: '6',
    name: 'Lettuce',
    category: 'Produce',
    subcategory: 'Leafy Green Vegetables (6)',
    location: {
      section: 'produce',
      aisle: 2,
      shelf: 'A',
      position: { x: 32, y: 22 }
    },
    fixtureType: 'peripheral'
  },
  {
    id: '7',
    name: 'Pre-cut Vegetables',
    category: 'Produce',
    subcategory: 'Ready Cut Vegetables (7)',
    location: {
      section: 'produce',
      aisle: 2,
      shelf: 'B',
      position: { x: 35, y: 25 }
    },
    fixtureType: 'peripheral'
  },

  // Location 3 - Frozen Food (Peripheral)
  {
    id: '8',
    name: 'Frozen Vegetables',
    category: 'Frozen Food',
    subcategory: 'Frozen Vegetables (9)',
    location: {
      section: 'frozen',
      aisle: 3,
      shelf: 'A',
      position: { x: 50, y: 20 }
    },
    fixtureType: 'peripheral'
  },
  {
    id: '9',
    name: 'Frozen Pizza',
    category: 'Frozen Food',
    subcategory: 'Frozen Pizzas (11)',
    location: {
      section: 'frozen',
      aisle: 3,
      shelf: 'B',
      position: { x: 55, y: 25 }
    },
    fixtureType: 'peripheral'
  },

  // Location 4 - Bakery (Peripheral)
  {
    id: '10',
    name: 'Bread',
    category: 'Bakery',
    subcategory: 'Fresh Bread (14)',
    location: {
      section: 'bakery',
      aisle: 4,
      shelf: 'A',
      position: { x: 70, y: 20 }
    },
    fixtureType: 'peripheral'
  },

  // Location 5 - Fresh Dairy (Endcap)
  {
    id: '11',
    name: 'Milk',
    category: 'Fresh Dairy Food',
    subcategory: 'Fresh Dairy Food (17)',
    location: {
      section: 'dairy',
      aisle: 5,
      shelf: 'A',
      position: { x: 90, y: 20 }
    },
    fixtureType: 'endcap'
  },

  // Aisle Items
  {
    id: '12',
    name: 'Mediterranean Food',
    category: 'Appetizers',
    subcategory: 'Mediterranean Food (25)',
    location: {
      section: 'aisles',
      aisle: 13,
      shelf: 'A',
      position: { x: 15, y: 65 }
    },
    fixtureType: 'aisle'
  },
  {
    id: '13',
    name: 'Salad Dressing',
    category: 'Condiments',
    subcategory: 'Salad Essentials (28)',
    location: {
      section: 'aisles',
      aisle: 14,
      shelf: 'A',
      position: { x: 25, y: 70 }
    },
    fixtureType: 'aisle'
  },
  {
    id: '14',
    name: 'Potato Chips',
    category: 'Chips',
    subcategory: 'Regular Chips (34)',
    location: {
      section: 'aisles',
      aisle: 16,
      shelf: 'A',
      position: { x: 35, y: 75 }
    },
    fixtureType: 'aisle'
  },
  {
    id: '15',
    name: 'Beer',
    category: 'Beer',
    subcategory: 'Bottle & Can Beer (38)',
    location: {
      section: 'aisles',
      aisle: 17,
      shelf: 'A',
      position: { x: 45, y: 80 }
    },
    fixtureType: 'aisle'
  },
  {
    id: '16',
    name: 'Water',
    category: 'Water & Energy Drinks',
    subcategory: 'Water (42)',
    location: {
      section: 'aisles',
      aisle: 18,
      shelf: 'A',
      position: { x: 55, y: 85 }
    },
    fixtureType: 'aisle'
  },
  {
    id: '17',
    name: 'Soda',
    category: 'Soda & Soft Drinks',
    subcategory: 'Soda (44)',
    location: {
      section: 'aisles',
      aisle: 19,
      shelf: 'A',
      position: { x: 65, y: 80 }
    },
    fixtureType: 'aisle'
  },
  {
    id: '18',
    name: 'Cookies',
    category: 'Soups & Eggs and Non-perishable Food',
    subcategory: 'Cookies (46)',
    location: {
      section: 'aisles',
      aisle: 20,
      shelf: 'A',
      position: { x: 75, y: 75 }
    },
    fixtureType: 'aisle'
  },
  {
    id: '19',
    name: 'Eggs',
    category: 'Soups & Eggs and Non-perishable Food',
    subcategory: 'Eggs & Non‑perishable Dairy (48)',
    location: {
      section: 'aisles',
      aisle: 20,
      shelf: 'B',
      position: { x: 85, y: 70 }
    },
    fixtureType: 'aisle'
  }
];

// Popular items for autocomplete
export const popularItems = [
  'Bananas', 'Oranges', 'Apples', 'Grapes', 'Carrots', 'Lettuce', 
  'Pre-cut Vegetables', 'Frozen Vegetables', 'Frozen Pizza', 'Bread',
  'Milk', 'Mediterranean Food', 'Salad Dressing', 'Potato Chips', 
  'Beer', 'Water', 'Soda', 'Cookies', 'Eggs'
];
