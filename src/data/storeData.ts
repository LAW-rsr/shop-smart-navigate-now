
import { StoreItem, StoreLayout } from '../types/store';

// Mock store layout - represents a typical grocery store
export const storeLayout: StoreLayout = {
  entrance: { x: 50, y: 0 },
  checkout: { x: 90, y: 10 },
  sections: {
    'produce': { x: 10, y: 20, width: 30, height: 15 },
    'dairy': { x: 50, y: 20, width: 20, height: 15 },
    'meat': { x: 80, y: 20, width: 20, height: 15 },
    'frozen': { x: 10, y: 50, width: 30, height: 15 },
    'beverages': { x: 50, y: 50, width: 20, height: 15 },
    'snacks': { x: 80, y: 50, width: 20, height: 15 },
    'bakery': { x: 10, y: 80, width: 30, height: 15 },
    'deli': { x: 50, y: 80, width: 20, height: 15 },
    'pharmacy': { x: 80, y: 80, width: 20, height: 15 }
  }
};

// Comprehensive store inventory
export const storeItems: StoreItem[] = [
  // Produce Section
  {
    id: '1',
    name: 'Bananas',
    category: 'Produce',
    subcategory: 'Fruits',
    location: {
      section: 'produce',
      aisle: 1,
      shelf: 'A',
      position: { x: 15, y: 25 }
    },
    fixtureType: 'peripheral'
  },
  {
    id: '2',
    name: 'Apples',
    category: 'Produce',
    subcategory: 'Fruits',
    location: {
      section: 'produce',
      aisle: 1,
      shelf: 'A',
      position: { x: 20, y: 25 }
    },
    fixtureType: 'peripheral'
  },
  {
    id: '3',
    name: 'Lettuce',
    category: 'Produce',
    subcategory: 'Vegetables',
    location: {
      section: 'produce',
      aisle: 1,
      shelf: 'B',
      position: { x: 25, y: 30 }
    },
    fixtureType: 'peripheral'
  },
  {
    id: '4',
    name: 'Tomatoes',
    category: 'Produce',
    subcategory: 'Vegetables',
    location: {
      section: 'produce',
      aisle: 1,
      shelf: 'B',
      position: { x: 30, y: 30 }
    },
    fixtureType: 'peripheral'
  },
  {
    id: '5',
    name: 'Carrots',
    category: 'Produce',
    subcategory: 'Vegetables',
    location: {
      section: 'produce',
      aisle: 1,
      shelf: 'C',
      position: { x: 35, y: 25 }
    },
    fixtureType: 'peripheral'
  },

  // Dairy Section
  {
    id: '6',
    name: 'Milk',
    category: 'Dairy',
    subcategory: 'Beverages',
    location: {
      section: 'dairy',
      aisle: 2,
      shelf: 'A',
      position: { x: 55, y: 25 }
    },
    fixtureType: 'peripheral'
  },
  {
    id: '7',
    name: 'Cheese',
    category: 'Dairy',
    subcategory: 'Cheese',
    location: {
      section: 'dairy',
      aisle: 2,
      shelf: 'B',
      position: { x: 60, y: 30 }
    },
    fixtureType: 'peripheral'
  },
  {
    id: '8',
    name: 'Yogurt',
    category: 'Dairy',
    subcategory: 'Yogurt',
    location: {
      section: 'dairy',
      aisle: 2,
      shelf: 'C',
      position: { x: 65, y: 25 }
    },
    fixtureType: 'peripheral'
  },

  // Meat Section
  {
    id: '9',
    name: 'Chicken Breast',
    category: 'Meat',
    subcategory: 'Poultry',
    location: {
      section: 'meat',
      aisle: 3,
      shelf: 'A',
      position: { x: 85, y: 25 }
    },
    fixtureType: 'peripheral'
  },
  {
    id: '10',
    name: 'Ground Beef',
    category: 'Meat',
    subcategory: 'Beef',
    location: {
      section: 'meat',
      aisle: 3,
      shelf: 'B',
      position: { x: 90, y: 30 }
    },
    fixtureType: 'peripheral'
  },

  // Frozen Section
  {
    id: '11',
    name: 'Frozen Pizza',
    category: 'Frozen',
    subcategory: 'Meals',
    location: {
      section: 'frozen',
      aisle: 4,
      shelf: 'A',
      position: { x: 15, y: 55 }
    },
    fixtureType: 'aisle'
  },
  {
    id: '12',
    name: 'Ice Cream',
    category: 'Frozen',
    subcategory: 'Desserts',
    location: {
      section: 'frozen',
      aisle: 4,
      shelf: 'B',
      position: { x: 25, y: 60 }
    },
    fixtureType: 'aisle'
  },
  {
    id: '13',
    name: 'Frozen Vegetables',
    category: 'Frozen',
    subcategory: 'Vegetables',
    location: {
      section: 'frozen',
      aisle: 4,
      shelf: 'C',
      position: { x: 35, y: 55 }
    },
    fixtureType: 'aisle'
  },

  // Beverages Section
  {
    id: '14',
    name: 'Orange Juice',
    category: 'Beverages',
    subcategory: 'Juices',
    location: {
      section: 'beverages',
      aisle: 5,
      shelf: 'A',
      position: { x: 55, y: 55 }
    },
    fixtureType: 'aisle'
  },
  {
    id: '15',
    name: 'Soda',
    category: 'Beverages',
    subcategory: 'Soft Drinks',
    location: {
      section: 'beverages',
      aisle: 5,
      shelf: 'B',
      position: { x: 60, y: 60 }
    },
    fixtureType: 'aisle'
  },
  {
    id: '16',
    name: 'Water Bottles',
    category: 'Beverages',
    subcategory: 'Water',
    location: {
      section: 'beverages',
      aisle: 5,
      shelf: 'C',
      position: { x: 65, y: 55 }
    },
    fixtureType: 'aisle'
  },

  // Snacks Section
  {
    id: '17',
    name: 'Potato Chips',
    category: 'Snacks',
    subcategory: 'Chips',
    location: {
      section: 'snacks',
      aisle: 6,
      shelf: 'A',
      position: { x: 85, y: 55 }
    },
    fixtureType: 'aisle'
  },
  {
    id: '18',
    name: 'Cookies',
    category: 'Snacks',
    subcategory: 'Cookies',
    location: {
      section: 'snacks',
      aisle: 6,
      shelf: 'B',
      position: { x: 90, y: 60 }
    },
    fixtureType: 'aisle'
  },

  // Bakery Section
  {
    id: '19',
    name: 'Bread',
    category: 'Bakery',
    subcategory: 'Bread',
    location: {
      section: 'bakery',
      aisle: 7,
      shelf: 'A',
      position: { x: 15, y: 85 }
    },
    fixtureType: 'peripheral'
  },
  {
    id: '20',
    name: 'Bagels',
    category: 'Bakery',
    subcategory: 'Bread',
    location: {
      section: 'bakery',
      aisle: 7,
      shelf: 'B',
      position: { x: 25, y: 90 }
    },
    fixtureType: 'peripheral'
  },

  // Deli Section
  {
    id: '21',
    name: 'Sliced Turkey',
    category: 'Deli',
    subcategory: 'Meat',
    location: {
      section: 'deli',
      aisle: 8,
      shelf: 'A',
      position: { x: 55, y: 85 }
    },
    fixtureType: 'peripheral'
  },
  {
    id: '22',
    name: 'Ham',
    category: 'Deli',
    subcategory: 'Meat',
    location: {
      section: 'deli',
      aisle: 8,
      shelf: 'B',
      position: { x: 60, y: 90 }
    },
    fixtureType: 'peripheral'
  }
];

// Commonly searched items for autocomplete
export const popularItems = [
  'Bananas', 'Apples', 'Milk', 'Bread', 'Eggs', 'Chicken Breast',
  'Ground Beef', 'Cheese', 'Yogurt', 'Orange Juice', 'Lettuce',
  'Tomatoes', 'Carrots', 'Frozen Pizza', 'Ice Cream', 'Potato Chips'
];
