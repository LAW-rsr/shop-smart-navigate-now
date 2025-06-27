
export interface StoreItem {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  location: {
    section: string;
    aisle: number;
    shelf: string;
    position: {
      x: number;
      y: number;
    };
  };
  fixtureType: 'aisle' | 'endcap' | 'peripheral' | 'checkout';
}

export interface ShoppingListItem {
  id: string;
  name: string;
  completed: boolean;
  storeItem?: StoreItem;
}

export interface PathStep {
  id: string;
  instruction: string;
  location: string;
  distance: number;
  item?: string;
}

export interface NavigationPath {
  totalDistance: number;
  totalSteps: number;
  estimatedTime: number;
  steps: PathStep[];
}

export interface StoreLayout {
  entrance: { x: number; y: number };
  checkout: { x: number; y: number };
  sections: {
    [key: string]: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  };
}
